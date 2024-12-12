import { useNavigate } from "react-router-dom";
import Button from "../../../UI/_atom/Button";
import { getUser } from "../../../utils/token copy"

export default function Header() {

    const user = JSON.parse(getUser());
    const navigate = useNavigate();

    return (
        <header className="fixed w-full">
            <nav className="bg-white border-gray-200 py-2.5 drk:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="/" className="flex items-center">
                        <img src="/logo.svg" className="h-6 mr-3 sm:h-9" alt="Nutringest Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap drk:text-white">NUTRINGEST</span>
                    </a>
                    <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {
                                user
                                    ? <>
                                        <li>
                                            <Button
                                                click={() => navigate("/dashboard", { replace:true })}
                                                customClass="btn bg-green-500 text-white hover:bg-green-600"
                                                text="Dashboard"
                                            />
                                        </li>
                                    </>
                                    : <>
                                        <li>
                                            <Button
                                                click={() => navigate("/login", { replace:true })}
                                                customClass="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 drk:text-gray-400 lg:drk:hover:text-white drk:hover:bg-gray-700 drk:hover:text-white lg:drk:hover:bg-transparent drk:border-gray-700"
                                                text="Iniciar sesión"
                                            />
                                        </li>
                                        <li>
                                            <Button click={() => navigate("/register", { replace:true })} customClass="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 drk:text-gray-400 lg:drk:hover:text-white drk:hover:bg-gray-700 drk:hover:text-white lg:drk:hover:bg-transparent drk:border-gray-700"
                                                text="Crear cuenta"
                                            />
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
