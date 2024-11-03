import { LoginError } from "./enums";

export type ErrorResponse = { 
    succes: boolean,
    message: LoginError,
}

export type UserPost = {
    key: string,
    postId: number,
    userId: number,
    username: string,
    avatar: string,
    body: string,
    image: string,
    date: string,
    comments: number,
    likes: number,
    liked: number,
    listComments: string,
}

export type endpointPosts = {
    id: number,
    post_user_id: 1,
    post_body: string,
    post_image_url: string,
    post_created_at: string,
    user_name: string,
    user_email: string,
    user_avatar: string,
    no_comments: number,
    no_likes: number,
    liked: number,
    comments: [],
}[]
