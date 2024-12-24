import { ReactNode } from "react"
import Sidebar from "../_organism/Sidebar"
import Navbar from "../_organism/Navbar"

interface Props {
    children: ReactNode
}

export default function DashboardTemplate({ children }: Props) {

    return (
        <div
            className="grid md:grid-cols-[5%_1fr] lg:grid-cols-[15%_1fr] max-w-full min-h-screen"
        >
            <Sidebar />

            <div className="w-full min-h-screen flex flex-col">
                <Navbar />

                <div className="h-full w-full p-4">
                    <div className="bg-white drk:bg-slate-950 shadow p-3 h-full w-full">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    )
}
