import { createCookie } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";

const authCookie = createCookie("auth-token", {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7
});

const posts = [
  {
    "id": 0,
    "body": "Hola 123 hola 123 hola 123 hola 123 hola 123 hola 123",
    "image": "https://4kwallpapers.com/images/wallpapers/spider-man-into-the-spider-verse-miles-morales-spider-man-2048x2048-2948.jpg",
    "post_date": "2024-10-25",
    "user_id": 0
  },
  {
    "id": 2,
    "body": "bla bla bla bla bla bla",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFges80QlNtNK4oYRdqv4ONvBSjQI4aiwLpg&s",
    "post_date": "2024-10-26",
    "user_id": 1
  },
  {
    "id": 3,
    "body": "aaaa bbbbbb ccc dddd rrr ggg",
    "image": "https://i.pinimg.com/736x/2b/f6/ea/2bf6eab40d79d043d24369e3e1e3c69d.jpg",
    "post_date": "2024-10-26",
    "user_id": 2
  },
];

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
    <main className="w-full space-y-4 divide-y divide-gray-lowest">
      {posts.map(post =>
        <Post
          id={post.id.toString()} 
          username={`nombre-de-usuario`}
          userimage={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s`}
          image={post.image}
          body={post.body}
          date={post.post_date}
          likes={11}
          comments={6}
        />
      )}
      
    </main>
  );
}
