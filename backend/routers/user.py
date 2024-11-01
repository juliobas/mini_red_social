from fastapi import APIRouter
from fastapi import Depends, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from schemas.user_schema import User, UserUpdate
from services.user import UserService
from middlewares.jwt_bearer import JWTBearer
from models.user import User as UserModel

user_router = APIRouter()

@user_router.get("/my_profile", tags=["Users"], response_model=User, status_code=200, dependencies=[Depends(JWTBearer())])
def myProfile(request: Request) -> User:   
    try:
        id = request.state.user["id"]
        user = UserService().get_by_id(id)
        return JSONResponse(status_code=200, content={"success": True, "data": jsonable_encoder(user), "message" : "user found"})
    except ValueError as e:
        return JSONResponse(status_code=400, content={"success": False, "data": None, "message": str(e)})
    



@user_router.put("/update", tags=["Users"], status_code=200,dependencies=[Depends(JWTBearer())])
def updateProfile(user:UserUpdate, request:Request):
        try:
            id = request.state.user["id"]
            user = UserService().update_by_id(id, user)
            return JSONResponse(status_code=200, content={"succes": True, "data": jsonable_encoder(user), "message" : "User has been updated succesf"})
        except ValueError as e:
            return JSONResponse(status_code=200, content={"succes": True, "data": jsonable_encoder(user), "message" : "User has been updated succesf"})
             

    
        





