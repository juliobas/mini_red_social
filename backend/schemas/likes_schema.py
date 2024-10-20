from pydantic import BaseModel 

#post_likes class 

class Post_likes(BaseModel):
    id : int 
    post_id : int 
    user_id : int 

    