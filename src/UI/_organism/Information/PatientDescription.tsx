import { useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";

export default function PatientDescription () {
    const [section, setSection] = useState(`LIST`); // SUBSCRIPTION | PAYMENT

    return <div className="flex flex-col justify-center text-sm items-center mt-3">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={`PATIENT`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`LIST`)} customClass={`tab text-sm ${section === `LIST` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Lista" />
                <Button click={() => setSection(`CREATE`)} customClass={`tab text-sm ${section === `CREATE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Crear" />
                <Button click={() => setSection(`DELETE`)} customClass={`tab text-sm ${section === `DELETE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Eliminar" />
                <Button click={() => setSection(`FICHA`)} customClass={`tab text-sm ${section === `FICHA` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Ficha" />
            </div>
        </div>
        

        { section === `LIST` && List() }
        { section === `CREATE` && Create() }
        { section === `DELETE` && Delete() }
        { section === `FICHA` && Ficha() }
    </div>
}

function List () {

    return <p>
        En esta sección puedes visualizar todos los pacientes creados por tí, puedes ver su nombre, apellido, usuario, 
        correo, y el permiso que tiene siempre sera paciente
    </p>    
}

function Create () {

    return <p>
        Para <b>crear</b> un menu debemos pulsar el botón verde "Crear Paciente" el nombre, apellido, usuario, contraseña, correo, 
        genero y edad, importanto el recordar el correo y contraseña, ya que con ello el paciente podrá visualizar sus menús,
        y la cita correspondiente, luego pulsar el botón verde "Crear" para así crear el paciente 
        (importante para poder crear una cita debes de crear primero el paciente)
    </p>
}

function Delete () {

    return <p>
        Para eliminar en las opciones se debe seleccionar la opción de Eliminar, se mostrará una advertencia en caso de
        estar seguro de querer eliminarla se debe aceptar, de lo contrario se cancela.
    </p>
}

function Ficha () {

    return <p>
        Para visualizar la ficha del paciente se debe buscar en las opciones y se debe seleccionar
        la opción de Ver, así se mostrará la ficha del paciente, dentro de la ficha se puede actualizar los datos del paciente,
        eliminar el paciente, y ver los datos del paciente.
    </p>
}

