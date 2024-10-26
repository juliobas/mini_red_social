import { NavLink, useLocation } from "@remix-run/react"
import { 
    RiHome2Line, 
    RiHome2Fill, 
    RiCameraLensLine, 
    RiCameraLensFill,
    RiUser6Line,
    RiUser6Fill,
 } from "react-icons/ri";

import { PathName } from "~/utilities/enums";

export default function Navbar() {
    const location = useLocation();
    console.log(location)
    return (
        <div className="w-full border-t-[1px] border-gray-lowest py-3">
            <nav className="flex justify-around w-90-auto text-3xl ">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-white-full" : "text-white-low"
                    }
                >
                    {location.pathname === PathName.Feed ? <RiHome2Fill /> : <RiHome2Line />} 
                </NavLink>
                <NavLink
                    to="/post"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-white-full" : "text-white-low"
                    }
                >
                    {location.pathname === PathName.Post ? <RiCameraLensFill /> : <RiCameraLensLine />}
                </NavLink>
                <NavLink
                    to="/user"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-white-full" : "text-white-low"
                    }
                >
                    {location.pathname === PathName.User ? <RiUser6Fill /> : <RiUser6Line />}
                </NavLink>
            </nav>
        </div>
        
    )
}