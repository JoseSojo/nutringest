import { useModal } from "../../../../../_context/ModalContext"
import { Icono } from "../../../../../_handler/IconHandler"
import { API_STATIC } from "../../../../../entorno"
import Button from "../../../../../UI/_atom/Button"
import Image from "../../../../../UI/_atom/Image"
import Paragraph from "../../../../../UI/_atom/Paragraph"

interface Props {
    item: any
}

export default function ItemPhoto ({item}: Props) {

    const path = `${API_STATIC}${item.donwload}`;
    const modal = useModal();

    const PushModal = () => {
        modal.show(<div className="group h-96 relative bg-gray-50 rounded-lg w-[60%] m-auto">
            <div className="group-hover:opacity-80 opacity-0 duration-300 w-full h-24 bg-gray-800 absolute rounded-t-lg p-3">
                <Paragraph customClass="text-gray-300" text={`${item.date ? item.date : ``}`} />
                <Paragraph customClass="text-gray-100" text={`${item.description ? item.description : ``}`} />
            </div>
            <Image
                alt=""
                customClass="w-full h-full object-cover rounded-lg"
                path={path}
            />
            
        </div>)
    }

    return (
        <div className="group relative w-full h-32 bg-slate-200 rounded">
            <div className={`opacity-0 group-hover:opacity-75 duration-300 absolute w-full h-full bg-slate-800 rounded flex justify-center items-center`}>
                <Button
                    click={PushModal}
                    customClass="text-gray-50 flex justify-center items-center flex-col"
                >
                    <span className="text-5xl">{Icono({ico:`pluss`})}</span>
                    <span className="text-xs">{item.date ? item.date : ``}</span>
                </Button>
            </div>
            <Image
                alt=""
                customClass="w-full h-32 object-cover rounded"
                path={path}
            />
        </div>
    )
}
