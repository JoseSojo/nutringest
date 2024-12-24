import { useState } from "react"
import { Icono } from "../../../_handler/IconHandler"
import { Card } from "../../../types/DashboardInterface"
import Button from "../../_atom/Button"
import Text from "../../_atom/Text"

interface Props {
    card: Card
}

export default function ItemCard({ card }: Props) {

    const [more, setMore] = useState<{
        label: string;
        value: string;
    }>({ label:card.label,value:card.value.toString() })

    const [active, setActive] = useState(false)

    return (
        <div className="px-3 py-3 bg-white flex gap-1 place-items-center relative">
            <Text customClass="text-3xl font-mono font-bold py-1 rounded-full bg-slate-200 text-center px-3" text={more.value} />
            <Text customClass="text-md font-bold" text={more.label} />
            {
                card.child &&
                <div className="absolute top-2 right-2">
                    <div className="relative">
                        <Button
                            click={() => setActive(!active)}
                            ico={Icono({ ico: `pluss` })}
                            customClass="btn btn-xs bg-slate-800 hover:bg-slate-700 text-white text-xl outline-none"
                        />
                        {
                            active && 
                            <div className="absolute h-40 z-10 max-h-64 overflow-auto w-auto py-1 bg-white shadow rounded-lg border top-5 grid">
                                {
                                    card.child.map((chl) => (
                                        <Button
                                            click={() => setMore(chl)}
                                            customClass="text-xs py-1 w-full hover:bg-slate-300 px-3"
                                            text={chl.label}
                                        />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
