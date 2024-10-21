from fastapi import APIRouter
from fastapi.responses import JSONResponse
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
def login(user:UserLogin):
    try:
        AuthService().login_user(user)
        return JSONResponse(status_code=200, content={"success": True, "Token": "Token" , "message" : "login sucessfull"})
    except ValueError:
        return JSONResponse(status_code=400, content={"sucess": False , "message": "Email or password incorrect" })