from fastapi import APIRouter
from fastapi import Depends, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from schemas.post_likes_schema import PostLikes
from services.post_likes import PostLikesService
from middlewares.jwt_bearer import JWTBearer

post_likes_router = APIRouter()

@post_likes_router.post("/", tags=["Post Likes"], response_model=PostLikes, status_code=200, dependencies=[Depends(JWTBearer())])
def create_post_likes(request: Request, post_likes: PostLikes) -> PostLikes:   
    try:
        id = request.state.user["id"]
        post_likes.user_id = id
        post_like = PostLikesService().create_like(post_likes)
        return JSONResponse(status_code=200, content={"success": True, "data": jsonable_encoder(post_like), "message" : "like added"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"success": False, "data": None, "message": str(e)})