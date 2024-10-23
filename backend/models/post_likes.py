from config.database import get_db_connection
from utils.rows_to_dict import row_to_dict

class PostLikes:
    def __init__(self) -> None:
        self.db = get_db_connection()

    def get_by_post_user(self, post_likes):
        cursor = self.db.cursor()
        cursor.execute('SELECT id, post_id, user_id FROM post_likes WHERE post_id = ? and user_id = ?', (post_likes.post_id, post_likes.user_id,))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return None

    def create_like(self, post_likes):
        cursor = self.db.cursor()
        cursor.execute(
            'INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)',
            (post_likes.post_id, post_likes.user_id)
        )
        self.db.commit()
        self.db.close()
        return True  