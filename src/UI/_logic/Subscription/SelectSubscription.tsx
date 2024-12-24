import { useEffect, useState } from "react";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import Button from "../../_atom/Button";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import { IcoLoad, IcoUpdate } from "../../_compound/Icons/AllIcon";
import Subtitle from "../../_atom/Subtitle";
import { useModal } from "../../../_context/ModalContext";
import AcceptCreate from "./AcceptCreate";
import ChangeCubscription from "./ChangeSubscription";

export default function SelectSubsction() {

    const modal = useModal();

    const [propietarySubscription, setPropietarySubscription] = useState<any | null>(null);
    const [load, setLoad] = useState(true);

    const HandleAction = (item: any) => {



        return <Button
            click={() => modal.show(<AcceptCreate item={item} />)}
            customClass={`px-3 py-1 rounded btn-sm text-sx ${ButtonHandler({ param: `update` })}`}
            ico={Icono({ ico: `select`, size: 15 })}
        />;
    }

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/subscription/detail/my`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            if (json.body) setPropietarySubscription(json.body);
            setLoad(false);
        }
        ExecuteAsync();
    }, [])

    return (
        <div className="grid grid-cols-1">
            <Subtitle customClass="text-2xl font-bold mb-2" text="Mi subcripción" />
            {
                load
                    ? <div className="flex">
                        <span className="loading"><IcoLoad /></span>
                    </div>
                    : propietarySubscription
                        ? <>

                            <div className="grid grid-cols-2 border p-3 rounded place-items-center">
                                <div className="col-span-2 gap-3 flex justify-between w-full px-3">
                                    <div>
                                        <Subtitle customClass="badge mb-2 px-3 border-slate-600 badge-md" text={`Estado: ${propietarySubscription.status}`} />
                                        <Subtitle customClass="badge mb-2 px-3 border-slate-600 badge-md" text={`Subcripción: ${propietarySubscription.subscriptionReference.name}`} />
                                    </div>
                                    <ul className="flex gap-3">
                                        <Button
                                            click={()=>modal.show(<ChangeCubscription />)}
                                            customClass={`${ButtonHandler({param:`update`})} btn-sm`}
                                            ico={<IcoUpdate size={20} />}
                                            text="Cambiar susbcripción"
                                        />
                                    </ul>
                                </div>
                                <div className="border-t w-full text-center">
                                    <Subtitle customClass="text-md font-bold" text={`Fecha de inicio`} />

                                    <ul>
                                        <li>Día: <b>{propietarySubscription.dayStart}</b></li>
                                        <li>Mes: <b>{propietarySubscription.monthStart}</b></li>
                                        <li>Año: <b>{propietarySubscription.yearStart}</b></li>
                                    </ul>
                                </div>
                                <div className="border-t w-full text-center">
                                    <Subtitle customClass="text-md font-bold" text={`Fecha de pago`} />
                                    <ul>
                                        <li>Día: <b>{propietarySubscription.dayEnd}</b></li>
                                        <li>Mes: <b>{propietarySubscription.monthEnd}</b></li>
                                        <li>Año: <b>{propietarySubscription.yearEnd}</b></li>
                                    </ul>
                                </div>
                            </div>

                            {
                                propietarySubscription.status === `DISACTIVE` &&
                                <AbstractList ActionButtons={HandleAction} actions={[]} change={() => { }} crud="subscription/public" param="" reload />
                            }
                        </>
                        : <>
                            <AbstractList ActionButtons={HandleAction} actions={[]} change={() => { }} crud="subscription/public" param="" reload />
                        </>
            }

        </div>
    )
}
