
export default function PricingSection () {

    return (
        <section className="bg-white drk:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
            <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 drk:text-white">
                    Designed for business teams like yours
                </h2>
                <p className="mb-5 font-light text-gray-500 sm:text-xl drk:text-gray-400">
                    Here at Landwind we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                </p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                {/* Pricing Card 1 */}
                <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow drk:border-gray-600 xl:p-8 drk:bg-gray-800 drk:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                    <p className="font-light text-gray-500 sm:text-lg drk:text-gray-400">
                        Best option for personal use & for your next project.
                    </p>
                    <div className="flex items-baseline justify-center my-8">
                        <span className="mr-2 text-5xl font-extrabold">$29</span>
                        <span className="text-gray-500 drk:text-gray-400">/month</span>
                    </div>
                    {/* List */}
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Team size: <span className="font-semibold">1 developer</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Premium support: <span className="font-semibold">6 months</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Free updates: <span className="font-semibold">6 months</span></span>
                        </li>
                    </ul>
                    <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center drk:text-white drk:focus:ring-purple-900">
                        Get started
                    </a>
                </div>
                
                {/* Pricing Card 2 */}
                <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow drk:border-gray-600 xl:p-8 drk:bg-gray-800 drk:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Company</h3>
                    <p className="font-light text-gray-500 sm:text-lg drk:text-gray-400">
                        Relevant for multiple users, extended & premium support.
                    </p>
                    <div className="flex items-baseline justify-center my-8">
                        <span className="mr-2 text-5xl font-extrabold">$99</span>
                        <span className="text-gray-500 drk:text-gray-400">/month</span>
                    </div>
                    {/* List */}
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Team size: <span className="font-semibold">10 developers</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Premium support: <span className="font-semibold">24 months</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Free updates: <span className="font-semibold">24 months</span></span>
                        </li>
                    </ul>
                    <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center drk:text-white drk:focus:ring-purple-900">
                        Get started
                    </a>
                </div>

                {/* Pricing Card 3 */}
                <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow drk:border-gray-600 xl:p-8 drk:bg-gray-800 drk:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
                    <p className="font-light text-gray-500 sm:text-lg drk:text-gray-400">
                        Best for large scale uses and extended redistribution rights.
                    </p>
                    <div className="flex items-baseline justify-center my-8">
                        <span className="mr-2 text-5xl font-extrabold">$499</span>
                        <span className="text-gray-500 drk:text-gray-400">/month</span>
                    </div>
                    {/* List */}
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Team size: <span className="font-semibold">100+ developers</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Premium support: <span className="font-semibold">36 months</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 text-green-500 drk:text-green-400">icono</span>
                            <span>Free updates: <span className="font-semibold">36 months</span></span>
                        </li>
                    </ul>
                    <a href="#" className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center drk:text-white drk:focus:ring-purple-900">
                        Get started
                    </a>
                </div>
            </div>
        </div>
    </section>
    )
} 
