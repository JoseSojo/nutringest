import { FormEvent, useState } from "react";
import useCustomForm from "../../../_hooks/useCustomForm";
import { CRUDS } from "../../../types/GlobalInterface";
import Subtitle from "../../../UI/_atom/Subtitle";
import HandleInput from "../../../UI/_compound/HandleInput";
import { API } from "../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../utils/req/RequetsOptions";
import { useNotification } from "../../../_context/NotificationContext";
import { useModal } from "../../../_context/ModalContext";
import useFormStatus from "../../../_hooks/useFormStatus";

interface Props {
    crud: CRUDS;
    reload: () => void;
}

export default function AbstractCreate({ crud, reload }: Props) {

    const noti = useNotification();
    const modal = useModal();

    // const [error, setError] = useState<ErrorInputStruct | null>(null);
    const [data, setData] = useState<any>({});

    const { ButtonSubmit,EndLoad,StartLoad } = useFormStatus({ text:`Crear`,type:`create` });
    const { form } = useCustomForm({ name: crud, auth: true, action: `create` });

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteAsync = async () => {
            // validar datos antes de enviar
            StartLoad();

            const url = `${API}/${crud}/create`;
            const req = {  ...REQUETS_POST_TOKEN, body:JSON.stringify(data) };
            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok) {
                noti.setMessage({ active:true,message:`Error al crear`, type:`success` });
                EndLoad();
                return;
            }

            noti.setMessage({ active:true,message:json.message, type:`success` });
            modal.hidden();
            setData({});
            EndLoad();
            reload();
        }
        ExecuteAsync();

    }

    const HandleChange = ({ value, name }: { value: string, name: string }) => {
        const prev = {...data, [name]:value};
        setData(prev);
    }

    return (
        <div className="w-full py-10 flex flex-col justify-center items-center bg-slate-50 drk:bg-slate-950 shadow p-3 rounded text-slate-950 drk:text-slate-50">
            <form onSubmit={HandleSubmit} className="w-full">
                {

                    form
                        ? <>
                            <div className="flex justify-between items-center w-full">
                                <Subtitle customClass="text-xl font-black" text={form.name} />
                                <ul className="flex justify-end">
                                    <li>
                                        <ButtonSubmit />
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
                            error
                        </>

                }
            </form>
        </div>
    )
}
