from fastapi import APIRouter
from fastapi import Depends, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from schemas.user_schema import User, UserLogin
from services.user import UserService
from middlewares.jwt_bearer import JWTBearer

user_router = APIRouter()

@user_router.get("/my_profile", tags=["user"], response_model=User, status_code=200, dependencies=[Depends(JWTBearer())])
def myProfile(request: Request) -> User:   
    try:
        id = request.state.user["id"]
        user = UserService().get_by_id(id)
        return JSONResponse(status_code=200, content={"success": True, "data": jsonable_encoder(user), "message" : "user found"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"success": False, "data": None, "message": str(e)})