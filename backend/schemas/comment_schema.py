from pydantic import BaseModel 
from datetime import date 



#Post_comments Class 

class Post_comments(BaseModel):
    id : int 
    body : str 
    post_id : int 
    user_id : int 
    comment_date : date = date.today()


    
