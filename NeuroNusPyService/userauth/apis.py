from django.urls import path

from main.views import (
    RefreshTokenAPIView,
    TOTPGenerateView,
    TOTPEnableView,
    TOTPVerifyView,
    TOTPStatusView,
)
from userauth.views.auth import LoginView, RegisterView
from userauth.views.jwks import JWKSView, PublicKeyPEMView
from userauth.views.tokens import AuthTokenRefreshView, AuthTokenVerifyView


urlpatterns = [
    # Identity Provider (central auth)
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    # Standard SimpleJWT refresh/verify endpoints (body-based)
    path(
        "auth/token/refresh/", AuthTokenRefreshView.as_view(), name="auth-token-refresh"
    ),
    path("auth/token/verify/", AuthTokenVerifyView.as_view(), name="auth-token-verify"),
    # Cookie-based refresh endpoint kept for existing browser flows
    path(
        "auth/token/refresh-cookie/",
        RefreshTokenAPIView.as_view(),
        name="auth-token-refresh-cookie",
    ),
    # TOTP 2FA endpoints
    path("auth/totp/generate/", TOTPGenerateView.as_view(), name="totp-generate"),
    path(
        "auth/totp/manage/",
        TOTPEnableView.as_view(),
        name="totp-manage",
    ),
    path("auth/totp/verify/", TOTPVerifyView.as_view(), name="totp-verify"),
    path("auth/totp/status/", TOTPStatusView.as_view(), name="totp-status"),
    # Public verification material
    path(".well-known/jwks.json", JWKSView.as_view(), name="jwks"),
    path("auth/public-key.pem", PublicKeyPEMView.as_view(), name="public-key-pem"),
]
