import { useEffect, useState } from "react";
import { API } from "../../../../../entorno";
import { AbstractResponseListCrud } from "../../../../../types/DashboardInterface";
import { REQUETS_GET_TOKEN } from "../../../../../utils/req/RequetsOptions";
import Button from "../../../../../UI/_atom/Button";
import ItemPhoto from "./ItemPhoto";

interface Props {
    quote: string; // ID
    reload: boolean;
}

export default function PaginateQuote({ quote, reload }: Props) {
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
            const url = `${API}/quote/photo/?skip=${skip}&quote=${quote}`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json() as AbstractResponseListCrud;

            setList(json.body.list);
            setNow(json.body.now);
            setNext(json.body.next);
            setPreviw(json.body.previw);
            setLoad(false);
            return;
            setTake(take);
        }
        ExecuteAsync();
    }, [reload, skip]);

    return (
        <div className="h-full">
            {
                load
                    ? <div className="py-5 w-full flex justify-center items-center ">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                    : <div className="flex flex-col justify-between h-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {
                                list && list.map(item => <ItemPhoto item={item} />)
                            }
                        </div>
                        <div className="flex w-full justify-end">
                            <ul className="flex bg-gray-50 shadow p-1 rounded cursor-default">
                                <li>
                                    <Button
                                        click={() => { if (previw) setSkip(skip - take) }}
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
                                        click={() => { if (next) setSkip(skip + take) }}
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
            }
        </div>
    );
}

