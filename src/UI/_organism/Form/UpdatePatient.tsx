import { FormEvent, useEffect, useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";
import { Icono } from "../../../_handler/IconHandler";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../_context/NotificationContext";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN, REQUETS_PUT_TOKEN } from "../../../utils/req/RequetsOptions";
import TextareaDefPatient from "./TextareaDefPatient";
import InputDefPatient from "./InputDefPatient";
import Text from "../../_atom/Text";
import SelectDefPatient from "./SelectDefPatient";

export default function UpdatePatient() {
    const {id} = useParams() as {id:string} 

    const navigate = useNavigate();
    const noti = useNotification();
    const [load, setLoad] = useState(true);

    const [proteinas, setProteinas] = useState<{porcentaje:number|string,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});
    const [lipidos, setLipidos] = useState<{porcentaje:number|string,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});
    const [carbohidratos, setCarbohidratos] = useState<{porcentaje:number|string,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});

    const [data, setData] = useState<any | null>(null);
    const [heredofamiliares, setHeredofamiliares] = useState<any | null>(null);
    const [personalesPatologicos, setPersonalesPatologicos] = useState<any | null>(null);
    const [personalesNoPatologicos, setPersonalesNoPatologicos] = useState<any | null>(null);
    const [ginecoObstretricos, setGinecoObstretricos] = useState<any | null>(null);
    const [trastornosGastroinstestinales, setTrastornosGastroinstestinales] = useState<any | null>(null);
    const [habitosAlimentacion, setHabitosAlimentacion] = useState<any | null>(null);
    const [redordatorio24Horas, setRedordatorio24Horas] = useState<any | null>(null);
    const [indicadorAntropometico, setIndicadorAntropometico] = useState<any | null>(null);
    const [recomendaciones, setRecomendaciones] = useState<any | null>(null);
    const [evaluacionBoiquimica, setEvaluacionBoiquimica] = useState<any | null>(null);

    const HanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data) return noti.setMessage({ active: true, type: `error`, message: `Debes completar todos los campos` });
        if (!data.name) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Nombre"` });
        if (!data.lastname) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Apellido"` });
        // if (!data.username) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Usuario"` });
        if (!data.email) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Correo"` });
        // if (!data.genero) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Genero"` });
        if (!data.age) return noti.setMessage({ active: true, type: `error`, message: `Debes completar el campo "Age"` });

        const Execute = async () => {

            const CustomData = {
                ...data,
                heredofamiliares,
                personalesPatologicos,
                personalesNoPatologicos,
                ginecoObstretricos,
                trastornosGastroinstestinales,
                habitosAlimentacion,
                redordatorio24Horas,
                indicadorAntropometico,
                recomendaciones,
                kilocalorias: {
                    proteinas,
                    lipidos,
                    carbohidratos
                },
            }

            const url = `${API}/patient/${id}/update/`;
            const req = { ...REQUETS_PUT_TOKEN, body: JSON.stringify(CustomData) };
            const result = await fetch(url, req);
            const json = await result.json();

            if (json.error === true || !result.ok) {
                return noti.setMessage({ active: true, type: `error`, message: `Error al crear el paciente` });
            }

            noti.setMessage({ active: true, type: `success`, message: json.message });
            navigate(`/dashboard/patient/unique/${id}`, { replace: true });
            return;
        }
        Execute();
    }

    const HandleChangeLipidos = ({ name, value }: { value: string, name: string }) => {
        setLipidos({...lipidos, [name]:value});
    }

    const HandleChangeProteinas = ({ name, value }: { value: string, name: string }) => {
        setProteinas({...proteinas, [name]:value});
    }

    const HandleChangeCarbohidratos = ({ name, value }: { value: string, name: string }) => {
        setCarbohidratos({...carbohidratos, [name]:value});
    }

    const HandleChange = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...data, [name]: value }
        setData(prev);
    }

    const HandleChangeHeredoFamiliares = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...heredofamiliares, [name]: value }
        setHeredofamiliares(prev);
    }

    const HandleChangePersonalesPatologicos = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...personalesPatologicos, [name]: value }
        setPersonalesPatologicos(prev);
    }

    const HandleChangePersonalesNoPatologicos = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...personalesNoPatologicos, [name]: value }
        // alert(`${name}, ${value}`);
        setPersonalesNoPatologicos(prev);
    }

    const HandleChangeGinecoObstretricos = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...ginecoObstretricos, [name]: value }
        setGinecoObstretricos(prev);
    }

    const HandleChangeTrastornosGastroinstestinales = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...trastornosGastroinstestinales, [name]: value }
        setTrastornosGastroinstestinales(prev);
    }

    const HandleChangeHabitosAlimentacion = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...habitosAlimentacion, [name]: value }
        setHabitosAlimentacion(prev);
    }

    const HandleChangeRedordatorio24Horas = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...redordatorio24Horas, [name]: value }
        setRedordatorio24Horas(prev);
    }

    const HandleChangeIndicadorAntropometico = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...indicadorAntropometico, [name]: value }
        setIndicadorAntropometico(prev);
    }

    const HandleChangeRecomendaciones = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...recomendaciones, [name]: value }
        setRecomendaciones(prev);
    }

    const HandleChangeEvaluacionBioquímica = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...evaluacionBoiquimica, [name]: value }
        setEvaluacionBoiquimica(prev);
    }

    useEffect(() => {
        const ExecuteRequets = async () => {
            setLoad(true);
            const url = `${API}/patient/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();
            const userNotPatient = { ...json.body.body.data, patientData: null }
            const userWithData = json.body.body.data.patientData;

            setData(userNotPatient);
            setHeredofamiliares(Object.fromEntries(userWithData.heredofamiliares));
            setPersonalesPatologicos(Object.fromEntries(userWithData.personalesPatologicos));
            setPersonalesNoPatologicos(Object.fromEntries(userWithData.personalesNPatologicos));
            setGinecoObstretricos(Object.fromEntries(userWithData.ginecoObstretricos));
            setTrastornosGastroinstestinales(Object.fromEntries(userWithData.trastornosGastroinstestinales));
            setHabitosAlimentacion(Object.fromEntries(userWithData.habitosAlimentacion));
            setRedordatorio24Horas(Object.fromEntries(userWithData.redordatorio24Horas));
            setIndicadorAntropometico(Object.fromEntries(userWithData.indicadorAntropometico));
            setEvaluacionBoiquimica(Object.fromEntries(userWithData.evaluacionBoiquimica));
            setRecomendaciones({ diagnostico: userWithData.diagnostico, sleep: userWithData.sleep, exercises: userWithData.exercises });

            setProteinas({ porcentaje:userWithData.proteinasPercentaje,gr:userWithData.proteinasGramos,kilo:userWithData.proteinasKilo,rc:userWithData.proteinasRacion })
            setLipidos({ porcentaje:userWithData.lipidosPercentaje,gr:userWithData.lipidosGramos,kilo:userWithData.lipidosKilo,rc:userWithData.lipidosRacion })
            setCarbohidratos({ porcentaje:userWithData.carbohidratosPercentaje,gr:userWithData.carbohidratosGramos,kilo:userWithData.carbohidratosKilo,rc:userWithData.carbohidratosRacion })

            setLoad(false);
        }
        ExecuteRequets();
    }, [])

    return load ? <>
        <span className="loading loading-spinner"></span>
    </> : (
        <div>
            <form onSubmit={HanldeSubmit} className="grid gap-4">
                <div className="flex justify-between">
                    <Subtitle customClass="text-2xl font-bold" text={`Actualizar: ${data.name} ${data.lastname}`} />
                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
                            ico={Icono({ ico: `update` })}
                            text="Actualizar"
                        />
                        <Button
                            click={() => navigate(`/dashboard/patient`, { replace: true })}
                            customClass={`${ButtonHandler({ param: `list` })} btn-sm`}
                            ico={Icono({ ico: `create` })}
                            text="Lista"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 p-2 gap-2">
                    <InputDefPatient getName change={HandleChange} value={data ? data.name : ``} name="name" cols="col-span-4" label="Nombre" type="text" />
                    <InputDefPatient getName change={HandleChange} value={data ? data.lastname : ``} name="lastname" cols="col-span-4" label="Apellido" type="text" />
                    <InputDefPatient getName change={HandleChange} value={data ? data.email : ``} name="email" cols="col-span-4" label="Correo" type="email" />
                    <InputDefPatient getName change={HandleChange} value={data ? data.birtdate : ``} name="birtdate" cols="col-span-2" label="F/N" type="date" />

                    <InputDefPatient getName change={HandleChange} value={data ? data.age : ``} name="age" cols="col-span-2" label="Edad" type="number" />
                    <SelectDefPatient change={HandleChange} value={data ? data.genero : ``} name="genero" cols="col-span-3" label="Genero" options={[`Masculino`, `Femenino`]} />
                    <SelectDefPatient change={HandleChange} value={data ? data.edoCivil : ``} name="edoCivil" cols="col-span-3" label="Edo Civíl" options={[`Soltero`, `Casado`, `Viudo`, `Divorciado`]} />
                    <InputDefPatient getName change={HandleChange} value={data ? data.ocupacion : ``} name="ocupacion" cols="col-span-2" label="Ocupacion" type="text" />
                    <InputDefPatient getName change={HandleChange} value={data ? data.phone : ``} name="phone" cols="col-span-2" label="Telefono" type="text" />
                    <InputDefPatient getName change={HandleChange} value={data ? data.address : ``} name="address" cols="col-span-10" label="Dirección" type="text" />

                    <div className="col-span-12 grid lg:grid-cols-2 mt-4 p-2 gap-5">

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Heredofamiliares" />

                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Diabetes"] ? heredofamiliares["Diabetes"] : ``} name="diabetes" cols="" label="Diabetes" type="text" />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Cancer"] ? heredofamiliares["Cancer"] : ``} name="cancer" cols="" label="Cancer" type="text" />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Dislipidemia"] ? heredofamiliares["Dislipidemia"] : ``} name="dislipidemia" cols="" label="Dislipidemia" type="text" />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Anemia"] ? heredofamiliares["Anemia"] : ``} name="anemia" cols="" label="Anemia" type="text" />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Hipertención arterial"] ? heredofamiliares["Hipertención arterial"] : ``} name="hipertension_arterial" cols="" label="Hipertención arterial" type="text" />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Enfermedades renales"] ? heredofamiliares["Enfermedades renales"] : ``} name="enfermedades_renales" cols="" label="Enfermedades renales" type="text" />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Otros"] ? heredofamiliares["Otros"] : ``} name="otros" cols="" label="Otros" type="text" />

                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales Patológicos" />

                            <InputDefPatient value={personalesPatologicos && personalesPatologicos[`Diabetes`] ? personalesPatologicos[`Diabetes`] : ``} change={HandleChangePersonalesPatologicos} name="diabetes" cols="" label="Diabetes" type="text" />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Cancer"] ? personalesPatologicos["Cancer"] : ``} change={HandleChangePersonalesPatologicos} name="cancer" cols="" label="Cancer" type="text" />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Dislipidemia"] ? personalesPatologicos["Dislipidemia"] : ``} change={HandleChangePersonalesPatologicos} name="dislipidemia" cols="" label="Dislipidemia" type="text" />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Anemia"] ? personalesPatologicos["Anemia"] : ``} change={HandleChangePersonalesPatologicos} name="anemia" cols="" label="Anemia" type="text" />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Hipertención arterial"] ? personalesPatologicos["Hipertención arterial"] : ``} change={HandleChangePersonalesPatologicos} name="hipertension_arterial" cols="" label="Hipertención arterial" type="text" />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Enfermedades renales"] ? personalesPatologicos["Enfermedades renales"] : ``} change={HandleChangePersonalesPatologicos} name="enfermedades_renales" cols="" label="Enfermedades renales" type="text" />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Otros"] ? personalesPatologicos["Otros"] : ``} change={HandleChangePersonalesPatologicos} name="otros" cols="" label="Otros" type="text" />
                        </div>

                        <div className="grid">
                            <div className="grid gap-2 border rounded">
                                <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales No Patológicos" />

                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Ejercicio o Deporte`] ? personalesNoPatologicos[`Ejercicio o Deporte`] : ``} change={HandleChangePersonalesNoPatologicos} name="diabetes" cols="" label="Ejercicio o Deporte" type="text" placeholder="Fecuencia y horario" />
                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Toxitosinas`] ? personalesNoPatologicos[`Toxitosinas`] : ``} change={HandleChangePersonalesNoPatologicos} name="cancer" cols="" label="Toxitosinas" type="text" placeholder="Frecuencia" />
                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Fuma?`] ? personalesNoPatologicos[`Fuma`] : ``} change={HandleChangePersonalesNoPatologicos} name="Fuma" cols="" label="Fuma?" type="text" placeholder="Frecuencia" />
                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Consume Alcohol?`] ? personalesNoPatologicos[`Consume Alcohol`] : ``} change={HandleChangePersonalesNoPatologicos} name="Consume Alcohol" cols="" label="Consume Alcohol?" type="text" placeholder="Frecuencia" />
                                <SelectDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Consume Café?`] ? personalesNoPatologicos[`Consume Café?`] : ``} change={HandleChangePersonalesNoPatologicos} name="Consume Café?" cols="" label="Consume Café?" options={[`0 taza`,`1 taza`,`2 tazas`,`3 tazas o más`]} />
                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Utiliza sustancias ilícitas?`] ? personalesNoPatologicos[`Utiliza sustancias ilícitas?`] : ``} change={HandleChangePersonalesNoPatologicos} name="Utiliza sustancias ilícitas" cols="" label="Utiliza sustancias ilícitas?" type="text" placeholder="Frecuencia" />
                                <SelectDefPatient value={personalesNoPatologicos && personalesNoPatologicos[`Indique horas de sueño`] ? personalesNoPatologicos[`Indique horas de sueño`] : ``} change={HandleChangePersonalesNoPatologicos} name="Indique horas de sueño" cols="" label="Indique horas de sueño" options={[`menos de 8 horas`,`8 horas`,`más de 8 horas`]} />
                            </div>
                            <div className="grid gap-2 grid-cols-12 border rounded">
                                <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Gineco-obstétricos" />

                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`G`] ? ginecoObstretricos[`G`] : ``} change={HandleChangeGinecoObstretricos} name="g" cols="col-span-3" label="G" type="text" placeholder="escribir aquí" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`P`] ? ginecoObstretricos[`P`] : ``} change={HandleChangeGinecoObstretricos} name="p" cols="col-span-3" label="P" type="text" placeholder="escribir aquí" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`C`] ? ginecoObstretricos[`C`] : ``} change={HandleChangeGinecoObstretricos} name="c" cols="col-span-3" label="C" type="text" placeholder="escribir aquí" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`FUM`] ? ginecoObstretricos[`FUM`] : ``} change={HandleChangeGinecoObstretricos} name="fum" cols="col-span-3" label="FUM" type="text" placeholder="escribir aquí" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`FUP/C`] ? ginecoObstretricos[`FUP/C`] : ``} change={HandleChangeGinecoObstretricos} name="fup_c" cols="col-span-6" label="FUP/C" type="text" placeholder="escribir aquí" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`PPG`] ? ginecoObstretricos[`PPG`] : ``} change={HandleChangeGinecoObstretricos} name="ppg" cols="col-span-6" label="PPG" type="text" placeholder="escribir aquí" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`Anticonceptivos`] ? ginecoObstretricos[`Anticonceptivos`] : ``} change={HandleChangeGinecoObstretricos} name="anticonceptivos" cols="col-span-12" label="Anticonceptivos" type="text" placeholder="escribir aquí" />
                            </div> 
                        </div>

                        <div className="grid grid-cols-4 border rounded">
                            <Subtitle customClass="col-span-4 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Transtornos gastrointestinales" />

                            <Text customClass="text-lg font-bold col-span-1" text={`Sintoma`} />
                            <Text customClass="text-lg font-bold col-span-1" text={`Frecuencia`} />
                            <Text customClass="text-lg font-bold col-span-1" text={`Sintoma`} />
                            <Text customClass="text-lg font-bold col-span-1" text={`Frecuencia`} />

                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Vómito"] ? trastornosGastroinstestinales["Vómito"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="vomito" cols="col-span-2" label="Vómito" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Diarrea"] ? trastornosGastroinstestinales["Diarrea"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="diarrea" cols="col-span-2" label="Diarrea" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Estreñimiento"] ? trastornosGastroinstestinales["Estreñimiento"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="estrenimiento" cols="col-span-2" label="Estreñimiento" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Colitis"] ? trastornosGastroinstestinales["Colitis"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="colitis" cols="col-span-2" label="Colitis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Gastritis"] ? trastornosGastroinstestinales["Gastritis"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="gastritis" cols="col-span-2" label="Gastritis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Colitritis"] ? trastornosGastroinstestinales["Colitritis"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="colitritis" cols="col-span-2" label="Colitritis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Nauseas"] ? trastornosGastroinstestinales["Nauseas"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="nauseas" cols="col-span-2" label="Náuseas" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Reflujo"] ? trastornosGastroinstestinales["Reflujo"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="reflujo" cols="col-span-2" label="Reflujo" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Disfagia"] ? trastornosGastroinstestinales["Disfagia"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="disfagia" cols="col-span-2" label="Disfagia" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Flatulencias"] ? trastornosGastroinstestinales["Flatulencias"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="flatulencias" cols="col-span-2" label="Flatulencias" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Distención"] ? trastornosGastroinstestinales["Distención"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="distencion" cols="col-span-2" label="Distención" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Piriosis"] ? trastornosGastroinstestinales["Piriosis"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="pirosis" cols="col-span-2" label="Piriosis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={trastornosGastroinstestinales && trastornosGastroinstestinales["Otros"] ? trastornosGastroinstestinales["Otros"] : ``} change={HandleChangeTrastornosGastroinstestinales} name="otros" cols="col-span-2" label="Otros" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="col-span-2 grid grid-cols-12 gap-2 border rounded">
                            <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Habitos de Alimentación" />

                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Con quien come?`] ? habitosAlimentacion[`Con quien come?`] : ``} change={HandleChangeHabitosAlimentacion} name="con_quien_come" label="Con quien come?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Quien prepara sus alimentos?`] ? habitosAlimentacion[`Quien prepara sus alimentos?`] : ``} change={HandleChangeHabitosAlimentacion} name="quien_prepara_alimentos" label="Quien prepara sus alimentos?" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas al día`] ? habitosAlimentacion[`Comidas al día`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_al_dia" label="Comidas al día" cols="col-span-3" type="number" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Hace meriendas`] ? habitosAlimentacion[`Hace meriendas`] : ``} change={HandleChangeHabitosAlimentacion} name="hace_meriendas" label="Hace meriendas" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Horario de comida`] ? habitosAlimentacion[`Horario de comida`] : ``} change={HandleChangeHabitosAlimentacion} name="horario_de_comida" label="Horario de comida" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas en casa`] ? habitosAlimentacion[`Comidas en casa`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_en_casa" label="Comidas en casa" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas fuera de casa`] ? habitosAlimentacion[`Comidas fuera de casa`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_fuera_de_casa" label="Comidas fuera de casa" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas fuera de casa en fin de semana`] ? habitosAlimentacion[`Comidas fuera de casa en fin de semana`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_fuera_de_casa_en_fin_de_semana" label="Comidas fuera de casa en fin de semana" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Hora de mayor apetito`] ? habitosAlimentacion[`Hora de mayor apetito`] : ``} change={HandleChangeHabitosAlimentacion} name="hora_mayor_apetito" label="Hora de mayor apetito" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Como considera su apetito?`] ? habitosAlimentacion[`Como considera su apetito?`] : ``} change={HandleChangeHabitosAlimentacion} name="como_considera_su_apetito" label="Como considera su apetito?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Suplementos`] ? habitosAlimentacion[`Suplementos`] : ``} change={HandleChangeHabitosAlimentacion} name="suplementos" label="Suplementos" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Agua`] ? habitosAlimentacion[`Agua`] : ``} change={HandleChangeHabitosAlimentacion} name="agua" label="Agua" cols="col-span-12" type="text" placeholder="Escribir aquí" />

                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Alergias`] ? habitosAlimentacion[`Alergias`] : ``} change={HandleChangeHabitosAlimentacion} name="alergias" label="Alergias" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Intolerancias`] ? habitosAlimentacion[`Intolerancias`] : ``} change={HandleChangeHabitosAlimentacion} name="intolerancias" label="Intolerancias" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Dietas anteriores`] ? habitosAlimentacion[`Dietas anteriores`] : ``} change={HandleChangeHabitosAlimentacion} name="dietas_anteriores" label="Dietas anteriores" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Medicamento para bajar de peso`] ? habitosAlimentacion[`Medicamento para bajar de peso`] : ``} change={HandleChangeHabitosAlimentacion} name="medicamento_para_bajar_de_peso" label="Medicamento para bajar de peso" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="col-span-2 grid gap-2 border rounded">
                            <Subtitle customClass=" bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recordatorio 24 horas" />

                            <InputDefPatient value={redordatorio24Horas && redordatorio24Horas[`Desayuno`] ? redordatorio24Horas[`Desayuno`] : ``} change={HandleChangeRedordatorio24Horas} name="desayuno" label={"Desayuno"} cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={redordatorio24Horas && redordatorio24Horas[`Merienda Matutina`] ? redordatorio24Horas[`Merienda Matutina`] : ``} change={HandleChangeRedordatorio24Horas} name="merienda" label={"Merienda Matutina"} cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={redordatorio24Horas && redordatorio24Horas[`Comida`] ? redordatorio24Horas[`Comida`] : ``} change={HandleChangeRedordatorio24Horas} name="comida" label={"Comida"} cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={redordatorio24Horas && redordatorio24Horas[`Merienda`] ? redordatorio24Horas[`Merienda`] : ``} change={HandleChangeRedordatorio24Horas} name="merienda" label={"Merienda"} cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={redordatorio24Horas && redordatorio24Horas[`Cena`] ? redordatorio24Horas[`Cena`] : ``} change={HandleChangeRedordatorio24Horas} name="cena" label={"Cena"} cols="" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="col-span-2 grid grid-cols-3 gap-2 border rounded">
                            <Subtitle customClass="col-span-3 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Examenes de Laboratorio" />

                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Colesterol HDL`] ? evaluacionBoiquimica[`Colesterol HDL`] : ``} label="Colesterol HDL" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Colesterol LDL`] ? evaluacionBoiquimica[`Colesterol LDL`] : ``} label="Colesterol LDL" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Triglicéridos`] ? evaluacionBoiquimica[`Triglicéridos`] : ``} label="Triglicéridos" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Glucemia en ayunas`] ? evaluacionBoiquimica[`Glucemia en ayunas`] : ``} label="Glucemia en ayunas" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Hemoglobina`] ? evaluacionBoiquimica[`Hemoglobina`] : ``} label="Hemoglobina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Hemoglobina Glicosilada`] ? evaluacionBoiquimica[`Hemoglobina Glicosilada`] : ``} label="Hemoglobina Glicosilada" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Ácido úrico`] ? evaluacionBoiquimica[`Ácido úrico`] : ``} label="Ácido úrico" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Creatinina`] ? evaluacionBoiquimica[`Creatinina`] : ``} label="Creatinina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Proteína C Reactiva`] ? evaluacionBoiquimica[`Proteína C Reactiva`] : ``} label="Proteína C Reactiva" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Ferritina`] ? evaluacionBoiquimica[`Ferritina`] : ``} label="Ferritina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Vitamina D`] ? evaluacionBoiquimica[`Vitamina D`] : ``} label="Vitamina D" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Vitamina B12`] ? evaluacionBoiquimica[`Vitamina B12`] : ``} label="Vitamina B12" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Folato`] ? evaluacionBoiquimica[`Folato`] : ``} label="Folato" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Hierro`] ? evaluacionBoiquimica[`Hierro`] : ``} label="Hierro" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Zinc`] ? evaluacionBoiquimica[`Zinc`] : ``} label="Zinc" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Sodio`] ? evaluacionBoiquimica[`Sodio`] : ``} label="Sodio" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Potasio`] ? evaluacionBoiquimica[`Potasio`] : ``} label="Potasio" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" value={evaluacionBoiquimica && evaluacionBoiquimica[`Otros`] ? evaluacionBoiquimica[`Otros`] : ``} label="Otros" cols="" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 border rounded">
                            <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Indicadores Antropométrico" />

                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`Peso ideal`] ? indicadorAntropometico[`Peso ideal`] : ``} change={HandleChangeIndicadorAntropometico} name="peso_ideal" label="Peso ideal" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`Peso Actual`] ? indicadorAntropometico[`Peso Actual`] : ``} change={HandleChangeIndicadorAntropometico} name="peso_actual" label="Peso Actual" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`Talla`] ? indicadorAntropometico[`Talla`] : ``} change={HandleChangeIndicadorAntropometico} name="talla" label="Talla" cols="col-span-4" type="number" placeholder="Escribir aquí" />
                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`Peso máximo`] ? indicadorAntropometico[`Peso máximo`] : ``} change={HandleChangeIndicadorAntropometico} name="peso_maximo" label="Peso máximo" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`Peso mínimo`] ? indicadorAntropometico[`Peso mínimo`] : ``} change={HandleChangeIndicadorAntropometico} name="peso_minimo" label="Peso mínimo" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`Peso habitual`] ? indicadorAntropometico[`Peso habitual`] : ``} change={HandleChangeIndicadorAntropometico} name="peso_habitual" label="Peso habitual" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={indicadorAntropometico && indicadorAntropometico[`IMC`] ? indicadorAntropometico[`IMC`] : ``} change={HandleChangeIndicadorAntropometico} name="imc" label="IMC" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Diagnostico Nutricional" />

                            <TextareaDefPatient value={recomendaciones && recomendaciones.diagnostico ? recomendaciones.diagnostico : ``} change={HandleChangeRecomendaciones} getName col name="diagnostico" label="" cols="" placeholder="Escribir aquí" />
                        </div>

                        <div className="grid col-span-2 gap-2 border rounded">
                            {/* <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Kilo calorías totales" /> */}

                            <table className="table table-zebra">
                                <tr className="bg-slate-800 text-white ">
                                    <td></td>
                                    <td>%</td>
                                    <td>Kilo calorías</td>
                                    <td>Gramos</td>
                                    <td>Raciones</td>
                                </tr>
                                <tr>
                                    <td>Proteínas</td>
                                    <td><InputDefPatient getName value={proteinas ? proteinas.porcentaje.toString() : `-`} change={HandleChangeProteinas} name="porcentaje" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={proteinas ? proteinas.kilo.toString() : `-`} change={HandleChangeProteinas} name="kilo" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={proteinas ? proteinas.gr.toString() : `-`} change={HandleChangeProteinas} name="gr" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={proteinas ? proteinas.rc.toString() : `-`} change={HandleChangeProteinas} name="rc" cols="" label="Escriba aquí" type="text" /></td>
                                </tr>
                                <tr>
                                    <td>Lípidos</td>
                                    <td><InputDefPatient getName value={lipidos ? lipidos.porcentaje.toString() : `-`} change={HandleChangeLipidos} name="porcentaje" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={lipidos ? lipidos.kilo.toString() : `-`} change={HandleChangeLipidos} name="kilo" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={lipidos ? lipidos.gr.toString() : `-`} change={HandleChangeLipidos} name="gr" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={lipidos ? lipidos.rc.toString() : `-`} change={HandleChangeLipidos} name="rc" cols="" label="Escriba aquí" type="text" /></td>
                                </tr>
                                <tr>
                                    <td>Carbohidratos</td>
                                    <td><InputDefPatient getName value={carbohidratos ? carbohidratos.porcentaje.toString() : `-`} change={HandleChangeCarbohidratos} name="porcentaje" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={carbohidratos ? carbohidratos.kilo.toString() : `-`} change={HandleChangeCarbohidratos} name="kilo" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={carbohidratos ? carbohidratos.gr.toString() : `-`} change={HandleChangeCarbohidratos} name="gr" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName value={carbohidratos ? carbohidratos.rc.toString() : `-`} change={HandleChangeCarbohidratos} name="rc" cols="" label="Escriba aquí" type="text" /></td>
                                </tr>
                            </table>
                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Datos Extras" />

                            <TextareaDefPatient value={recomendaciones && recomendaciones.sleep ? recomendaciones.sleep : ``} change={HandleChangeRecomendaciones} getName col name="sleep" label="" cols="" placeholder="Escribir aquí" />
                        </div>

                        {/* <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recomiendación Ejercicio" />

                            <TextareaDefPatient value={recomendaciones && recomendaciones.exercises ? recomendaciones.exercises : ``} change={HandleChangeRecomendaciones} getName col name="exercies" label="" cols="" placeholder="Escribir aquí" />
                        </div> */}
                    </div>
                </div>
            </form>
        </div>
    )
}
