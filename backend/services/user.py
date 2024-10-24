from schemas.user_schema import User, UserLogin, UserUpdate
from models.user import User as UserModel
import bcrypt

class UserService:
    def get_by_id(self, id):
        user = UserModel().get_by_id(id)

        if not user:
            raise ValueError("User not found")

        return user
    
    def update_by_id(self, id, user:UserUpdate):
        userbd = UserModel().get_user_with_pw_by_id(id)
        if not userbd:
            raise ValueError("User not found")
        
        if user.name != None:
            userbd["name"] = user.name
        
        if user.avatar != None:
            userbd["avatar"] = user.avatar

        if user.password != None:
            userbd["password"] = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        userBD = User(id=id, name=userbd["name"], avatar=userbd["avatar"], email=userbd["email"], password=userbd["password"])


        if UserModel().update_user(user=userBD, id=id) : 
            return userBD
        else:
            return False
    

    

