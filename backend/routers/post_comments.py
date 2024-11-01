from fastapi import APIRouter
from fastapi import Depends, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from schemas.post_comments_schema import PostComments
from services.post_comments import PostCommentsService
from middlewares.jwt_bearer import JWTBearer

post_comments_router = APIRouter()

@post_comments_router.post("/", tags=["Post Comments"], response_model=PostComments, status_code=200, dependencies=[Depends(JWTBearer())])
def create_post_comment(request: Request, post_comments: PostComments) -> PostComments:   
    try:
        id = request.state.user["id"]
        post_comments.user_id = id
        post_comment = PostCommentsService().create_comment(post_comments)
        return JSONResponse(status_code=200, content={"success": True, "data": jsonable_encoder(post_comment), "message" : "comment added"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"success": False, "data": None, "message": str(e)})