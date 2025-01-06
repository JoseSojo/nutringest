import { useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";

export default function AgendaDescription() {
    const [section, setSection] = useState(`LIST`); // SUBSCRIPTION | PAYMENT

    return <div className="flex flex-col justify-center text-sm items-center mt-3 overflow-hidden">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={`AGENDA`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`LIST`)} customClass={`tab text-sm ${section === `LIST` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Lista" />
                <Button click={() => setSection(`CREATE`)} customClass={`tab text-sm ${section === `CREATE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Crear" />
            </div>
        </div>


        {section === `LIST` && List()}
        {section === `CREATE` && Create()}
    </div>
}

function List() {

    return <p>
        Puedes visualizar del lado izquierdo un calendario, y del lado derecho una tabla con todas las agendas que tiene
    </p>
}

function Create() {

    return <p>
        Para <b>crear</b> un agenda debes de pulsar el botón verde "Agendar", luego agregar una fecha 
        (día, mes, año, hora, minuto) y una descripción. Luego de completar los campos debes pulsar el botón "crear cita" para finalizar
        la creación de la cita. Al finalizar se debe pulsar el botón verde que dice "Agendar".
        <br />
        <b>IMPORTANTE </b> las agendas creadas aquí son independientes, es decír no pertenecen a ninguna cita.
    </p>
}
