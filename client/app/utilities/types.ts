import { LoginError } from "./enums";

export type ErrorResponse = { 
    succes: boolean,
    message: LoginError,
}

export type UserPost = {
    id: string
    username: string,
    userimage: string,
    image: string,
    body: string,
    date: string,
    likes: number,
    comments: number,
}