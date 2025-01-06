import { useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";

export default function QuoteDescription() {
    const [section, setSection] = useState(`LIST`); // SUBSCRIPTION | PAYMENT

    return <div className="flex flex-col justify-center text-sm items-center mt-3 overflow-hidden">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={`CITA`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`LIST`)} customClass={`tab text-sm ${section === `LIST` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Lista" />
                <Button click={() => setSection(`CREATE`)} customClass={`tab text-sm ${section === `CREATE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Crear" />
                <Button click={() => setSection(`FICHA`)} customClass={`tab text-sm ${section === `FICHA` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Ficha" />
            </div>
        </div>


        {section === `LIST` && List()}
        {section === `CREATE` && Create()}
        {section === `FICHA` && Ficha()}
    </div>
}

function List() {

    return <p>
        En esta sección puedes visualizar las citas que tienes, puedes visualizar el nutricionista, el paciente, cuantas
        listas de intercambio tiene.
    </p>
}

function Create() {

    return <p>
        Para <b>crear</b> una cita debes de pulsar el botón verde "Crear", luego seleccionar el paciente,
        agregar el peso actual del paciente, y agregar el peso objetivo, tambien puedes agregar ahora o más adelante,
        la descripción de la cita (aquí describes el paciente, el objetivo de la cita, es decir información de valor para
        comprender la cita), las recomendaciones de sueño descanso (opcional puedes recomendarle al paceiente algo
        referente al sueño descanso del paciente), y las recomendaciones de ejercicio (si le deseas recomendar hacer ejercicio
        o alguna actividad física al paciente). Luego de completar los campos debes pulsar el botón "crear cita" para finalizar
        la creación de la cita.
    </p>
}

function Ficha() {

    return <div className="grid gap-2 grid-cols-2 w-full">
        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Alimentos</summary>
            <p>
                Aquí podras asignar alimentos, Recomendados, Opcionales, y no recomendados, pulsando el botón "asignar"
                y seleccionar el alimento como lo desees seleccionar (recomendados, opcionales, no recomendados)
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Listas de intercambio</summary>
            <p>
                Aquí podras asignar y crear listas de intercambio en la cita, pulsando el botón "asignar"
                y seleccionar la lista que desees y listo, ya está asignada.
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Menús</summary>
            <p>
                Aquí podras asignar y crear menúis en la cita, pulsando el botón "asignar"
                y seleccionar el menú que desees y listo, ya está asignado.
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Agenda</summary>
            <p>
                Aquí podras crear eventos, en el calendario, puede ser para agendar una proxima cita.    
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Fotos</summary>
            <p>
                Aquí podras cargar el registro foto gráfico del paciente, para que el mismo pueda ver su evolución.     
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Historial</summary>
            <p>
                Aquí se visualizará lo que se ha hecho en una cita.
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Detalles</summary>
            <p>
                Aquí se visualizan las recomendaciones de sueño/descanso de la cita, las recomendaciones de ejercicio
                y la descripción de la cita.
            </p>
        </details>

        <details name="ficha" className="w-full py-2 rounded border border-slate-600 mt-2 px-5">
            <summary>Recomendaciones</summary>
            <p>
                Aquí el nutricionista puede actualizar las recomendaciones de sueño/descanso de la cita, las recomendaciones de ejercicio
                y la descripción de la cita.
            </p>
        </details>

    </div>
}
