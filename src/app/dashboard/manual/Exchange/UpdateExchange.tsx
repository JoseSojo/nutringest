import { FormEvent, ReactNode, useEffect, useState } from "react"
import Title from "../../../../UI/_atom/Title";
import { useNavigate, useParams } from "react-router-dom";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import LabelInput from "../../../../UI/_compound/form/LabelInput";
import Button from "../../../../UI/_atom/Button";
import Text from "../../../../UI/_atom/Text";
import { useNotification } from "../../../../_context/NotificationContext";
import { API } from "../../../../entorno";
import { REQUETS_GET_TOKEN, REQUETS_PUT_TOKEN } from "../../../../utils/req/RequetsOptions";
import Subtitle from "../../../../UI/_atom/Subtitle";
import Input from "../../../../UI/_atom/Input";
import AbstractList from "../../abstract/AbstractList";
import useFormStatus from "../../../../_hooks/useFormStatus";

export default function UpdateExchange() {

    const { id } = useParams() as { id: string };
    const [param, setParam] = useState(``);
    const [data, setData] = useState<{ name?: string, unity?: { id: string, label: string }, ration?: string | number } | null>(null);
    const { ButtonSubmit,EndLoad,StartLoad } = useFormStatus({ text:`Actualizar`,type:`update` });

    const noti = useNotification();
    const navigate = useNavigate();
    const [reload] = useState(false);

    const [foodSelect, setFoodSelect] = useState<{ 
        id?: string,
        food: { id: string, label: string }
    }[] | null>(null);

    const [foodDelete, setFoodDelete] = useState<{ 
        id: string,
        food: { id: string, label: string }
    }[] | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data) return noti.setMessage({ active: true, message: `Debes completar los datos`, type: `error` });
        if (!foodSelect || foodSelect.length === 0) return noti.setMessage({ active: true, message: `Debes agregar almenos un alimento`, type: `error` });

        const customData: any = {
            name: data.name,
            unity: null,
            ration: null,
            foods: foodSelect,
            delete: foodDelete
        }

        const ExecuteRequets = async () => {
            const url = `${API}/exchange/${id}/update`;
            const req = { ...REQUETS_PUT_TOKEN, body: JSON.stringify(customData) }
            StartLoad();
                const result = await fetch(url, req);
            const json = await result.json();

            if (!result.ok || json.error) {
                if(result.status === 403) {
                    noti.setMessage({ active: true, message: json.message, type: `error` });
                    EndLoad();
                    return;
                }
                noti.setMessage({ active: true, message: `Oops. hubo un error`, type: `error` });
                EndLoad();
                return;
            }

            noti.setMessage({ active: true, message: json.message, type: `success` });
            navigate(`/dashboard/exchange`);
                EndLoad();
                return;
        }
        ExecuteRequets();
    }

    const SetDataByInput = ({ name, value }: { name: string, value: string }) => {
        const newData = { ...data, [name]: value };
        setData(newData);
    }

    const AddFood = ({name,value,id}:{ name: string, value: string,id?:string }) => {
        const prev = foodSelect && foodSelect.length > 0 ? foodSelect : [];
        prev.push({ id,food:{id:value,label:name} });
        setFoodSelect([]);
        const customValue = prev;
        setFoodSelect(customValue);
        ReloadFoodSelect();
    }

    function AddFoodList (item: any): ReactNode {
        return (
            <Button 
                click={() => AddFood({ name:item.name,value:item.id })}
                customClass={`${ButtonHandler({ param:`update` })} btn-sm text-xs`} 
                text="agregar"
                />
        )
    }

    const ReloadFoodSelect = () => {
        if (!foodSelect) return;
        const prev = foodSelect.filter((_, i) => i !== -1);
        setFoodSelect(prev);
    }

    const RemoveFoodSelect = (index: number) => {
        if (!foodSelect) return;
        const prevDelete = foodDelete ? foodDelete : [] as any[];
        prevDelete.push(foodSelect[index]);
        setFoodDelete(prevDelete);
        const prev = foodSelect.filter((_, i) => i !== index);
        setFoodSelect(prev);
    }

    useEffect(() => {
        const RequetsAsync = async () => {
            const url = `${API}/exchange/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            const currenData = {
                name: json.body.name,
                ration: Number(json.body.ration),
                unity: json.body.unityReference ? { id: json.body.unityReference.id, label: json.body.unityReference.name } : undefined
            };

            const currentFood: typeof foodSelect = [];
            const foods = json.body.foods as any[];
            foods.forEach((food) => {
                currentFood.push({
                    id:food.id,
                    food: { id: food.foodReference.id, label: food.foodReference.name }
                })
            })

            setData(currenData);
            setFoodSelect(currentFood);

        }
        RequetsAsync();
    }, [reload]);

    return (
        <div className="w-full">
            <header className="flex items-center justify-between">
                <Title customClass="text-2xl font-black" text={`Actualizar ${data?.name}`} />
                <ul className="flex gap-3 mt-3">
                    <li>
                        <Button
                            click={() => navigate(`/dashboard/exchange`)}
                            ico={Icono({ ico: `list` })}
                            customClass={`${ButtonHandler({ param: `list` })} btn btn-sm border-none`}
                            text="Lista"
                        />
                    </li>
                </ul>
            </header>

            <form onSubmit={HandleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                <div className="col-span-3 flex justify-end mt-3">
                    <ButtonSubmit />
                </div>

                <LabelInput
                    change={SetDataByInput}
                    field={{
                        beforeType: "text",
                        type: `input`,
                        name: `name`,
                        id: `input`,
                        label: `Nombre`,
                        placeholder: data ? data.name ? data.name  : `` : ``,
                        required: false,
                    }}
                />

                <Text customClass="divider divider-success text-success lg:col-span-3" text={`Seleccionar alimentos`} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-3 gap-3">
                    {
                        foodSelect && foodSelect.map((item, i) => (
                            <div className="rounded p-1 border flex justify-between items-center">
                                <Text customClass="text-sm font-bold" text={`${item.food.label}`} />
                                
                                <Button
                                    click={() => RemoveFoodSelect(i)}
                                    customClass="btn btn-xs btn-error text-white"
                                    ico={Icono({ ico: `delete` })}
                                />
                            </div>
                        ))
                    }
                </div> 

                <div className="col-span-3">
                    <div className="flex justify-between">
                        <Subtitle customClass="text-2xl font-bold" text="Alimentos" />
                        <div className="flex gap-3 justify-center">
                            <Input change={({ value }) => setParam(value)} customClass='input input-sm border-slate-300' name='param' type='text' />
                        </div>
                    </div>
                    <AbstractList ActionButtons={AddFoodList} actions={[]} change={({ }) => { }} crud="primitive/exchange" param={param} reload />
                </div>
            </form >

        </div >
    )
}
