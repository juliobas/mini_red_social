import { Outlet } from "@remix-run/react"
import Navbar from "~/components/Navbar";

export default function Layout() {
    return(
        <main className="grid grid-rows-layout min-h-dvh">
            <Outlet />
            <Navbar />
        </main>
    )
}