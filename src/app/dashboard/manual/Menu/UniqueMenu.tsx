import { useEffect, useState } from "react"
import Title from "../../../../UI/_atom/Title";
import { useNavigate, useParams } from "react-router-dom";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import Button from "../../../../UI/_atom/Button";
import Text from "../../../../UI/_atom/Text";
import { API } from "../../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../../utils/req/RequetsOptions";

export default function UniqueMenu() {

    const { id } = useParams() as { id: string };

    const navigate = useNavigate();

    const [data, setData] = useState<{ name?: string, description?: string, type?: string } | null>(null);

    const [foodSelect, setFoodSelect] = useState<{ id: string, unity?: { id: string, label: string }, food: { id: string, label: string }, quantity?: string | number }[] | null>(null);

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
                    id: food.id,
                    food: { id: food.foodPrimitiveReference.id, label: food.foodPrimitiveReference.name },
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
    }, []);

    return (
        <div className="w-full">
            <header className="flex items-center justify-between">
                <Title customClass="text-2xl font-black" text={`${data?.name}`} />
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-3">

                <Text
                    customClass="text-center text-md mt-3 text-slate-500"
                    text={data ? data.name ? `Nombre: ${data.name}` : `` : ``}
                />
                <Text
                    customClass="text-center text-md mt-3 text-slate-500"
                    text={data ? data.description ? `Descripción: ${data.description}` : `` : ``}
                />
                <Text
                    customClass="text-center text-md mt-3 text-slate-500"
                    text={data ? data.type ? `Tipo: ${data.type}` : `` : ``}
                />

                <Text customClass="divider divider-success text-success lg:col-span-3" text={`Alimentos`} />

                <div className="col-span-3 grid grid-cols-3  gap-3">
                    {
                        foodSelect && foodSelect.map((item) => (
                            <div className="flex-1 rounded p-1 border border-slate-500 flex justify-center items-center">
                                <Text customClass="text-sm font-bold" text={`${item.food.label} - ${item.quantity ? item.quantity : ``} ${item.unity ? item.unity.label : ``}`} />
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}
