import Subtitle from "../_atom/Subtitle";
import { useState } from "react";
import CardInformation from "./Information/CardInformation";
import Button from "../_atom/Button";
import ConfigDescription from "./Information/ConfigDescription";
import ExchangeDescription from "./Information/ExchangeDescription";
import ProfileDescription from "./Information/ProfileDescription";
import MenuDescription from "./Information/MenuDescription";
import PatientDescription from "./Information/PatientDescription";
import QuoteDescription from "./Information/QuoteDescription";
import PorfolioDescription from "./Information/PorfolioDescription";
import AgendaDescription from "./Information/AgendaDescription";
import FinanzasDescription from "./Information/FinanzasDescription";
import { IcoClose } from "../_compound/Icons/AllIcon";

type SECTIONS_INLINE =
    | `FICHA`
    | `PROFILE`
    | `PORFOLIO`
    | `CONFIG`
    | `EXCHANGE`
    | `MENU`
    | `PATIENT`
    | `QUOTE`
    | `AGENDA`
    | `FINANZAS`

export default function InformationModal() {

    const [title, setTitle] = useState(`Ficha informativa`);
    const [section, setSection] = useState<SECTIONS_INLINE>(`FICHA`);

    const ChangeSection = ({ title, value }: { title: string, value: SECTIONS_INLINE }) => {
        setTitle(title);
        setSection(value);
    }

    return (
        <div className="h-96 max-h-96 w-full bg-white rounded-xl p-5">
            <div className="flex justify-between mb-3">
                {
                    section == `FICHA`
                        ? <span></span>
                        : <Button ico={IcoClose({ size:24 })} customClass="btn btn-sm bg-slate-600 hover:bg-slate-700 text-white" text="volver" click={() => ChangeSection({ title: `Ficha informativa`, value: `FICHA` })} />
                }
                <Subtitle customClass="text-center text-2xl text-slate-700 font-bold" text={title} />
                <span></span>
            </div>

            {
                section === `FICHA` && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <CardInformation label="Perfil" valueChange={() => ChangeSection({ title: `Perfil`, value:`PROFILE` })} />
                    <CardInformation label="Portafolio" valueChange={() => ChangeSection({ title: `Portafolio`, value:`PORFOLIO` })} />
                    <CardInformation label="Configuración" valueChange={() => ChangeSection({ title: `Configuración`, value:`CONFIG` })} />
                    <CardInformation label="Agenda" valueChange={() => ChangeSection({ title: `Agenda`, value:`AGENDA` })} />
                    <CardInformation label="Finanzas" valueChange={() => ChangeSection({ title: `Agenda`, value:`FINANZAS` })} />
                    <CardInformation label="Mis Menús" valueChange={() => ChangeSection({ title: `Listas de intercambio`, value:`MENU` })} />
                    <CardInformation label="Listas de intercambio" valueChange={() => ChangeSection({ title: `Listas de intercambio`, value:`EXCHANGE` })} />
                    <CardInformation label="Mis Pacientes" valueChange={() => ChangeSection({ title: `Mis Pacientes`, value:`PATIENT` })} />
                    <CardInformation label="Mis Citas" valueChange={() => ChangeSection({ title: `Mis Citas`, value:`QUOTE` })} />
                </div>
            }

            { section === "CONFIG" && <ConfigDescription /> }
            { section === "EXCHANGE" && <ExchangeDescription /> }
            { section === "PROFILE" && <ProfileDescription /> }
            { section === "MENU" && <MenuDescription /> }
            { section === "PATIENT" && <PatientDescription /> }
            { section === "PORFOLIO" && <PorfolioDescription /> }
            { section === "QUOTE" && <QuoteDescription /> }
            { section === "AGENDA" && <AgendaDescription /> }
            { section === "FINANZAS" && <FinanzasDescription /> }

        </div>
    )
}
