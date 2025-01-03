import { FormEvent, useState } from "react";
import { Icono } from "../../../_handler/IconHandler";
import useCustomForm from "../../../_hooks/useCustomForm";
import { CRUDS } from "../../../types/GlobalInterface";
import Subtitle from "../../../UI/_atom/Subtitle";
import Button from "../../../UI/_atom/Button";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import HandleInput from "../../../UI/_compound/HandleInput";
import Paragraph from "../../../UI/_atom/Paragraph";
import { useNotification } from "../../../_context/NotificationContext";
import { useModal } from "../../../_context/ModalContext";
import { API } from "../../../entorno";
import { REQUETS_PUT_TOKEN } from "../../../utils/req/RequetsOptions";

interface Props {
    crud: CRUDS;
    reload: () => void;
    id: string
}

export default function AbstractUpdate({ crud, reload, id }: Props) {

    const noti = useNotification();
    const modal = useModal();

    const [load, setLoad] = useState(false);
    const [data, setData] = useState<any>({});

    const { form } = useCustomForm({ name: crud, auth: true, action: `update`, id });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteAsync = async () => {

            setLoad(true);
            const url = `${API}/${crud}/${id}/update`;
            const req = {  ...REQUETS_PUT_TOKEN, body:JSON.stringify(data) };
            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok) {
                noti.setMessage({ active:true,message:`Error al crear`, type:`success` });
                setLoad(false);
                return;
            }

            noti.setMessage({ active:true,message:json.message, type:`success` });
            modal.hidden();
            setData({});
            setLoad(false);
            reload();
        }
        ExecuteAsync();

    }

    const HandleChange = ({ value, name }: { value: string, name: string }) => {
        const prev = {...data, [name]:value};
        setData(prev);
    }

    return (
        <div className="border w-full py-10 flex flex-col justify-center items-center bg-slate-50 drk:bg-slate-950 p-3 rounded text-slate-950 drk:text-slate-50">
            <form onSubmit={HandleSubmit} className="w-full">
                {

                    form
                        ? <>
                            <div className="flex justify-between items-center w-full">
                                <Subtitle customClass="text-xl font-black" text={form.name} />
                                <ul className="flex justify-end">
                                    <li>
                                        <Button
                                            type="submit"
                                            customClass={`${ButtonHandler({ param: `update` })} btn-sm border-none`}
                                            ico={Icono({ ico: `update` })}
                                            text={ load ? `Cargando...` : `Actualizar` }
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                                {
                                    form.fields.map((field) => <HandleInput field={field} change={HandleChange} />)
                                }
                            </div>
                        </>
                        : <>
                           <Paragraph customClass="text-center text-md font-mono text-slate-800 drk:text-slate-400" text="No hay formulario" /> 
                        </>

                }
            </form>
        </div>
    )
}
