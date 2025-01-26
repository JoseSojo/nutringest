import { ChangeEvent, useState } from "react"

interface Props {
    cols: string,
    label: string,
    change: ({ value, name }: { value: string, name: string }) => void,
    name: string,
    col?: boolean,
    getName?: boolean,
    value?: string
}


export default function InputRangeDefPatient({ cols, label, change, col, name, getName, value }: Props) {

    const [customValue, setCustomValue] = useState<number>(value ? Number(value) : 0); // Inicia el valor en 50 por defecto

    const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomValue(+e.target.value);
    };

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        change({ value: e.target.value, name: getName ? name : label });
    }

    return (
        // <div className={`${cols}`}>
        <label className={`${cols} rounded relative ${col ? `flex flex-col` : `input input-sm input-bordered grid grid-cols-[auto_1fr_auto] items-center gap-2`}`}>
            <span className="text-gray-600 text-sm font-bold">{label}:</span>
            <input
                onChange={(e) => {
                    if(Number(e.target.value) > 100 || Number(e.target.value) < 0) return;
                    handleChangeInternal(e);
                    HandleChange(e);
                }}
                className="flex-1 grow h-[30px] bg-transparent outline-none"
                name="range_1"
                type="range"
                min="0"
                max="100"
                defaultValue="6465"
                value={customValue}
            />
            <span className={`text-gray-600 text-sm font-bold`}>{customValue}%</span>
        </label>
        // </div>
    )
}
