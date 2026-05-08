from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from main.serializers import UserSignInSerializer


class UserSignInView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSignInSerializer

    @swagger_auto_schema(
        operation_summary="User Sign-In using Seed Phrase",
        operation_description="""
            This endpoint allows users to log in using their **Resonance seed phrase**.

            - If the seed is valid, a new user is created (if it doesn't exist already).
            - The seed is validated from the Resonance server.
            - After validation:
                - User gets **JWT access** and **refresh tokens**
                - Address linked with the user is returned
 
            ### 🚀 Usage:
            - Provide `pass_phrase` in request body (required).\n
            - If TOTP 2FA is enabled, also provide `totp_token` (6-digit code from authenticator app).\n
            - On success, `access`, `refresh`, and `address` are returned.\n
            - `refresh` token is also set as **HttpOnly Secure Cookie**.
            
            ### 🔐 2FA Support:
            - If TOTP 2FA is enabled for the user, `totp_token` is required.
            - Provide the 6-digit code from your authenticator app.
            """,
        request_body=openapi.Schema(
            title="User Login Schema",
            type=openapi.TYPE_OBJECT,
            required=["pass_phrase"],
            properties={
                "pass_phrase": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    title="Seed Phrase",
                    description="Your secure seed phrase to sign in with Resonance.",
                    example="yellow peanut taxi...",
                ),
                "totp_token": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    title="TOTP Token",
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
                description="Sign-in successful. JWT tokens and address returned.",
                examples={
                    "application/json": {
                        "access": "eyJ0eXAiOiJKV1QiLCJhbGci...",
                        "refresh": "eyJ1c2VyX2lkIjoxfQ...",
                        "address": "0x2Af...C67E",
                    }
                },
            ),
            400: "Bad Request — seed not provided, invalid format, or TOTP token required when 2FA is enabled.",
            401: "Unauthorized — Invalid or rejected seed, or invalid TOTP token.",
            500: "Internal Server Error — Resonance service unreachable.",
        },
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh_token = response.data.pop("refresh", None)
        if refresh_token:
            response.set_cookie(
                "neuro_refresh_token", refresh_token, httponly=True, secure=True
            )
        return response
