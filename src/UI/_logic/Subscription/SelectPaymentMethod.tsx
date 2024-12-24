import ButtonHandler from "../../../_handler/ButtonsHandler";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import Button from "../../_atom/Button";
import { IcoCreate } from "../../_compound/Icons/AllIcon";
import Subtitle from "../../_atom/Subtitle";
import { useModal } from "../../../_context/ModalContext";
import CreatePayment from "./CreatePayment";

export default function SelectPaymentMethod() {

    const modal = useModal();

    return (
        <div className="grid grid-cols-1 mt-3">
            <div className="flex justify-between">
                <Subtitle customClass="text-2xl font-bold mb-2" text="Mís Métodos de pago" />

                <ul className="flex gap-3">
                    <Button
                        click={()=>modal.show(<CreatePayment item={{}} />)}
                        ico={<IcoCreate size={20} str={1.75} />}
                        text="agregar"
                        customClass={`${ButtonHandler({param:`create`})} btn-sm`}
                    />
                </ul>
            </div>
            <AbstractList actions={[]} change={() => { }} crud="user/payment/my" param="" reload />
        </div>
    )
}
