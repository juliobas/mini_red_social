from schemas.post_comments_schema import PostComments
from models.post_comments import PostComments as PostCommentsModel

class PostCommentsService:
    def create_comment(self, post_comments: PostComments) -> PostComments:      
        created = PostCommentsModel().create_comment(post_comments)

        if not created:
            raise ValueError("Comment could not be created")
        
        comment = PostCommentsModel().get_by_id(created)

        return comment