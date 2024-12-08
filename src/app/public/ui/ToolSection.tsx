import { Icono } from "../../../_handler/IconHandler";

export default function ToolsSection () {
    return (
        <section className="bg-gray-50 dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                {/* Row */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Work with tools you already use
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.
                        </p>
                        {/* List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">{Icono({ico:`user`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Continuous integration and deployment</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">{Icono({ico:`user`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Development workflow</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">{Icono({ico:`user`})}</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Knowledge management</span>
                            </li>
                        </ul>
                        <p className="mb-8 font-light lg:text-xl">
                            Deliver great service experiences fast - without the complexity of traditional ITSM solutions.
                        </p>
                    </div>
                    <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/feature-1.png" alt="dashboard feature image" />
                </div>
                {/* Row */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <img className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="/feature-2.png" alt="feature image 2" />
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            We invest in the world’s potential
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.
                        </p>
                        {/* List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">icono</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Dynamic reports and dashboards</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">icono</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Templates for everyone</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">icono</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Development workflow</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">icono</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Limitless business automation</span>
                            </li>
                            <li className="flex space-x-3">
                                {/* Icon */}
                                <span className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400">icono</span>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Knowledge management</span>
                            </li>
                        </ul>
                        <p className="font-light lg:text-xl">
                            Deliver great service experiences fast - without the complexity of traditional ITSM solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
