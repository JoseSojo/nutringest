import { useEffect, useState } from "react";
import { CUSTOM_FILED } from "../../../types/form/CustomFormInterface";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import Button from "../../_atom/Button";
import Text from "../../_atom/Text";
import Input from "../../_atom/Input";

interface Props {
    field: CUSTOM_FILED,
    change: ({ value, name }: { value: string, name: string }) => void
}

export default function LabelSelect({ field, change }: Props) {

    const [list, setList] = useState<{ id: string, label: string }[] | null>(null)
    const [load, setLoad] = useState(true);
    const [active, setActive] = useState(false);
    const [param, setParam] = useState(``);

    const [customSelect, setCustomSelect] = useState<{ id: string, label: string } | null>(null)

    const AddSelect = ({ id, label }: { id: string, label: string }) => {
        change({ name: field.name, value: id });
        setCustomSelect({ id,label });
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
                <span className="label-text font-semibold text-slate-900 drk:text-slate-300">{field.label}</span>
            </div>
            <Button
                click={() => setActive(!active)}
                type="button"
                customClass="input input-bordered w-full text-slate-300 drk:text-slate-800 flex gap-3 flex-wrap"
            >
                {
                    customSelect && <Text customClass="text-center m-auto" text={customSelect.label} />
                }
            </Button>
            {
                active &&
                <div className="absolute grid w-full h-44 rounded-b-xl p-1 top-20 border overflow-y-auto bg-slate-50 drk:bg-slate-950 text-slate-900 drk:text-slate-300">
                    <Input
                        change={({value}:{name:string,value:string}) => setParam(value)}
                        customClass="input text-gray-800 drk:text-gray-600"
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
                                                customClass="w-full border-b text-xs font-black py-2 hover:bg-slate-200 drk:hover:bg-slate-800"
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