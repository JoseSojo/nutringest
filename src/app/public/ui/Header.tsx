
export default function Header () {

    return (
        <header className="fixed w-full">
                <nav className="bg-white border-gray-200 py-2.5 drk:bg-gray-900">
                    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <a href="/" className="flex items-center">
                            <img src="/logo.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap drk:text-white">NUTRINGEST</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <a href="/login" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 drk:bg-purple-600 drk:hover:bg-purple-700 focus:outline-none drk:focus:ring-purple-800">Iniciar Sesión</a>
                            
                        </div>
                        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <a href="/" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 drk:text-white" aria-current="page">Inicio</a>
                                </li>
                                <li>
                                    <a href="/login" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 drk:text-gray-400 lg:drk:hover:text-white drk:hover:bg-gray-700 drk:hover:text-white lg:drk:hover:bg-transparent drk:border-gray-700">Iniciar sesión</a>
                                </li>
                                <li>
                                    <a href="/register" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 drk:text-gray-400 lg:drk:hover:text-white drk:hover:bg-gray-700 drk:hover:text-white lg:drk:hover:bg-transparent drk:border-gray-700">Crear cuenta</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
    )
}
