from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ValidationError
import pyotp

from main.utils import hash_passphrase


class UserSignInSerializer(serializers.Serializer):
    pass_phrase = serializers.CharField(write_only=True)
    totp_token = serializers.CharField(write_only=True, required=False, allow_blank=True)

    def validate(self, attrs):
        """Validate TOTP token if 2FA is enabled"""
        pass_phrase = attrs.get("pass_phrase")
        totp_token = attrs.get("totp_token", "")

        hash = hash_passphrase(pass_phrase)
        user = User.objects.filter(username=pass_phrase).first()
        
        if not user:
            raise AuthenticationFailed("Invalid Seed.")

        if not user.check_password(hash):
            raise AuthenticationFailed("Invalid Seed.")

        # Check if TOTP is enabled for this user
        profile = user.profile
        if profile.totp_enabled:
            if not totp_token:
                raise ValidationError({
                    "totp_token": "TOTP token is required when 2FA is enabled."
                })
            
            if not profile.totp_secret:
                raise AuthenticationFailed("TOTP is enabled but secret is missing. Please contact support.")
            
            # Verify TOTP token
            totp = pyotp.TOTP(profile.totp_secret)
            if not totp.verify(totp_token, valid_window=1):
                raise AuthenticationFailed("Invalid TOTP token.")

        return attrs

    def create(self, validated_data):
        pass_phrase = validated_data["pass_phrase"]
        hash = hash_passphrase(pass_phrase)

        user = User.objects.filter(username=pass_phrase).first()
        if not user:
            raise AuthenticationFailed("Invalid Seed.")

        if not user.check_password(hash):
            raise AuthenticationFailed("Invalid Seed.")

        self.refresh = RefreshToken.for_user(user)
        self.user = user

        return user

    def to_representation(self, instance):
        """Format the response"""
        profile = self.user.profile

        return {
            "access": str(self.refresh.access_token),
            "refresh": str(self.refresh),
            "is_2fa": bool(profile.totp_enabled),
            "cryptographic_data": {
                "enc_salt": profile.enc_salt,
                "public_key": profile.public_key,
                "encrypted_private_key": profile.encrypted_private_key,
                "encrypted_private_key_iv": profile.encrypted_private_key_iv,
                "encrypted_private_key_tag": profile.encrypted_private_key_tag,
            },
        }
