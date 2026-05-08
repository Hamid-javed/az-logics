from django.contrib import admin
from django.contrib.admin import ModelAdmin, TabularInline
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.db.models import Count
from django.urls import reverse
from django.utils.html import format_html

from PasswordManager.models import Folder, Password


class PasswordInline(TabularInline):
    model = Password
    extra = 0
    show_change_link = True
    fields = (
        "title",
        "username",
        "url",
        "emoji",
        "has_file",
        "created_at",
        "updated_at",
    )
    readonly_fields = ("has_file", "created_at", "updated_at")
    autocomplete_fields = ("user",)

    @admin.display(boolean=True, description="Attachment")
    def has_file(self, obj: Password) -> bool:
        return bool(getattr(obj, "file", None))


@admin.register(Folder)
class FolderAdmin(ModelAdmin):
    list_display = (
        "title",
        "user_username",
        "password_count",
        "created_at",
        "updated_at",
    )
    search_fields = ("title", "user__username", "user__email")
    list_filter = ("created_at", "updated_at")
    autocomplete_fields = ("user",)
    inlines = (PasswordInline,)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(_password_count=Count("folder_passwords", distinct=True))

    @admin.display(description="Passwords")
    def password_count(self, obj: Folder) -> int:
        return int(getattr(obj, "_password_count", 0))

    @admin.display(description="User")
    def user_username(self, obj: Folder) -> str:
        return getattr(obj.user, "username", "") or str(obj.user_id)


class FolderInline(TabularInline):
    model = Folder
    extra = 0
    show_change_link = True
    fields = ("title", "password_count", "created_at", "updated_at")
    readonly_fields = ("password_count", "created_at", "updated_at")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(_password_count=Count("folder_passwords", distinct=True))

    @admin.display(description="Passwords")
    def password_count(self, obj: Folder) -> int:
        return int(getattr(obj, "_password_count", 0))


User = get_user_model()

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass


class UserAdmin(DjangoUserAdmin):
    """
    Adds PasswordManager overview to the default Django User admin:
    - counts + quick link to the user's folders
    - inline listing of folders (passwords shown inside each folder page)
    """

    inlines = (FolderInline,)
    list_display = DjangoUserAdmin.list_display + ("folders_link", "passwords_count")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(
            _folders_count=Count("folders", distinct=True),
            _passwords_count=Count("passwords", distinct=True),
        )

    @admin.display(description="Folders")
    def folders_link(self, obj) -> str:
        count = int(getattr(obj, "_folders_count", 0))
        url = (
            reverse("admin:PasswordManager_folder_changelist")
            + f"?user__id__exact={obj.pk}"
        )
        return format_html('<a href="{}">{} folders</a>', url, count)

    @admin.display(description="Passwords")
    def passwords_count(self, obj) -> int:
        return int(getattr(obj, "_passwords_count", 0))


admin.site.register(User, UserAdmin)
