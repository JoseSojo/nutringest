import { FormEvent, useRef, useState } from "react";
import Subtitle from "../../../../../UI/_atom/Subtitle"
import { useNotification } from "../../../../../_context/NotificationContext";
import Button from "../../../../../UI/_atom/Button";
import ButtonHandler from "../../../../../_handler/ButtonsHandler";
import { API } from "../../../../../entorno";
import { getToken } from "../../../../../utils/token";

interface Props {
    quote: string; // ID
    reload: () => void;
}

export default function UploadPhoto({ quote, reload }: Props) {

    const noti = useNotification();
    const [load, setLoad] = useState(false);

    const fileRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteRequets = async () => {
            if(!fileRef.current) return noti.setMessage({ active:true,message:`Debes seccionar una foto`,type:`error` });
            if(!fileRef.current.files) return noti.setMessage({ active:true,message:`Debes seccionar una foto`,type:`error` });
            if(!fileRef.current.files[0]) return noti.setMessage({ active:true,message:`Debes seccionar una foto`,type:`error` });
            if(!descriptionRef.current) return noti.setMessage({ active:true,message:`Debes agregar descripción`,type:`error` });
            if(!descriptionRef.current.value) return noti.setMessage({ active:true,message:`Debes agregar descripción`,type:`error` });
            if(!dateRef.current) return noti.setMessage({ active:true,message:`Debes agregar la fecha`,type:`error` });
            if(!dateRef.current.value) return noti.setMessage({ active:true,message:`Debes agregar la fecha`,type:`error` });
            setLoad(true);

            const url = `${API}/quote/${quote}/upload/photo/`;
            const formData = new FormData();
            formData.append(`file`, fileRef.current.files[0]);
            formData.append(`description`, descriptionRef.current.value);
            formData.append(`date`, dateRef.current.value);
            const req = {
                method:`POST`,
                headers:{
                    // "Content-Type":"multipart/form-data",
                    token: `${getToken()}`
                },
                body:formData
            }
            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok || json.error) {
                setLoad(false);
                noti.setMessage({ active:true, message:`Error al cargar foto.`, type:`error` });
                return;
            }

            setLoad(false);
            noti.setMessage({ active:true, message:`Foto cargada.`, type:`success` });
            reload();
        }
        ExecuteRequets();
    } 

    return (
        <form onSubmit={HandleSubmit} className="border-r border-gray-400 pr-4">
            <Subtitle customClass="text-xl font-black mb-3" text="Registro Fotográfico" />

            <div className="mx-auto w-full">
                <label htmlFor="example1" className="block text-sm font-medium text-gray-700">
                    Foto
                </label>
                <input
                    ref={fileRef}
                    id="example1"
                    type="file"
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-400 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
            </div>

            <div className="mx-auto w-full mt-4">
                <label htmlFor="example2" className="block text-sm font-medium text-gray-700">
                    Descripción
                </label>
                <input
                    ref={descriptionRef}
                    id="example2"
                    type="text"
                    className="input input-sm border border-gray-400 w-full"
                />
            </div>

            <div className="mx-auto w-full mt-4">
                <label htmlFor="example2" className="block text-sm font-medium text-gray-700">
                    Fecha
                </label>
                <input
                    ref={dateRef}
                    id="example2"
                    type="date"
                    className="input input-sm border border-gray-400 w-full"
                />
            </div>

            <Button
                type="submit"
                customClass={`${ButtonHandler({param:`create`})} border-none btn-sm mt-3`}
            >
                {
                    load
                    ? `Cargando...`
                    : `Enviar`
                }
            </Button>
        </form>
    );
}
