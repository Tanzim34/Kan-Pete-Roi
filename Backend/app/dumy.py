import hashlib

def hash_password(password):
    # Convert the password to bytes (required by hashlib)
    password_bytes = password.encode('utf-8')

    # Hash the password using SHA-256 algorithm
    hashed_password = hashlib.sha256(password_bytes).hexdigest()

    return hashed_password

# Example usage
password = "password"
hashed_password = hash_password(password)
print("Hashed password:", hashed_password)
