import { useEffect, useState } from "react";
import { AbstractResponseCrud, ActionCrudInterface } from "../../../types/DashboardInterface";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import { useModal } from "../../../_context/ModalContext";
import ChangeStatus from "./component/ChangeStatus";
import ReprogrammingAgend from "./component/ReprogrammingAgend";
import Input from "../../_atom/Input";
import Button from "../../_atom/Button";
import CreateAgend from "./component/CreateAgend";
import { Icono } from "../../../_handler/IconHandler";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import Subtitle from "../../_atom/Subtitle";

export default function AgendRelease() {
    const modal = useModal();

    const [customActions, setCustomActions] = useState<ActionCrudInterface[]>();
    const [reloadList, setReloadList] = useState(false);
    const [param, setParam] = useState(``);

    const RelaodList = () => setReloadList(!reloadList);

    const Cancelar = async (id: string) => {
        return modal.show(<ChangeStatus action='cancelar' id={id} reload={RelaodList} status='CANCELADO' title='Cancelar' />)
    }

    const Finish = async (id: string) => {
        return modal.show(<ChangeStatus action='finish' id={id} reload={RelaodList} status='FINALIZADO' title='Finalizar' />)
    }

    const Reprogramming = async (id: string) => {
        return modal.show(<ReprogrammingAgend reload={RelaodList} quote={id} />)
    }

    useEffect(() => {
        const ExecuteAsync = async () => {
            const url = `${API}/gui/crud/calendar`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json() as AbstractResponseCrud;

            console.log(json);

            setCustomActions(json.actionsUnique);
        }
        ExecuteAsync();
    }, []);



    return (
        <div className='p-3 bg-white rounded flex-1 mt-3'>
            <div className='flex justify-between'>
                <Subtitle customClass="text-2xl font-bold" text="Citas Pasadas" />
                <div>
                    <Input change={({ value }) => setParam(value)} customClass='input input-sm border-slate-300' name='param' type='text' />
                    <Button
                        click={() => modal.show(<CreateAgend reload={RelaodList} />)}
                        ico={Icono({ ico: `create` })}
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                        text='agendar'
                    />
                </div>
            </div>
            <AbstractList
                actions={customActions ? customActions : []}
                change={({ action, id }) => {
                    if (action.ico === `cancelar`) Cancelar(id);
                    else if (action.ico === `reprogramming`) Reprogramming(id);
                    else if (action.ico === `finish`) Finish(id);
                }}
                crud='calendar/release'
                param={param}
                reload={reloadList}
            />
        </div>
    )
}
