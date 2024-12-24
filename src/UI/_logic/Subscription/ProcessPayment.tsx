import { useState } from "react";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle"
import { IcoCancel, IcoReport, IcoSelect } from "../../_compound/Icons/AllIcon";
import { useModal } from "../../../_context/ModalContext";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import ReportPayment from "./ReportPayment";

interface Props {
    reload: () => void

}

export default function ProcessPayment({ reload}: Props) {

    const modal = useModal();

    const [payment, setPayment] = useState<any | null>(null);

    const HandleChange = (item: any) => {

        return (
            <Button
                click={() => setPayment(item)}
                customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
                ico={<IcoSelect size={20} />}
            />
        )
    }

    return (
        <div className="max-w-xl m-auto p-3 bg-white shadow rounded-lg grid place-items-center">
            <>
                <Subtitle customClass="text-center text-2xl font-semibold" text={`Realizar pago`} />

                {
                    payment
                        ? <>
                            <div className="w-full p-2 rounded border border-slate-400 my-2">
                                {payment.paymentReference.description}
                            </div>
                            <p className="text-xs text-gray-700 px-5">Realiza el pago a los datos mostrados en pantalla, luego reporta el pago pulsando el botón rojo "Reportar pago".</p>


                        </>
                        : <AbstractList ActionButtons={HandleChange} actions={[]} change={() => { }} crud="user/payment/my" param="" reload />
                }

                <div className="flex justify-between gap-3">
                    <Button
                        click={() => modal.hidden()}
                        ico={<IcoCancel size={20} />}
                        customClass={`${ButtonHandler({ param: `` })} btn-sm m-auto`}
                        text="Cerrar"
                    />
                    {
                        payment && <Button
                            click={() => modal.show(<ReportPayment reload={reload} />)}
                            ico={<IcoReport />}
                            customClass={`${ButtonHandler({ param: `report` })} btn-sm m-auto`}
                            text="Reportar pago"
                        />
                    }
                </div>
            </>



        </div>
    )
}
