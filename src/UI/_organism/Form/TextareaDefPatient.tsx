import { ChangeEvent } from "react"

interface Props {
    cols: string,
    label: string,
    change: ({value,name}:{value:string,name:string}) => void,
    name: string,
    placeholder?: string,
    col?: boolean,
    getName?: boolean,
    value?: string
}

export default function TextareaDefPatient({ cols, label, change, placeholder,col,getName,name,value }: Props) {

    const HandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        change({ value:e.target.value, name:getName?name:label });
    }  

    return (
        // <div className={`${cols}`}>
            <label className={`${cols} rounded relative ${col ? `flex flex-col` : `input input-sm input-bordered grid grid-cols-[auto_1fr] items-center gap-2`}`}>
                <span className="text-gray-600 text-sm font-bold">{label}:</span>
                <textarea onChange={HandleChange} className={`w-full max-h-[100px] min-h-[70px] grow ${col ? `input input-sm input-bordered` : ``}`} placeholder={placeholder ? placeholder : ``}>{value}</textarea>
            </label>
        // </div>
    )
}
