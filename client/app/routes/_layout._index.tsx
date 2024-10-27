import { createCookie } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const authCookie = createCookie("auth-token", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7
});

export const loader = async ({ request }: LoaderFunctionArgs ) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader);

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return "posts";
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
      <>
        <p>{data}</p>
      </>
  );
}
