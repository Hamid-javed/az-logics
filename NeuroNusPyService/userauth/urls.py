from drf_yasg import openapi
from django.urls import path, include
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny


schema_view = get_schema_view(
    openapi.Info(
        title="UserAuth",
        default_version="v1",
        description=(
            "UserAuth is the **Identity Provider** for the Neuronus ecosystem.\n\n"
            "### What this service provides\n"
            "- **Register** users and store their cryptographic profile data\n"
            "- **Login** users and issue JWT **access** + **refresh** tokens\n"
            "- Publish **JWKS / public key** so other services can verify tokens locally\n\n"
            "### Common flows\n"
            "1. `POST /api/auth/register/`\n"
            "2. `POST /api/auth/login/` → get `access` + `refresh`\n"
            "3. Use `access` as `Authorization: Bearer <token>` in other services\n"
            "4. Refresh: `POST /api/auth/token/refresh/` (or cookie refresh endpoint for browser flows)\n"
            "5. Services verify with: `GET /api/.well-known/jwks.json`\n"
        ),
    ),
    public=True,
    permission_classes=(AllowAny,),
    patterns=[
        path("api/", include("userauth.apis")),
    ],
)

urlpatterns = [
    path("api/", include("userauth.apis")),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
