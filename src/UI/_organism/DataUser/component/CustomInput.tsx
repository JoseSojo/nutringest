import { ChangeEvent } from "react";

interface Props {
    cols: string;
    value: string,
    name: string,
    label: string,
    type: string,
    change: (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export default function CustomInput ({change,name,value,label,type,cols}:Props) {
    return (
        <label className={`flex flex-col justify-around col-span-${cols}`}>
            <span className="text-sm font-semibold select-none">{label}</span>
                <input 
                    placeholder={value}
                    onChange={change} 
                    name={name} 
                    type={type} 
                    className="input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-700 select-none" 
                />
            </label>
    )
}
