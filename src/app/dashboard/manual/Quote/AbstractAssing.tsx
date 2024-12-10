import { useEffect, useState } from "react";
import { useModal } from "../../../../_context/ModalContext";
import { API } from "../../../../entorno";
import AbstractList from "../../abstract/AbstractList";
import { AbstractResponseCrud, ActionCrudInterface } from "../../../../types/DashboardInterface";
import { CRUDS } from "../../../../types/GlobalInterface";
import Title from "../../../../UI/_atom/Title";
import Input from "../../../../UI/_atom/Input";
import { REQUETS_GET_TOKEN, REQUETS_POST_TOKEN } from "../../../../utils/req/RequetsOptions";
import { useNotification } from "../../../../_context/NotificationContext";

interface Props {
    crud: CRUDS;
    reload: () => void;
    reloadVl: boolean;
    id: string,
    pathGui: string
}

export default function AbstractAssing({ crud, pathGui,id,reload }: Props) {

    const customId = id;
    const noti = useNotification();
    const modal = useModal();

    const [param, setParam] = useState(``);

    const [load, setLoad] = useState(true);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[]>([
        {
            ico: `assing`,
            label: `Asignar`,
            path: `/quote/assing`,
            use: `modal`
        }
    ]);

    useEffect(() => {
        if(crud === `primitive`) {
            setActionsUnique([
                {
                    ico: `accept`,
                    label: `Aceptados`,
                    path: `/quote/assing`,
                    use: `modal`
                },
                {
                    ico: `done`,
                    label: `Opcionales`,
                    path: `/quote/assing`,
                    use: `modal`
                },
                {
                    ico: `deny`,
                    label: `No recomendados`,
                    path: `/quote/assing`,
                    use: `modal`
                }
            ]);
        }
    }, [])

    const [title, setTitle] = useState<string | null>(null);

    const CustomAssing = ({ id, action }: { action: ActionCrudInterface, id: string, type?:string }) => {
        const ExecuteRequets = async () => {
            const url = `${API}/quote/assing/${crud}/?quote=${customId}&item=${id}${crud === `primitive` ? `&type=${action.label.toUpperCase()}` : ``}`;
            const req = REQUETS_POST_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok || json.error) {
                noti.setMessage({ active:true,message:json.message ? json.message : `Error al asignar`, type:`error` });
                return;
            }

            noti.setMessage({ active:true,message:json.message ? json.message : `Operación exitosa.`, type:`success` });
            modal.hidden();
            reload();
            return;
        }
        ExecuteRequets();
    }

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/gui/crud/${pathGui}/`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json() as AbstractResponseCrud;

            // setActionsUnique(json.actionsUnique);
            setTitle(json.title);
            setLoad(false);
        }
        ExecuteAsync();
    }, [location.pathname]);

    return (
        <div className="border w-full py-10 flex flex-col justify-center items-center bg-slate-50 drk:bg-slate-950 p-3 rounded text-slate-950 drk:text-slate-50">
            <>
                {
                    load
                        ? <>cargando</>
                        : <div className="w-full">
                            {/* HEADER INICIO */}
                            <header className="flex items-center justify-between">
                                <Title customClass="text-2xl font-black" text={title ? title : ``} />
                                <ul className="flex gap-3">
                                    <li>
                                        <Input
                                            change={({ value }: { value: string, name: string }) => {
                                                setParam(value);
                                            }}
                                            customClass="border h-full rounded outline-none px-3 text-slate-500 bg-gray-50 border border-slate-600"
                                            name="param"
                                            type="text"
                                        />
                                    </li>
                                </ul>
                            </header>
                            {/* HEADER FIN */}

                            <AbstractList param={param} change={CustomAssing} reload={true} crud={crud} actions={actionsUnique} />
                        </div>
                }
            </>
        </div>
    )
}
