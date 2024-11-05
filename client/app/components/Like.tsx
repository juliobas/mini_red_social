import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri";
import { Form, useSubmit } from "@remix-run/react";

export default function Like({ liked, className, postId, userId }: { liked: boolean, className: string, postId: number, userId: number } ) {
    const submit = useSubmit();
    const formData = new FormData();
    formData.append("myKey", "myValue");

    return (
        <Form method="post" className="flex items-center">
            <input type="hidden" name="postId" value={postId} />
            <input type="hidden" name="userId" value={userId} />
            <button type="submit">
                {
                    liked ? 
                    <RiHeart2Fill className={`text-red ${className}`} /> : 
                    <RiHeart2Line className={`text-red ${className}`} />
                }
            </button>
        </Form>
    );
} 