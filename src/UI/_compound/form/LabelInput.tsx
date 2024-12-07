import { CUSTOM_FILED } from "../../../types/form/CustomFormInterface";
import Input from "../../_atom/Input";

interface Props {
    field: CUSTOM_FILED,
    cls?: string; 
    change: ({ value, name }: { value: string, name: string }) => void
}

export default function LabelInput({ field, change,cls }: Props) {

    return (
        <label className={`form-control w-full ${cls ? cls : ``}`}>
            <div className="label">
                <span className="label-text font-semibold text-slate-900 drk:text-slate-300">{field.label}</span>
            </div>
            <Input
                type={field.beforeType}
                change={change}
                name={field.name}
                placeholder={field.placeholder}
                customClass="input input-sm input-bordered w-full text-slate-700 drk:text-slate-800"
            />
            <div className="label">
                {/* <span className="label-text-alt">Bottom Left label</span> */}
                <span className="label-text-alt"></span>
            </div>
        </label>
    )
}