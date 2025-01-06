import { useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";

export default function ProfileDescription () {
    const [section, setSection] = useState(`DATA`); // DATA | EDUCATION | WORK

    return <div className="flex flex-col justify-center text-sm items-center mt-3">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={section === `DATA` ? `Datos personales` : section === `EDUCATION` ? `PERFÍL EDUCATIVO` : `PERFIL LABORAL`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`DATA`)} customClass={`tab text-sm ${section === `DATA` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Datos Personales" />
                <Button click={() => setSection(`EDUCATION`)} customClass={`tab text-sm ${section === `EDUCATION` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Educación" />
                <Button click={() => setSection(`WORK`)} customClass={`tab text-sm ${section === `WORK` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Trabajo" />
            </div>
        </div>
        

        { section === `DATA` && Data() }
        { section === `EDUCATION` && Education() }
        { section === `WORK` && Work() }
    </div>
}

function Data () {

    return <p>
        En esta sección podrás actualizar tus datos personales, datos de acceso, dirección.
    </p>    
}

function Education () {

    return <p>
        En <b>desarrollo</b>, Aquí podrás registrar los títulos, certificados, cursos realizados.
    </p>
}

function Work () {

    return <p>
        En <b>desarrollo</b>, Aquí podrás registrar los trabajos que has tenido. 
    </p>
}
