import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../../../_context/ModalContext";
import { AbstractResponseCrud, ActionCrudInterface } from "../../../../types/DashboardInterface";
import { API } from "../../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../../utils/req/RequetsOptions";
import AbstractCreate from "../../abstract/AbstractCreate";
import AbstractUpdate from "../../abstract/AbstractUpdate";
import AbstractDelete from "../../abstract/AbstractDelete";
import Subtitle from "../../../../UI/_atom/Subtitle";
import Button from "../../../../UI/_atom/Button";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import ExtractValue from "../../../../utils/ExtractValue";
import AsingDetail from "./AsingDetail";

interface Props {
}

export default function SubscriptionUnique({ }: Props) {
    const { id } = useParams() as { id: string };

    const modal = useModal();
    const navigate = useNavigate();

    const CustomRelaod = () => navigate(`/dashboard/subscription`);

    const [actionsList, setActionsList] = useState<ActionCrudInterface[] | null>(null);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[] | null>(null);
    const [object, setObject] = useState<any | null>(null);
    const [header, setHeader] = useState<string[] | null>(null);
    const [extract, setExtract] = useState<string[] | null>(null)
    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        const Execute = async () => {
            const url = `${API}/subscription/${id}/unique`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json();

            const urlGui = `${API}/gui/crud/subscription`;
            const reqGui = REQUETS_GET_TOKEN;
            const resultGui = await fetch(urlGui, reqGui);
            const jsonGui = await resultGui.json() as AbstractResponseCrud;

            setTitle(json.title);
            setObject(json.body);
            setHeader(json.header);
            setExtract(json.extract);

            setActionsList(jsonGui.actionsList);
            setActionsUnique(jsonGui.actionsUnique);
        }
        Execute();
    }, []);

    const HandleChange = ({ action }: { action: ActionCrudInterface, id: string }) => {
        if (action.use === "modal") {
            if (action.ico === `create`) modal.show(<AbstractCreate crud={`subscription`} reload={CustomRelaod} />);
            else if (action.ico === `update`) modal.show(<AbstractUpdate crud={`subscription`} reload={CustomRelaod} id={id} />);
            else if (action.ico === `delete`) modal.show(<AbstractDelete crud={`subscription`} reload={CustomRelaod} id={id} />);
            // else if(action.ico === `unique`) modal.show(<AbstractUnique crud={crud} reload={CustomRelaod} id={id} />);
        } else if (action.use === "page") {
            if (action.ico === `list`) navigate(`/dashboard/subscription/`);
            if (action.ico === `create`) navigate(`/dashboard/subscription/create`);
            else if (action.ico === `update`) navigate(`/dashboard/subscription/update/${id}`);
            else if (action.ico === `delete`) navigate(`/dashboard/subscription/delete/${id}`);
            else if (action.ico === `unique`) navigate(`/dashboard/subscription/unique/${id}`);
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <Subtitle customClass="text-2xl font-bold text-slate-700" text={title ? title : ``} />

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

            <div className="grid lg:grid-cols-2 gap-3 mt-3">
                <div className="border py-3 px-5  rounded">
                    <Subtitle customClass="text-xl font-semi-bold mb-3" text="Ficha" />
                    <ul className="grid gapy-2">
                        {
                            header && extract && object && header.map((h, i) => (
                                <li className="flex gap-3 text-lg">
                                    <span>{h}</span>
                                    <b className="flex-1">
                                        { ExtractValue({ extractBy:extract[i],item:object }) }
                                    </b>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* <div className="border py-3 px-5 mt-3 rounded"> */}
                <AbstractUpdate crud={`subscription`} id={id} reload={CustomRelaod} />
                {/* </div> */}
                <AsingDetail id={id} />
            </div>
        </div>
    )
}
