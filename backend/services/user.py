from schemas.user_schema import User, UserLogin
from models.user import User as UserModel
import bcrypt

class UserService:
    def get_by_id(self, id):
        user = UserModel().get_by_id(id)

        if not user:
            raise ValueError("User not found")

        return user