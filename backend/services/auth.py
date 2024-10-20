from schemas.user_schema import User
from models.user import User as UserModel

class AuthService:
    def register_user(self, user: User):
        existing_user = UserModel().get_by_email(user.email)
        
        if existing_user:
            raise ValueError("User already exists")

        user.password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        UserModel().register_user(user)
        return True