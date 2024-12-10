import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../../../_context/ModalContext";
import { AbstractResponseCrud, ActionCrudInterface } from "../../../../types/DashboardInterface";
import { API } from "../../../../entorno";
import { REQUETS_GET_TOKEN } from "../../../../utils/req/RequetsOptions";
import AbstractCreate from "../../abstract/AbstractCreate";
import AbstractUpdate from "../../abstract/AbstractUpdate";
import AbstractDelete from "../../abstract/AbstractDelete";
import { CRUDS } from "../../../../types/GlobalInterface";
import Title from "../../../../UI/_atom/Title";
import Input from "../../../../UI/_atom/Input";
import Button from "../../../../UI/_atom/Button";
import { Icono } from "../../../../_handler/IconHandler";
import ButtonHandler from "../../../../_handler/ButtonsHandler";
import AbstractList from "../../abstract/AbstractList";
import AbstractAssing from "./AbstractAssing";
import AbstractRemove from "../../abstract/AbstractRemove";

interface Props {
    assing?: CRUDS;
    pathGui: string;
    crud: CRUDS;
    quote: string;
    id: string
}

export default function ItemQuote({pathGui,crud,quote,id,assing}: Props) {

    const customId = id;
    const location = useLocation();
    const modal = useModal();
    const navigate = useNavigate();

    const [reload, setReload] = useState(false);
    const CustomRelaod = () => setReload(!reload);

    const [param, setParam] = useState(``);

    const [load, setLoad] = useState(true);
    const [actionsList, setActionsList] = useState<ActionCrudInterface[] | null>(null);
    const [actionsUnique, setActionsUnique] = useState<ActionCrudInterface[] | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        const ExecuteAsync = async () => {
            setLoad(true);
            const url = `${API}/gui/crud/${pathGui}/`;
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
            else if(action.ico === `assing`) modal.show(<AbstractAssing pathGui={pathGui} reloadVl={reload} crud={assing ? assing : crud} reload={CustomRelaod} id={customId} />);
            else if(action.ico === `remove`) modal.show(<AbstractRemove pathGui={pathGui} crud={assing ? assing : crud} reload={CustomRelaod} id={customId} query={`quote=${customId}&item=${id}`} />);
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
                                <li>
                                    <Input 
                                        change={({value}:{value:string,name:string}) => {
                                            setParam(value);
                                        }}
                                        customClass="border h-full rounded outline-none px-3 text-slate-500 bg-gray-50 border border-slate-600"
                                        name="param"
                                        type="text"
                                        />
                                </li>
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
                                {
                                    actionsList && actionsList.find((ac) => ac.ico === `create`) && <li>
                                    <Button
                                        click={() => HandleChange({ action:{ico:`assing`,label:`Asignar`,path:`/`,use:`modal`}, id:`` })}
                                        ico={Icono({ ico:`assing` })}
                                        customClass={`${ButtonHandler({ param:`assing` })} btn btn-sm border-none`}
                                        text={`Asignar`}
                                    />
                                </li>
                                }
                            </ul>
                        </header>
                        {/* HEADER FIN */}

                        <AbstractList query={`quote=${quote}`} min param={param} change={HandleChange} reload={reload} crud={crud} actions={actionsUnique ? actionsUnique : []} />
                    </div>
            }
        </>
    )
}
