from config.database import get_db_connection
from utils.rows_to_dict import row_to_dict
from schemas.post_schema import Post
from schemas.post_comments_schema import PostComments


class Post_manager:
    def __init__(self) -> None:
        self.db = get_db_connection()

    def create_post(self, post: Post):
        cursor = self.db.cursor()
        cursor.execute(
            "INSERT INTO posts (body, image_url, post_date, user_id) VALUES (?,?,?,?)",
            (post.body, post.image, post.post_date, post.user_id),
        )
        self.db.commit()
        self.db.close()
        return True

    def get_posts(self):
        cursor = self.db.cursor()
        
        query = """
        SELECT 
            posts.id,
            posts.user_id AS post_user_id,
            posts.body AS post_body,
            posts.image_url AS post_image_url,
            posts.post_date AS post_created_at,
            COUNT(post_comments.id) AS no_comments,
            COUNT(post_likes.id) AS no_likes
        FROM 
            posts
        LEFT JOIN 
            post_comments ON posts.id = post_comments.post_id
        LEFT JOIN 
            post_likes ON posts.id = post_likes.post_id
        GROUP BY 
            posts.id, posts.user_id, posts.body, posts.image_url, posts.post_date;

        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        self.db.close()
        
        # Convierte cada fila de resultados en un diccionario usando una función de ayuda
        posts = [row_to_dict(row) for row in rows]
        
        return posts
