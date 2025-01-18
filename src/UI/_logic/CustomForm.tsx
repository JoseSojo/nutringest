import useCustomForm from "../../_hooks/useCustomForm";
import { CUSTOM_TYPE } from "../../types/form/CustomFormInterface";
import HandleInput from "../_compound/HandleInput";

interface Props {
    name: CUSTOM_TYPE;
    auth?: boolean;
}

export default function CustomForm({ name, auth }: Props) {

    const { form } = useCustomForm({ name, auth,action:"create" });

    const HandleChange = ({value, name}:{ value:string, name: string }) => {
        console.log(`${name}, ${value}`);
    }

    return (
        <form>
            {
                form
                    ? <>
                        {form?.name}

                        {
                            form.fields.map((field) => <HandleInput change={HandleChange} field={field} />)
                        }

                    </>
                    : <>hubo un error</>
            }
        </form>
    )
}

