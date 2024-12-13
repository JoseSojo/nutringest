import { useNavigate } from "react-router-dom";
import { Icono } from "../../_handler/IconHandler";
import Button from "../_atom/Button";
import { deleteTokenAndUser } from "../../utils/token";

interface Navbar {

}

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <header className="w-full py-1 flex justify-end px-5 lg:px-10 bg-slate-800">
            <ul className="flex justify-center items-center gap-5">
                {/* <li className="text-xl p-2 rounded">
                    {Icono({ ico: `notification` })}
                </li>
                <li className="text-xl p-2 rounded">
                    {Icono({ ico: `message` })}
                </li> */}
                <Button 
                    click={() => {
                        navigate(`/profile`,{ replace:true });
                    }}
                    ico={Icono({ ico: `profile` })} 
                    customClass="duration-300 text-xl p-2 rounded text-slate-50"
                />
                <Button 
                    click={() => {
                        deleteTokenAndUser();
                        window.location.reload();
                    }}
                    ico={Icono({ ico: `logout` })} 
                    customClass="duration-300 text-xl p-2 rounded text-red-500"
                />
                    
            </ul>
        </header>
    )
}
