import { FormEvent, useRef } from "react"
import ButtonHandler from "../../../../_handler/ButtonsHandler"
import Button from "../../../_atom/Button"
import { API } from "../../../../entorno"
import { REQUETS_POST_TOKEN } from "../../../../utils/req/RequetsOptions"
import { useModal } from "../../../../_context/ModalContext"

interface Props {
    quote?: string;
    reload: () => void
}

export default function CreateAgend ({ quote, reload }: Props) {
    const modal = useModal();
    const dateRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!dateRef.current) return;
        if(!descriptionRef.current) return;

        const date = dateRef.current.value.split(`T`)[0];
        const hours = dateRef.current.value.split(`T`)[1];

        const arrayDate = date.split(`-`);


        const CustomData = {
            day: arrayDate[2],
            monthNumber: arrayDate[1],
            hours: hours,
            year: arrayDate[0],
            description: descriptionRef.current.value,
            quote: quote ? quote : undefined
        }

        const ExecuteRequets = async () => {
            const url = `${API}/calendar/create`;
            const req = {...REQUETS_POST_TOKEN, body:JSON.stringify(CustomData)};
            const result = await fetch(url, req);
            await result.json();
            reload();
            modal.hidden();
        }
        ExecuteRequets();
    }

    return (
        <form onSubmit={HandleSubmit} className="gap-3 w-full lg:w-[50%] m-auto min-h-64 bg-white rounded-md py-3 px-5 flex flex-col justify-center items-center">
            <label className="text-sm font-bold">Fecha y hora:</label>
            <input ref={dateRef} type="datetime-local" className="input input-sm w-full border border-slate-300 outline-none p-3" />
            <label className="text-sm font-bold">Descripción:</label>
            <textarea ref={descriptionRef} className="max-h-64 min-h-44 inpur border border-slate-300 w-full outline-none p-3"></textarea>
            <Button
                type="submit"
                customClass={`${ButtonHandler({param:`create`})} btn-sm border-none`}
                text="Agendar"
            />
        </form>
    )
}
