from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny

from main.views.signup import UserSignUpView
from main.views.signin import UserSignInView
from main.serializers.signup import UserSignUpSerializer
from main.serializers.signin import UserSignInSerializer


class RegisterView(UserSignUpView):
    """
    Identity Provider: Register a new user.
    """

    permission_classes = [AllowAny]
    serializer_class = UserSignUpSerializer

    @swagger_auto_schema(
        tags=["Auth"],
        operation_summary="Register",
        operation_description=(
            "Create a new user identity in this service.\n\n"
            "This endpoint stores the user's cryptographic material in the profile "
            "(public key and encrypted private key details)."
        ),
        request_body=UserSignUpSerializer,
        responses={
            201: openapi.Response(
                description="User created successfully",
                examples={
                    "application/json": {
                        "success": True,
                        "message": "User created successfully",
                    }
                },
            ),
            400: openapi.Response(description="Validation error"),
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class LoginView(UserSignInView):
    """
    Identity Provider: Login and receive JWT tokens.
    """

    permission_classes = [AllowAny]
    serializer_class = UserSignInSerializer

    @swagger_auto_schema(
        tags=["Auth"],
        operation_summary="Login",
        operation_description=(
            "Authenticate the user and return a JWT **access** + **refresh** token.\n\n"
            "- `access`: send as `Authorization: Bearer <token>` to other services\n"
            "- `refresh`: use to obtain a new access token\n\n"
            "**2FA Support:**\n"
            "- If TOTP 2FA is enabled for the user, `totp_token` is required\n"
            "- Provide the 6-digit code from your authenticator app\n\n"
            "This endpoint also sets the refresh token as an HttpOnly cookie for browser flows."
        ),
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["pass_phrase"],
            properties={
                "pass_phrase": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="User pass phrase / seed phrase",
                    example="yellow-sky-bird-frost ...",
                ),
                "totp_token": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description=(
                        "6-digit TOTP token from authenticator app. "
                        "Required only if TOTP 2FA is enabled for the user."
                    ),
                    example="123456",
                ),
            },
        ),
        responses={
            200: openapi.Response(
                description="Login successful",
                examples={
                    "application/json": {
                        "access": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "refresh": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "is_2fa": True,
                        "cryptographic_data": {
                            "public_key": "-----BEGIN PUBLIC KEY----- ...",
                            "encrypted_private_key": "...",
                            "encrypted_private_key_iv": "...",
                            "encrypted_private_key_tag": "...",
                            "enc_salt": "...",
                        },
                    }
                },
            ),
            400: openapi.Response(description="TOTP token required when 2FA is enabled"),
            401: openapi.Response(description="Invalid credentials or TOTP token"),
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
