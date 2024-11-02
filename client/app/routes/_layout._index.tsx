import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { data, useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import { authCookie } from "~/utilities/utils";
import type { endpointPosts } from "~/utilities/types";

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const { token } = await authCookie.parse(cookieHeader);

  const data = Object.fromEntries(await request.formData());
  console.log(data)
  const body = {
    "id": 0,
    "post_id": data.postId,
    "user_id": data.userId,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch('http://localhost:8000/api/post_likes/', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    console.log(response)
  } catch (e) {
    console.log("error al dar like", e);
  }

  return "";
};

export const loader = async ({ request }: LoaderFunctionArgs ) => {
  const cookieHeader = request.headers.get("Cookie");
  const { token } = await authCookie.parse(cookieHeader);

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  let posts;
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch("http://localhost:8000/api/post/", {
      method: "GET",
      headers: headers,
    });
    
    const data = await response.json();
    posts = data.data;
  } catch (e ) {
    console.log('error', e);
  }

  return {posts, token};
};

export default function Index() {
  const {posts, token}: {posts: endpointPosts, token: string} = useLoaderData<typeof loader>();
  posts.sort((a, b) => Date.parse(b.post_created_at) - Date.parse(a.post_created_at));

  const giveLike = (postId: number, userId: number) => {
    const body = {
      "id": 0,
      "post_id": postId,
      "user_id": userId,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    console.log("Vamo a dar like")
    fetch('http://localhost:8000/api/post_likes/', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
    .catch(e => console.log("error al dar like", e));
  };

  return (
    <main className="w-full space-y-4 divide-y divide-gray-lowest">
      {posts.map(post =>
        <Post
          key={post.id.toString()}
          postId={post.id}
          userId={post.post_user_id}
          body={post.post_body} 
          image={post.post_image_url}
          date={post.post_created_at}
          comments={post.no_comments}
          likes={post.no_likes}
          listComments=""
        />
      )}
    </main>
  );
}
