import { useEffect, useState } from "react"
import { API } from "../../../entorno";
import { Icono } from "../../../_handler/IconHandler";

export default function PricingSection() {

    const [list, setList] = useState<any[] | null>(null);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/subscription/public`;
            const result = await fetch(url);
            const json = await result.json();
            console.log(json);
            setList(json.body.list);
        }
        ExecuteRequets();
    }, []);

    return (
        <section className="bg-white drk:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
                <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 drk:text-white">
                        La solución nutricional que se adapta a tus necesidades, y a tu presupuesto
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl drk:text-gray-400">
                        Nuestros planes están diseñados para adaptarse a tus necesidades y presupuestos.
                        Ofrecemos tres opciones para que puedas elegir la que mejor se adapte a ti
                    </p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {
                        list && list.map(item => (
                            <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow drk:border-gray-600 xl:p-8 drk:bg-gray-800 drk:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">{item.name}</h3>
                                <div className="flex items-baseline justify-center my-8">
                                    <span className="mr-2 text-5xl font-extrabold">${item.defaultMount}</span>
                                    <span className="text-gray-500 drk:text-gray-400">/{item.countMonth} {item.countMonth == `1` ? `mes` : `meses`}</span>
                                </div>
                                {/* List */}
                                <ul role="list" className="mb-8 space-y-4 text-left">
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">{Icono({ico:`users`})}</span>
                                        <span>Sin límite de pacientes</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">{Icono({ico:`quote`})}</span>
                                        <span>Sin límite de citas</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">{Icono({ico:`menu`})}</span>
                                        <span>Personalizar menús y listas de intercambio</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">{Icono({ico:`agend`})}</span>
                                        <span>Agenda personalizada</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">{Icono({ico:`porfolio`})}</span>
                                        <span>Portafolio</span>
                                    </li>
                                </ul>
                                <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center drk:text-white drk:focus:ring-purple-900">
                                    Seleccinar Plan
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
} 
