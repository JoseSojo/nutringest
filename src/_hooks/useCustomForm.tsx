import { useEffect, useState } from "react";
import { CUSTOM_TYPE, FORM } from "../types/form/CustomFormInterface";
import { REQUETS_GET, REQUETS_GET_TOKEN } from "../utils/req/RequetsOptions";
import { API } from "../entorno";

interface Props {
    name: CUSTOM_TYPE;
    auth?: boolean;
    action: `create` | `update` | `delete`;
    id?: string
}

/**
 * Busca los datos para crear un formulario
 * 
 * @param QUE FORMULARIO BUSCAR (user,country,x,y,z)
 * @returns DATOS DEL FORMULARIO O UN ERROR
 */
export default function useCustomForm ({name,auth,action,id}:Props) {

    const [form, setForm] = useState<FORM | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/gui/form/${name}/${action}/${id ? id : ``}`;
            const req = auth ? REQUETS_GET_TOKEN : REQUETS_GET;
            const resutl = await fetch(url, req);
            const json = await resutl.json() as FORM;

            if(!resutl.ok) {
                setError(`Error en formulario`);
                return;
            }

            setForm(json);  
        }
        Execute();
    }, []);

    return {form,error};
}
