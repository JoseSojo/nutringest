import { useEffect, useState } from "react";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import Subtitle from "../../_atom/Subtitle";
import Input from "../../_atom/Input";
import Button from "../../_atom/Button";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import { useNotification } from "../../../_context/NotificationContext";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";

export default function SectionCoupon() {

    const noti = useNotification();
    const [param, setParam] = useState(``);
    const [code, setCode] = useState(``);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/coupon/code`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            setCode(json.code);
        }
        ExecuteRequets();
    }, [])

    return (
        <div className="mt-3 p-2 rounded bg-white grid grid-cols-1 gap-3">
            <div className="flex justify-between">
                <Subtitle customClass="text-2xl font-bold" text="Cupones" />
                <div className="flex gap-3 justify-center">
                    <Input change={({ value }) => setParam(value)} customClass='input input-sm border-slate-300' name='param' type='text' />
                    <Button
                        click={async () => {
                            await navigator.clipboard.writeText(code);
                            noti.setMessage({ active:true,message:`Copiado`,type:"success" })
                        }}
                        ico={Icono({ ico: `copy` })}
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                        text={`${code}`}
                    />
                </div>
            </div>
            <AbstractList actions={[]} change={({ }) => { }} crud="coupon" param={param} reload />
        </div>
    )
}
