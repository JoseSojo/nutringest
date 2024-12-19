import { useEffect, useState } from "react";
import { Sidebar as SidebarTP } from "../../types/DashboardInterface";
import { API } from "../../entorno";
import { REQUETS_GET_TOKEN } from "../../utils/req/RequetsOptions";
import SidebarItem from "../_compound/SidebarItem";


export default function Sidebar() {

    const [slide, setSlide] = useState<SidebarTP[] | null>(null);

    useEffect(() => {
        const ExecuteAsync = async () => {
            const url = `${API}/gui/dashboard/sidebar`;
            const req = REQUETS_GET_TOKEN;

            const resul = await fetch(url, req);
            const json = await resul.json() as { sidebar: SidebarTP[] };

            setSlide(json.sidebar);

        }
        ExecuteAsync();
    }, []);

    return (
        <>

            <div className="hidden lg:block"></div>

            <div className="hidden lg:flex flex-col pt-5 w-52 h-full fixed bg-gray-50 border-r border-slate-800 min-h-screen">
                <span className="flex items-center w-full px-3 mt-3">
                    <span className="text-sm font-bold m-auto">NUTRINGEST</span>
                </span>
                <div className="w-full">
                    {
                        slide && slide.map(side => <SidebarItem item={side} />)
                    }

                </div>
            </div>

        </>
    );
};
