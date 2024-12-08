import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import CustomSelect from "./component/CustomSelect";
import { useNotification } from "../../../_context/NotificationContext";
import Button from "../../_atom/Button";
import { API } from "../../../entorno";
import { getToken } from "../../../utils/token";
import CustomInput from "./component/CustomInput";
import ButtonHandler from "../../../_handler/ButtonsHandler";

interface Contact_Data_Interface {
    phone?: string,
    phone2?: string,
    email?: string,
    email2?: string
}

interface Residence_Data_Interface {
    state?: {
        label: string,
        value: string,
        name: string
    },
    country?: {
        label: string,
        value: string,
        name: string
    },
    city?: {
        label: string,
        value: string,
        name: string
    },
}

interface Perosnal_Data_Interface {
    name?: string;
    name2?: string;
    lastname?: string;
    lastname2?: string;
    nacionality?: string;
    ci?: string;
    birthdate?: string;
    age?: string;
    civil?: string;
    sex?: string;
}

interface Props {
    user: any;
    userId: string;
    update: boolean;
}

export default function DataUser({ userId, update }: Props) {

    const noti = useNotification();

    const NotiError = (message: string) => noti.setMessage({ active: true, message, type: `error` });
    const NotiSuccess = (message: string) => noti.setMessage({ active: true, message, type: `success` });

    const [personalData, setPersonalData] = useState<Perosnal_Data_Interface | null>(null);
    const [contactData, setContactData] = useState<Contact_Data_Interface | null>(null);
    const [residence, setResidense] = useState<Residence_Data_Interface | null>(null);

    const [personalData2, setPersonalData2] = useState<Perosnal_Data_Interface | null>(null);
    const [contactData2, setContactData2] = useState<Contact_Data_Interface | null>(null);
    const [residence2, setResidense2] = useState<Residence_Data_Interface | null>(null);

    const SetResidenseData = ({ label, value, name }: { label: string, value: string, name: string }) => {
        // const prev = residence ? { ...residence, [name]:value } : { [name]:value }
        // if (update) return;
        const prev = residence
            ? { ...residence, [name]: { label, value, name } }
            : { [name]: { label, value, name } }
        setResidense(prev);
    }

    const ChangeContactData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // if (update) return;
        const prev = contactData ? { ...contactData, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value };
        setContactData(prev);
    }

    const ChangePersonalData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // if (update) return;
        const prev = personalData ? { ...personalData, [e.target.name]: e.target.value } : { [e.target.name]: e.target.value };
        setPersonalData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {

        // console.log(personalData);
        // console.log(contactData);
        e.preventDefault();
        // if (update) return NotiError(`No puedes actualizar.`);

        // validar datos
        // if (!personalData) return NotiError(`Debes completar los datos personales.`);
        // if (!contactData) return NotiError(`Debes completar los datos de contacto.`);
        // if (!residence) return NotiError(`Debes completar los datos de recidencia.`);

        // if (!personalData.age) return NotiError(`Debes agregar tu edad.`);
        // if (!personalData.birthdate) return NotiError(`Debes agregar tu fecha de nacimiento.`);
        // if (!personalData.ci) return NotiError(`Debes agregar tu cédula.`);
        // if (!personalData.civil) return NotiError(`Debes agregar tu estado civíl.`);
        // if (!personalData.lastname2) return NotiError(`Debes agregar tu segundo apellido.`);
        // if (!personalData.lastname) return NotiError(`Debes agregar tu apellido.`);
        // if (!personalData.name2) return NotiError(`Debes agregar tu segundo nombre.`);
        // if (!personalData.name) return NotiError(`Debes agregar tu nombre.`);
        // if (!personalData.sex) return NotiError(`Debes agregar tu sexo.`);

        // if (!contactData.email2) return NotiError(`Debes agregar tu correo alternativo.`);
        // if (!contactData.email) return NotiError(`Debes agregar tu correo principal.`);
        // if (!contactData.phone2) return NotiError(`Debes agregar tu teléfono alternativo.`);
        // if (!contactData.phone) return NotiError(`Debes agregar tu teléfono principal.`);

        const ExecuteRequets = async () => {
            const url = `${API}/user/${userId}/update`;
            const data = {
                ...contactData,
                ...personalData,
                city: residence?.city?.value,
                residence
            }
            const req = {
                method: `PUT`,
                headers: {
                    "Content-Type": "application/json",
                    token: `${getToken()}`
                },
                body: JSON.stringify(data)
            };
            const result = await fetch(url, req);
            const json = await result.json();
            if (!result.ok || json.error) NotiError(`Error al actualizar tus datos`);

            NotiSuccess(`Datos Actualizados exitosamente.`);
        }
        ExecuteRequets();
    }

    useEffect(() => {
        const ExecuteRequets = async () => {
            const url = `${API}/user/${userId}/unique`;
            const req = { method: `GET`, headers: { "token": `${getToken()}` } };
            const result = await fetch(url, req);
            const json = await result.json() as { body: any, error: boolean, message: string };

            console.log(json);

            if (json.body) {
                setPersonalData2({
                    age: json.body.data.age,
                    ci: json.body.data.ci,
                    lastname: json.body.data.lastname,
                    lastname2: json.body.data.lastname2,
                    nacionality: json.body.data.nacionality,
                    name: json.body.data.name,
                    name2: json.body.data.name2,
                });

                setContactData2({
                    email: json.body.data.email,
                    email2: json.body.data.email2,
                    phone: json.body.data.phone,
                    phone2: json.body.data.phone2,
                });

                setResidense2({
                    city: {
                        label: json.body.data.cityReference.name,
                        name: `city`,
                        value: json.body.data.cityReference.id
                    },
                    state: {
                        label: json.body.data.cityReference.stateReference.name,
                        name: `state`,
                        value: json.body.data.cityReference.stateReference.id
                    },
                    country: {
                        label: json.body.data.cityReference.stateReference.countryReference.name,
                        name: `country`,
                        value: json.body.data.cityReference.stateReference.countryReference.id
                    },
                });

                setPersonalData({
                    age: json.body.data.age,
                    ci: json.body.data.ci,
                    lastname: json.body.data.lastname,
                    lastname2: json.body.data.lastname2,
                    nacionality: json.body.data.nacionality,
                    name: json.body.data.name,
                    name2: json.body.data.name2,
                });
            }

        }
        ExecuteRequets();
    }, [])

    return (
        <form onSubmit={HandleSubmit} className="grid grid-cols-12 gap-3">

            {/* INICIO DATOS PERSONALES */}

            <Subtitle customClass=" text-xl font-black text-blue-800 dark:text-blue-500" text="" />

            <div className="flex justify-between items-center col-span-12">
                <Subtitle customClass="text-xl font-black text-blue-800 dark:text-blue-500 mt-4" text="Datos personales" />

                {
                    update &&
                    <Button
                        type="submit"
                        customClass={`${ButtonHandler({ param: `create` })} btn-sm col-span-2`}
                        text="Actualizar datos"
                    />
                }
            </div>

            <label className="flex flex-col col-span-1">
                <span className="text-sm font-semibold">Nac.</span>
                <select onChange={ChangePersonalData} name="nacionality" className="input input-sm border border-gray-800 dark:border-gray-100 outline-none bg-gray-300 dark:bg-slate-700 select-none">
                    <option></option>
                    <option selected={personalData && personalData.nacionality === `V` ? true : false}>V</option>
                    <option selected={personalData && personalData.nacionality === `E` ? true : false}>E</option>
                </select>
            </label>

            <CustomInput
                cols="3"
                change={ChangePersonalData}
                name="ci"
                label="Cédula"
                type="text"
                value={personalData2 && personalData2.ci ? personalData2.ci : ``}
            />

            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="name"
                label="Primer Nombre"
                type="text"
                value={personalData2 && personalData2.name ? personalData2.name : ``}
            />
            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="name2"
                label="Segundo Nombre"
                type="text"
                value={personalData2 && personalData2.name2 ? personalData2.name2 : ``}
            />
            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="lastname"
                label="Primer Apellido"
                type="text"
                value={personalData2 && personalData2.lastname ? personalData2.lastname : ``}
            />
            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="lastname2"
                label="Segundo Apellido"
                type="text"
                value={personalData2 && personalData2.lastname2 ? personalData2.lastname2 : ``}
            />
            <CustomInput
                cols="4"
                change={ChangePersonalData}
                name="age"
                label="Edad"
                type="text"
                value={personalData2 && personalData2.age ? personalData2.age : ``}
            />

            {/* FIN DATOS PERSONALES */}

            {/* INICIO DATOS RECIDENCIA */}

            <Subtitle customClass="col-span-12 text-xl font-black text-blue-800 dark:text-blue-500 mt-4" text="Datos Residencia" />

            <CustomSelect
                change={SetResidenseData}
                select="country"
                label="País"
                initSelect={residence2 && residence2.country ? { id: residence2.country.value, label: residence2.country.label } : null}
            />

            <CustomSelect
                filter={ residence && residence.country ? `country=${residence.country.value}` : `` }
                change={SetResidenseData}
                select="state"
                label="Estado"
                initSelect={residence2 && residence2.state ? { id: residence2.state.value, label: residence2.state.label } : null}
            />

            <CustomSelect
                change={SetResidenseData}
                filter={ residence && residence.state ? `state=${residence.state.value}` : `` }
                select="city"
                label={`Ciudad`}
                initSelect={residence2 && residence2.city ? { id: residence2.city.value, label: residence2.city.label } : null}
            />

            {/* FIN DATOS RECIDENCIA */}

            {/* INICIO DATOS CONTACTO */}

            <Subtitle customClass="col-span-12 text-xl font-black text-blue-800 dark:text-blue-500 mt-4" text="Datos Contacto" />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="phone"
                label="Teléfono"
                type="number"
                value={contactData2 && contactData2.phone ? contactData2.phone : ``}
            />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="phone2"
                label="Teléfono Alternativo"
                type="number"
                value={contactData2 && contactData2.phone2 ? contactData2.phone2 : ``}
            />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="email"
                label="Correo"
                type="text"
                value={contactData2 && contactData2.email ? contactData2.email : ``}
            />

            <CustomInput
                cols="3"
                change={ChangeContactData}
                name="email2"
                label="Correo Alternativo"
                type="text"
                value={contactData2 && contactData2.email2 ? contactData2.email2 : ``}
            />

            {/* FIN DATOS CONTACTO */}
        </form>
    )
}
