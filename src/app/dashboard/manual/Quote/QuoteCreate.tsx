import { useNavigate } from "react-router-dom";
import Title from "../../../../UI/_atom/Title";
import Button from "../../../../UI/_atom/Button";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import CustomInput from "../../../../UI/_organism/DataUser/component/CustomInput";
import CustomSelect from "../../../../UI/_organism/DataUser/component/CustomSelect";
import { ChangeEvent, FormEvent, useState } from "react";
import { API } from "../../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../../utils/req/RequetsOptions";
import { useNotification } from "../../../../_context/NotificationContext";

export default function QuoteCreate() {
    const navigate = useNavigate();
    const noti = useNotification();

    const [data, setData] = useState<any | null>(null);

    const HandleChange = ({value}:{name:string,value:string}) => {
        const prev = {...data, patient:value};
        setData(prev);
    }

    const HandleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const prev = {...data, [e.target.name]:e.target.value};
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validaciones
        
        const ExecuteRequets = async () => {
            const url = `${API}/quote/create`;
            const req = {...REQUETS_POST_TOKEN, body:JSON.stringify(data)};
            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok || json.error) {
                noti.setMessage({ active:true,message:`Error al crear la cita`,type:`error` });
                return;
            }
            noti.setMessage({ active:true,message:`Cita creada exitosamente.`,type:`success` });
            navigate(`/dashboard/quote`, {replace:true});
            return;
        }
        ExecuteRequets();
    }

    return (
        <div className="w-full">
            <header className="flex items-center justify-between">
                <Title customClass="text-2xl font-black" text="Crear Menú" />
                <ul className="flex gap-3 mt-3">
                    <li>
                        <Button
                            click={() => navigate(`/dashboard/quote`)}
                            ico={Icono({ ico: `list` })}
                            customClass={`${ButtonHandler({ param: `list` })} btn btn-sm border-none`}
                            text="Lista"
                        />
                    </li>
                </ul>
            </header>

            <form onSubmit={HandleSubmit} className="grid grid-cols-12 gap-x-3 gap-y-1">
                <div className="flex justify-end col-span-12 mt-3">
                    <Button
                        type="submit"
                        ico={Icono({ico:`create`})}
                        text="crear cita"
                        customClass={`${ButtonHandler({param:`create`})} btn-sm border-none `}
                    />
                </div>
                <CustomSelect
                    change={HandleChange}
                    select="mypatient"
                    label="Paciente"
                />

                <CustomInput
                    cols="4"
                    change={HandleChangeInput}
                    name="weightNow"
                    label="Peso Actual"
                    type="text"
                    value=""
                />

                <CustomInput
                    cols="4"
                    change={HandleChangeInput}
                    name="weightObjective"
                    label="Peso Objectivo"
                    type="text"
                    value=""
                />

                <label className="col-span-12 flex flex-col justify-around">
                    <span className="text-sm font-semibold select-none">Descripción de la cita</span>
                    <textarea
                        onChange={HandleChangeInput}
                        className="min-h-20 h-24 max-h-36 input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-700 select-none"
                    ></textarea>
                </label>

                <label className="col-span-6 flex flex-col justify-around">
                    <span className="text-sm font-semibold select-none">Recomendación de sueño/descanso</span>
                    <textarea
                        onChange={HandleChangeInput}
                        className="min-h-20 h-24 max-h-36 input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-700 select-none"
                    ></textarea>
                </label>

                <label className="col-span-6 flex flex-col justify-around">
                    <span className="text-sm font-semibold select-none">Recomendación de ejercicio

                    </span>
                    <textarea
                        onChange={HandleChangeInput}
                        className="min-h-20 h-24 max-h-36 input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-700 select-none"
                    ></textarea>
                </label>

            </form>
        </div>
    )
}
