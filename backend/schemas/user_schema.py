from pydantic import BaseModel


# User Class


class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    avatar: str | None = None

    



