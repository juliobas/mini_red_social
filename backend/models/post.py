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

        
        

