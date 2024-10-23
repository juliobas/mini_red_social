from pydantic import BaseModel 
from typing import Optional
from datetime import date

#post_comments class 

class PostComments(BaseModel):
    id: Optional[int] = None
    body: str
    post_id : int 
    user_id : Optional[int] = None 
    comment_date : Optional[date] = date.today()