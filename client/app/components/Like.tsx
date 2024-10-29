import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri";

export default function Like({ liked, className }: { liked: boolean, className: string} ) {
    return liked ? <RiHeart2Fill className={`text-red ${className}`} /> : <RiHeart2Line className={`text-red ${className}`} />;
}