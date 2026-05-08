from pathlib import Path

from django.core.management.base import BaseCommand

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa


class Command(BaseCommand):
    help = (
        "Generate an RSA keypair for JWT signing (private) and verification (public)."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--private-out",
            type=str,
            default=None,
            help="Write private key PEM to this path",
        )
        parser.add_argument(
            "--public-out",
            type=str,
            default=None,
            help="Write public key PEM to this path",
        )
        parser.add_argument(
            "--key-size", type=int, default=2048, help="RSA key size (default: 2048)"
        )

    def handle(self, *args, **options):
        key_size = options["key_size"]
        private_key = rsa.generate_private_key(public_exponent=65537, key_size=key_size)

        private_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        ).decode("utf-8")

        public_pem = (
            private_key.public_key()
            .public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo,
            )
            .decode("utf-8")
        )

        private_out = options["private_out"]
        public_out = options["public_out"]

        if private_out:
            Path(private_out).write_text(private_pem, encoding="utf-8")
        if public_out:
            Path(public_out).write_text(public_pem, encoding="utf-8")

        if not private_out and not public_out:
            self.stdout.write("----- PRIVATE KEY (JWT_PRIVATE_KEY) -----")
            self.stdout.write(private_pem)
            self.stdout.write("----- PUBLIC KEY (JWT_PUBLIC_KEY) -----")
            self.stdout.write(public_pem)
        else:
            self.stdout.write(self.style.SUCCESS("JWT keypair generated."))
