from pydantic import BaseModel 
from datetime import date
from typing import Optional



#Post Class 

class Post(BaseModel):
    id : int | None = None
    body: str | None = None
    image: str | None = None
    post_date : Optional[date] = date.today()
    user_id : int | None = None 


