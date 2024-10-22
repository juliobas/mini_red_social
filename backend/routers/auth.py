from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from schemas.user_schema import User, UserLogin
from services.auth import AuthService


auth_router = APIRouter()

@auth_router.post("/register", tags=["auth"])
def register(user: User):
    try:
        AuthService().register_user(user)
        return JSONResponse(status_code=200, content={"success": True, "data": None , "message": "User registered"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"success": False, "data": None, "message": str(e)})
    

@auth_router.post("/login")
def login(user: UserLogin):
    try:
        token = AuthService().login_user(user)
        return JSONResponse(status_code=200, content={"success": True, "data": jsonable_encoder(token) , "message" : "login sucessfull"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"sucess": False , "message": str(e)})
