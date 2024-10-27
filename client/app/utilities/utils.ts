import { createCookie } from "@remix-run/node";

export const authCookie = createCookie("auth-token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 ,
});