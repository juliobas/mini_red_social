from fastapi import FastAPI

#Routes
from routers.auth import auth_router
from routers.user import user_router

app = FastAPI()
app.title = "Mini Red Social"
app.version = "0.0.1"

app.include_router(auth_router, prefix="/api/auth")
app.include_router(user_router, prefix="/api/user")