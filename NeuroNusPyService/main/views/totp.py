from rest_framework import generics, status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated
import pyotp
import qrcode
import io
import base64

from main.models.user_profile import UserProfile


class TOTPGenerateView(generics.GenericAPIView):
    """
    Generate a new TOTP secret and return QR code for setup.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Generate TOTP Secret and QR Code",
        operation_description=(
            "Generates a new TOTP secret for the authenticated user and returns:\n\n"
            "- `secret`: The TOTP secret key (for manual entry)\n"
            "- `qr_code`: Base64 encoded QR code image (data URI)\n"
            "- `uri`: The provisioning URI (for advanced users)\n\n"
            "**Note:** This will replace any existing TOTP secret. "
            "The user must verify the token before enabling 2FA."
        ),
        responses={
            200: openapi.Response(
                description="TOTP secret and QR code generated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "secret": openapi.Schema(type=openapi.TYPE_STRING, description="TOTP secret key"),
                        "qr_code": openapi.Schema(type=openapi.TYPE_STRING, description="Base64 encoded QR code image"),
                        "uri": openapi.Schema(type=openapi.TYPE_STRING, description="TOTP provisioning URI"),
                    },
                ),
            ),
            404: "User profile not found.",
        },
    )
    def post(self, request, *args, **kwargs):
        """Generate TOTP secret and QR code"""
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            raise NotFound("User profile not found.")

        # Generate new secret
        secret = pyotp.random_base32()
        profile.totp_secret = secret
        profile.save()

        # Generate TOTP URI
        totp = pyotp.TOTP(secret)
        issuer_name = "NeuroNus"
        uri = totp.provisioning_uri(
            name=request.user.email or request.user.username,
            issuer_name=issuer_name
        )

        # Generate QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        
        img_base64 = base64.b64encode(buffer.read()).decode()
        qr_code = f"data:image/png;base64,{img_base64}"

        return Response(
            {
                "secret": secret,
                "qr_code": qr_code,
                "uri": uri,
            },
            status=status.HTTP_200_OK,
        )


class TOTPEnableView(generics.GenericAPIView):
    """
    Enable or disable TOTP 2FA. Requires TOTP token for both operations.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Enable/Disable TOTP 2FA",
        operation_description=(
            "Enable or disable TOTP 2FA for the authenticated user.\n\n"
            "**Requirements:**\n"
            "- For **enabling**: A TOTP secret must be generated first (via `/user/totp/generate/`)\n"
            "- For **disabling**: TOTP must already be enabled\n"
            "- The `token` must be valid (from the authenticator app) for both operations\n\n"
            "**Security:** Both enable and disable operations require a valid TOTP token to prevent unauthorized changes."
        ),
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["use_totp", "token"],
            properties={
                "use_totp": openapi.Schema(
                    type=openapi.TYPE_BOOLEAN,
                    description="Set to `true` to enable TOTP 2FA, `false` to disable it",
                    example=True,
                ),
                "token": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="6-digit TOTP token from authenticator app (required for both enable and disable)",
                    example="123456",
                ),
            },
        ),
        responses={
            200: openapi.Response(
                description="TOTP 2FA status updated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "message": openapi.Schema(type=openapi.TYPE_STRING),
                        "totp_enabled": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    },
                ),
            ),
            400: "Invalid token, TOTP secret not generated (for enable), or TOTP not enabled (for disable).",
            404: "User profile not found.",
        },
    )
    def post(self, request, *args, **kwargs):
        """Enable or disable TOTP 2FA"""
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            raise NotFound("User profile not found.")

        use_totp = request.data.get("use_totp")
        token = request.data.get("token")

        # Validate required fields
        if use_totp is None:
            raise ValidationError({"use_totp": "use_totp field is required (true or false)."})

        if not token:
            raise ValidationError({"token": "TOTP token is required for both enable and disable operations."})

        # Handle enable
        if use_totp:
            if not profile.totp_secret:
                raise ValidationError(
                    {"error": "TOTP secret not found. Please generate a secret first via /user/totp/generate/"}
                )

            # Verify the token before enabling
            totp = pyotp.TOTP(profile.totp_secret)
            if not totp.verify(token, valid_window=1):
                raise ValidationError({"token": "Invalid TOTP token."})

            # Enable TOTP
            profile.totp_enabled = True
            profile.save()

            return Response(
                {
                    "message": "TOTP 2FA has been enabled successfully.",
                    "totp_enabled": profile.totp_enabled,
                },
                status=status.HTTP_200_OK,
            )

        # Handle disable
        else:
            if not profile.totp_enabled:
                raise ValidationError(
                    {"error": "TOTP 2FA is not enabled. Nothing to disable."}
                )

            if not profile.totp_secret:
                raise ValidationError(
                    {"error": "TOTP secret not found. 2FA may already be disabled."}
                )

            # Verify the token before disabling (security measure)
            totp = pyotp.TOTP(profile.totp_secret)
            if not totp.verify(token, valid_window=1):
                raise ValidationError({"token": "Invalid TOTP token. Cannot disable 2FA without valid token."})

            # Disable TOTP and clear secret
            profile.totp_enabled = False
            profile.totp_secret = None
            profile.save()

            return Response(
                {
                    "message": "TOTP 2FA has been disabled successfully.",
                    "totp_enabled": profile.totp_enabled,
                },
                status=status.HTTP_200_OK,
            )


