from schemas.post_schema import Post
from models.post import Post_manager as PostModel
import bcrypt

class PostService:
    def statistics(self, user_id):
        statistics = PostModel().statistics(user_id)

        if not statistics:
            raise ValueError("statistics not found")

        return statistics