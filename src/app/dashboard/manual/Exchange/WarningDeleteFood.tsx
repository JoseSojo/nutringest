import { FormEvent } from "react";
import { useModal } from "../../../../_context/ModalContext";
import { useNotification } from "../../../../_context/NotificationContext";
import { API } from "../../../../entorno";
import { getToken } from "../../../../utils/token";
import Button from "../../../../UI/_atom/Button";


interface Props {
    label: string,
    reload: () => void;
    id: string
}

export default function WarningDeleteFood({ id,reload,label }: Props) {

    const modal = useModal();
    const noti = useNotification();

    const HandleDelete = async (e: FormEvent) => {
        e.preventDefault();
        const url = `${API}/exchange/food/${id}/delete`;
        const req = { method:`PUT`,headers:{token:`${getToken()}`} };

        const result = await fetch(url, req);
        const json = await result.json();
        noti.setMessage({ active:true,message:json.message,type:json.error ? `error` : `success` });
        reload();
        modal.hidden();
    }

    return (
        <div className="w-full h-full grid place-items-center justify-center items-center">
            <div className="relative z-50 flex justify-center items-center w-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <form onSubmit={HandleDelete} className="relative p-4 text-center bg-white rounded-lg shadow drk:bg-gray-800 sm:p-5">
                        <Button click={() => modal.hidden()} type="button" customClass="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center drk:hover:bg-gray-600 drk:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Button>
                        <svg className="text-gray-400 drk:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <p className="mb-4 text-gray-500 drk:text-gray-300">{label}</p>
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
