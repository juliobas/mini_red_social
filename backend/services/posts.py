from schemas.post_schema import PostFeed
from schemas.post_comments_schema import PostComments
from datetime import datetime



class Post:
    
    def esambly_posts(posts_stats  ):
        posts = []
        for i in posts_stats:

            posts.append(PostFeed(id=i['id'],body=i['post_body'],image=i['post_image_url'],user_id=i['post_user_id'], no_comments=i['no_comments'], no_likes=i['no_likes']))

        return posts


# [{'id': 15, 'post_user_id': 0, 'post_body': None, 'post_image_url': None, 'post_created_at': '', 'no_comments': 0, 'no_likes': 1, 'comment_bodies': None, 'comment_user_ids': None}, {'id': 16, 'post_user_id': 4, 'post_body': 'tercer post con comentarios y likes', 'post_image_url': './images/imgpruebatres', 'post_created_at': '2024-10-24', 'no_comments': 0, 'no_likes': 0, 'comment_bodies': None, 'comment_user_ids': None}, {'id': 17, 'post_user_id': 4, 'post_body': 'segundo post con comentarios y likes', 'post_image_url': './images/imgpruebados', 'post_created_at': '2024-10-24', 'no_comments': 1, 'no_likes': 1, 'comment_bodies': 'wow que lindo post', 'comment_user_ids': '4'}, {'id': 18, 'post_user_id': 3, 'post_body': 'primer post de mila con likes y comentarios', 'post_image_url': None, 'post_created_at': '2024-10-24', 'no_comments': 1, 'no_likes': 1, 'comment_bodies': 'string', 'comment_user_ids': '4'}, {'id': 19, 'post_user_id': 3, 'post_body': 'segundo post de mila con likes y comentarios', 'post_image_url': None, 'post_created_at': '2024-10-24', 'no_comments': 0, 'no_likes': 0, 'comment_bodies': None, 'comment_user_ids': None}, {'id': 20, 'post_user_id': 3, 'post_body': 'tercer post de mila con likes y comentarios', 'post_image_url': None, 'post_created_at': '2024-10-24', 'no_comments': 0, 'no_likes': 0, 'comment_bodies': None, 'comment_user_ids': None}, {'id': 21, 'post_user_id': 4, 'post_body': 'ultimo post de prueba', 'post_image_url': None, 'post_created_at': '2024-10-27', 'no_comments': 0, 'no_likes': 0, 'comment_bodies': None, 'comment_user_ids': None}]