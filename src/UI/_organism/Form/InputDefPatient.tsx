import { ChangeEvent } from "react"

interface Props {
    cols: string,
    label: string,
    type: string,
    change: ({value,name}:{value:string,name:string}) => void,
    name: string,
    placeholder?: string,
    col?: boolean,
    getName?: boolean,
    value?: string
}

export default function InputDefPatient({ cols, label, type, change,placeholder,col,name,getName,value }: Props) {

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        change({ value:e.target.value, name:getName?name:label });
    }  

    return (
        // <div className={`${cols}`}>
            <label className={`${cols} rounded relative ${col ? `flex flex-col` : `input input-sm input-bordered grid grid-cols-[auto_1fr] items-center gap-2`}`}>
                <span className="text-gray-600 text-sm font-bold">{label}</span>
                <input value={value} onChange={HandleChange} type={type} className={`w-full grow ${col ? `input input-sm input-bordered` : ``}`} placeholder={placeholder ? placeholder : ``} />
            </label>
        // </div>
    )
}
