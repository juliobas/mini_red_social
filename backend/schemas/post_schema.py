from pydantic import BaseModel 
from datetime import date


#Post Class 

class Post(BaseModel):
    id : int 
    body: str | None = None
    image: str | None = None
    post_date : date = date.today()
    user_id : int 


