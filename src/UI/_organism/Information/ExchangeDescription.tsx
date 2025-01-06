import { useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";

export default function ExchangeDescription () {

    const [section, setSection] = useState(`LIST`); // SUBSCRIPTION | PAYMENT

    return <div className="flex flex-col justify-center text-sm items-center mt-3">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={`Lista de intercambio.`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`LIST`)} customClass={`tab text-sm ${section === `LIST` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Lista" />
                <Button click={() => setSection(`CREATE`)} customClass={`tab text-sm ${section === `CREATE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Crear" />
                <Button click={() => setSection(`UPDATE`)} customClass={`tab text-sm ${section === `UPDATE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Actualizar" />
                <Button click={() => setSection(`DELETE`)} customClass={`tab text-sm ${section === `DELETE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Eliminar" />
                <Button click={() => setSection(`FICHA`)} customClass={`tab text-sm ${section === `FICHA` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Ficha" />
            </div>
        </div>
        

        { section === `LIST` && List() }
        { section === `CREATE` && Create() }
        { section === `UPDATE` && Update() }
        { section === `DELETE` && Delete() }
        { section === `FICHA` && Ficha() }
    </div>
}

function List () {

    return <p>
        En esta sección puedes visualizar todas las listas de intercambio ya sea que no estén en <b>ninguna cita</b>, 
        enten en unicamente en una o no estén en <b>muchas citas</b>, te muestra el nombre de la lista de 
        intercambio, su unidad de medida, su contabilidad de alimentos (cuantos alimentos la componen), 
        la contabilidad de citas en cuantas citas está y su <b>creador</b>.  
    </p>    
}

function Create () {

    return <p>
        Para <b>crear</b> una lista de intercambio debemos pulsar el botón verde "crear" agregamos el nombre, y su unidad de medida,
        luego pasamos a la selección de alimentos tenemos una tabla con la lista de alimentos, la cual vamos a ir pulsado el
        botón azul "agregar" para ir seleccionando alimentos, una vez tengamos los alimentos seleccionados procedemos a
        seleccionar su unidad de medida en caso de que lo requiera, por ejemplo el alimento es pollo, la unidad de medida puede
        ser porción, en caso de querer remover un alimento ya seleccionado se debe pulsar el botón rojo con el icono de 
        un borrador. Al finalizar la selección de alimentos se debe pulsar el botón verde con el nombre "Crear" para crear la
        <b>lista de intercambio</b>, y que pueda ser visualizada desde la tabla en la lista de las <b>listas de intercambio</b>
    </p>
}

function Update () {

    return <p>
        Para actualizar en las opciones se debe seleccionar la opción de actualizar, luego se mostrará la información 
        de la lista de intercambio, se puede cambiar el nombre, unidad de medida, y agregar o remover alimentos.
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
        Para visualizar la ficha de la lista de intercambio se debe buscar en las opciones y se debe seleccionar
        la opción de Ver, así se mostrará la ficha de la lista de intercambio
    </p>
}
