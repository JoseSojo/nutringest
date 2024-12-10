import { useState } from "react";
import { Icono } from "../../_handler/IconHandler";
import { Sidebar } from "../../types/DashboardInterface";
import Button from "../_atom/Button";
import { useNavigate } from "react-router-dom";

interface Props {
    item: Sidebar
}

export default function SidebarItem({ item }: Props) {

    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    const HandleClickDropdown = () => {
        setActive(!active);
    }

    const HandleClickPage = (path: string) => {
        navigate(path);
    }

    return (
        <div
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:text-gray-950 drk:hover:text-gray-50 text hover:bg-emerald-500 relative`}
        >
            {Icono({ ico: item.ico })}
            <Button
                click={() => item.path ? HandleClickPage(item.path) : HandleClickDropdown()}
                customClass="ml-2 text-sm font-medium"
                text={item.label}
            />
            {
                item.chils && active && <div className={`${active ? `scale-100 top-10` : `scale-0 top-16`} py-3 grid duration-300 absolute w-full bg-gray-50 drk:bg-slate-700 shadow top-10 z-[5] scale-x-110 left-5 rounded`}>
                    {
                        item.chils.map((child) => (
                            <Button
                                click={() => HandleClickPage(child.path)}
                                customClass="ml-2 text-sm text-start mt-3 font-medium flex items-center gap-4"
                                text={child.label}
                                ico={Icono({ ico:child.ico })}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}
