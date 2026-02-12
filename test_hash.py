from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

try:
    print("Attempting to hash 'password'...")
    hash = pwd_context.hash("password")
    print(f"Hash success: {hash}")
except Exception as e:
    print(f"Hash failed: {e}")
    import traceback
    traceback.print_exc()
