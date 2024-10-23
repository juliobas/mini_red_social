from config.database import get_db_connection
from utils.rows_to_dict import row_to_dict

class PostComments:
    def __init__(self) -> None:
        self.db = get_db_connection()

    def get_by_id(self, id):
        cursor = self.db.cursor()
        cursor.execute('SELECT id, body, post_id, user_id, comment_date FROM post_comments WHERE id = ?', (id,))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return None

    def create_comment(self, post_comments):
        cursor = self.db.cursor()
        cursor.execute(
            'INSERT INTO post_comments (post_id, user_id, body, comment_date) VALUES (?, ?, ?, ?)',
            (post_comments.post_id, post_comments.user_id, post_comments.body, post_comments.comment_date)
        )
        self.db.commit()
        id = cursor.lastrowid
        self.db.close()
        return id  