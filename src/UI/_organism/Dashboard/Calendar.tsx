import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import AbstractList from '../../../app/dashboard/abstract/AbstractList';

import 'react-calendar/dist/Calendar.css';
import Button from '../../_atom/Button';
import ButtonHandler from '../../../_handler/ButtonsHandler';
import { Icono } from '../../../_handler/IconHandler';
import { useModal } from '../../../_context/ModalContext';
import CreateAgend from './component/CreateAgend';
import { API } from '../../../entorno';
import { REQUETS_GET_TOKEN } from '../../../utils/req/RequetsOptions';
import Input from '../../_atom/Input';
import { AbstractResponseCrud, ActionCrudInterface } from '../../../types/DashboardInterface';
import { useNotification } from '../../../_context/NotificationContext';
import ChangeStatus from './component/ChangeStatus';
import ReprogrammingAgend from './component/ReprogrammingAgend';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomCalendar({id}:{id?:string}) {
    const modal = useModal();
    const noti = useNotification();

    const [param, setParam] = useState(``);
    const [value, setValue] = useState<Value>(new Date());
    const [reload, setReload] = useState(false);
    const [reloadList, setReloadList] = useState(false);
    const [agend, setAgend] = useState<any[] | null>(null);

    const [customActions, setCustomActions] = useState<ActionCrudInterface[]>();

    const RelaodList = () => setReloadList(!reloadList);

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
    }, [])

    // const customActions: ActionCrudInterface[] = [
    //     {ico:`cancelar`,label:`Cancelar`, path:``,use:`modal`},
    //     {ico:`reprogramming`,label:`Reprogramar`, path:``,use:`modal`},
    //     {ico:`finish`,label:`Finalizar`, path:``,use:`modal`}
    // ]

    useEffect(() => {
        const FindAllForCalendar = async () => {
            const customDate = new Date();

            // let day = customDate.getDate();
            let month = customDate.getMonth()+1;
            let year = customDate.getFullYear();

            if(value instanceof Date) {
                month = value.getMonth()+1;
                year = value.getFullYear();
            }

            const url = `${API}/calendar/specify/?month=${month}&year=${year}&quote=${id ? id : ``}`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url,req);
            const json = await result.json();

            if(!result.ok) return noti.setMessage({ active:true,message:`Error temporal`,type:`error` });
            if(json.error) return noti.setMessage({ active:true,message:json.message,type:`error` });

            if(json)setAgend(json);
        }
        FindAllForCalendar();
    }, [reload,value])

    const tileContent = ({ date }: { date: Date }) => {
        if(!agend) return;
        if(!agend.find) return;
        const find = agend.find(item => item.day === date.getDate());
        const customDate = new Date();

        let month = customDate.getMonth()+1;

        if(value instanceof Date) {
            month = value.getMonth()+1;
        }

        if(find && date.getMonth()+1 === month) {
            return <span className={`bg-purple-600 duration-300 text-[0px] group-hover:bg-purple-600 rounded-[20px] px-1 text-xs absolute top-1 right-1 group-hover:text-xs text-white font-bold`}>{find._count.day}</span>;
        }

        return null;
    };

    const Cancelar = async (id: string) => {
        return modal.show(<ChangeStatus action='cancelar' id={id} reload={RelaodList} status='CANCELADO' title='Cancelar' />)
    }

    const Finish = async (id: string) => {
        return modal.show(<ChangeStatus action='finish' id={id} reload={RelaodList} status='FINALIZADO' title='Finalizar' />)
    }

    const Reprogramming = async (id: string) => {
        return modal.show(<ReprogrammingAgend reload={RelaodList} quote={id} />)
    }

    return (
        <div className='flex justify-between mt-3 gap-3'>
            <div>
                {
                    agend && <Calendar
                        className='relative'
                        calendarType='iso8601'
                        onChange={setValue}
                        defaultView={`month`}
                        onActiveStartDateChange={() => setReload(!reload)}
                        onClickDecade={() => setReload(!reload)}
                        onClickYear={() => setReload(!reload)}
                        onDrillDown={() => setReload(!reload)}
                        onDrillUp={() => setReload(!reload)}
                        onViewChange={() => setReload(!reload)}
                        onClickDay={() => setReload(!reload)}
                        onClickMonth={() => setReload(!reload)}
                        onClickWeekNumber={() => setReload(!reload)}
                        value={value}
                        tileContent={tileContent}
                        tileClassName={({ }) => {
                            let className = 'relative group ';
                            return className;
                        }}
                    />
                }
            </div>
            <div className='p-3 bg-white rounded flex-1'>
                <div className='flex justify-end'>
                    <Input change={({value}) => setParam(value)} customClass='input input-sm border-slate-300' name='param' type='text' />
                    <Button
                        click={() => modal.show(<CreateAgend reload={RelaodList} quote={id} />)}
                        ico={Icono({ ico: `create` })}
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                        text='agendar'
                    />
                </div>
                <AbstractList 
                    actions={customActions ? customActions : []} 
                    change={({action,id}) => {
                        if(action.ico === `cancelar`) Cancelar(id);
                        else if(action.ico === `reprogramming`) Reprogramming(id);
                        else if(action.ico === `finish`) Finish(id);
                    }}
                    query={`quote=${id}`} 
                    crud='calendar' 
                    param={param} 
                    reload={reloadList}
                    />
            </div>
        </div>
    )
}
