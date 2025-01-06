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
                        Puedes visualizar, la fecha de inicio y de fin de la subscripción, la subscripción que posees <i>(por defecto al crear la cuenta es <b>STONE</b>)</i>
                        <br />
                        <Subtitle customClass="mt-3 text-md font-bold" text="Cambiar Subscripción" />
                        Para cambiar la subscripción debes pulsar el botón azul "Cambiar Subscripción" al pulsarlo debes seleccionar
                        por que subscripción quieres el cambio, luego seleccionas un método de pago, seleccionas los cupones que requieras
                        en caso de que tengas cupones, le das procesar <i>(importante pulsar el botón procesar)</i>, luego realiza el pago
                        correspondiente y reporta el pago, dicho pago será procesado por los administradores y se sumará el saldo a tu billetera,
                        cuando sea el día de pago se actualizará tu subscripción y se restará el monto de la subscripción
                    </p>
                </>
        }
    </div>
}
