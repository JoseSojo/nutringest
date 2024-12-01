import { FormEvent, useEffect, useState } from "react"
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
import { useModal } from "../../../../_context/ModalContext";
import WarningDeleteFood from "./WarningDeleteFood";

export default function UpdateMenu() {

    const {id} = useParams() as {id:string};

    const modal = useModal();
    const noti = useNotification();
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const CustomRelaod = () => setReload(!reload);

    const [data, setData] = useState<{ name?: string, description?: string, type?:string } | null>(null);

    const [customFood, setCustomFood] = useState<{ unity?: { id: string, label: string }, food?: { id: string, label: string }, ration?: string | number } | null>(null);
    const [foodSelect, setFoodSelect] = useState<{ id:string, unity?:{id:string,label:string}, food:{id:string,label:string}, quantity?: string | number }[] | null>(null);

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!data) return noti.setMessage({ active:true,message:`Debes completar los datos.`,type:`error` });
        if(!data.description) return noti.setMessage({ active:true,message:`Debes agregar la descripción.`,type:`error` });
        if(!data.name) return noti.setMessage({ active:true,message:`Debes agregar el nombre`,type:`error` });
        if(!data.type) return noti.setMessage({ active:true,message:`Debes agregar el tipo`,type:`error` });
        if(!foodSelect || foodSelect.length === 0) return noti.setMessage({ active:true,message:`Debes agregar almenos un alimento`,type:`error` });

        const customData: any = {
            name: data.name,
            description: data.description ? data.description : null,
            type: data.type ? data.type : null,
            foods: foodSelect
        }

        const ExecuteRequets = async () => {
            const url = `${API}/menu/${id}/update`;
            const req = {...REQUETS_PUT_TOKEN, body:JSON.stringify(customData)}
            const result = await fetch(url, req);
            const json = await result.json();

            if(!result.ok || json.error) {
                noti.setMessage({ active:true,message:`Oops. hubo un error`,type:`error` });
                return;
            }

            noti.setMessage({ active:true,message:json.message,type:`success` });
            navigate(`/dashboard/menu`);
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

        prev.push({ id:``,food: customFood.food, quantity: customFood.ration, unity: customFood.unity });
        setFoodSelect(prev);

        setCustomFood(null);
    }

    const RemoveFoodSelect = (index: number) => {
        if(!foodSelect) return;
        // const prev = foodSelect.filter((_, i) => i !== index);;
        // setFoodSelect(prev);
        modal.show(<WarningDeleteFood id={foodSelect[index].id} label={`Está seguro de eliminar: ${foodSelect[index].food.label}`} reload={CustomRelaod} />)
    }

    useEffect(() => {
        const RequetsAsync = async () => {
            const url = `${API}/menu/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url,req);
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
                    id:food.id, 
                    unity:{id:food.unityMeasureReference.id,label:food.unityMeasureReference.name}, 
                    food:{id:food.foodPrimitiveReference.id,label:food.foodPrimitiveReference.name}, 
                    quantity: food.quentity 
            })
                // currentFood.push({ 
                //     id: food.id,
                //     food:{id: food.foodReference.id ,label:food.foodReference.name},
                //     quantity:food.quantity ? food.quantity : ``,
                //     unity:food.unityMeasureReference ? {id:food.unityMeasureReference.id,label:food.unityMeasureReference.name} : undefined
                // })
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
                    <Button
                        type="submit"
                        customClass={`${ButtonHandler({param:`update`})} btn-sm border-none`}
                        ico={Icono({ ico:`update` })}
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
                        placeholder: data ? data.name ? data.name  : `` : ``,
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
                        placeholder: data ? data.description ? data.description  : `` : ``,
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
                                <Text customClass="text-sm font-bold" text={`${item.food.label} - ${item.quantity ? item.quantity : ``} ${item.unity ? item.unity.label : ``}`} />
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