class TOTPDisableView(generics.GenericAPIView):
    """
    Disable TOTP 2FA for the user.
    DEPRECATED: Use TOTPEnableView with use_totp=false instead.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Disable TOTP 2FA (Deprecated)",
        operation_description=(
            "**DEPRECATED:** Use `/user/totp/enable/` with `use_totp=false` instead.\n\n"
            "Disables TOTP 2FA for the authenticated user.\n\n"
            "**Note:** This will remove the TOTP secret and disable 2FA. "
            "The user will no longer be required to provide a TOTP token during login."
        ),
        responses={
            200: openapi.Response(
                description="TOTP 2FA disabled successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "message": openapi.Schema(type=openapi.TYPE_STRING),
                        "totp_enabled": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    },
                ),
            ),
            404: "User profile not found.",
        },
    )
    def post(self, request, *args, **kwargs):
        """Disable TOTP 2FA (Deprecated)"""
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            raise NotFound("User profile not found.")

        profile.totp_enabled = False
        profile.totp_secret = None
        profile.save()

        return Response(
            {
                "message": "TOTP 2FA has been disabled successfully.",
                "totp_enabled": profile.totp_enabled,
            },
            status=status.HTTP_200_OK,
        )


class TOTPVerifyView(generics.GenericAPIView):
    """
    Verify a TOTP token (useful for testing or re-verification).
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Verify TOTP Token",
        operation_description=(
            "Verifies a TOTP token without enabling/disabling 2FA.\n\n"
            "Useful for:\n"
            "- Testing if the authenticator app is working correctly\n"
            "- Re-verifying tokens during setup\n"
        ),
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["token"],
            properties={
                "token": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="6-digit TOTP token from authenticator app",
                    example="123456",
                ),
            },
        ),
        responses={
            200: openapi.Response(
                description="Token verification result",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "valid": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        "message": openapi.Schema(type=openapi.TYPE_STRING),
                    },
                ),
            ),
            400: "Token is required or TOTP secret not found.",
            404: "User profile not found.",
        },
    )
    def post(self, request, *args, **kwargs):
        """Verify TOTP token"""
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            raise NotFound("User profile not found.")

        token = request.data.get("token")
        if not token:
            raise ValidationError({"token": "TOTP token is required."})

        if not profile.totp_secret:
            raise ValidationError(
                {"error": "TOTP secret not found. Please generate a secret first."}
            )

        totp = pyotp.TOTP(profile.totp_secret)
        is_valid = totp.verify(token, valid_window=1)

        return Response(
            {
                "valid": is_valid,
                "message": "Token is valid." if is_valid else "Token is invalid.",
            },
            status=status.HTTP_200_OK,
        )


class TOTPStatusView(generics.GenericAPIView):
    """
    Get the current TOTP 2FA status for the user.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get TOTP 2FA Status",
        operation_description=(
            "Returns the current TOTP 2FA status for the authenticated user.\n\n"
            "- `totp_enabled`: Whether 2FA is currently enabled\n"
            "- `has_secret`: Whether a TOTP secret has been generated (may be set but not enabled)"
        ),
        responses={
            200: openapi.Response(
                description="TOTP status retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "totp_enabled": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        "has_secret": openapi.Schema(type=openapi.TYPE_BOOLEAN),
                    },
                ),
            ),
            404: "User profile not found.",
        },
    )
    def get(self, request, *args, **kwargs):
        """Get TOTP status"""
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            raise NotFound("User profile not found.")

        return Response(
            {
                "totp_enabled": profile.totp_enabled,
                "has_secret": bool(profile.totp_secret),
            },
            status=status.HTTP_200_OK,
        )
