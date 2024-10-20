from pydantic import BaseModel
from typing import Optional


# User Class


class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    password: str
    avatar: str | None = None

    



