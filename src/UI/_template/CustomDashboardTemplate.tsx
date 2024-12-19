import { ReactNode } from "react"
import Sidebar from "../_organism/Sidebar"
import Navbar from "../_organism/Navbar"

interface Props {
    children: ReactNode
}

export default function CustomDashboardTemplate({ children }: Props) {

    return (
        <div
            className="grid grid-cols-[15%_1fr] max-w-full min-h-screen"
        >
            <Sidebar />

            <div className="w-full min-h-screen flex flex-col">
                <Navbar />

                <div className="h-full w-full p-4">

                    <div className="p-3 h-full w-[98%]">
                        {children}
                    </div>

                </div>

            </div>
        </div>
        )
}
