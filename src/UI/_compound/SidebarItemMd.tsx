import { useState } from "react";
import { Icono } from "../../_handler/IconHandler";
import { Sidebar } from "../../types/DashboardInterface";
import Button from "../_atom/Button";
import { useNavigate } from "react-router-dom";

interface Props {
    item: Sidebar
}

export default function SidebarItemMd({ item }: Props) {

    const navigate = useNavigate();
    const [active, setActive] = useState(false);

    const HandleClickDropdown = () => {
        setActive(!active);
    }

    const HandleClickPage = (path: string) => {
        navigate(path, { viewTransition:true,replace:false });
    }

    return (
        <div
            className={`flex items-center w-full h-12 px-3 mt-2 rounded relative hover:bg-slate-200 duration-300`}
        >
            {Icono({ ico: item.ico })}
            <Button
                click={() => item.path ? HandleClickPage(item.path) : HandleClickDropdown()}
                customClass="ml-2 text-sm font-medium"
                text={item.label}
            />
            {/* <div className=""></div> */}
            {
                item.chils && active && <div className={`${active ? `scale-100 top-10` : `scale-0 top-16`} px-1 py-3 grid duration-300 absolute w-full bg-gray-50 shadow top-10 z-[5] scale-x-110 left-5 rounded`}>
                    {
                        item.chils.map((child) => (
                            <Button
                                click={() => HandleClickPage(child.path)}
                                customClass="pl-3 text-sm xl:text-lg text-start font-medium flex items-center gap-4 hover:bg-slate-300 py-2"
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
