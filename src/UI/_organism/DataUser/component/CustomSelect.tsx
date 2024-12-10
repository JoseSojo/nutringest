

import { useEffect, useState } from "react";
import { getToken } from "../../../../utils/token";
import { API } from "../../../../entorno";
import Button from "../../../_atom/Button";
import Input from "../../../_atom/Input";

interface Props {
    filter?: string;
    select: string;
    label: string;
    change: ({ value, label, name }: { value: string, label: string, name: string }) => void;
    initSelect?: { id: string, label: string } | null,
}

export default function CustomSelect({ select, change, label, filter, initSelect }: Props) {

    const [list, setList] = useState<{ id: string, label: string }[] | null>(null)
    const [load, setLoad] = useState(true);
    const [active, setActive] = useState(false);
    const [param, setParam] = useState(``);

    const [customSelect, setCustomSelect] = useState<{ id: string, label: string } | null>(null);

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/select/${select}/?param=${param ? param : ``}${filter ? `&${filter}` : ``}`;
            const req = { method: `GET`, headers: { token: `${getToken()}` } };
            const restul = await fetch(url, req);

            const json = await restul.json() as { id: string, label: string }[];
            setList(json);
            setLoad(false);
        }
        ExecuteAsync();
    }, [param]);

    return (
        <label className="w-full relative col-span-4">
            <div className="label">
                <span className="label-text font-semibold text-slate-900 drk:text-slate-100">{label}</span>
            </div>
            <Button
                click={() => setActive(!active)}
                type="button"
                customClass="w-full input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-700 select-none"
            >
                {
                    customSelect ? customSelect.label : initSelect && initSelect.label
                }
            </Button>

            {
                active &&
                <div className="absolute grid w-full min-h-20 max-h-36 z-10 rounded-b-xl p-1 top-16 border overflow-y-auto bg-slate-50 drk:bg-slate-700 text-slate-90">
                    <Input
                        change={({ value }: { name: string, value: string }) => setParam(value)}
                        customClass="input input-sm border border-gray-800 text-gray-800 drk:text-gray-600"
                        type="text"
                        name="param"
                    />
                    {
                        load
                            ? <>cargando</>
                            : list
                                ? <>{
                                    list.map((item) => (
                                        <Button
                                            click={() => {
                                                change({ value: item.id, label: item.label, name: select });
                                                setCustomSelect(item);
                                                setActive(false);
                                            }}
                                            customClass="text-xs py-1"
                                            text={`${item.label}`}
                                        />
                                    ))
                                }</>
                                : <>no hay registros</>

                    }
                </div>
            }
        </label>
    )
}