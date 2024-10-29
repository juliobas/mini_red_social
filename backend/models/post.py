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
    
    def statistics(self, user_id):
        cursor = self.db.cursor()
        cursor.execute('''SELECT 
                            p.user_id AS user_id,
                            COUNT(DISTINCT lc.id) AS total_comments,
                            COUNT(DISTINCT pl.id) AS total_likes
                        FROM 
                            posts p
                        LEFT JOIN post_comments lc ON p.id = lc.post_id
                        LEFT JOIN post_likes pl ON p.id = pl.post_id
                        WHERE 
                            p.user_id = ?
                        GROUP BY 
                            p.user_id;''', (user_id,))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return None

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
