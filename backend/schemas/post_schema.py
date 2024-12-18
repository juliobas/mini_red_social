from pydantic import BaseModel 
from datetime import date
from typing import Optional, List
from schemas.post_comments_schema import PostComments




#Post Class 

class Post(BaseModel):
    id : int | None = None
    body: str | None = None
    image: str | None = None
    post_date : Optional[date] = date.today()
    user_id : int | None = None 
    

class PostFeed(BaseModel):
    id : int
    body: str | None = None
    image: str | None = None
    post_date : date | None = None
    user_id : int 
    no_likes: int  #Number of likes
    no_comments : int  #Number of comments 
    comments : List[PostComments] | None = None  #list of comments 





