import { useEffect, useState } from "react"
import { Card } from "../../../types/DashboardInterface";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import ItemCard from "../../_compound/Dashboard/ItemCard";
import Text from "../../_atom/Text";

export default function SectionCard() {

    const [cards, setCards] = useState<Card[] | null>(null);
    const [propietarySubscription, setPropietarySubscription] = useState<any | null>(null);


    useEffect(() => {
        const ExecuteAsync = async () => {
            const url = `${API}/subscription/detail/my`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();
            if (json.body) setPropietarySubscription(json.body);
        }
        ExecuteAsync();
    }, [])

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/gui/card`;
            const req = REQUETS_GET_TOKEN;

            const result = await fetch(url, req);
            const json = await result.json();
            if (result.ok) setCards(json);
        }
        ExecuteRequets();
    }, [])

    return (
        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-4 gap-3">
            {
                propietarySubscription &&
                <div className="px-3 py-3 bg-white flex flex-col gap-1 place-items-center relative">
                    <Text customClass="text-xl font-mono font-bold py-1 rounded-full bg-slate-200 text-center px-3" text={`${propietarySubscription.dayEnd}-${propietarySubscription.monthEnd}-${propietarySubscription.yearEnd}`} />
                    <Text customClass="text-sm font-semibold text-gray-700" text={`Proxima renovación del plan`} />
                </div>
            }
            {
                cards && cards.map((crd) => <ItemCard card={crd} />)
            }
        </div>
    )
}
