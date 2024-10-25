from config.database import get_db_connection
from utils.rows_to_dict import row_to_dict
from schemas.post_schema import Post

class Post_manager:
    def __init__(self) -> None:
        self.db = get_db_connection()

    def create_post(self, post: Post):
        cursor = self.db.cursor()
        cursor.execute('INSERT INTO posts (body, image_url, post_date, user_id) VALUES (?,?,?,?)', 
                       (post.body, post.image, post.post_date, post.user_id))
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

        
        

