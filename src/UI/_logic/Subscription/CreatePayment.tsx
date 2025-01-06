import { FormEvent, useRef, useState } from "react"
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { IcoCancel, IcoCreate, IcoPayment, IcoSelect } from "../../_compound/Icons/AllIcon";
import { useNotification } from "../../../_context/NotificationContext";
import { API } from "../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../utils/req/RequetsOptions";
import { useModal } from "../../../_context/ModalContext";


interface Props {
    item: any;
    reload: () => void
}

export default function CreatePayment({ reload }: Props) {
    const noti = useNotification();
    const modal = useModal();

    const [payment, setPayment] = useState<any | null>(null);
    const refDescription = useRef<HTMLTextAreaElement | null>(null);

    const HandleAction = (item: any) => {

        return <Button
            customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
            click={() => setPayment(item)}
            text=""
            ico={<IcoSelect size={20} str={1.80} />}
        />;
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteRequets = async () => {
            if (!refDescription.current) return noti.setMessage({ active: true, message: `Desbes completar la descripción`, type: "error" });
            if (!payment) return noti.setMessage({ active: true, message: `Desbes un método de pago`, type: "error" });
    
            const url = `${API}/user/create/payment`;
            const req = { ...REQUETS_POST_TOKEN, body: JSON.stringify({ payment: payment.id,description:refDescription.current?.value }) };
            alert(url);
            const result = await fetch(url, req);
            const json = await result.json();

            if (!result.ok || json.error) return noti.setMessage({ active: true, message: `Hubo un error.`, type: "error" });
            modal.hidden();
            reload();
            return noti.setMessage({ active: true, message: `Método creado exitosamente.`, type: "success" });
        }
        ExecuteRequets();
    }

    return (
        <div className="max-w-2xl m-auto p-3 bg-white shadow rounded-lg">
            {
                payment
                    ? <form onSubmit={HandleSubmit} className="">
                        <Subtitle customClass="text-2xl font-bold text-center" text={`Método de pago`} />
                        <Subtitle customClass="text-xl font-bold text-center" text={`${payment.name}`} />

                        <label className="mt-3 font-semibold text-lg">Sus datos</label>
                        <textarea ref={refDescription} className="input w-full border border-gray-300 min-h-24 max-h-52" placeholder="Describa los datos de su método de pago (correo, cédula, teléfono)"></textarea>
                        <p className="text-xs text-start font-light text-gray-600">Describa los datos de su método de pago (correo, cédula, teléfono)</p>

                        <div className="flex justify-gap-3 justify-center items-center mt-4 gap-4">
                            <Button
                                click={()=>modal.hidden()}
                                type="button"
                                customClass={`${ButtonHandler({ param: `report` })} btn-sm `}
                                ico={<IcoCancel size={19} />}
                                text="cancelar"
                            />
                            <Button
                                click={()=>setPayment(null)}
                                type="button"
                                customClass={`${ButtonHandler({ param: `list` })} btn-sm `}
                                ico={<IcoPayment size={19} />}
                                text="métodos"
                            />
                            <Button
                                type="submit"
                                customClass={`${ButtonHandler({ param: `create` })} btn-sm `}
                                ico={<IcoCreate size={19} />}
                                text="crear"
                            />
                        </div>
                    </form>
                    : <>
                        <Subtitle customClass="text-xl font-bold text-center" text="Crear Método de Pago" />
                        <AbstractList ActionButtons={HandleAction} actions={[]} change={() => { }} crud="user/payment/all" param="" reload />

                    </>
            }
        </div>
    )
}
