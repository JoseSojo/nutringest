import { useNavigate } from "react-router-dom";
import { Icono } from "../../_handler/IconHandler";
import Button from "../_atom/Button";
import { deleteTokenAndUser } from "../../utils/token";
import { useState } from "react";

interface Navbar {

}

export default function Navbar() {

    const navigate = useNavigate();

    const [active, setActive] = useState(false);

    return (
        <>

            <header className="w-full py-1 flex justify-end px-5 lg:px-10 bg-slate-800">
                <ul className="flex justify-center items-center gap-5">
                    <li className="relative">
                        <Button
                            click={() => setActive(!active)}
                            ico={Icono({ ico: `profile` })}
                            customClass="duration-300 text-xl p-2 rounded text-slate-50"
                        />
                        <div className={`absolute z-10 -left-24 w-[400%] rounded bg-white shadow ${active ? `scale-100` : `scale-0`}`}>
                            <ul className="grid">
                                <Button
                                    customClass="text-xs font-semibold hover:bg-gray-100 py-2 rounded-t"
                                    click={() => {
                                        navigate(`/profile`, { replace:true,viewTransition:true })
                                    }}
                                    text="Perfil"
                                />
                                <Button
                                    customClass="text-xs font-semibold hover:bg-gray-100 py-2"
                                    click={() => {
                                        navigate(`/porfolio`, { replace:true,viewTransition:true })
                                    }}
                                    text="Portafolio"
                                />
                                <Button
                                    customClass="text-xs font-semibold hover:bg-gray-100 py-2"
                                    click={() => {
                                        navigate(`/setting`, { replace:true,viewTransition:true })
                                    }}
                                    text="Configuraciones"
                                />
                                <Button
                                    customClass="text-xs font-semibold hover:bg-red-600 hover:text-white duration-300 py-2 rounded-b border border-red-600"
                                    click={() => {
                                        deleteTokenAndUser();
                                        window.location.reload();
                                    }}
                                    text="Salir"
                                />
                            </ul>
                        </div>
                    </li>
                    <Button
                        click={() => {
                            deleteTokenAndUser();
                            window.location.reload();
                        }}
                        ico={Icono({ ico: `logout` })}
                        customClass="duration-300 text-xl p-2 rounded text-red-500"
                    />
                </ul>
            </header>


        </>

    )
}
