from schemas.post_schema import Post
from models.post import Post_manager as PostModel
from models.post_comments import PostComments as PostCommentsModel
import bcrypt

class PostService:
    def statistics(self, user_id):
        statistics = PostModel().statistics(user_id)

        if not statistics:
            raise ValueError("statistics not found")

        return statistics
    
    def get_posts(self, user_id):
        posts = PostModel().get_posts(user_id)
        for post in posts:
            comments = PostCommentsModel().get_by_post_id(post["id"])
            post["comments"] = comments
        return posts
    
    def get_my_posts(self, user_id):
        posts = PostModel().get_my_posts(user_id)
        for post in posts:
            comments = PostCommentsModel().get_by_post_id(post["id"])
            post["comments"] = comments
        return posts