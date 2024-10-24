from pydantic import BaseModel
from typing import Optional


# User Class


class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    password: str
    avatar: str | None = None


class UserLogin(BaseModel):
    email : str
    password : str

    

class UserUpdate(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None
    avatar: Optional[str] = None

