import { useEffect, useState } from "react";
import { AbstractResponseListCrud, ActionCrudInterface } from "../../../types/DashboardInterface";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import ExtractValue from "../../../utils/ExtractValue";
import Button from "../../../UI/_atom/Button";

interface Props {
    crud: string;
    reload: boolean;
    actions: ActionCrudInterface[];
    change: ({ action, id,type }: { action: ActionCrudInterface, id: string,type?:string }) => void;
    param: string,
    min?:boolean,
    query?: string
}

export default function AbstractList({ crud, actions, reload, change,param,min,query }: Props) {
    const [header, setHeader] = useState<string[] | null>(null);
    const [extractBy, setExtractBy] = useState<string[] | null>(null);
    const [list, setList] = useState<any[] | null>(null);
    const [now, setNow] = useState<string | null>(null);
    const [next, setNext] = useState(false);
    const [previw, setPreviw] = useState(false);

    const [load, setLoad] = useState(true);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(10);

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/${crud}/?skip=${skip}&param=${param}${query ? `&${query}` : ``}`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json() as AbstractResponseListCrud;

            setHeader(!min ? json.body.header : json.body.headerMin);
            setExtractBy(!min ? json.body.extrat : json.body.extratMin);
            setList(json.body.list);
            setNow(json.body.now);
            setNext(json.body.next);
            setPreviw(json.body.previw);
            setLoad(false);
            return;
            setTake(take);
        }
        ExecuteAsync();
    }, [reload,skip,param]);

    return (
        <div className="w-full mt-3">
            <table className="table table-xs">
                {/* head */}
                <thead>
                    <tr className="bg-slate-200 drk:bg-slate-800 text-slate-900 drk:text-slate-300">
                        {  actions && <th></th> }
                        {
                            header && header.map((h) => <th>{h}</th>)
                        }
                    </tr>
                </thead>
                {
                    load
                        ? <div className="py-5 w-full flex justify-center items-center ">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                        : <tbody>
                            {
                                list && list.map(item => (
                                    <tr>
                                        {
                                            actions && <td className="">
                                                <select
                                                    onChange={(e) => {
                                                        const vl = Number(e.target.value) as number;
                                                        
                                                        change({ action: actions[vl], id: item.id })
                                                    }}
                                                    className="py-1 px-2 outline-none rounded-lg h-full text-xs font-black bg-emerald-500 hover:bg-emerald-600 drk:bg-emerald-800 drk:hover:bg-emerald-900 text-white">

                                                    <option className="bg-slate-100 drk:bg-slate-900">...</option>
                                                    {
                                                        actions.map((ac, i) => (
                                                            <option value={i} className="bg-slate-100 text-gray-400 drk:bg-slate-900 drk:text-gray-500">
                                                                {/* {Icono({ ico: ac.ico })} */}
                                                                {ac.label}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                        }
                                        {
                                            extractBy && extractBy.map(ex => (
                                                <td className="text-gray-400">
                                                    <ExtractValue extractBy={ex} item={item} />
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                }

            </table>
            <div className="flex w-full justify-end">
                <ul className="flex bg-gray-50 shadow p-1 rounded cursor-default">
                    <li>
                        <Button
                            click={() => {if(previw)setSkip(skip-take)}}
                            customClass={`
                                ${previw ? `hover:bg-slate-300 drk:hover:bg-slate-800` : `cursor-not-allowed`}
                                font-bold text-sm px-4 py-2 bg-slate-200 text-slate-900 drk:bg-slate-900 drk:text-slate-200 h-full rounded-l-lg
                            `}
                            text={`<<`}
                        />
                    </li>
                    <li>
                        <Button
                            customClass="cursor-default font-bold text-sm px-3 py-2 bg-slate-200 text-slate-900 drk:bg-slate-900 drk:text-slate-200 h-full"
                            text={`${now}`}
                        />
                    </li>
                    <li>
                        <Button
                            click={() => {if(next)setSkip(skip+take)}}
                            customClass={`
                                ${next ? `hover:bg-slate-300 drk:hover:bg-slate-800` : `cursor-not-allowed`}
                                font-bold text-sm px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 drk:bg-slate-900 drk:hover:bg-slate-800 drk:text-slate-200 h-full rounded-r-lg
                            `}
                            text={`>>`}
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}
