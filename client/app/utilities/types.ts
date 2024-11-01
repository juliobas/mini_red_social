import { LoginError } from "./enums";

export type ErrorResponse = { 
    succes: boolean,
    message: LoginError,
}

export type UserPost = {
    key: string,
    userId: string,
    body: string,
    image: string,
    date: string,
    comments: number,
    likes: number,
    listComments: string,
}

export type endpointPosts = {
    id: number,
    post_user_id: 1,
    post_body: string,
    post_image_url: string,
    post_created_at: string,
    no_comments: number,
    no_likes: number,
    comments: [],
}[]
