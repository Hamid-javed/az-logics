import json
import base64
import hashlib

from cryptography.hazmat.primitives import serialization


def _b64url_uint(val: int) -> str:
    raw = val.to_bytes((val.bit_length() + 7) // 8, "big") or b"\x00"
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode("ascii")


def _jwk_thumbprint(jwk: dict) -> str:
    """
    RFC 7638 thumbprint for key id (kid).
    """
    canonical = json.dumps(
        {k: jwk[k] for k in sorted(jwk.keys())},
        separators=(",", ":"),
        ensure_ascii=False,
    ).encode("utf-8")
    digest = hashlib.sha256(canonical).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")


def jwks_from_pem_public_key(public_key_pem: str) -> dict:
    """
    Build a minimal JWKS for an RSA public key.
    """
    public_key = serialization.load_pem_public_key(public_key_pem.encode("utf-8"))
    numbers = public_key.public_numbers()

    jwk = {
        "kty": "RSA",
        "n": _b64url_uint(numbers.n),
        "e": _b64url_uint(numbers.e),
    }
    kid = _jwk_thumbprint(jwk)
    return {
        "keys": [
            {
                **jwk,
                "use": "sig",
                "alg": "RS256",
                "kid": kid,
            }
        ]
    }
