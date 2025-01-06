import { useModal } from "../_context/ModalContext";
import { useState } from "react";
import Title from "../UI/_atom/Title";
import Button from "../UI/_atom/Button";
import { Icono } from "../_handler/IconHandler";
import ButtonHandler from "../_handler/ButtonsHandler";
import AbstractList from "./dashboard/abstract/AbstractList";
import ReportPayment from "../UI/_logic/Subscription/ReportPayment";
import UniquePayment from "../UI/_logic/Subscription/UniquePayment";
import { IcoSelect } from "../UI/_compound/Icons/AllIcon";
import CardWallet from "../UI/_logic/Wallet/CardWallet";

export default function Finanzas() {

    const modal = useModal();

    const [reload, setReload] = useState(false);
    const CustomRelaod = () => setReload(!reload);

    const [param] = useState(``);

    const HandleShowUnique = (item: any) => {

        return <Button
            click={() => modal.show(<UniquePayment reload={CustomRelaod} item={item} />)}
            customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
            ico={<IcoSelect />}
            text=""
        />
    }

    return (
        <>
                <CardWallet />

            <div className="p-3 bg-white rounded mt-3">
                <div className="w-full">
                    {/* HEADER INICIO */}
                    <header className="flex items-center justify-between">
                        <Title customClass="text-2xl font-black" text={`Finanzas`} />
                        <ul className="flex gap-3">
                            <li>
                                <Button
                                    click={() => modal.show(<ReportPayment reload={CustomRelaod} />)}
                                    ico={Icono({ ico: `report` })}
                                    customClass={`${ButtonHandler({ param: `report` })} btn btn-sm border-none`}
                                    text={`reportar`}
                                />
                            </li>
                        </ul>
                    </header>
                    {/* HEADER FIN */}

                    <AbstractList
                        ActionButtons={HandleShowUnique}
                        actions={[]}
                        param={param}
                        change={() => { }}
                        reload={reload}
                        crud={`user/finance`} />
                </div>
            </div>
        </>
    )
}
