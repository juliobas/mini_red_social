import { LoginError } from "./enums";

export type ErrorResponse = { 
    succes: boolean,
    message: LoginError,
}