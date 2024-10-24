from config.database import get_db_connection
from utils.rows_to_dict import row_to_dict

class User:
    def __init__(self) -> None:
        self.db = get_db_connection()

    def list_users(self):
        cursor = self.db.cursor()
        cursor.execute('SELECT id, name, email, avatar FROM users')
        rows = cursor.fetchall()
        self.db.close()
        users = [row_to_dict(row) for row in rows]
        return users

    def get_by_email(self, email):
        cursor = self.db.cursor()
        cursor.execute('SELECT id, name, email, avatar, password FROM users WHERE email = ?', (email,))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return None
    
    def get_by_id(self, id):
        cursor = self.db.cursor()
        cursor.execute('SELECT id, name, email, avatar FROM users WHERE id = ?', (id,))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return None
    
    def register_user(self, user):
        cursor = self.db.cursor()
        cursor.execute(
            'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
            (user.name, user.email, user.password, user.avatar)
        )
        self.db.commit()
        self.db.close()
        return {"data": user.email}  
    
    def delete_user(self, id):
        cursor = self.db.cursor()
        cursor.execute('DELETE FROM users WHERE id = ?', (id,))
        self.db.commit()
        self.db.close()
        return {"data": id}
    
    def login_user(self, user):
        email = user.email 
        password = self.get_by_email(email)['password']
        return password
    
    def get_name(self, email):
        cursor = self.db.cursor()
        cursor.execute('SELECT name FROM users WHERE email = ?', (email))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return True
    
    def update_user(self, user, id):
        cursor = self.db.cursor()
        cursor.execute('UPDATE users SET name= ? , avatar=?, password=?  WHERE id = ?', (user.name, user.avatar, user.password, user.id)) 
        self.db.commit()
        self.db.close()

        return True
    
    def get_user_with_pw_by_id(self, id):
        cursor = self.db.cursor()
        cursor.execute('SELECT id, name, email, avatar, password FROM users WHERE id = ?', (id,))
        row = cursor.fetchone()
        self.db.close()
        if row:
            return row_to_dict(row)
        return None
    
    

    
    
