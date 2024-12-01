import { Icono } from "../../_handler/IconHandler";

interface Navbar {

}

export default function Navbar() {

    return (
        <header className="w-full py-1 text-gray-700 dark:text-gray-100 bg-emerald-300 dark:bg-emerald-700 flex justify-end px-5 lg:px-10">
            <ul className="flex justify-center items-center gap-5">
                {/* <li className="text-xl p-2 rounded hover:bg-emerald-500 dark:hover:bg-emerald-500">
                    {Icono({ ico: `notification` })}
                </li>
                <li className="text-xl p-2 rounded hover:bg-emerald-500 dark:hover:bg-emerald-500">
                    {Icono({ ico: `message` })}
                </li> */}
                <li className="text-xl p-2 rounded hover:bg-emerald-500 dark:hover:bg-emerald-500">
                    {Icono({ ico: `profile` })}
                </li>
                <li className="text-xl p-2 rounded hover:bg-emerald-500 dark:hover:bg-emerald-500 text-red-500">
                    {Icono({ ico: `logout` })}
                </li>
            </ul>
        </header>
    )
}
