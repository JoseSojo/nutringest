import { FormEvent, useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";
import { Icono } from "../../../_handler/IconHandler";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../_context/NotificationContext";
import { API } from "../../../entorno";
import { REQUETS_POST_TOKEN } from "../../../utils/req/RequetsOptions";
import InputDefPatient from "./InputDefPatient";
import SelectDefPatient from "./SelectDefPatient";
import Text from "../../_atom/Text";
import TextareaDefPatient from "./TextareaDefPatient";

export default function CreatePatient() {

    const navigate = useNavigate();
    const noti = useNotification();

    const [proteinas, setProteinas] = useState<{porcentaje:number,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});
    const [lipidos, setLipidos] = useState<{porcentaje:number,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});
    const [carbohidratos, setCarbohidratos] = useState<{porcentaje:number,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});

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
                evaluacionBoiquimica,
                kilocalorias: {
                    proteinas,
                    lipidos,
                    carbohidratos
                },
            }

            const url = `${API}/patient/create`;
            const req = { ...REQUETS_POST_TOKEN, body: JSON.stringify(CustomData) };
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

    const HandleChangeLipidos = ({ name, value }: { value: string, name: string }) => {
        setLipidos({...lipidos, [name]:value});
    }

    const HandleChangeProteinas = ({ name, value }: { value: string, name: string }) => {
        setProteinas({...proteinas, [name]:value});
    }

    const HandleChangeCarbohidratos = ({ name, value }: { value: string, name: string }) => {
        setCarbohidratos({...carbohidratos, [name]:value});
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

    const HandleChangeEvaluacionBioquímica = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...evaluacionBoiquimica, [name]: value }
        setEvaluacionBoiquimica(prev);
    }

    const HandleChangeIndicadorAntropometico = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...indicadorAntropometico, [name]: value }
        setIndicadorAntropometico(prev);
    }

    const HandleChangeRecomendaciones = ({ name, value }: { value: string, name: string }) => {
        const prev = { ...recomendaciones, [name]: value }
        setRecomendaciones(prev);
    }

    return (
        <div>
            <form onSubmit={HanldeSubmit} className="grid gap-4">
                <div className="flex justify-between">
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

                <div className="grid grid-cols-12 p-2 gap-2">
                    <InputDefPatient getName change={HandleChange} name="name" cols="col-span-4" label="Nombre" type="text" />
                    <InputDefPatient getName change={HandleChange} name="lastname" cols="col-span-4" label="Apellido" type="text" />
                    <InputDefPatient getName change={HandleChange} name="email" cols="col-span-4" label="Correo" type="email" />
                    <InputDefPatient getName change={HandleChange} name="birtdate" cols="col-span-2" label="F/N" type="date" />

                    <InputDefPatient getName change={HandleChange} name="age" cols="col-span-2" label="Edad" type="number" />
                    <SelectDefPatient getName change={HandleChange} name="genero" cols="col-span-3" label="Genero" options={[`Masculino`, `Femenino`]} />
                    <SelectDefPatient getName change={HandleChange} name="edoCivil" cols="col-span-3" label="Edo Civíl" options={[`Soltero`, `Casado`, `Viudo`, `Divorciado`]} />
                    <InputDefPatient getName change={HandleChange} name="ocupacion" cols="col-span-2" label="Ocupacion" type="text" />
                    <InputDefPatient getName change={HandleChange} name="phone" cols="col-span-2" label="Telefono" type="text" />
                    <InputDefPatient getName change={HandleChange} name="address" cols="col-span-10" label="Dirección" type="text" />

                    <div className="col-span-12 grid lg:grid-cols-2 mt-4 p-2 gap-5">

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Heredofamiliares" />

                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="diabetes" cols="" label="Diabetes" type={`text`} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="cancer" cols="" label="Cancer" type={`text`} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="dislipidemia" cols="" label="Dislipidemia" type={`text`} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="anemia" cols="" label="Anemia" type={`text`} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="hipertension_arterial" cols="" label="Hipertención arterial" type={`te`} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="enfermedades_renales" cols="" label="Enfermedades renales" type={`text`} />
                            <InputDefPatient change={HandleChangeHeredoFamiliares} name="otros" cols="" label="Otros" type="text" />

                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales Patológicos" />

                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="diabetes" cols="" label="Diabetes" type={`text`} />
                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="cancer" cols="" label="Cancer" type={`text`} />
                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="dislipidemia" cols="" label="Dislipidemia" type={`text`} />
                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="anemia" cols="" label="Anemia" type={`text`} />
                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="hipertension_arterial" cols="" label="Hipertención arterial" type={`te`} />
                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="enfermedades_renales" cols="" label="Enfermedades renales" type={`text`} />
                            <InputDefPatient change={HandleChangePersonalesPatologicos} name="otros" cols="" label="Otros" type="text" />

                        </div>

                        <div className="grid">
                            <div className="grid gap-2 border rounded">
                                <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales No Patológicos" />

                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Ejercicio o Deporte" type="text" placeholder="Fecuencia y horario" />
                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Toxitosinas" type="text" placeholder="Frecuencia" />
                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Fuma?" type="text" placeholder="Frecuencia" />
                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Consume Alcohol?" type="text" placeholder="Frecuencia" />
                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Consume Café?" type="text" />
                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Utiliza sustancias ilícitas?" type="text" placeholder="Frecuencia" />
                                <InputDefPatient change={HandleChangePersonalesNoPatologicos} name="" cols="" label="Indique horas de sueño" type="text" />
                            </div>
                            <div className="grid gap-2 grid-cols-12 border rounded">
                                <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Gineco-obstétricos" />

                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="g" cols="col-span-3" label="G" type="text" placeholder="escribir aquí" />
                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="p" cols="col-span-3" label="P" type="text" placeholder="escribir aquí" />
                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="c" cols="col-span-3" label="C" type="text" placeholder="escribir aquí" />
                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="fum" cols="col-span-3" label="FUM" type="text" placeholder="escribir aquí" />
                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="fup_c" cols="col-span-6" label="FUP/C" type="text" placeholder="escribir aquí" />
                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="ppg" cols="col-span-6" label="PPG" type="text" placeholder="escribir aquí" />
                                <InputDefPatient change={HandleChangeGinecoObstretricos} name="anticonceptivos" cols="col-span-12" label="Anticonceptivos" type="text" placeholder="escribir aquí" />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 border rounded">
                            <Subtitle customClass="col-span-4 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Transtornos gastrointestinales" />

                            <Text customClass="text-lg font-bold col-span-1" text={`Sintoma`} />
                            <Text customClass="text-lg font-bold col-span-1" text={`Frecuencia`} />
                            <Text customClass="text-lg font-bold col-span-1" text={`Sintoma`} />
                            <Text customClass="text-lg font-bold col-span-1" text={`Frecuencia`} />

                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="vomito" cols="col-span-2" label="Vómito" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="diarrea" cols="col-span-2" label="Diarrea" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="estrenimiento" cols="col-span-2" label="Estreñimiento" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="colitis" cols="col-span-2" label="Colitis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="gastritis" cols="col-span-2" label="Gastritis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="colitritis" cols="col-span-2" label="Colitritis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="nauseas" cols="col-span-2" label="Náuseas" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="reflujo" cols="col-span-2" label="Reflujo" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="disfagia" cols="col-span-2" label="Disfagia" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="flatulencias" cols="col-span-2" label="Flatulencias" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="distencion" cols="col-span-2" label="Distención" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="pirosis" cols="col-span-2" label="Piriosis" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeTrastornosGastroinstestinales} name="otros" cols="col-span-2" label="Otros" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="col-span-2 grid grid-cols-12 gap-2 border rounded">
                            <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Habitos de Alimentación" />

                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="con_quien_come" label="Con quien come?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="quien_prepara_alimentos" label="Quien prepara sus alimentos?" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="comidas_al_dia" label="Comidas al día" cols="col-span-3" type="number" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="hace_meriendas" label="Hace Meriendas" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="horario_de_comida" label="Horario de comida" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="comidas_en_casa" label="Comidas en casa" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="comidas_fuera_de_casa" label="Comidas fuera de casa" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="comidas_fuera_de_casa_en_fin_de_semana" label="Comidas fuera de casa en fin de semana" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="hora_mayor_apetito" label="Hora de mayor apetito" cols="col-span-3" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="como_considera_su_apetito" label="Como considera su apetito?" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="suplementos" label="Suplementos" cols="col-span-5" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="agua" label="Agua" cols="col-span-12" type="text" placeholder="Escribir aquí" />

                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="alergias" label="Alergias" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="intolerancias" label="Intolerancias" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="dietas_anteriores" label="Dietas anteriores" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeHabitosAlimentacion} name="medicamento_para_bajar_de_peso" label="Medicamento para bajar de peso" cols="col-span-3" col type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="col-span-2 grid gap-2 border rounded">
                            <Subtitle customClass=" bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recordatorio 24 horas" />

                            <InputDefPatient change={HandleChangeRedordatorio24Horas} name="desayuno" label="Desayuno" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeRedordatorio24Horas} name="merienda" label="Merienda Matutina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeRedordatorio24Horas} name="comida" label="Comida" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeRedordatorio24Horas} name="merienda" label="Merienda" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeRedordatorio24Horas} name="cena" label="Cena" cols="" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="col-span-2 grid grid-cols-3 gap-2 border rounded">
                            <Subtitle customClass="col-span-3 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Examenes de Laboratorio" />

                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Colesterol HDL" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Colesterol LDL" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Triglicéridos" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Glucemia en ayunas" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Hemoglobina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Hemoglobina Glicosilada" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Ácido úrico" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Creatinina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Proteína C Reactiva" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Ferritina" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Vitamina D" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Vitamina B12" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Folato" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Hierro" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Zinc" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Sodio" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Potasio" cols="" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeEvaluacionBioquímica} name="" label="Otros" cols="" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 border rounded">
                            <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Indicadores Antropométrico" />

                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="peso_habitual" label="Peso habitual" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="peso_actual" label="Peso Actual" cols="col-span-4" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="talla" label="Talla" cols="col-span-4" type="number" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="peso_maximo" label="Peso máximo" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="peso_minimo" label="Peso mínimo" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="peso_ideal" label="Peso ideal" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                            <InputDefPatient change={HandleChangeIndicadorAntropometico} name="imc" label="IMC:" cols="col-span-6" type="text" placeholder="Escribir aquí" />
                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Diagnostico Nutricional" />

                            <TextareaDefPatient change={HandleChangeRecomendaciones} getName col name="diagnostico" label="" cols="" placeholder="Escribir aquí" />
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
                                    <td><InputDefPatient getName change={HandleChangeProteinas} name="porcentaje" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeProteinas} name="kilo" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeProteinas} name="gr" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeProteinas} name="rc" cols="" label="Escriba aquí" type="text" /></td>
                                </tr>
                                <tr>
                                    <td>Lípidos</td>
                                    <td><InputDefPatient getName change={HandleChangeLipidos} name="porcentaje" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeLipidos} name="kilo" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeLipidos} name="gr" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeLipidos} name="rc" cols="" label="Escriba aquí" type="text" /></td>
                                </tr>
                                <tr>
                                    <td>Carbohidratos</td>
                                    <td><InputDefPatient getName change={HandleChangeCarbohidratos} name="porcentaje" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeCarbohidratos} name="kilo" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeCarbohidratos} name="gr" cols="" label="Escriba aquí" type="text" /></td>
                                    <td><InputDefPatient getName change={HandleChangeCarbohidratos} name="rc" cols="" label="Escriba aquí" type="text" /></td>
                                </tr>
                            </table>
                        </div>

                        <div className="grid gap-2 border rounded">
                            <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Datos extras" />

                            <TextareaDefPatient change={HandleChangeRecomendaciones} getName col name="sleep" label="" cols="" placeholder="Escribir aquí" />
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}
