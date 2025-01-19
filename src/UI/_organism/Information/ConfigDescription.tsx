import { useState } from "react";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle";

export default function ConfigDescription() {
    const [section, setSection] = useState(`PAYMENT`); // SUBSCRIPTION | PAYMENT

    return <div className="flex flex-col justify-center text-sm items-center mt-3">
        <div className="flex justify-between w-full">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={section === `PAYMENT` ? `Métodos de pago` : `Subscripción`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`PAYMENT`)} customClass={`tab text-sm ${section === `PAYMENT` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Métodos de pago" />
                <Button click={() => setSection(`SUBSCRIPTION`)} customClass={`tab text-sm ${section === `SUBSCRIPTION` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Subscripción" />
            </div>
        </div>

        {
            section === `PAYMENT`
                ? <>
                    <p className="mt-5">
                        Puedes visualizar, tus métodos de pago registrados
                        <br />
                        <Subtitle customClass="mt-3 text-md font-bold" text="Crear métodos de pago" />
                        Para crear un método de pago debes pulsar el botón verde que dice "agregar" al pulsarlo, deberás 
                        seleccionar el método de pago que desees crear, al seleccionarlo, deberás agregar tus datos, por ejemplo
                        se seleccionaste Paypal deberás agregar tu correo de paypal, dicha información que agregues será unicamente
                        utilizada para validar los pagos realizados.
                    </p>
                </>
                : <>
                    <p className="mt-5">
                        Puedes visualizar, la fecha de inicio y de fin de la subscripción, la subscripción que posees <i>(por defecto al crear la cuenta es <b>PRUEBA_GRATUITA</b>)</i>
                        <br />
                        <Subtitle customClass="mt-3 text-md font-bold" text="Subscripción" />
                        Para realizar un pago solo en esta sección solo debes pulsar el botón azul en la lista de subscripción,
                        ahí visualizaras los datos de la subscripción el costo por mes a pagar por ella, y el total a pagar
                        (el total a pagar variará en caso de aplicar algún cupón), luego puedes seleccionar en la lista de cupones
                        en caso de tenerlos, y seleccionas el método de pago, pulsando el botón azul para pasar el siguiente pago
                        debes pulsar el botón azul "Ver datos", al pulsarlo se mostrarán los datos del método que seleccionastes, 
                        realiza el pago, luego reporta el pago seleccionando el método de pago, agregar la fecha, y el monto 
                    </p>
                </>
        }
    </div>
}
