import { FormEvent, useRef } from "react"
import ButtonHandler from "../../../../_handler/ButtonsHandler"
import Button from "../../../_atom/Button"
import { API } from "../../../../entorno"
import { REQUETS_PUT_TOKEN } from "../../../../utils/req/RequetsOptions"
import { useModal } from "../../../../_context/ModalContext"
import Subtitle from "../../../_atom/Subtitle"

interface Props {
    quote?: string;
    reload: () => void;
}

export default function ReprogrammingAgend ({ quote, reload }: Props) {
    const modal = useModal();
    const dateRef = useRef<HTMLInputElement | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!dateRef.current) return;

        const date = dateRef.current.value.split(`T`)[0];
        const hours = dateRef.current.value.split(`T`)[1];

        const arrayDate = date.split(`-`);

        const CustomData = {
            day: arrayDate[2],
            monthNumber: arrayDate[1],
            hours: hours,
            year: arrayDate[0],
        }

        const ExecuteRequets = async () => {
            const url = `${API}/calendar/${quote}/reprogramming`;
            const req = {...REQUETS_PUT_TOKEN, body:JSON.stringify(CustomData)};
            const result = await fetch(url, req);
            await result.json();
            reload();
            modal.hidden();
        }
        ExecuteRequets();
    }

    return (
        <form onSubmit={HandleSubmit} className="gap-3 w-full lg:w-[50%] m-auto min-h-64 bg-white rounded-md py-3 px-5 flex flex-col justify-center items-center">
            <Subtitle customClass="text-2xl font-black text-slate-800" text="Reprogramar agenda" />
            <label className="text-sm font-bold">Fecha y hora:</label>
            <input ref={dateRef} type="datetime-local" className="input input-sm w-full border border-slate-300 outline-none p-3" />
            {/* <label className="text-sm font-bold">Descripción:</label> */}
            {/* <textarea ref={descriptionRef} className="max-h-64 min-h-44 inpur border border-slate-300 w-full outline-none p-3"></textarea> */}
            <Button
                type="submit"
                customClass={`${ButtonHandler({param:`update`})} btn-sm border-none`}
                text="Reprogramar"
            />
        </form>
    )
}
