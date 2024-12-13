import { useEffect, useState } from "react"
import { Card } from "../../../types/DashboardInterface";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import ItemCard from "../../_compound/Dashboard/ItemCard";

export default function SectionCard () {

    const [cards, setCards] = useState<Card[] | null>(null);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/gui/card`;
            const req = REQUETS_GET_TOKEN;

            const result = await fetch(url, req);
            const json = await result.json();
            if(result.ok) setCards(json);
        }
        ExecuteRequets();
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {
                cards && cards.map((crd) => <ItemCard card={crd} />)   
            }
        </div>
    )
}
