import { useNavigate } from "react-router-dom";
import Button from "../UI/_atom/Button";
import Input from "../UI/_atom/Input";
import { useNotification } from "../_context/NotificationContext";
import { useAuth } from "../_context/auth/AuthContext";
import Footer from "./public/ui/Footer";
import Header from "./public/ui/Header";
import { FormEvent, useState } from "react";
import { ErrorInputStruct } from "../types/GlobalInterface";
import Subtitle from "../UI/_atom/Subtitle";
import { API } from "../entorno";
import { REQUETS_POST } from "../utils/req/RequetsOptions";
import { setToken } from "../utils/token";
import { setUser } from "../utils/token copy";


export default function Login() {

    const noti = useNotification();
    const auth = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState<any>({});
    const [error, setError] = useState<ErrorInputStruct | null>(null);
    const [load, setLoad] = useState(false);

    // const { form } = useCustomForm({ name: `login` });

    const HandleChange = ({ value, name }: { value: string, name: string }) => {
        const prev = { ...data, [name]: value };
        setData(prev);
    }

    const HabldeSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // validaciones
        if (!data[`param`]) return setError({ input: `param`, label: `Debes completar este campo.`, active: true });
        if (!data[`password`]) return setError({ input: `password`, label: `Debes completar este campo.`, active: true });


        const ExecuteAsync = async () => {
            setLoad(true);

            const url = `${API}/auth/login`;
            const req = {
                ...REQUETS_POST,
                body: JSON.stringify(data)
            }

            const resutl = await fetch(url, req);
            const json = await resutl.json();

            if (!resutl.ok || json.error) {
                setLoad(false);
                setError(null);
                return noti.setMessage({ active: true, message: json.message, type: `error` });
            }

            const custom = json as { message:string, error:boolean, body:{ user:any, token:string } };

            setToken(custom.body.token);
            setUser(custom.body.user);

            auth.setSession(true);

            setLoad(false);
            setError(null);

            return navigate(`/dashboard`, { replace:true });
        }
        ExecuteAsync();
    }

    return (
        <div className="min-h-screen w-full">

            <Header />

            <div className="py-16">
                <form onSubmit={HabldeSubmit} className="flex mt-5 bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div
                        className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}
                    >
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <Subtitle customClass="text-2xl font-semibold text-gray-700 text-center" text="NUTRINGEST" />
                        <p className="text-xl text-gray-600 text-center">Bienvenido!</p>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-500 uppercase">INGRESA TUS DATOS</span>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                            <Input
                                name="param"
                                change={HandleChange}
                                customClass="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email"
                            />
                            {error && error.input === `param` && <p className="text-gray-700 text-xs">{error.label}</p>}
                        </div>


                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                                <a href="#" className="text-xs text-gray-500">Recuperar Contraseña?</a>
                            </div>
                            <Input
                                name="password"
                                change={HandleChange}
                                customClass="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                            />
                            {error && error.input === `password` && <p className="text-gray-700 text-xs">{error.label}</p>}
                        </div>
                        <div className="mt-8">
                            <Button
                                type="submit"
                                customClass="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                            >
                                {load ? "Cargando" : "Entrar"}
                            </Button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <Button
                                click={() => navigate(`/register`)}
                                customClass="text-xs text-gray-500 uppercase"
                                text="Crear cuenta"
                                type="button"
                            />
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </form>
            </div>

            {/* <div>
            <CustomForm name="login" />
            </div> */}

            <Footer />
        </div>
    )
}
