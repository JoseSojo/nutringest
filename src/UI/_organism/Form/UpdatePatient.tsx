import { ChangeEvent, FormEvent, useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import LabelInput from "../../_compound/form/LabelInput";
import Button from "../../_atom/Button";
import { Icono } from "../../../_handler/IconHandler";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../_context/NotificationContext";
import { API } from "../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../utils/req/RequetsOptions";

export default function UpdatePatient() {

    const navigate = useNavigate();
    const noti = useNotification();

    const [data, setData] = useState<any | null>(null);

    const HanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data) return noti.setMessage({ active: true, type: `error`, message: `Debes completar todos los campos` });
        if (!data.name) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Nombre"` });
        if (!data.lastname) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Apellido"` });
        if (!data.username) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Usuario"` });
        if (!data.email) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Correo"` });
        if (!data.genero) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Genero"` });
        if (!data.age) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Age"` });

        const Execute = async () => {
            const url = `${API}/patient/create`;
            const req = { ...REQUETS_POST_TOKEN, body: JSON.stringify(data) };
            const result = await fetch(url, req);
            const json = await result.json();


            if (json.error === true || !result.ok) {
                return noti.setMessage({ active: true, type: `error`, message: `Error al crear el paciente` });
            }


            noti.setMessage({ active: true, type: `success`, message: json.message });
            navigate(`/dashboard/patient`, { replace: true });
            return;
        }
        Execute();
    }

    const HandleChange = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...data, [name]: value }
        setData(prev);
    }

    return (
        <div>
            <form onSubmit={HanldeSubmit} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 flex justify-between">
                    <Subtitle customClass="text-2xl font-bold" text="Crear Paciente" />
                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                            ico={Icono({ ico: `create` })}
                            text="Crear"
                        />
                        <Button
                            click={() => navigate(`/dashboard/patient`, { replace: true })}
                            customClass={`${ButtonHandler({ param: `list` })} btn-sm`}
                            ico={Icono({ ico: `create` })}
                            text="Lista"
                        />
                    </div>
                </div>

                <LabelInput
                    cls="col-span-4"
                    change={HandleChange}
                    field={{
                        beforeType: "text",
                        id: `customIdName`,
                        label: `Nombre`,
                        name: `name`,
                        placeholder: `Nombre...`,
                        required: true,
                        type: `input`
                    }}
                />

                <LabelInput
                    cls="col-span-4"
                    change={HandleChange}
                    field={{
                        beforeType: "text",
                        id: `customIdLastname`,
                        label: `Apellido`,
                        name: `lastname`,
                        placeholder: `Apellido...`,
                        required: true,
                        type: `input`
                    }}
                />

                <LabelInput
                    cls="col-span-4"
                    change={HandleChange}
                    field={{
                        beforeType: "text",
                        id: `customIdUsername`,
                        label: `Usuario`,
                        name: `username`,
                        placeholder: `Usuario...`,
                        required: true,
                        type: `input`
                    }}
                />

                <LabelInput
                    cls="col-span-4"
                    change={HandleChange}
                    field={{
                        beforeType: "password",
                        id: `customIdUsername`,
                        label: `Contraseña`,
                        name: `password`,
                        placeholder: `Contraseña...`,
                        required: true,
                        type: `input`
                    }}
                />

                <LabelInput
                    cls="col-span-4"
                    change={HandleChange}
                    field={{
                        beforeType: "text",
                        id: `customIdEmail`,
                        label: `Correo`,
                        name: `email`,
                        placeholder: `Correo...`,
                        required: true,
                        type: `input`
                    }}
                />

                <label className={`form-control w-full col-span-4`}>
                    <div className="label">
                        <span className="label-text font-semibold text-slate-900 dark:text-slate-300">Genero</span>
                    </div>
                    <select onChange={(e) => {
                        HandleChange({ name: `genero`, value: e.target.value })
                    }} className="input input-sm input-bordered w-full text-slate-700 dark:text-slate-800 ">
                        <option></option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </select>
                    {/* <Input
                        type={field.beforeType}
                        change={change}
                        name={field.name}
                        placeholder={field.placeholder}
                        customClass="input input-sm input-bordered w-full text-slate-300 dark:text-slate-800"
                    /> */}
                    <div className="label">
                        {/* <span className="label-text-alt">Bottom Left label</span> */}
                        <span className="label-text-alt"></span>
                    </div>
                </label>

                <LabelInput
                    cls="col-span-4"
                    change={HandleChange}
                    field={{
                        beforeType: "number",
                        id: `customIdAge`,
                        label: `Edad`,
                        name: `age`,
                        placeholder: `Edad...`,
                        required: true,
                        type: `input`
                    }}
                />

            </form>
        </div>
    )
}
