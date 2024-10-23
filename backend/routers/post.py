from fastapi import APIRouter, Depends, Request
from schemas.post_schema import Post
from middlewares.jwt_bearer import JWTBearer
from models.post import Post_manager
from fastapi.responses import JSONResponse
from fastapi import status, HTTPException
from fastapi.encoders import jsonable_encoder



post_router = APIRouter()

@post_router.post("/createPost", tags=["post"],status_code=200,response_model=Post ,dependencies=[Depends(JWTBearer())])
async def create_post( post: Post, request:Request):
        
        id_token = request.state.user["id"]
        post.user_id = id_token
        
        if post.body == None and post.image == None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="At least one image or a body is required to create a post.")
        
        post_created = Post_manager().create_post(post)
        if not post_created:
             raise ValueError("the post hasnt been created")
        
        return JSONResponse(status_code=status.HTTP_201_CREATED , content={"success" : True , "post" : jsonable_encoder(post), "message" : "Post has been created succesfully"})
    




