import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../entorno";
import { REQUETS_GET_TOKEN } from "../../utils/req/RequetsOptions";
import Subtitle from "../_atom/Subtitle";

export default function FichaPaciente() {
    const { id } = useParams() as { id: string };

    const [user, setUser] = useState<any | null>(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const ExecuteRequets = async () => {
            setLoad(true);
            const url = `${API}/patient/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();
            console.log(json.body.body.data);
            setUser(json.body.body.data);
            setLoad(false);
        }
        ExecuteRequets();
    }, [])

    return (
        <div>
            {
                load
                    ? <div className="flex py-5 justify-center items-center">
                        <i className="loading loading-spinner"></i>
                    </div>
                    : <div className="max-w-xl bg-white shadow py-5 px-3 m-auto rounded-lg">
                        {
                            user
                                ? <>
                                    <Subtitle customClass="text-2xl text-center font-bold text-gray-700" text={`${user.name ? user.name : `(Sin nombre)`} ${user.lastname ? user.lastname : `(Sin apellido)`}`} />
                                    <ul className="grid gap-2">
                                        <li className="grid border-b px-5 grid-cols-[35%_1fr]">Usuario: <b>{user.username ? user.username : `Sin definir`}</b></li>
                                        <li className="grid border-b px-5 grid-cols-[35%_1fr]">Correo: <b>{user.email ? user.email : `Sin definir`}</b></li>
                                        <li className="grid border-b px-5 grid-cols-[35%_1fr]">Teléfono: <b>{user.phone ? user.phone : `Sin definir`}</b></li>
                                        <li className="grid border-b px-5 grid-cols-[35%_1fr]">Edad: <b>{user.age ? user.age : `Sin definir`}</b></li>
                                        <li className="grid border-b px-5 grid-cols-[35%_1fr]">Creado él: <b>{user.createAt ? user.createAt : `Sin definir`}</b></li>
                                        <li className="grid border-b px-5 grid-cols-[35%_1fr]">Última actualización: <b>{user.updateAt ? user.updateAt : `Sin definir`}</b></li>
                                    </ul>
                                </>
                                : <div>
                                    <Subtitle customClass="text-2xl text-center font-bold text-gray-700" text={`No se encontró el paciente`} />
                                </div>
                        }
                    </div>
            }
        </div>
    )
}
