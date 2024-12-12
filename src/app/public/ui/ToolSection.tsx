import { Icono } from "../../../_handler/IconHandler";

export default function ToolsSection () {
    return (
        <section className="bg-gray-50 drk:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                {/* Row */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div className="text-gray-500 sm:text-lg drk:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 drk:text-white">
                            Gestiona tus citas con facilidad
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Puedes decir adiós al estrés y el desorden en tu práctica nutricional.
                            Gestiona tus citas con facilidad, administra tus pacientes con precisión y
                            organiza tus alimentos y recetas de manera eficiente
                        </p>
                        {/* List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 drk:border-gray-700">
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 drk:text-purple-400">{Icono({ico:`primitive`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 drk:text-white">Alimentos</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 drk:text-purple-400">{Icono({ico:`menu`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 drk:text-white">Menus</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 drk:text-purple-400">{Icono({ico:`exchange`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 drk:text-white">Listas de intercambio</span>
                            </li>
                        </ul>
                        <p className="mb-8 font-light lg:text-xl">
                            El sistema de gestión perfecto para nutricionistas como tú
                        </p>
                    </div>
                    <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/feature-1.png" alt="dashboard feature image" />
                </div>
                {/* Row */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/feature-2.png" alt="feature image 2" />
                    <div className="text-gray-500 sm:text-lg drk:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 drk:text-white">
                            Administra tus pacientes con precisión
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Es la herramienta perfecta para nutricionistas como tú que buscan mejorar su eficiencia
                            y productividad. Con nuestro sistema, puedes automatizar tareas, reducir el tiempo que
                            dedicás a tareas administrativas y enfocarte en lo que más te importa: ayudar a tus pacientes.
                        </p>
                        {/* List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 drk:border-gray-700">
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 drk:text-purple-400">{Icono({ico:`patient`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 drk:text-white">Pacientes</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 drk:text-purple-400">{Icono({ico:`nutricionist`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 drk:text-white">Nutricionistas</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
