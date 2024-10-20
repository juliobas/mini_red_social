from config.database import get_db_connection
from utils.rows_to_dict import row_to_dict

class User:
    def __init__(self) -> None:
        self.db = get_db_connection()

    def list_users(self):
        cursor = self.db.cursor()
        cursor.execute('SELECT * FROM users')
        rows = cursor.fetchall()
        self.db.close()
        users = [row_to_dict(row) for row in rows]
        return users

    def get_by_email(self, email):
        cursor = self.db.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        row = cursor.fetchone()
        self.db.close()
        return row_to_dict(row)
    
    def register_user(self, user):
        cursor = self.db.cursor()
        cursor.execute(
            'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
            (user.name, user.email, user.password, user.avatar)
        )
        self.db.commit()
        self.db.close()
        return {"data": user.email}  
    