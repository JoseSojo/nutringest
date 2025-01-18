import { FormEvent, useState } from "react";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle"
import { IcoCancel, IcoReport, IcoSelect } from "../../_compound/Icons/AllIcon";
import { useModal } from "../../../_context/ModalContext";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import LabelInput from "../../_compound/form/LabelInput";
import { useNotification } from "../../../_context/NotificationContext";
import { API } from "../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../utils/req/RequetsOptions";

interface Props {
    reload: () => void
}

export default function ReportPayment({ reload }: Props) {

    const modal = useModal();
    const noti = useNotification();

    const [payment, setPayment] = useState<any | null>(null);
    const [data, setData] = useState<any>({});

    const HandleChange = (item: any) => {

        return (
            <Button
                click={() => setPayment(item)}
                customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
                ico={<IcoSelect size={20} />}
            />
        )
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteRequets = async () => {
            if (!data.date) return noti.setMessage({ active: true, message: `Debes agregar una fecha`, type: `error` });
            if (!data.mount) return noti.setMessage({ active: true, message: `Debes agregar una fecha`, type: `error` });

            const url = `${API}/user/create/finance`;
            const req = { ...REQUETS_POST_TOKEN, body: JSON.stringify({ payment: payment.id, date: data.date, mount: data.mount }) }
            const result = await fetch(url, req);
            await result.json();

            noti.setMessage({ active: true, message: `Pago reportado`, type: `success` })
            modal.hidden();
            reload();
        }
        ExecuteRequets();
    }

    const ChangeInput = ({ name, value }: { name: string, value: string }) => {
        const prev = { ...data, [name]: value };
        setData(prev);
    }

    return (
        <div className="max-w-xl m-auto p-3 bg-white shadow rounded-lg grid place-items-center">
            <>
                <Subtitle customClass="text-center text-2xl font-semibold" text={`Reportar pago`} />

                {
                    payment
                        ? <>
                            <div className="w-full p-2 rounded border border-slate-400 my-2">
                                {payment.paymentReference.description}
                            </div>
                            <p className="text-xs text-gray-700 px-5">Datos para realiar el pago a <strong>{payment.paymentReference.name}</strong></p>

                            <form onSubmit={HandleSubmit} className="w-full">

                                <LabelInput
                                    change={ChangeInput}
                                    field={{
                                        beforeType: `date`,
                                        id: `key.report.payment.date`,
                                        label: `Monto`,
                                        name: `date`,
                                        placeholder: `Monto`,
                                        required: true,
                                        type: `input`
                                    }}
                                />

                                <LabelInput
                                    change={ChangeInput}

                                    field={{
                                        beforeType: `number`,
                                        id: `key.report.payment.mount`,
                                        label: `Fecha`,
                                        name: `mount`,
                                        placeholder: `Monto`,
                                        required: true,
                                        type: `input`
                                    }}
                                />

                                <div className="flex justify-between gap-3">
                                    <Button
                                        click={() => modal.hidden()}
                                        ico={<IcoCancel size={20} />}
                                        customClass={`${ButtonHandler({ param: `` })} btn-sm m-auto`}
                                        text="Cerrar"
                                    />
                                    {
                                        payment && <Button
                                            type="submit"
                                            click={() => { }}
                                            ico={<IcoReport />}
                                            customClass={`${ButtonHandler({ param: `report` })} btn-sm m-auto`}
                                            text="Reportar pago"
                                        />
                                    }
                                </div>
                            </form>
                        </>
                        : <>
                            <AbstractList ActionButtons={HandleChange} actions={[]} change={() => { }} crud="user/payment/my" param="" reload />

                            <div className="flex justify-between gap-3">
                                <Button
                                    click={() => modal.hidden()}
                                    ico={<IcoCancel size={20} />}
                                    customClass={`${ButtonHandler({ param: `` })} btn-sm m-auto`}
                                    text="Cerrar"
                                />
                                {
                                    payment && <Button
                                        type="submit"
                                        click={() => { }}
                                        ico={<IcoReport />}
                                        customClass={`${ButtonHandler({ param: `report` })} btn-sm m-auto`}
                                        text="Reportar pago"
                                    />
                                }
                            </div>

                        </>
                }


            </>



        </div>
    )
}
