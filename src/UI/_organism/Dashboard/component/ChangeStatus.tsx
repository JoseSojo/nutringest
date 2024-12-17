import { FormEvent } from "react";
import { API } from "../../../../entorno";
import { REQUETS_PUT_TOKEN } from "../../../../utils/req/RequetsOptions";
import Button from "../../../_atom/Button";
import { useModal } from "../../../../_context/ModalContext";
import { Icono } from "../../../../_handler/IconHandler";

interface Props {
    title: string;
    reload: () => void;
    id: string;
    status: string;
    action: string
}

export default function ChangeStatus ({reload,id,status,title,action}:Props) {
    
    const modal = useModal();

    const ChangeStatus = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteAsnync = async () => {
            const url = `${API}/calendar/${id}/status/${status}`;
            const req = {...REQUETS_PUT_TOKEN};
            const result = await fetch(url, req);
            await result.json();
            reload();
            modal.hidden();
        }
        ExecuteAsnync();
    }

    return (
        <div className="w-full h-full grid place-items-center justify-center items-center">
            <div className="relative z-50 flex justify-center items-center w-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <form onSubmit={ChangeStatus} className="relative p-4 text-center bg-white rounded-lg shadow drk:bg-gray-800 sm:p-5">
                        <Button click={() => modal.hidden()} type="button" customClass="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center drk:hover:bg-gray-600 drk:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Button>
                        
                        <div className="flex justify-center w-full mb-3">
                            <span className="text-6xl m-auto text-slate-500">
                                {Icono({ ico:action })}
                            </span>
                        </div>
                        
                        <p className="mb-4 text-gray-500">Seguro que desea {title} el registro?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <Button click={() => modal.hidden()} type="button" customClass="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 drk:bg-gray-700 drk:text-gray-300 drk:border-gray-500 drk:hover:text-white drk:hover:bg-gray-600 drk:focus:ring-gray-600">
                                NO
                            </Button>
                            <Button type="submit" customClass="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 drk:bg-red-500 drk:hover:bg-red-600 drk:focus:ring-red-900">
                                SÍ
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
