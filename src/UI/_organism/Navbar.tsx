import { useNavigate } from "react-router-dom";
import { Icono } from "../../_handler/IconHandler";
import Button from "../_atom/Button";
import { deleteTokenAndUser } from "../../utils/token";
import { useEffect, useState } from "react";
import { API } from "../../entorno";
import { REQUETS_GET_TOKEN } from "../../utils/req/RequetsOptions";

interface Navbar {

}

export default function Navbar() {

    const navigate = useNavigate();

    const [active, setActive] = useState(false);
    const [tasaChange, setTasaChange] = useState<number | null>(null);
    const [propietarySubscription, setPropietarySubscription] = useState<any | null>(null);


    useEffect(() => {
        const ExecuteAsync = async () => {
            const url = `${API}/subscription/detail/my`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            if (json.body) setPropietarySubscription(json.body);
        }
        ExecuteAsync();
    }, [])

    useEffect(() => {
        const ExecuteAsync = async () => {
            const url = `https://pydolarve.org/api/v1/dollar`;
            const result = await fetch(url);
            const json = await result.json();
            if(result.ok) {
                const tasa = json.monitors.bcv.price;
                setTasaChange(Number(tasa));
            }
        }
        ExecuteAsync();
    }, [])


    return (
        <>

            <header className="w-full py-1 flex justify-between items-center px-5 lg:pr-10 bg-slate-800">
                <div>
                    {
                        propietarySubscription &&
                        <i 
                            className={`
                                badge bg-transparent 
                                ${propietarySubscription.status === `FREE_TRIAL` && `border-yellow-600 text-yellow-600`}
                                ${propietarySubscription.status === `ACTIVO` && `border-emerald-600 text-emerald-600`}
                                ${propietarySubscription.status === `DISACTIVE` && `border-red-600 text-red-600`}
                            `}
                        >
                            "{propietarySubscription.status}"
                        </i>
                    }
                    {
                        tasaChange &&
                        <i 
                            className={`
                                mx-2
                                badge bg-transparent
                                text-gray-50
                            `}
                        >
                            cambio {tasaChange} bs
                        </i>
                    }
                </div>
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
