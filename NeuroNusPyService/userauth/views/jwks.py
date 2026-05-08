from django.conf import settings
from django.http import HttpResponse

from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny

from userauth.utils.jwks import jwks_from_pem_public_key


class JWKSView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        tags=["Public Keys"],
        operation_summary="JWKS (JSON Web Key Set)",
        operation_description=(
            "Public keys used to verify JWTs issued by this service.\n\n"
            "Other services should fetch this and cache it to validate tokens locally."
        ),
        responses={
            200: openapi.Response(
                description="JWKS document",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "keys": openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(type=openapi.TYPE_OBJECT),
                        )
                    },
                ),
                examples={
                    "application/json": {
                        "keys": [
                            {
                                "kty": "RSA",
                                "use": "sig",
                                "alg": "RS256",
                                "kid": "base64url-thumbprint",
                                "n": "base64url-modulus",
                                "e": "AQAB",
                            }
                        ]
                    }
                },
            ),
            503: openapi.Response(
                description="JWKS not configured",
                examples={
                    "application/json": {
                        "detail": "JWKS not configured. Set JWT_PUBLIC_KEY/JWT_PUBLIC_KEY_PATH and enable RS256."
                    }
                },
            ),
        },
    )
    def get(self, request, *args, **kwargs):
        public_key = getattr(settings, "JWT_PUBLIC_KEY", None)
        if not public_key:
            return Response(
                {
                    "detail": "JWKS not configured. Set JWT_PUBLIC_KEY/JWT_PUBLIC_KEY_PATH and enable RS256.",
                },
                status=503,
            )
        return Response(jwks_from_pem_public_key(public_key))


class PublicKeyPEMView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        tags=["Public Keys"],
        operation_summary="Public key (PEM)",
        operation_description=(
            "Raw PEM-encoded public key for verifying JWTs.\n\n"
            "Prefer JWKS (`/.well-known/jwks.json`) for rotation support."
        ),
        responses={
            200: openapi.Response(
                description="PEM public key",
                schema=openapi.Schema(type=openapi.TYPE_STRING),
                examples={
                    "text/plain": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqh...\n-----END PUBLIC KEY-----\n"
                },
            ),
            503: openapi.Response(
                description="Public key not configured",
                examples={
                    "application/json": {
                        "detail": "Public key not configured. Set JWT_PUBLIC_KEY/JWT_PUBLIC_KEY_PATH and enable RS256."
                    }
                },
            ),
        },
    )
    def get(self, request, *args, **kwargs):
        public_key = getattr(settings, "JWT_PUBLIC_KEY", None)
        if not public_key:
            return Response(
                {
                    "detail": "Public key not configured. Set JWT_PUBLIC_KEY/JWT_PUBLIC_KEY_PATH and enable RS256.",
                },
                status=503,
            )
        return HttpResponse(public_key, content_type="application/x-pem-file")
