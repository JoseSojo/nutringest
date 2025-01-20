import { useEffect, useState } from "react";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle"
import { IcoCancel, IcoSuccess } from "../../_compound/Icons/AllIcon";
import { useModal } from "../../../_context/ModalContext";
import { AbstractResponseCrud, ActionCrudInterface } from "../../../types/DashboardInterface";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN, REQUETS_PUT_TOKEN } from "../../../utils/req/RequetsOptions";
import { useNotification } from "../../../_context/NotificationContext";

interface Props {
    item: any;
    reload: () => void
}

export default function UniquePayment({ item,reload }: Props) {

    const modal = useModal();
    const noti = useNotification();

    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[] | null>(null);

    const ChangeStatus = async (status: string) => {
        const customStatus = status === `success` ? `APROBADO` : `RECHAZADO`;
        const url = `${API}/user/update/${item.id}/finance/?status=${customStatus}`;
        const req = REQUETS_PUT_TOKEN;
        const result = await fetch(url, req);
        await result.json() as AbstractResponseCrud;
        
        noti.setMessage({ active:true,message:`Estado actualizado`, type:`success` });
        reload();
        modal.hidden();
        return;
    }

    useEffect(() => {
        const ExecuteAsync = async () => {
            const url = `${API}/gui/crud/finance`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json() as AbstractResponseCrud;

            setActionsUnique(json.actionsUnique);
        }
        ExecuteAsync();
    }, []);

    return (
        <div className="max-w-xl m-auto p-3 bg-white shadow rounded-lg grid place-items-center">
            <>
                <Subtitle customClass="text-center text-2xl font-semibold" text={`Datos del pago`} />

                <ul>
                    <li>Estado: <b className="bg-yellow-200 px-3">{item.status}</b></li>
                    <li>Fecha: <b>{item.date}</b></li>
                    <li>Método: <b>{item.paymentInUser.paymentReference.name}</b></li>
                    <li>Monto: <b>{item.mount}</b></li>
                </ul>

                <div className="flex justify-between gap-3 mt-3">
                    <Button
                        click={() => modal.hidden()}
                        ico={<IcoCancel size={20} />}
                        customClass={`${ButtonHandler({ param: `` })} btn-sm m-auto`}
                        text="Cerrar"
                    />

                    {
                        item.status === `EN ESPERA` && <>
                            {
                                actionsUnique && actionsUnique.map((act) => {
                                    if(act.ico === `unique`) return <></>

                                    return (
                                        <Button
                                            click={() => {
                                                ChangeStatus(act.ico)
                                            }}
                                            ico={<IcoSuccess size={20} />}
                                            customClass={`${ButtonHandler({ param: act.ico })} btn-sm m-auto`}
                                            text={act.label}
                                        />
                                    )
                                })
                            }
                        </>

                    }

                </div>
            </>



        </div>
    )
}
