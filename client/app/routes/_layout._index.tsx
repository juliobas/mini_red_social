import type { LoaderFunctionArgs } from "@remix-run/node";
import { data, useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import { authCookie } from "~/utilities/utils";
import type { endpointPosts } from "~/utilities/types";

export const loader = async ({ request }: LoaderFunctionArgs ) => {
  const cookieHeader = request.headers.get("Cookie");
  const { token } = await authCookie.parse(cookieHeader);

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  let posts;
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`)
    const response = await fetch("http://localhost:8000/api/post/", {
      method: "GET",
      headers: headers,
    });
    
    const data = await response.json();
    posts = data.data;
  } catch (e ) {
    console.log('error', e)
  }

  return posts;
};

export default function Index() {
  const posts: endpointPosts = useLoaderData<typeof loader>();
  console.log(posts)
  posts.sort((a, b) => Date.parse(b.post_created_at) - Date.parse(a.post_created_at))
  return (
    <main className="w-full space-y-4 divide-y divide-gray-lowest">
      {posts.map(post =>
        <Post
          key={post.id.toString()}
          userId={post.post_user_id.toString()}
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
