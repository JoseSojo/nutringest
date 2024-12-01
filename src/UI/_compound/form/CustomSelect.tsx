import { useEffect, useState } from "react";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import Button from "../../_atom/Button";
import Input from "../../_atom/Input";

interface Props {
    field: {
        label: string,
        select?: {
            active: boolean,
            in: string
        }
    },
    label: string;
    change: ({ value, label }: { value: string, label: string }) => void
}

export default function CustomSelect({ field, change,label }: Props) {

    const [list, setList] = useState<{ id: string, label: string }[] | null>(null)
    const [load, setLoad] = useState(true);
    const [active, setActive] = useState(false);
    const [param, setParam] = useState(``);

    const AddSelect = (item: { id: string, label: string }) => {
        change({ label:item.label,value:item.id });
        setActive(!active);
    }

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/select/${field.select?.in}/?param=${param}`;
            const req = REQUETS_GET_TOKEN;
            const restul = await fetch(url, req);
            const json = await restul.json() as { id: string, label: string }[];
            setList(json);
            setLoad(false);
        }
        ExecuteAsync();
    }, [param])

    return (
        <label className="form-control w-full relative">
            <div className="label">
                <span className="label-text font-semibold text-slate-900 dark:text-slate-300">{field.label}</span>
            </div>
            <Button
                click={() => setActive(!active)}
                type="button"
                customClass="input input-sm input-bordered w-full text-slate-300 dark:text-slate-800 flex gap-3 flex-wrap"
            >
                {
                    label
                }
            </Button>
            {
                active &&
                <div className="absolute grid w-full h-44 z-10 rounded-b-xl p-1 top-20 border overflow-y-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300">
                    <Input
                        change={({value}:{name:string,value:string}) => setParam(value)}
                        customClass="input input-sm text-gray-800 dark:text-gray-600"
                        type="text"
                        name="param"
                    />
                    {
                        load
                            ? <>cargando</>
                            : list
                                ? <>
                                    {
                                        list.map(item => (
                                            <Button
                                                click={() => AddSelect(item)}
                                                customClass="w-full border-b text-xs font-black py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                                                text={item.label}
                                            />
                                        ))
                                    }
                                </>
                                : <>no hay registros</>

                    }
                </div>
            }
        </label>
    )
}