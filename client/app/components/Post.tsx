import { UserPost } from "~/utilities/types";
import { RiChat3Line } from "react-icons/ri";
import Like from "./Like";

export default function Post(props: UserPost) {
    const {
        id,
        username,
        userimage,
        image,
        body,
        date,
        likes,
        comments,
    } = props;

    const day = 86400000;
    const weekday = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
    const postDate = new Date(date);
    const today = new Date(Date.now());
    const difference = today.getTime() - postDate.getTime();
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
                <img 
                    className="w-10 rounded-full"
                    src={userimage} alt="user image"
                />
                <span className="font-bold">{username}</span>
            </div>
            <img 
                className="w-full"
                src={image} alt="post image"
            />
            <div className="w-90-auto flex space-x-3">
                <span className="mr-auto text-sm text-gray-clear">{d}</span>
                <div className="flex items-center text-2xl space-x-1">
                    <span className="text-xs font-bold">{likes}</span>
                    <Like
                        liked={true}
                        className="cursor-pointer"
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