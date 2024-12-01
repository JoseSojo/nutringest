import { FormEvent, useState } from "react"
import Title from "../../../../UI/_atom/Title";
import { useNavigate } from "react-router-dom";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import LabelInput from "../../../../UI/_compound/form/LabelInput";
import CustomSelect from "../../../../UI/_compound/form/CustomSelect";
import Button from "../../../../UI/_atom/Button";
import Text from "../../../../UI/_atom/Text";
import { useNotification } from "../../../../_context/NotificationContext";
import { API } from "../../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../../utils/req/RequetsOptions";

export default function CreateExchange() {

    const noti = useNotification();
    const navigate = useNavigate();

    const [data, setData] = useState<{ name?: string, unity?: { id: string, label: string }, ration?: string | number } | null>(null);

    const [customFood, setCustomFood] = useState<{ unity?: { id: string, label: string }, food?: { id: string, label: string }, ration?: string | number } | null>(null);
    const [foodSelect, setFoodSelect] = useState<{ unity?: { id: string, label: string }, food: { id: string, label: string }, ration?: string | number }[] | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!data) return noti.setMessage({ active:true,message:`Debes completar los datos`,type:`error` });
        if(!foodSelect || foodSelect.length === 0) return noti.setMessage({ active:true,message:`Debes agregar almenos un alimento`,type:`error` });

        const customData: any = {
            name: data.name,
            unity: data.unity ? data.unity : null,
            ration: data.ration ? data.ration : null,
            foods: foodSelect
        }

        const ExecuteRequets = async () => {
            const url = `${API}/exchange/create`;
            const req = {...REQUETS_POST_TOKEN, body:JSON.stringify(customData)}
            const result = await fetch(url, req);
            const json = await result.json();
            
            if(!result.ok || json.error) {
                noti.setMessage({ active:true,message:`Oops. hubo un error`,type:`error` });
                return;
            }

            noti.setMessage({ active:true,message:json.message,type:`success` });
            navigate(`/dashboard/exchange`);
            return;
        }
        ExecuteRequets();
    }

    const SetCustomFood = ({ value, label }: { value: string, label: string }) => {
        const prev = { ...customFood, food: { id: value, label } };
        setCustomFood(prev);

    }

    const SetCustomUnity = ({ value, label }: { value: string, label: string }) => {
        const prev = { ...customFood, unity: { id: value, label } };
        setCustomFood(prev);
    }

    const SetCustomFoodByInput = ({ value }: { name: string, value: string }) => {
        const prev = { ...customFood, ration: value };
        setCustomFood(prev);
    }

    const SetDataByInput = ({ name, value }: { name: string, value: string }) => {
        const newData = { ...data, [name]: value };
        setData(newData);
    }

    const SetDataBySeletc = ({ value, label }: { value: string, label: string }) => {
        const newData = { ...data, unity: { id: value, label } };
        setData(newData);
    }

    const AddFood = () => {
        if (!customFood) return noti.setMessage({ active: true, message: `Debes completar los campos`, type: `error` });
        if (!customFood.food) return noti.setMessage({ active: true, message: `Debes seleccionar un alimento`, type: `error` });
        // if(!customFood.ration) return noti.setMessage({ active:true,message:`Debes agregar la cantidad de ración`,type:`error` }); 
        // if(!customFood.unity) return noti.setMessage({ active:true,message:`Debes seleccionar la unidad de medida`,type:`error` }); 

        const prev = foodSelect ? foodSelect : [];

        prev.push({ food: customFood.food, ration: customFood.ration, unity: customFood.unity });
        setFoodSelect(prev);

        setCustomFood(null);
    }

    const RemoveFoodSelect = (index: number) => {
        if(!foodSelect) return;
        const prev = foodSelect.filter((_, i) => i !== index);;
        setFoodSelect(prev);
    }

    return (
        <div className="w-full">
            <header className="flex items-center justify-between">
                <Title customClass="text-2xl font-black" text="Crear lista de intercambio" />
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
                    <Button
                        type="submit"
                        customClass={`${ButtonHandler({param:`create`})} btn-sm border-none`}
                        ico={Icono({ ico:`create` })}
                        text="Crear"
                    />
                </div>

                <LabelInput
                    change={SetDataByInput}
                    field={{
                        beforeType: "text",
                        type: `input`,
                        name: `name`,
                        id: `input`,
                        label: `Nombre`,
                        placeholder: ``,
                        required: false,
                        value: data ? data.name : ``
                    }}
                />
                <LabelInput
                    change={SetDataByInput}
                    field={{
                        beforeType: "text",
                        type: `input`,
                        name: `ration`,
                        id: `input`,
                        label: `Ración`,
                        placeholder: ``,
                        required: false,
                        value: data ? data.name : ``
                    }}
                />
                <CustomSelect
                    label={data ? data.unity ? data.unity.label : `` : ``}
                    change={SetDataBySeletc}
                    field={{
                        label: `Unidad de medida`,
                        select: {
                            active: true,
                            in: `unity`
                        },
                    }}
                />

                <Text customClass="divider divider-success text-success lg:col-span-3" text={`Seleccionar alimentos`} />

                <CustomSelect
                    label={customFood ? customFood.food ? customFood.food.label : `` : ``}
                    change={SetCustomFood}
                    field={{
                        label: `Alimentos`,
                        select: {
                            active: true,
                            in: `primitive`
                        },
                    }}
                />
                <LabelInput
                    change={SetCustomFoodByInput}
                    field={{
                        beforeType: "text",
                        type: `input`,
                        name: `ration`,
                        id: `input`,
                        label: `Ración`,
                        placeholder: ``,
                        required: false,
                        value: customFood ? customFood.ration?.toString() : ``
                    }}
                />
                <div className="grid grid-cols-[75%_25%] gap-3 place-items-center pb-4">
                    <CustomSelect
                        label={customFood ? customFood.unity ? customFood.unity.label : `` : ``}
                        change={SetCustomUnity}
                        field={{
                            label: `Unidad de medida`,
                            select: {
                                active: true,
                                in: `unity`
                            },
                        }}
                    />
                    <Button
                        click={AddFood}
                        customClass="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white mt-auto mb-2"
                        text="Agregar"
                    />
                </div>

                <div className="col-span-3 grid grid-cols-3  gap-3">
                    {
                        foodSelect && foodSelect.map((item, i) => (
                            <div className="flex-1 rounded p-1 border flex justify-between items-center">
                                <Text customClass="text-sm font-bold" text={`${item.food.label} - ${item.ration ? item.ration : ``} ${item.unity ? item.unity.label : ``}`} />
                                <Button
                                    click={()=>RemoveFoodSelect(i)}
                                    customClass="btn btn-xs btn-error text-white"
                                    ico={Icono({ ico:`delete` })}
                                />
                            </div>
                        ))
                    }
                </div>

            </form>

        </div>
    )
}
