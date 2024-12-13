import { ReactNode } from "react"
import Sidebar from "../_organism/Sidebar"
import Navbar from "../_organism/Navbar"

interface Props {
    children: ReactNode
}

export default function DashboardTemplate({ children }: Props) {

    return (
        <div
            className="flex overflow-x-hidden w-screen min-h-screen"
        >
            <Sidebar />

            <div className="w-full min-h-screen flex flex-col">
                <Navbar />

                <div className="p-3 h-full">
                    <div className="bg-white drk:bg-slate-950 shadow p-3 h-full">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    )
}
