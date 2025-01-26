import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../entorno";
import { REQUETS_GET_TOKEN } from "../../utils/req/RequetsOptions";
import Subtitle from "../_atom/Subtitle";
import Button from "../_atom/Button";
import ButtonHandler from "../../_handler/ButtonsHandler";
import { Icono } from "../../_handler/IconHandler";
import TextDefPatient from "./Form/TextDefPatient";
import Text from "../_atom/Text";

export default function FichaPaciente({customId,options}:{customId:string,options?:boolean}) {
    const navigate = useNavigate();

    const [proteinas, setProteinas] = useState<{porcentaje:number|String,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});
    const [lipidos, setLipidos] = useState<{porcentaje:number|String,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});
    const [carbohidratos, setCarbohidratos] = useState<{porcentaje:number|String,kilo:number|string,gr:number|string,rc:number|string}>({porcentaje:0,kilo:0,gr:0,rc:0});

    const [load, setLoad] = useState(true);
    const [data, setData] = useState<any | null>(null);
    const [heredofamiliares, setHeredofamiliares] = useState<any[] | null>(null);
    const [personalesPatologicos, setPersonalesPatologicos] = useState<any[] | null>(null);
    const [personalesNoPatologicos, setPersonalesNoPatologicos] = useState<any[] | null>(null);
    const [ginecoObstretricos, setGinecoObstretricos] = useState<any[] | null>(null);
    const [trastornosGastroinstestinales, setTrastornosGastroinstestinales] = useState<any[] | null>(null);
    const [habitosAlimentacion, setHabitosAlimentacion] = useState<any[] | null>(null);
    const [redordatorio24Horas, setRedordatorio24Horas] = useState<any[] | null>(null);
    const [indicadorAntropometico, setIndicadorAntropometico] = useState<any[] | null>(null);
    const [recomendaciones, setRecomendaciones] = useState<any | null>(null);

    useEffect(() => {
        const ExecuteRequets = async () => {
            setLoad(true);
            const url = `${API}/patient/${customId}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();
            const userNotPatient = { ...json.body.body.data, patientData: null }
            const userWithData = json.body.body.data.patientData;

            setData(userNotPatient);
            setHeredofamiliares(userWithData.heredofamiliares);
            setPersonalesPatologicos(userWithData.personalesPatologicos);
            setPersonalesNoPatologicos(userWithData.personalesNPatologicos);
            setGinecoObstretricos(userWithData.ginecoObstretricos);
            setTrastornosGastroinstestinales(userWithData.trastornosGastroinstestinales);
            setHabitosAlimentacion(userWithData.habitosAlimentacion);
            setRedordatorio24Horas(userWithData.redordatorio24Horas);
            setIndicadorAntropometico(userWithData.indicadorAntropometico);
            setRecomendaciones({ diagnostico: userWithData.diagnostico, sleep: userWithData.sleep, exercises: userWithData.exercises, });

            setProteinas({ porcentaje:userWithData.proteinasPercentaje, gr:userWithData.proteinasGramos,kilo:userWithData.proteinasKilo,rc:userWithData.proteinasRacion })
            setLipidos({ porcentaje:userWithData.lipidosPercentaje, gr:userWithData.lipidosGramos,kilo:userWithData.lipidosKilo,rc:userWithData.lipidosRacion })
            setCarbohidratos({ porcentaje:userWithData.carbohidratosPercentaje, gr:userWithData.carbohidratosGramos,kilo:userWithData.carbohidratosKilo,rc:userWithData.carbohidratosRacion })

            setLoad(false);
        }
        ExecuteRequets();
    }, [])

    return (
        <div>
            {
                load
                    ? <div className="flex py-5 justify-center items-center">
                        <i className="loading loading-spinner"></i>
                    </div>
                    :
                    <div className="grid gap-4">
                        <div className="flex justify-between">
                            <Subtitle customClass="text-2xl font-bold" text={`Ficha: ${data.name} ${data.lastname}`} />
                            {options && <div className="flex gap-3">
                                <Button
                                    click={() => navigate(`/dashboard/patient/create`, { replace: true })}
                                    customClass={`${ButtonHandler({ param: `create` })} btn-sm`}
                                    ico={Icono({ ico: `create` })}
                                    text="Crear"
                                />
                                <Button
                                    click={() => navigate(`/dashboard/patient/update/${customId}`, { replace: true })}
                                    customClass={`${ButtonHandler({ param: `update` })} btn-sm`}
                                    ico={Icono({ ico: `update` })}
                                    text="Actualizar"
                                />
                                <Button
                                    click={() => navigate(`/dashboard/patient`, { replace: true })}
                                    customClass={`${ButtonHandler({ param: `list` })} btn-sm`}
                                    ico={Icono({ ico: `list` })}
                                    text="Lista"
                                />
                            </div>}
                        </div>

                        <div className="grid grid-cols-12 p-2 gap-2">
                            {
                                data && <>
                                    <TextDefPatient item={[`Nombre`, data.name]} cols="col-span-4" />
                                    <TextDefPatient item={[`Apellido`, data.lastname]} cols="col-span-4" />
                                    <TextDefPatient item={[`F/N`, data.fn.split(`T`)[0]]} cols="col-span-4" />
                                    <TextDefPatient item={[`Edad`, data.age]} cols="col-span-2" />

                                    <TextDefPatient item={[`Sexo`, data.genero]} cols="col-span-2" />
                                    <TextDefPatient item={[`Estado Civíl`, data.edoCivil]} cols="col-span-3" />
                                    <TextDefPatient item={[`Ocupación`, data.ocupacion]} cols="col-span-3" />
                                    <TextDefPatient item={[`Teléfono`, data.phone]} cols="col-span-2" />
                                </>
                            }
                            {/* <TextDefPatient item={[`Dirección`,data.name]} cols="col-span-2" /> */}


                            <div className="col-span-12 grid lg:grid-cols-2 mt-4 p-2 gap-5">

                                <div className="grid gap-2 border rounded">
                                    <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Heredofamiliares" />

                                    {
                                        heredofamiliares && heredofamiliares.map((item) => <TextDefPatient cols="" item={item} />)
                                    }
                                </div>

                                <div className="grid gap-2 border rounded">
                                    <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales Patológicos" />
                                    {
                                        personalesPatologicos && personalesPatologicos.map((item) => <TextDefPatient cols="col-span-1" item={item} />)
                                    }
                                </div>

                                <div className="grid">
                                    <div className="grid gap-2 border rounded">
                                        <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Personales No Patológicos" />

                                        {
                                            personalesNoPatologicos && personalesNoPatologicos.map((item) => <TextDefPatient cols="col-span-1" item={item} />)
                                        }
                                    </div>
                                    <div className="grid gap-2 grid-cols-12 border rounded">
                                        <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Antecedentes Gineco-obstétricos" />

                                        {
                                            ginecoObstretricos && ginecoObstretricos.map((item) => <TextDefPatient cols="col-span-4" col item={item} />)
                                        }
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 border rounded">
                                    <Subtitle customClass="col-span-4 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Transtornos gastrointestinales" />

                                    <Text customClass="text-lg font-bold col-span-1" text={`Sintoma`} />
                                    <Text customClass="text-lg font-bold col-span-1" text={`Frecuencia`} />
                                    <Text customClass="text-lg font-bold col-span-1" text={`Sintoma`} />
                                    <Text customClass="text-lg font-bold col-span-1" text={`Frecuencia`} />

                                    {
                                        trastornosGastroinstestinales && trastornosGastroinstestinales.map((item) => <TextDefPatient cols="col-span-2" item={item} />)
                                    }
                                </div>

                                <div className="col-span-2 grid grid-cols-12 gap-2 border rounded">
                                    <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Habitos de Alimentación" />

                                    {
                                        habitosAlimentacion && habitosAlimentacion.map((item) => <TextDefPatient cols="col-span-4" col item={item} />)
                                    }
                                </div>

                                <div className="col-span-2 grid gap-2 border rounded">
                                    <Subtitle customClass=" bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recordatorio 24 horas" />

                                    {
                                        redordatorio24Horas && redordatorio24Horas.map((item) => <TextDefPatient cols="" item={item} />)
                                    }
                                </div>

                                <div className="grid grid-cols-12 gap-2 border rounded">
                                    <Subtitle customClass="col-span-12 bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Indicadores Antropométrico" />
                                    {
                                        indicadorAntropometico && indicadorAntropometico.map((item) => <TextDefPatient cols="col-span-6" col item={item} />)
                                    }
                                </div>

                                <div className="flex flex-col bg-white rounded-b gap-2 border rounded">
                                    <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Diagnostico Nutricional" />

                                    <Text customClass="h-full px-3" text={recomendaciones.diagnostico} />
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
                                    <td><Text customClass="" text={proteinas ? proteinas.porcentaje : `-`} /></td>
                                    <td><Text customClass="" text={proteinas ? proteinas.kilo : `-`} /></td>
                                    <td><Text customClass="" text={proteinas ? proteinas.gr : `-`} /></td>
                                    <td><Text customClass="" text={proteinas ? proteinas.rc : `-`} /></td>
                                </tr>
                                <tr>
                                    <td>Lípidos</td>
                                    <td><Text customClass="" text={lipidos ? lipidos.porcentaje : `-`} /></td>
                                    <td><Text customClass="" text={lipidos ? lipidos.kilo : `-`} /></td>
                                    <td><Text customClass="" text={lipidos ? lipidos.gr : `-`} /></td>
                                    <td><Text customClass="" text={lipidos ? lipidos.rc : `-`} /></td>
                                </tr>
                                <tr>
                                    <td>Carbohidratos</td>
                                    <td><Text customClass="" text={carbohidratos ? carbohidratos.porcentaje : `-`} /></td>
                                    <td><Text customClass="" text={carbohidratos ? carbohidratos.kilo : `-`} /></td>
                                    <td><Text customClass="" text={carbohidratos ? carbohidratos.gr : `-`} /></td>
                                    <td><Text customClass="" text={carbohidratos ? carbohidratos.rc : `-`} /></td>
                                </tr>
                            </table>
                        </div>

                                <div className="col-span-2 flex flex-col bg-white rounded-b gap-2 border rounded">
                                    <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Datos extras" />

                                    <Text customClass="h-full px-3" text={recomendaciones.sleep} />
                                </div>

                                {/* <div className="flex flex-col bg-white rounded-b gap-2 border rounded">
                                    <Subtitle customClass="bg-slate-800 text-white rounded-t py-2 text-center font-bold" text="Recomiendación Ejercicio" />

                                    <Text customClass="h-full px-3 py-2" text={recomendaciones.exercises} />
                                </div> */}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
