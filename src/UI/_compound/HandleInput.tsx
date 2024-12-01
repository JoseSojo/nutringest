import { CUSTOM_FILED } from "../../types/form/CustomFormInterface";
import LabelInput from "./form/LabelInput";
import LabelSelect from "./form/LabelSelect";

interface Props {
    field: CUSTOM_FILED,
    change: ({value, name}:{ value:string, name: string }) => void
}

export default function HandleInput({ field,change }: Props) {

    const customType = field.type;

    if (customType === "select") {
        return (
            <LabelSelect change={change} field={field} />
        );
    } else if (customType === "check") {
        return (
            <>
                check aquí
            </>
        );
    } else if (customType === "textarea") {
        return (
            <>
                textarea aquí
            </>
        );
    }
    return <LabelInput change={change} field={field} />

}
