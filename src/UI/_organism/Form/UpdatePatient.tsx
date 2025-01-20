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
            setRecomendaciones({ diagnostico: userWithData.diagnostico, sleep: userWithData.sleep, exercises: userWithData.exercises });

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

                    <div className="col-span-12 grid lg:grid-cols-2 mt-4 p-2 gap-5">

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Heredofamiliares" />

                            <SelectDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Diabetes"] ? heredofamiliares["Diabetes"] : ``} name="diabetes" cols="" label="Diabetes" options={[`Si`, `No`]} />
                            <SelectDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Cancer"] ? heredofamiliares["Cancer"] : ``} name="cancer" cols="" label="Cancer" options={[`Si`, `No`]} />
                            <SelectDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Dislipidemia"] ? heredofamiliares["Dislipidemia"] : ``} name="dislipidemia" cols="" label="Dislipidemia" options={[`Si`, `No`]} />
                            <SelectDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Anemia"] ? heredofamiliares["Anemia"] : ``} name="anemia" cols="" label="Anemia" options={[`Si`, `No`]} />
                            <SelectDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Hipertención arterial"] ? heredofamiliares["Hipertención arterial"] : ``} name="hipertension_arterial" cols="" label="Hipertención arterial" options={[`Si`, `No`]} />
                            <SelectDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Enfermedades renales"] ? heredofamiliares["Enfermedades renales"] : ``} name="enfermedades_renales" cols="" label="Enfermedades renales" options={[`Si`, `No`]} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} value={heredofamiliares && heredofamiliares["Otros"] ? heredofamiliares["Otros"] : ``} name="otros" cols="" label="Otros" type="text" />

                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales Patológicos" />

                            <SelectDefPatient value={personalesPatologicos && personalesPatologicos[`Diabetes`] ? personalesPatologicos[`Diabetes`] : ``} change={HandleChangePersonalesPatologicos} name="diabetes" cols="" label="Diabetes" options={[`Si`, `No`]} />
                            <SelectDefPatient value={personalesPatologicos && personalesPatologicos["Cancer"] ? personalesPatologicos["Cancer"] : ``} change={HandleChangePersonalesPatologicos} name="cancer" cols="" label="Cancer" options={[`Si`, `No`]} />
                            <SelectDefPatient value={personalesPatologicos && personalesPatologicos["Dislipidemia"] ? personalesPatologicos["Dislipidemia"] : ``} change={HandleChangePersonalesPatologicos} name="dislipidemia" cols="" label="Dislipidemia" options={[`Si`, `No`]} />
                            <SelectDefPatient value={personalesPatologicos && personalesPatologicos["Anemia"] ? personalesPatologicos["Anemia"] : ``} change={HandleChangePersonalesPatologicos} name="anemia" cols="" label="Anemia" options={[`Si`, `No`]} />
                            <SelectDefPatient value={personalesPatologicos && personalesPatologicos["Hipertención arterial"] ? personalesPatologicos["Hipertención arterial"] : ``} change={HandleChangePersonalesPatologicos} name="hipertension_arterial" cols="" label="Hipertención arterial" options={[`Si`, `No`]} />
                            <SelectDefPatient value={personalesPatologicos && personalesPatologicos["Enfermedades renales"] ? personalesPatologicos["Enfermedades renales"] : ``} change={HandleChangePersonalesPatologicos} name="enfermedades_renales" cols="" label="Enfermedades renales" options={[`Si`, `No`]} />
                            <InputDefPatient value={personalesPatologicos && personalesPatologicos["Otros"] ? personalesPatologicos["Otros"] : ``} change={HandleChangePersonalesPatologicos} name="otros" cols="" label="Otros" type="text" />
                        </div>

                        <div className="grid">
                            <div className="grid gap-2 border rounded">
                                <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales No Patológicos" />

                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[0] && personalesNoPatologicos[0][1] ? personalesNoPatologicos[0][1] : ``} change={HandleChangePersonalesNoPatologicos} name="diabetes" cols="" label="Ejercicio o Deporte" type="text" placeholder="Fecuencia y horario" />
                                <InputDefPatient value={personalesNoPatologicos && personalesNoPatologicos[1] && personalesNoPatologicos[1][1] ? personalesNoPatologicos[1][1] : ``} change={HandleChangePersonalesNoPatologicos} name="cancer" cols="" label="Toxitosinas" type="text" placeholder="Frecuencia" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`Fuma`] ? ginecoObstretricos[`Fuma`] : ``} change={HandleChangePersonalesNoPatologicos} getName name="Fuma" cols="" label="Fuma?" type="text" placeholder="Frecuencia" />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`Consume Alcohol`] ? ginecoObstretricos[`Consume Alcohol`] : ``} change={HandleChangePersonalesNoPatologicos} getName name="Consume Alcohol" cols="" label="Consume Alcohol?" type="text" placeholder="Frecuencia" />
                                <SelectDefPatient value={ginecoObstretricos && ginecoObstretricos[`Consume Cafe`] ? ginecoObstretricos[`Consume Cafe`] : ``} change={HandleChangePersonalesNoPatologicos} getName name="Consume Cafe" cols="" label="Consume Café?" options={[`0 taza`,`1 taza`,`2 tazas`,`3 tazas o más`]} />
                                <InputDefPatient value={ginecoObstretricos && ginecoObstretricos[`Utiliza sustancias ilícitas`] ? ginecoObstretricos[`Utiliza sustancias ilícitas`] : ``} change={HandleChangePersonalesNoPatologicos} getName name="Utiliza sustancias ilícitas" cols="" label="Utiliza sustancias ilícitas?" type="text" placeholder="Frecuencia" />
                                <SelectDefPatient value={ginecoObstretricos && ginecoObstretricos[`Indique horas de sueño`] ? ginecoObstretricos[`Indique horas de sueño`] : ``} change={HandleChangePersonalesNoPatologicos} getName name="Indique horas de sueño" cols="" label="Indique horas de sueño" options={[`menos de 8 horas`,`8 horas`,`más de 8 horas`]} />
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
                        </div>

                        <div className="col-span-2 grid grid-cols-12 gap-2 border rounded">
                            <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Habitos de Alimentación" />

                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Con quien come?`] ? habitosAlimentacion[`Con quien come?`] : ``} change={HandleChangeHabitosAlimentacion} name="con_quien_come" label="Con quien come?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Quien prepara sus alimentos?`] ? habitosAlimentacion[`Quien prepara sus alimentos?`] : ``} change={HandleChangeHabitosAlimentacion} name="quien_prepara_alimentos" label="Quien prepara sus alimentos?" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas al día`] ? habitosAlimentacion[`Comidas al día`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_al_dia" label="Comidas al día" cols="col-span-3" type="number" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Hace meriendas`] ? habitosAlimentacion[`Hace meriendas`] : ``} change={HandleChangeHabitosAlimentacion} name="hace_meriendas" label="Hace meriendas" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Con que alimentos?`] ? habitosAlimentacion[`Con que alimentos?`] : ``} change={HandleChangeHabitosAlimentacion} name="con_que_alimentos" label="Con que alimentos?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Horario de comida`] ? habitosAlimentacion[`Horario de comida`] : ``} change={HandleChangeHabitosAlimentacion} name="horario_de_comida" label="Horario de comida" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas en casa`] ? habitosAlimentacion[`Comidas en casa`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_en_casa" label="Comidas en casa" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas fuera de casa`] ? habitosAlimentacion[`Comidas fuera de casa`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_fuera_de_casa" label="Comidas fuera de casa" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Comidas fuera de casa en fin de semana`] ? habitosAlimentacion[`Comidas fuera de casa en fin de semana`] : ``} change={HandleChangeHabitosAlimentacion} name="comidas_fuera_de_casa_en_fin_de_semana" label="Comidas fuera de casa en fin de semana" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Hora de mayor apetito`] ? habitosAlimentacion[`Hora de mayor apetito`] : ``} change={HandleChangeHabitosAlimentacion} name="hora_mayor_apetito" label="Hora de mayor apetito" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Como considera su apetito?`] ? habitosAlimentacion[`Como considera su apetito?`] : ``} change={HandleChangeHabitosAlimentacion} name="como_considera_su_apetito" label="Como considera su apetito?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient value={habitosAlimentacion && habitosAlimentacion[`Suplementos`] ? habitosAlimentacion[`Suplementos`] : ``} change={HandleChangeHabitosAlimentacion} name="suplementos" label="Suplementos" cols="col-span-5" type="text" placeholder="Escribir aquí" />

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

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recomendación Sueño" />

                            <TextareaDefPatient value={recomendaciones && recomendaciones.sleep ? recomendaciones.sleep : ``} change={HandleChangeRecomendaciones} getName col name="sleep" label="" cols="" placeholder="Escribir aquí" />
                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recomiendación Ejercicio" />

                            <TextareaDefPatient value={recomendaciones && recomendaciones.exercises ? recomendaciones.exercises : ``} change={HandleChangeRecomendaciones} getName col name="exercies" label="" cols="" placeholder="Escribir aquí" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
