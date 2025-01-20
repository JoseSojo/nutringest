import { ReactNode } from "react"
import Sidebar from "../_organism/Sidebar"
import Navbar from "../_organism/Navbar"

interface Props {
    children: ReactNode
}

export default function DashboardTemplate({ children }: Props) {

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="w-full min-h-screen flex flex-col">
                    <Navbar />

                    <div className="h-full w-full p-4">
                        <div className="bg-white drk:bg-slate-950 shadow p-3 h-full w-full">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    )
}
