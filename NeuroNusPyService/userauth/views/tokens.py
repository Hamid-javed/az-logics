from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView


class AuthTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        tags=["Auth"],
        operation_summary="Refresh access token",
        operation_description=(
            "Exchange a **refresh token** for a new **access token**.\n\n"
            "Use this for mobile/server clients.\n"
            "For browser-cookie flows, use `GET /api/auth/token/refresh-cookie/` instead."
        ),
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["refresh"],
            properties={
                "refresh": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Refresh token",
                    example="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
                )
            },
        ),
        responses={
            200: openapi.Response(
                description="New access token",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={"access": openapi.Schema(type=openapi.TYPE_STRING)},
                ),
                examples={
                    "application/json": {
                        "access": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                },
            ),
            401: openapi.Response(description="Invalid refresh token"),
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class AuthTokenVerifyView(TokenVerifyView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        tags=["Auth"],
        operation_summary="Verify token signature",
        operation_description=(
            "Verify that a JWT is correctly signed and not expired.\n\n"
            "Most services should verify locally using JWKS; this endpoint is mainly for debugging."
        ),
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["token"],
            properties={
                "token": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="JWT access token",
                    example="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
                )
            },
        ),
        responses={
            200: openapi.Response(
                description="Token is valid", examples={"application/json": {}}
            ),
            401: openapi.Response(description="Token is invalid/expired"),
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
