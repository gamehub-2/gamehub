import strawberry
from discord import Embed
from .permissions import Authenticated
from typing_extensions import Annotated
from strawberry.types import Info
from datetime import datetime
from ..db import FoundUser

__all__ = ('suggestion',)


@strawberry.field(
    description = "Submit a suggestion.",
    permission_classes = [Authenticated]
)
def suggestion(
    info: Info,
    content: Annotated[
        str,
        strawberry.argument("Content of the suggestion.")
    ]
) -> str:
    user: FoundUser = info.context.user

    embed = Embed(
        title = "Suggestion",
        description = content,
        color = 0x5caeff
    )
    embed.set_author(
        name = user.username,
        url = info.context.request.url_for("profile", username = user.username)
    )  # type: ignore
    embed.timestamp = datetime.now()

    return "Successfully submitted suggestion."
