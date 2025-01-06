import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle";

interface Props {
    label: string,
    valueChange: () => void;
}

export default function CardInformation ({label,valueChange}:Props) {

    return (
        <div className="w-full p-3 shadow flex justify-center items-center flex-col rounded-md border duration-300">
            <Subtitle customClass="text-lg font-bold text-gray-700 duration-200" text={label} />
            <Button
                click={valueChange}
                customClass="btn btn-sm bg-slate-700 hover:bg-slate-900 text-slate-50"
                text="Ver más"
            />
        </div>
    )
} 
