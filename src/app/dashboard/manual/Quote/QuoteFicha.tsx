import { useEffect, useState } from "react"
import Subtitle from "../../../../UI/_atom/Subtitle"
// import { AbstractResponseCrud } from "../../../../types/DashboardInterface";
import { API } from "../../../../entorno";
import { useParams } from "react-router-dom";
import { REQUETS_GET_TOKEN } from "../../../../utils/req/RequetsOptions";
// import { useModal } from "../../../../_context/ModalContext";
// import AbstractCreate from "../../abstract/AbstractCreate";
// import AbstractUpdate from "../../abstract/AbstractUpdate";
// import AbstractDelete from "../../abstract/AbstractDelete";
import Button from "../../../../UI/_atom/Button";
// import { Icono } from "../../../../_handler/IconHandler";
// import ButtonHandler from "../../../../_handler/ButtonsHandler";
import ItemQuote from "./ItemQuote";
import UpdateQuote from "./UpdateQuote";
import PhotoQuote from "./PhotoQuote";
import HistoryQuote from "./HistoryQuote";
import DetailQuote from "./DetailQuote";
import CalendarQuote from "./CalendarQuote";
import PatientQuote from "./PatientQuote";

export default function QuoteFicha() {
    const { id } = useParams() as { id: string };
    const [section, setSection] = useState(`FOOD`); // FOOD | EXCHANGE | MENU 

    // const modal = useModal();
    // const navigate = useNavigate();

    const [object, setObject] = useState<any | null>(null);
    const [sections, setSections] = useState<any[] | null>(null)

    // const CustomRelaod = () => navigate(`/dashboard/quote`);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/quote/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            // const urlGui = `${API}/gui/crud/quote`;
            // const reqGui = REQUETS_GET_TOKEN;
            // const resultGui = await fetch(urlGui, reqGui);
            // const jsonGui = await resultGui.json() as AbstractResponseCrud;

            setObject(json.body);
            // setActionsList(jsonGui.actionsList);
            // setActionsUnique(jsonGui.actionsUnique);

            if (json.sections) setSections(json.sections);
        }
        Execute();
    }, []);

    // const HandleChange = ({ action }: { action: ActionCrudInterface, id: string }) => {
    //     if (action.use === "modal") {
    //         if (action.ico === `create`) modal.show(<AbstractCreate crud={`quote`} reload={CustomRelaod} />);
    //         else if (action.ico === `update`) modal.show(<AbstractUpdate crud={`quote`} reload={CustomRelaod} id={id} />);
    //         else if (action.ico === `delete`) modal.show(<AbstractDelete crud={`quote`} reload={CustomRelaod} id={id} />);
    //         // else if (action.ico === `remove`) modal.show(<AbstractRemove query="" pathGui="" crud={`quote`} reload={CustomRelaod} id={id} />);
    //         // else if (action.ico === `assing`) modal.show(<AbstractAssing pathGui="" reloadVl={true} crud={`quote`} reload={CustomRelaod} id={id} />);
    //         // else if(action.ico === `unique`) modal.show(<AbstractUnique crud={`quote`} reload={CustomRelaod} id={id} />);
    //     } else if (action.use === "page") {
    //         if (action.ico === `list`) navigate(`/dashboard/quote/`);
    //         if (action.ico === `create`) navigate(`/dashboard/quote/create`);
    //         else if (action.ico === `update`) navigate(`/dashboard/quote/update/${id}`);
    //         else if (action.ico === `delete`) navigate(`/dashboard/quote/delete/${id}`);
    //         else if (action.ico === `unique`) navigate(`/dashboard/quote/unique/${id}`);
    //     }
    // }

    return (
        <>
            {
                object
                    ? <div className="">
                        <div className="flex items-center justify-between col-span-12">
                            <div>
                                <Subtitle customClass="text-xl text-slate-800" text={`Nutricionista: ${object.nutricionistReference.name} ${object.nutricionistReference.lastname}`} />
                                <Subtitle customClass="text-xl text-slate-800" text={`Paciente: ${object.patientReference.name} ${object.patientReference.lastname}`} />
                            </div>
                        </div>


                        <div className="rounded w-full">
                            <div className="flex justify-end w-full">
                                <div role="tablist" className="tabs tabs-lifted">
                                    {
                                        sections && sections.map((sc) => <Button click={() => setSection(sc.value)} customClass={`tab text-xs ${section === sc.value ? `tab-active font-black` : `text-gray-700 font-semibold`}`} text={sc.label} />)
                                    }
                                </div>
                            </div>

                            <div className="border border-gray-400 rounded-b-lg rounded-tl p-3">
                                {section === `FOOD` && <ItemQuote id={id} crud="food" assing="primitive" pathGui="quote/food" quote={id} />}
                                {section === `EXCHANGE` && <ItemQuote id={id} crud="exchange" pathGui="quote/exchange" quote={id} />}
                                {section === `MENU` && <ItemQuote id={id} crud="menu" pathGui="quote/menu" quote={id} />}
                                {section === `UPDATE` && <UpdateQuote description={object.description} exercise={object.exercise} id={object.id} sleep={object.sleep} />}
                                {section === `DETAILS` && <DetailQuote description={object.description} exercise={object.exercise} id={object.id} sleep={object.sleep} />}
                                {section === `PHOTO` && <PhotoQuote id={object.id} />}
                                {section === `HISTORY` && <HistoryQuote id={object.id} />}
                                {section === `CALENDAR` && <CalendarQuote id={object.id} />}
                                {section === `PATIENT` && <PatientQuote id={object.patientId} />}
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
