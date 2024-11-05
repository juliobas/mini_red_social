import { Outlet } from "@remix-run/react"
import Navbar from "~/components/Navbar";

export default function Layout() {
    return(
        <main className="grid grid-rows-layout min-h-dvh center-full mx-auto w-full max-w-[400px] md:border-[1px] md:border-gray-low md:px-[40px] md:max-w-[480px] md:rounded-2xl md:min-h-[700px]">
            <Outlet />
            <div className="h-[75px]"></div> // Espacio abajo
            <Navbar />
        </main>
    )
}