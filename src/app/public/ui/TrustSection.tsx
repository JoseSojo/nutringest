import { Icono } from "../../../_handler/IconHandler";

export default function TrustSection () {
    return (
        <section className="bg-white drk:bg-gray-900">
            <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
                <div className="col-span-2 mb-8">
                    <p className="text-lg font-medium text-purple-600 drk:text-purple-500">Agenda Nutringest</p>
                    <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl drk:text-white">
                        La clave para una práctica nutricional organizada
                    </h2>
                    <p className="font-light text-gray-500 sm:text-xl drk:text-gray-400">
                        Con Nutringest, puedes planificar tus citas y agendas de manera efectiva,
                        sin preocuparte por perder un solo detalle. Nuestro sistema te permite crear
                        horarios personalizados, programar citas a distancia y enviar recordatorios
                        a tus pacientes.
                    </p>
                    <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 drk:border-gray-700">
                        <div>
                            {/* <a href="#" className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 drk:text-purple-500 drk:hover:text-purple-700">
                                Explore Legality Guide
                                <span className="w-5 h-5 ml-1">icono</span>
                            </a> */}
                        </div>
                        <div>
                            {/* <a href="#" className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 drk:text-purple-500 drk:hover:text-purple-700">
                                Visit the Trust Center
                                <span className="w-5 h-5 ml-1">icono</span>
                            </a> */}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
                    <div>
                        <span className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 drk:text-purple-500">{Icono({ico:`food`})}</span>
                        <h3 className="mb-2 text-2xl font-bold drk:text-white">+600</h3>
                        <p className="font-light text-gray-500 drk:text-gray-400">Más de 600 alimentos e incrementando cada día</p>
                    </div>
                    <div>
                        <span className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 drk:text-purple-500">{Icono({ico:`users`})}</span>
                        <h3 className="text-4xl font-bold drk:text-white">∞</h3>
                        <p className="font-light text-gray-500 drk:text-gray-400">Sin límites de pacientes, sin límites de citas</p>
                    </div>
                    <div>
                        <span className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 drk:text-purple-500">{Icono({ico:`porfolio`})}</span>
                        <h3 className="mb-2 text-2xl font-bold drk:text-white">Portafolio</h3>
                        <p className="font-light text-gray-500 drk:text-gray-400">Te damos la oportunidad de tener tu portafolio dentro del sistema</p>
                    </div>
                    <div>
                        <span className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 drk:text-purple-500">{Icono({ico:`calculadora`})}</span>
                        <h3 className="mb-2 text-2xl font-bold drk:text-white">Calculadora</h3>
                        <p className="font-light text-gray-500 drk:text-gray-400">Calculadora especificamente para nutricionistas</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
