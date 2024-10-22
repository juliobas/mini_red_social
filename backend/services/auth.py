from schemas.user_schema import User, UserLogin
from models.user import User as UserModel
import bcrypt

class AuthService:
    def register_user(self, user: User):
        existing_user = UserModel().get_by_email(user.email)
        
        if existing_user:
            raise ValueError("User already exists")

        user.password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        UserModel().register_user(user)
        return True
    
    def login_user(self, user: UserLogin):
        existing_user = UserModel().get_by_email(user.email)

        if not existing_user:
            raise ValueError("Email Incorrect")
        
        password = user.password.encode('utf-8')
        password_hash = existing_user['password'] 

        if bcrypt.checkpw(password, password_hash.encode('utf-8')):
            return True
        else:
            raise ValueError("password incorrect")
        
        

        

    
