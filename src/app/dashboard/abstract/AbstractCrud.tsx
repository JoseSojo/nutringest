import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../utils/req/RequetsOptions";
import { AbstractResponseCrud, ActionCrudInterface } from "../../../types/DashboardInterface";
import Title from "../../../UI/_atom/Title";
import Button from "../../../UI/_atom/Button";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import { Icono } from "../../../_handler/IconHandler";
import AbstractList from "./AbstractList";
import { useModal } from "../../../_context/ModalContext";
import AbstractCreate from "./AbstractCreate";
import AbstractUpdate from "./AbstractUpdate";
import AbstractDelete from "./AbstractDelete";
import { CRUDS } from "../../../types/GlobalInterface";

export default function AbstractCrud() {

    const { crud } = useParams() as { crud:CRUDS };

    const location = useLocation();
    const modal = useModal();
    const navigate = useNavigate();

    const [reload, setReload] = useState(false);
    const CustomRelaod = () => setReload(!reload);

    const [load, setLoad] = useState(true);
    const [actionsList, setActionsList] = useState<ActionCrudInterface[] | null>(null);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[] | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/gui/crud/${crud}`;
            const req = REQUETS_GET_TOKEN;
            const result = await fetch(url, req);
            const json = await result.json() as AbstractResponseCrud;

            setActionsList(json.actionsList);
            setActionsUnique(json.actionsUnique);
            setTitle(json.title);
            setLoad(false);
        }
        ExecuteAsync();
    }, [location.pathname]);

    const HandleChange = ({action,id}:{action:ActionCrudInterface,id:string}) => {
        if(action.use === "modal") {
            if(action.ico === `create`) modal.show(<AbstractCreate crud={crud} reload={CustomRelaod} />);
            else if(action.ico === `update`) modal.show(<AbstractUpdate crud={crud} reload={CustomRelaod} id={id} />);
            else if(action.ico === `delete`) modal.show(<AbstractDelete crud={crud} reload={CustomRelaod} id={id} />);
            // else if(action.ico === `unique`) modal.show(<AbstractUnique crud={crud} reload={CustomRelaod} id={id} />);
        } else if (action.use === "page") {
            if(action.ico === `create`) navigate(`/dashboard/${crud}/create`);
            else if(action.ico === `update`) navigate(`/dashboard/${crud}/update/${id}`);
            else if(action.ico === `delete`) navigate(`/dashboard/${crud}/delete/${id}`);
            else if(action.ico === `unique`) navigate(`/dashboard/${crud}/unique/${id}`);
        }
    }

    return (
        <>
            {
                load
                    ? <>cargando</>
                    : <div className="w-full">
                        {/* HEADER INICIO */}
                        <header className="flex items-center justify-between">
                            <Title customClass="text-2xl font-black" text={title ? title : ``} />
                            <ul className="flex gap-3">
                                {
                                    actionsList && actionsList.map((action) => (
                                        <li>
                                            <Button
                                                click={() => HandleChange({ action, id:`` })}
                                                ico={Icono({ ico:action.ico })}
                                                customClass={`${ButtonHandler({ param:action.ico })} btn btn-sm border-none`}
                                                text={action.label}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </header>
                        {/* HEADER FIN */}

                        <AbstractList change={HandleChange} reload={reload} crud={crud} actions={actionsUnique ? actionsUnique : []} />

                    </div>
            }
        </>
    )
}
