from fastapi import APIRouter, Depends, Request
from schemas.post_schema import Post, PostFeed
from middlewares.jwt_bearer import JWTBearer
from models.post import Post_manager
from fastapi.responses import JSONResponse
from fastapi import status, HTTPException
from fastapi.encoders import jsonable_encoder
from services.posts import Post as Posts
from services.post import PostService

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



@post_router.get("/", tags=["post"],status_code=200,dependencies=[Depends(JWTBearer())])
async def get_posts(request: Request):
      id = request.state.user["id"]
      posts = Post_manager().get_posts()
      print(posts)
      posts_ensambled = Posts.esambly_posts(posts)

      return posts_ensambled



@post_router.get("/statistics", tags=["Post Statistics"], response_model=Post, status_code=200, dependencies=[Depends(JWTBearer())])
def statistics(request: Request) -> Post:   
    try:
        id = request.state.user["id"]
        statistics = PostService().statistics(id)
        return JSONResponse(status_code=200, content={"success": True, "data": jsonable_encoder(statistics), "message" : "statistics found"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"success": False, "data": None, "message": str(e)})
    




