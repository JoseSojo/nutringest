import { useEffect, useState } from "react"
import Subtitle from "../../../../UI/_atom/Subtitle"
import { AbstractResponseCrud, ActionCrudInterface } from "../../../../types/DashboardInterface";
import { API } from "../../../../entorno";
import { useNavigate, useParams } from "react-router-dom";
import { REQUETS_GET_TOKEN } from "../../../../utils/req/RequetsOptions";
import { useModal } from "../../../../_context/ModalContext";
import AbstractCreate from "../../abstract/AbstractCreate";
import AbstractUpdate from "../../abstract/AbstractUpdate";
import AbstractDelete from "../../abstract/AbstractDelete";
import Button from "../../../../UI/_atom/Button";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import ItemQuote from "./ItemQuote";
import UpdateQuote from "./UpdateQuote";

export default function QuoteFicha() {
    const { id } = useParams() as { id: string };
    const [section, setSection] = useState(`FOOD`); // FOOD | EXCHANGE | MENU 

    const modal = useModal();
    const navigate = useNavigate();

    const [actionsList, setActionsList] = useState<ActionCrudInterface[] | null>(null);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[] | null>(null);
    const [object, setObject] = useState<any | null>(null);

    const CustomRelaod = () => navigate(`/dashboard/quote`);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/quote/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            const urlGui = `${API}/gui/crud/quote`;
            const reqGui = REQUETS_GET_TOKEN;
            const resultGui = await fetch(urlGui, reqGui);
            const jsonGui = await resultGui.json() as AbstractResponseCrud;

            setObject(json.body);
            console.log(json.body);

            setActionsList(jsonGui.actionsList);
            setActionsUnique(jsonGui.actionsUnique);
        }
        Execute();
    }, []);

    const HandleChange = ({ action }: { action: ActionCrudInterface, id: string }) => {
        if (action.use === "modal") {
            if (action.ico === `create`) modal.show(<AbstractCreate crud={`quote`} reload={CustomRelaod} />);
            else if (action.ico === `update`) modal.show(<AbstractUpdate crud={`quote`} reload={CustomRelaod} id={id} />);
            else if (action.ico === `delete`) modal.show(<AbstractDelete crud={`quote`} reload={CustomRelaod} id={id} />);
            // else if (action.ico === `assing`) modal.show(<AbstractAssing pathGui="" reloadVl={true} crud={`quote`} reload={CustomRelaod} id={id} />);
            // else if(action.ico === `unique`) modal.show(<AbstractUnique crud={`quote`} reload={CustomRelaod} id={id} />);
        } else if (action.use === "page") {
            if (action.ico === `list`) navigate(`/dashboard/quote/`);
            if (action.ico === `create`) navigate(`/dashboard/quote/create`);
            else if (action.ico === `update`) navigate(`/dashboard/quote/update/${id}`);
            else if (action.ico === `delete`) navigate(`/dashboard/quote/delete/${id}`);
            else if (action.ico === `unique`) navigate(`/dashboard/quote/unique/${id}`);
        }
    }

    return (
        <>
            {
                object
                    ? <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                        <div className="flex items-center justify-between col-span-12">
                            <Subtitle customClass="text-2xl font-bold text-slate-100" text="Detalles de la cita" />

                            <nav className="flex gap-3">
                                {
                                    actionsList && actionsList.map((action) => (
                                        <Button
                                            click={() => HandleChange({ action, id: `` })}
                                            ico={Icono({ ico: action.ico })}
                                            customClass={`${ButtonHandler({ param: action.ico })} btn btn-sm border-none`}
                                            text={action.label}
                                        />
                                    ))
                                }
                                {
                                    actionsUnique && actionsUnique.map((action) => {
                                        if (action.ico === `show` || action.ico === `unique`) return;
                                        if (action.ico === `update` || action.ico === `unique`) return;

                                        return (
                                            <Button
                                                click={() => HandleChange({ action, id: `` })}
                                                ico={Icono({ ico: action.ico })}
                                                customClass={`${ButtonHandler({ param: action.ico })} btn btn-sm border-none`}
                                                text={action.label}
                                            />
                                        )
                                    })
                                }
                            </nav>
                        </div>

                        <div className="col-span-5">

                            <div className="flex justify-between gap-2">
                                <div className="border px-3 border-gray-400 flex flex-col py-1 justify-center items-center flex-1 rounded-xl">
                                    <b className="text-xs text-gray-400">Peso Anterior</b>
                                    <strong className="font-black text-gray-100">{object.weightPreview ? object.weightPreview : 0}</strong>
                                </div>
                                <div className="border px-3 border-gray-400 flex flex-col py-1 justify-center items-center flex-1 rounded-xl">
                                    <b className="text-xs text-gray-400">Peso Actual</b>
                                    <strong className="font-black text-gray-100">{object.weightNow ? object.weightNow : 0}</strong>
                                </div>
                                <div className="border px-3 border-gray-400 flex flex-col py-1 justify-center items-center flex-1 rounded-xl">
                                    <b className="text-xs text-gray-400">Peso Objectivo</b>
                                    <strong className="font-black text-gray-100">{object.weightObjective ? object.weightObjective : 0}</strong>
                                </div>
                            </div>

                            <div className="mt-3 border px-3 border-gray-400 flex flex-col py-2 justify-center items-center flex-1 rounded-xl">
                                <b className="text-xs text-gray-400">Nutricionista</b>
                                <strong className="font-black text-md text-gray-100">{object.nutricionistReference.name} {object.nutricionistReference.lastname}</strong>
                                <strong className="font-black text-xs text-gray-100">{object.nutricionistReference.email}</strong>
                                <strong className="font-black text-xs text-gray-100">{object.nutricionistReference.phone}</strong>

                                <b className="text-xs text-gray-400 mt-3">Paciente</b>
                                <strong className="font-black text-md text-gray-100">{object.patientReference.name} {object.patientReference.lastname}</strong>
                                <strong className="font-black text-xs text-gray-100">{object.patientReference.email}</strong>
                                <strong className="font-black text-xs text-gray-100">{object.patientReference.phone}</strong>

                                <UpdateQuote description={object.description} exercise={object.exercise} id={object.id} sleep={object.sleep} />

                            </div>

                        </div>

                        <div className="col-span-7 rounded">
                            <div className="flex justify-end w-full">
                                <div role="tablist" className="tabs tabs-lifted">
                                    <Button click={() => setSection(`FOOD`)} customClass={`tab text-xs ${section === `FOOD` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Alimentos" />
                                    <Button click={() => setSection(`EXCHANGE`)} customClass={`tab text-xs ${section === `EXCHANGE` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Listas Intercambio" />
                                    <Button click={() => setSection(`MENU`)} customClass={`tab text-xs ${section === `MENU` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Menú" />
                                </div>
                            </div>

                            <div className="border border-gray-400 rounded-b-lg rounded-tl p-3">
                                {section === `FOOD` && <ItemQuote id={id} crud="food" assing="primitive" pathGui="quote/food" quote={id} />}
                                {section === `EXCHANGE` && <ItemQuote id={id} crud="exchange" pathGui="quote/exchange" quote={id} />}
                                {section === `MENU` && <ItemQuote id={id} crud="menu" pathGui="quote/menu" quote={id} />}
                            </div>
                        </div>

                    </div>
                    : <div>
                        cargando
                    </div>
            }
        </>
    )
}
