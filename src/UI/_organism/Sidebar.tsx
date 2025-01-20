import { useEffect, useRef, useState } from "react";
import { Sidebar as SidebarTP } from "../../types/DashboardInterface";
import { API } from "../../entorno";
import { REQUETS_GET_TOKEN } from "../../utils/req/RequetsOptions";
import SidebarItem from "../_compound/SidebarItem";
import Image from "../_atom/Image";


export default function Sidebar() {

    const [slide, setSlide] = useState<SidebarTP[] | null>(null);
    const refDiv = useRef<HTMLDivElement | null>(null);

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
            <div ref={refDiv} className="hidden md:block"></div>

            {/* SIDEBAR DESTOK START */}
            <div className="w-64 flex flex-col pt-5 h-full fixed bg-gray-50 border-r border-slate-800 min-h-screen">
                <span className="flex items-center w-full px-3 mt-3 flex-col">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <Image path="/android-chrome-512x512.png" alt="" customClass="avatar" />
                        </div>
                    </div>
            
                    <span className="text-sm font-bold m-auto hidden lg:block">NUTRINGEST</span>
                    <span className="text-sm font-bold m-auto block lg:hidden">NNG</span>
                </span>
                <div className="w-full">
                    {
                        slide && slide.map(side => <SidebarItem item={side} />)
                    }

                </div>
            </div>
            {/* SIDEBAR DESTOK END */}

        </>
    );
};
