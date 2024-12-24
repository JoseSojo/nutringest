import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle";
import { useModal } from "../../../_context/ModalContext";
import AcceptCreate from "./AcceptCreate";
import Paragraph from "../../_atom/Paragraph";

export default function ChangeCubscription() {

    const modal = useModal();

    const HandleAction = (item: any) => {



        return <Button
            click={() => modal.show(<AcceptCreate item={item} />)}
            customClass={`px-3 py-1 rounded btn-sm text-sx ${ButtonHandler({ param: `update` })}`}
            ico={Icono({ ico: `select`, size: 15 })}
        />;
    }

    return (
        <div className="grid grid-cols-1 bg-white p-5 rounded">
            <Subtitle customClass="text-2xl font-bold mb-2" text="Cambiar susbcripción" />
            <Paragraph customClass="text-sm text-gray-600" text="Al cabiar la subscripción el cambio se aplicará al renovar la subscripción" />

            <AbstractList ActionButtons={HandleAction} actions={[]} change={() => { }} crud="subscription/public" param="" reload />

        </div>
    )
}
