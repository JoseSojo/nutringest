import { useEffect, useState } from "react";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle"
import { IcoCancel, IcoReport } from "../../_compound/Icons/AllIcon";
import { useModal } from "../../../_context/ModalContext";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN, REQUETS_POST_TOKEN } from "../../../utils/req/RequetsOptions";
import ReportPayment from "./ReportPayment";
import { useNotification } from "../../../_context/NotificationContext";

interface Props {
    paymentId: string;
    mount: number;
    item: any
}

export default function ProcessSubscription({ paymentId, mount, item }: Props) {

    const modal = useModal();
    const noti = useNotification();

    const [payment, setPayment] = useState<any | null>(null);

    const ChangeSubscription = () => {
        const ExecuteAssync = async () => {
            const url = `${API}/subscription/detail/change/${item.id}`;
            alert(url);
            const req = {...REQUETS_POST_TOKEN};
            const result = await fetch(url, req);
            const json = await result.json();
            if(!result.ok) {
                noti.setMessage({ active:true,message:`Error al cambiar la subscripción`, type:`error` });
                return;
            }

            noti.setMessage({ active:true,message:json.message, type:`error` });

        }
        ExecuteAssync();
    }

    useEffect(() => {

        const ExecuteRequets = async () => {
            const url = `${API}/payment/${paymentId}/unique/public`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();
            setPayment(null);
            setPayment(json.body);
        };
        ExecuteRequets();
    }, [])

    return (
        <div className="max-w-xl m-auto p-3 bg-white shadow rounded-lg grid place-items-center">
            {
                payment
                    ? <>
                        <Subtitle customClass="text-center text-lg font-semibold" text={`Realizar pago`} />

                        <div className="w-full p-2 rounded border border-slate-400 my-2">
                            {payment.description}
                        </div>
                        <p className="text-xs text-gray-700 px-5">Realiza el pago a los datos mostrados en pantalla, luego reporta el pago pulsando el botón rojo "Reportar pago".</p>

                        {
                            mount &&
                            <div className="w-full p-2 rounded border border-slate-400 my-2">
                                {mount}
                            </div>
                        }

                        <div className="flex justify-between gap-3">
                            <Button
                                click={() => modal.hidden()}
                                ico={<IcoCancel size={20} />}
                                customClass={`${ButtonHandler({ param: `` })} btn-sm m-auto`}
                                text="Cerrar"
                            />
                            <Button
                                click={() => {

                                    ChangeSubscription();
                                    modal.show(<ReportPayment reload={()=>{}} />)
                                    return;
                                }}
                                ico={<IcoReport />}
                                customClass={`${ButtonHandler({ param: `report` })} btn-sm m-auto`}
                                text="Reportar pago"
                            />
                        </div>
                    </>
                    : <i className="loading-spinner"></i>

            }

        </div>
    )
}
