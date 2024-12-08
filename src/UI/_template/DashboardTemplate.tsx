import { ReactNode } from "react"
import Sidebar from "../_organism/Sidebar"
import Navbar from "../_organism/Navbar"

interface Props {
    children: ReactNode
}

export default function DashboardTemplate({ children }: Props) {

    return (
        <div
            className="flex overflow-x-hidden w-screen h-auto bg-slate-200 text-gray-900 dark:bg-slate-800 dark:text-gray-50 min-h-screen"
        >
            <Sidebar />

            <div className="w-full min-h-screen flex flex-col">
                <Navbar />

                <div className="p-3 h-full w-[98%]">
                    <div className="bg-slate-50 dark:bg-slate-950 shadow p-3 rounded h-full">
                        {children}
                    </div>
                </div>

            </div>

        </div>
    )
}
