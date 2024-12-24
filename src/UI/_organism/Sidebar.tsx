import { useEffect, useRef, useState } from "react";
import { Sidebar as SidebarTP } from "../../types/DashboardInterface";
import { API } from "../../entorno";
import { REQUETS_GET_TOKEN } from "../../utils/req/RequetsOptions";
import SidebarItem from "../_compound/SidebarItem";


export default function Sidebar() {

    const [slide, setSlide] = useState<SidebarTP[] | null>(null);
    const refDiv = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Función para actualizar el ancho
        const updateWidth = () => {
            if (refDiv.current) {
                setWidth(refDiv.current.offsetWidth);
            }
        };

        // Ejecutar la función de actualización al montar el componente
        updateWidth();

        // Escuchar el evento de resize para actualizar el ancho si cambia el tamaño de la ventana
        window.addEventListener('resize', updateWidth);

        // Limpiar el efecto eliminando el event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

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
            <div style={{ width: width }} className="hidden md:flex flex-col pt-5 h-full fixed bg-gray-50 border-r border-slate-800 min-h-screen">
                <span className="flex items-center w-full px-3 mt-3">
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
