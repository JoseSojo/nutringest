import { useState } from "react";
import Button from "../UI/_atom/Button";
import ButtonHandler from "../_handler/ButtonsHandler";
import { Icono } from "../_handler/IconHandler";
import { IcoLoad } from "../UI/_compound/Icons/AllIcon";

interface Props {
    type: string,
    text: `Crear` | `Actualizar` | `Eliminar` | `Enviar`
}

export default function useFormStatus ({ type,text }: Props) {

    const [load, setLoad] = useState(false);

    const StartLoad = () => setLoad(true);
    const EndLoad = () => setLoad(false);

    const ButtonSubmit = () => {

        return <Button
            type="submit"
            customClass={`${ButtonHandler({ param:type })} btn-sm gap-3`}
        >
            {
                load 
                ? <>
                    {IcoLoad({ size:24 })}
                    Enviando
                </>
                : <>
                    {Icono({ ico:type, size:20 })}
                    {text}                    
                </>
            }
        </Button>
    }

    return {
        ButtonSubmit,
        StartLoad,
        EndLoad,
        load
    }
}
