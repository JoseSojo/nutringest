import { FormEvent, ReactNode, useEffect, useState } from "react"
import Title from "../../../../UI/_atom/Title";
import { useNavigate, useParams } from "react-router-dom";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import LabelInput from "../../../../UI/_compound/form/LabelInput";
import CustomSelect from "../../../../UI/_compound/form/CustomSelect";
import Button from "../../../../UI/_atom/Button";
import Text from "../../../../UI/_atom/Text";
import { useNotification } from "../../../../_context/NotificationContext";
import { API } from "../../../../entorno";
import { REQUETS_GET_TOKEN, REQUETS_PUT_TOKEN } from "../../../../utils/req/RequetsOptions";
import Subtitle from "../../../../UI/_atom/Subtitle";
import Input from "../../../../UI/_atom/Input";
import AbstractList from "../../abstract/AbstractList";

export default function UpdateMenu() {

    const { id } = useParams() as { id: string };

    const noti = useNotification();
    const navigate = useNavigate();
    const [reload] = useState(false);

    const [param, setParam] = useState(``);
    const [data, setData] = useState<{ name?: string, description?: string, type?: string } | null>(null);

    const [foodSelect, setFoodSelect] = useState<{ unity?: { id: string, label: string }, food: { id: string, label: string }, quantity?: string | number }[] | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data) return noti.setMessage({ active: true, message: `Debes completar los datos.`, type: `error` });
        if (!data.description) return noti.setMessage({ active: true, message: `Debes agregar la descripción.`, type: `error` });
        if (!data.name) return noti.setMessage({ active: true, message: `Debes agregar el nombre`, type: `error` });
        if (!data.type) return noti.setMessage({ active: true, message: `Debes agregar el tipo`, type: `error` });
        if (!foodSelect || foodSelect.length === 0) return noti.setMessage({ active: true, message: `Debes agregar almenos un alimento`, type: `error` });

        const customData: any = {
            name: data.name,
            description: data.description ? data.description : null,
            type: data.type ? data.type : null,
            foods: foodSelect
        }

        const ExecuteRequets = async () => {
            const url = `${API}/menu/${id}/update`;
            const req = { ...REQUETS_PUT_TOKEN, body: JSON.stringify(customData) }
            const result = await fetch(url, req);
            const json = await result.json();

            if (!result.ok || json.error) {
                noti.setMessage({ active: true, message: `Oops. hubo un error`, type: `error` });
                return;
            }

            noti.setMessage({ active: true, message: json.message, type: `success` });
            navigate(`/dashboard/menu`);
            return;
        }
        ExecuteRequets();
    }

    const SetDataByInput = ({ name, value }: { name: string, value: string }) => {
        const newData = { ...data, [name]: value };
        setData(newData);
    }

    const SetDataBySeletc = ({ value, label }: { value: string, label: string }) => {
        const newData = { ...data, unity: { id: value, label } };
        setData(newData);
    }

    const AddFood = ({name,value}:{ name: string, value: string }) => {
        const prev = foodSelect && foodSelect.length > 0 ? foodSelect : [];
        prev.push({ food:{id:value,label:name} });
        const customValue = prev;
        setFoodSelect(customValue);
        ReloadFoodSelect();
    }

    const RemoveFoodSelect = (index: number) => {
        if (!foodSelect) return;
        const prev = foodSelect.filter((_, i) => i !== index);;
        setFoodSelect(prev);
    }

    const ReloadFoodSelect = () => {
        if (!foodSelect) return;
        const prev = foodSelect.filter((_, i) => i !== -1);
        setFoodSelect(prev);
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

    useEffect(() => {
        const RequetsAsync = async () => {
            const url = `${API}/menu/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            const currenData = {
                name: json.body.name,
                description: json.body.description,
                type: json.body.type
            };

            const currentFood: typeof foodSelect = [];
            const foods = json.body.foods as any[];
            foods.forEach((food) => {
                currentFood.push({
                    food: { id: food.foodPrimitiveReference.id, label: food.foodPrimitiveReference.name },
                    quantity: food.quentity
                });
            });

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
                            click={() => navigate(`/dashboard/menu`)}
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
                        customClass={`${ButtonHandler({ param: `update` })} btn-sm border-none`}
                        ico={Icono({ ico: `update` })}
                        text="Actualizar"
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
                        placeholder: data ? data.name ? data.name : `` : ``,
                        required: false,
                    }}
                />
                <LabelInput
                    change={SetDataByInput}
                    field={{
                        beforeType: "text",
                        type: `input`,
                        name: `description`,
                        id: `input.description`,
                        label: `Descripción`,
                        placeholder: data ? data.description ? data.description : `` : ``,
                        required: false,
                        value: data ? data.name : ``
                    }}
                />
                <CustomSelect
                    label={data ? data.type ? data.type : `` : ``}
                    change={SetDataBySeletc}
                    field={{
                        label: `Tipo`,
                        select: {
                            active: true,
                            in: `type`
                        },
                    }}
                />

                <Text customClass="divider divider-success text-success lg:col-span-3" text={`Seleccionar alimentos`} />

                <div className="grid grid-cols-4 col-span-3 gap-3">
                    <div className="col-span-4 flex justify-end">
                        <Button
                            text="Cargar alimentos seleccionados"
                            customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
                            click={() => ReloadFoodSelect()}
                        />
                    </div>
                    {
                        foodSelect && foodSelect.map((item, i) => (
                            <div className="rounded p-1 border flex justify-between items-center">
                                <Text customClass="text-sm font-bold" text={`${item.food.label} ${item.unity ? item.unity.label : ``}`} />
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
                    <AbstractList ActionButtons={AddFoodList} actions={[]} change={({ }) => { }} crud="primitive" param={param} reload />
                </div>

            </form>

        </div>
    )
}
