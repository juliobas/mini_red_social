import { UserPost } from "~/utilities/types";
import { RiChat3Line, RiUser3Fill } from "react-icons/ri";
import Like from "./Like";

export default function Post(props: UserPost) {
    const {
        postId,
        userId,
        username,
        avatar,
        body,
        image,
        date,
        comments,
        likes,
        liked,
        listComments,
    } = props;


    const dateformat = date.replaceAll('-', '/')

    const day = 86400000;
    const weekday = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
    const postDate = new Date(dateformat);
    const today = Date.now();
    const difference = today - postDate.getTime();
    let d: string;

    if (difference < day) {
        d = "hoy";
    } else if (difference < 2*day) {
        d = "ayer";
    } else if (difference < 7*day) {
        d = weekday[postDate.getDay()];
    } else {
        d = date;
    }

    return(
        <div className="w-full space-y-2 pt-4">
            <div className="flex items-center w-90-auto space-x-3">
                {
                    (avatar && avatar !== "string" && avatar.length > 0) ?
                    <img 
                        className="w-10 rounded-full"
                        src={avatar}
                    />:
                    <RiUser3Fill />
                }
                
                <span className="font-bold">{username}</span>
            </div>
            {image &&
            <img 
                className="w-full"
                src={image} alt="post image"
            />}
            <div className="w-90-auto flex space-x-3">
                <span className="mr-auto text-sm text-gray-clear">{d}</span>
                <div className="flex items-center text-2xl space-x-1">
                    <span className="text-xs font-bold">{likes}</span>
                    <Like
                        liked={liked === 1}
                        className="cursor-pointer"
                        postId={postId}
                        userId={userId}
                    />
                </div>
                <div className="flex items-center text-2xl space-x-1">
                    <span className="text-xs font-bold">{comments}</span>
                    <RiChat3Line
                        className="cursor-pointer"
                    />
                </div>
            </div>
            <p className="w-90-auto text-pretty text-sm">{body}</p>

        </div>
    );
}