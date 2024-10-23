from schemas.post_likes_schema import PostLikes
from models.post_likes import PostLikes as PostLikesModel

class PostLikesService:
    def create_like(self, post_like: PostLikes) -> PostLikes:
        post_like_exists = PostLikesModel().get_by_post_user(post_like)

        if post_like_exists:
            raise ValueError("You have already liked this post")
        
        created = PostLikesModel().create_like(post_like)

        return created