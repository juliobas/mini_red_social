from pydantic import BaseModel 
from typing import Optional

#post_likes class 

class PostLikes(BaseModel):
    id: Optional[int] = None
    post_id : int 
    user_id : Optional[int] = None 

    