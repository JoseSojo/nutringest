import { ChangeEvent } from "react"

interface Props {
    cols: string,
    label: string,
    change: ({value,name}:{value:string,name:string}) => void,
    name: string,
    options: string[],
    getName?: boolean,
    value?: string
}

export default function SelectDefPatient({ cols, label, options, change,name,getName,value }: Props) {

    const HandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        change({ value:e.target.value, name:getName?name:label });
    }  

    return (
        // <div className={`${cols}`}>
            <label className={`${cols} input input-sm input-bordered grid grid-cols-[auto_1fr] items-center gap-3`}>
                <span className="text-gray-600 text-sm font-bold">{label}:</span>
                <select onChange={HandleChange} className="select select-sm border-gray-600 grow">
                    <option>{value ? value : `opciones`}</option>
                    {
                        options.map((item) => (
                            <option>{item}</option>
                        ))
                    }
                </select>
            </label>
        // </div>
    )
}
