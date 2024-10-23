from fastapi import FastAPI

#Routes
from routers.auth import auth_router
from routers.user import user_router
from routers.post import post_router
from routers.post_likes import post_likes_router
from routers.post_comments import post_comments_router

app = FastAPI()
app.title = "Mini Red Social"
app.version = "0.0.1"

app.include_router(auth_router, prefix="/api/auth")
app.include_router(user_router, prefix="/api/user")
app.include_router(post_router, prefix="/api/post")
app.include_router(post_likes_router, prefix="/api/post_likes")
app.include_router(post_comments_router, prefix="/api/post_comments")