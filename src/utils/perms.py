from typing import List
from .._typing import AccountType

__all__ = (
    'check_perms',
    'ORDER'
)

ORDER: List[AccountType] = ["user", "admin", "owner", "developer"]

def check_perms(
    actual: AccountType,   
    needed: AccountType
) -> None:
    """Check if a user has required permissions."""
    if ORDER.index(actual) < ORDER.index(needed):
        raise Exception('Insufficent permissions.')
