import { FormEvent, useEffect, useState } from "react"
import Subtitle from "../../../../UI/_atom/Subtitle"
import { API } from "../../../../entorno";
import { REQUETS_GET_TOKEN, REQUETS_POST_TOKEN, REQUETS_PUT_TOKEN } from "../../../../utils/req/RequetsOptions";
import Button from "../../../../UI/_atom/Button";
import Text from "../../../../UI/_atom/Text";
import Input from "../../../../UI/_atom/Input";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";

interface Props {
    id: string
}

export default function AsingDetail({ id }: Props) {

    const [customDetails, setCustomDetails] = useState<{ id?: string, name: string }[] | null>(null);
    const [data, setData] = useState(``);
    // const [list, setList] = useState<{ id:string, name:string }[] | null>(null);

    const [reload, setReload] = useState(false);
    const CustomRelaod = () => setReload(!reload);

    const AddDetail = ({value}:{value:string,name:string}) => {
        setData(value);
    } 

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ExecuteAsync = async () => {
            const url = `${API}/subscription/detail/${id}/create/`;
            const req = {...REQUETS_POST_TOKEN, body:JSON.stringify({ name:data })};

            const result = await fetch(url, req);
            await result.json();

            CustomRelaod();
            setData(``);
        }
        ExecuteAsync();

    }

    const HanldeDelete = (id: string) => {
        const HandleSubmit = async () => {
            const url = `${API}/subscription/detail/${id}/delete`;
            const req = REQUETS_PUT_TOKEN;
            await fetch(url, req);
            CustomRelaod();
        }
        HandleSubmit();
    }

    useEffect(() => {
        const RequetsAsync = async () => {
            const url = `${API}/subscription/detail/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            const current: typeof customDetails = [];
            const details = json.body as any[];
            details.forEach((detail) => {
                current.push({
                    id: detail.id,
                    name: detail.name
                });
            });

            setCustomDetails(current);
        }
        RequetsAsync();
    }, [reload]);

    return (
        <div className="border py-3 px-5 mt-3 rounded">
            <Subtitle customClass="text-xl font-semi-bold mb-3" text="Asignar detalle" />

            <form onSubmit={HandleSubmit} className="grid grid-cols-[1fr_15%] gap-3">
                <Input
                    change={AddDetail}
                    customClass="input input-sm w-full border border-slate-600 text-slate-600 text-sm mb-5"
                    name="name"
                    placeholder="Describa el detalle"
                    type="text"
                    value={data}
                />
                <Button
                    ico={Icono({ ico:`create` })}
                    type="submit"
                    customClass={`${ButtonHandler({param:`create`})} btn-sm`}
                />
            </form>

            <div className="grid w-full gap-1">
                {
                    customDetails && customDetails.map((detail) => (
                        <div className="flex-1 rounded p-1 px-5 border border-slate-600 flex justify-between items-center">
                            <Text customClass="text-sm font-bold" text={`${detail.name}`} />
                            <Button
                                click={() => HanldeDelete(`${detail.id}`)}
                                ico={Icono({ico:`delete`})}
                                customClass={`${ButtonHandler({param:`delete`})} btn-sm text-xs`}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
