import { useNavigate } from "react-router-dom";
import { Icono } from "../../_handler/IconHandler";
import Button from "../_atom/Button";

interface Navbar {

}

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <header className="w-full py-1 text-gray-700 drk:text-gray-100 bg-emerald-300 drk:bg-emerald-700 flex justify-end px-5 lg:px-10">
            <ul className="flex justify-center items-center gap-5">
                {/* <li className="text-xl p-2 rounded hover:bg-emerald-500 drk:hover:bg-emerald-500">
                    {Icono({ ico: `notification` })}
                </li>
                <li className="text-xl p-2 rounded hover:bg-emerald-500 drk:hover:bg-emerald-500">
                    {Icono({ ico: `message` })}
                </li> */}
                <Button 
                    click={() => {
                        navigate(`/profile`,{ replace:true });
                    }}
                    ico={Icono({ ico: `profile` })} 
                    customClass="text-xl p-2 rounded hover:bg-emerald-500 drk:hover:bg-emerald-500"
                />
                <Button 
                    click={() => {
                        window.localStorage.removeItem(`token`);
                        window.location.reload();
                    }}
                    ico={Icono({ ico: `logout` })} 
                    customClass="text-xl p-2 rounded hover:bg-emerald-500 drk:hover:bg-emerald-500 text-red-500"
                />
                    
            </ul>
        </header>
    )
}
