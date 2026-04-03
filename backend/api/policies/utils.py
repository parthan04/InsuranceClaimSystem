import secrets
import string


def generate_policy_id():
    prefix = "POLICY"
    random_part = ''.join(
        secrets.choice(string.ascii_uppercase + string.digits)
        for _ in range(12)
    )
    return f"{prefix}{random_part}"

def generate_application_id():
    prefix = "APPLICATION"
    random_part = ''.join(
        secrets.choice(string.ascii_uppercase + string.digits)
        for _ in range(12)
    )
    return f"{prefix}{random_part}"