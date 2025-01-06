import { useState } from "react";
import Subtitle from "../../_atom/Subtitle";
import Button from "../../_atom/Button";

export default function FinanzasDescription() {
    const [section, setSection] = useState(`CARDS`); // SUBSCRIPTION | PAYMENT

    return <div className="flex flex-col justify-center text-sm items-center mt-3 overflow-hidden">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={`FINANZAS`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`CARDS`)} customClass={`tab text-sm ${section === `CARDS` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Tarjetas" />
                <Button click={() => setSection(`REPORT`)} customClass={`tab text-sm ${section === `REPORT` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Reportar" />
                <Button click={() => setSection(`LIST`)} customClass={`tab text-sm ${section === `LIST` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Lista" />
            </div>
        </div>


        {section === `CARDS` && Card()}
        {section === `REPORT` && Report()}
        {section === `LIST` && List()}
    </div>
}

function Card() {

    return <p>
        En la parte superior se puede observar una tarjetas, donde puedes ver el saldo que tienes, los pagos totales realizados, 
        los pagos APROVADOS, y los pagos RECHAZADOS, en caso de que un pago sea RECHAZADO un administrador se podrá en contacto 
        con usted, para determinar si fue un mal entendido, u ocurrió algún problema al realizar el pago. también se puede visualizar la 
        tasa de cambio para el banco central de venezuela.
    </p>
}

function Report() {

    return <p>
        Para realizar un <b>reporte de un pago</b> debes de pulsar el botón rojo que dice, "reportar", luego seleccionar el 
        método de pago empleado en la transacción, luego agregar la fecha, y agregar el monto. Al finalizar se pulsa el botón realizar pago
    </p>
}

function List() {

    return <p>
        Aquí se mostrará una lista con los pagos realizados, al pulsar en el botón de la izquierda se puede visualizar los
        datos del pago, su estado (EN ESPERA, APROVADO, RECHAZADO), la fecha, el método de pago empleado, y el monto.
    </p>
}
