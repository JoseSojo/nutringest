import { useEffect, useState } from "react";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import AbstractList from "../../../app/dashboard/abstract/AbstractList"
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle"
import { IcoSelect } from "../../_compound/Icons/AllIcon";
import { useModal } from "../../../_context/ModalContext";
import ProcessSubscription from "./ProcessSubscription";

interface Props {
    item: any
}

export default function AcceptCreate({ item }: Props) {

    const modal = useModal();

    const [paymentMethod, setPaymentMethod] = useState<any | null>(null);
    const [coupons, setCoupons] = useState<any[] | null>(null);
    const [queryIgnore, setQueryIgnore] = useState<string>(``);
    const [restore, setRestore] = useState(0);
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(``);

    const HandleClick = (item: any) => {
        const prev = coupons ? coupons : [];
        const ignore = queryIgnore + `&ignore=${item.id}`;

        prev.push(item);

        setCoupons(null);
        setCoupons(prev);

        setQueryIgnore(``);
        setQueryIgnore(ignore);
        setRestore(restore + Number(item.mount));
    }

    const HandleAction = (item: any) => {

        return <Button
            customClass={`${ButtonHandler({ param: `update` })} btn-xs`}
            click={() => {
                setPaymentMethod(item);
            }}
            text=""
            ico={<IcoSelect size={16} str={1.80} />}
        />;
    }

    const HandleCoupon = (item: any) => {

        return <Button
            customClass={`${ButtonHandler({ param: `update` })} btn-xs`}
            click={() => HandleClick(item)}
            text=""
            ico={<IcoSelect size={16} str={1.80} />}
        />;
    }

    useEffect(() => {
        setReload(!reload);
    }, [queryIgnore])

    const HandleProcess = () => {
        if (!paymentMethod) return setError(`Debes seleccionar un método de pago`);

        modal.show(
            <ProcessSubscription
                item={item}
                mount={(Number(item.defaultMount) * Number(item.countMonth)) - Number(restore)}
                paymentId={paymentMethod.paymentReference.id}
            />

        );
    }

    return (
        <div className="max-w-xl m-auto p-3 bg-white shadow rounded-lg grid place-items-center">
            <Subtitle customClass="text-center text-lg font-semibold" text={`Subscripción seleccionada: ${item.name}`} />
            <u>
                <li className="grid grid-cols-2 gap-3 list-none">Meses aviles de la subscripción: <b>{item.countMonth}</b></li>
                <li className="grid grid-cols-2 gap-3 list-none">Valor por mes: <b>{item.defaultMount} $</b></li>
                <li className="grid grid-cols-2 gap-3 list-none">Total a pagar: <b>{(item.defaultMount * item.countMonth) - restore} $</b></li>
                <li className="grid grid-cols-2 gap-3 list-none"><i className="text-sm mt-2">(cupones {restore} $)</i></li>
            </u>

            {
                paymentMethod
                    ? <>
                        <p className="text-lg text-center mt-3">Método de pago: <b>{paymentMethod.paymentReference.name}</b></p>
                    </>
                    : <>
                        {error && <p className="text-sm badge badge-error text-white font-bold text-center mt-3">{error}</p>}
                        <Subtitle customClass="" text="Mis métodos de pago" />
                        <AbstractList ActionButtons={HandleAction} actions={[]} change={() => { }} crud="user/payment/my" param="" reload />
                    </>
            }

            {
                coupons && coupons.length > 0 &&
                <div className="flex justify-center items-center flex-wrap gap-3">
                    <i className="badge badge-neutral badge-sm text-xs py-3 font-bold border-slate-500">(cupones {restore} $)</i>
                    {coupons.map(cp => (<Button customClass="badge badge-xs py-3 text-xs font-bold border-slate-500">{cp.description}</Button>))}
                </div>
            }

            <Subtitle customClass="" text="Mis cupones" />
            <AbstractList
                query={`?${queryIgnore}`}
                ActionButtons={HandleCoupon}
                min
                actions={[]}
                change={({ }) => { }}
                crud="coupon"
                param={``}
                reload={reload}
            />

            <Button
                click={HandleProcess}
                customClass={`${ButtonHandler({ param: `update` })} btn-sm m-auto`}
                text="Ver datos"
            />

        </div>
    )
}
