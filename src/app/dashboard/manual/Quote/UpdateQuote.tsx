import { ChangeEvent, FormEvent, useState } from "react";
import { API } from "../../../../entorno";
import { REQUETS_PUT_TOKEN } from "../../../../utils/req/RequetsOptions";
import { useNotification } from "../../../../_context/NotificationContext";
import Button from "../../../../UI/_atom/Button";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";

interface Props {
    description: string;
    sleep: string;
    exercise: string;
    id: string
}

export default function UpdateQuote({description,exercise,id,sleep}:Props) {
    const noti = useNotification();
    const [data, setData] = useState({description,exercise,sleep});
    const clsTextarea = `min-h-20 h-24 max-h-36 input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-900 select-none`;

    const HandleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const prev = { ...data, [e.target.name]: e.target.value };
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validaciones

        const ExecuteRequets = async () => {
            const url = `${API}/quote/${id}/update`;
            const req = { ...REQUETS_PUT_TOKEN, body: JSON.stringify(data) };
            const result = await fetch(url, req);
            const json = await result.json();

            if (!result.ok || json.error) {
                noti.setMessage({ active: true, message: `Error al actualizar la cita`, type: `error` });
                return;
            }
            noti.setMessage({ active: true, message: `Cita actualizada exitosamente.`, type: `success` });
            return;
        }
        ExecuteRequets();
    }

    return (
        <form onSubmit={HandleSubmit} className="grid gap-x-3 gap-y-1 w-full">
            <div className="flex justify-end mt-3">
                <Button
                    type="submit"
                    ico={Icono({ ico: `update` })}
                    text="actualizar"
                    customClass={`${ButtonHandler({ param: `update` })} btn-sm border-none `}
                />
            </div>

            <label className="flex flex-col justify-around">
                <span className="text-sm font-semibold select-none">Descripción de la cita</span>
                <textarea
                    name="description"
                    onChange={HandleChangeInput}
                    className={clsTextarea}
                >{description}</textarea>
            </label>

            <label className="flex flex-col justify-around">
                <span className="text-sm font-semibold select-none">Recomendación de sueño/descanso</span>
                <textarea
                    name="sleep"
                    onChange={HandleChangeInput}
                    className={clsTextarea}
                >{sleep}</textarea>
            </label>

            <label className="flex flex-col justify-around">
                <span className="text-sm font-semibold select-none">Recomendación de ejercicio</span>
                <textarea
                    name="exercise"
                    onChange={HandleChangeInput}
                    className={clsTextarea}
                >{exercise}</textarea>
            </label>

        </form>
    )
}