import { useState } from "react";
import { useNotification } from "../../../_context/NotificationContext";
import ButtonHandler from "../../../_handler/ButtonsHandler";
import AbstractList from "../../../app/dashboard/abstract/AbstractList";
import { API } from "../../../entorno";
import { REQUETS_PUT_TOKEN } from "../../../utils/req/RequetsOptions";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle";
import { IcoSelect } from "../../_compound/Icons/AllIcon";

export default function ExpirationBanner() {

    const [reload, setReload] = useState(false);

    const ChangeReload = () => setReload(!reload);

    const ButtonActiveUser = (item: any) => {
        const noti = useNotification();
    
        const ActiveAccount = () => {
            const ExecuteRequets = async () => {
                const req = REQUETS_PUT_TOKEN;
                const url = `${API}/user/subsctiption/active/${item.id}`;
                const result = await fetch(url, req);
                const json = await result.json();
    
                ChangeReload();
                if (!result.ok) return noti.setMessage({ type: `error`, active: true, message: `Error al activar` });
                if (json.error === true) return noti.setMessage({ type: `error`, active: true, message: json.message });
    
                return noti.setMessage({ type: `success`, active: true, message: json.message });
            }
            ExecuteRequets();
        }
    
        const DisactiveAccount = () => {
            const ExecuteRequets = async () => {
                const req = REQUETS_PUT_TOKEN;
                const url = `${API}/user/subsctiption/disactive/${item.id}`;
                const result = await fetch(url, req);
                const json = await result.json();
    
                ChangeReload();
                if (!result.ok) return noti.setMessage({ type: `error`, active: true, message: `Error al activar` });
                if (json.error === true) return noti.setMessage({ type: `error`, active: true, message: json.message });
    
                return noti.setMessage({ type: `success`, active: true, message: json.message });
            }
            ExecuteRequets();
        }
    
        if (item.userByReference && item.userByReference.wallet && item.userByReference.wallet.mount > 24.99) {
            return <div className="flex justify-center items-center w-full">
                <Button
                    click={ActiveAccount}
                    customClass={`${ButtonHandler({ param: `update` })} text-xs btn-sm m-auto`}
                    text="activar"
                    ico={<IcoSelect size={18} />}
                />
            </div>
        }
    
        return <div className="flex justify-center items-center w-full">
            <Button
                click={DisactiveAccount}
                customClass={`${ButtonHandler({ param: `report` })} text-xs btn-sm m-auto`}
                text="desactivar"
                ico={<IcoSelect size={18} />}
            />
        </div>
    }

    return (
        <div>

            <div className="bg-white p-3 rounded mb-3">
                <Subtitle customClass="text-lg font-bold text-gray-800" text="Usuarios Vencen Mañana" />
                <AbstractList
                    ActionButtons={ButtonActiveUser}
                    actions={[]}
                    change={() => { }}
                    crud="user/subscription/expiration/tomorrow"
                    param=""
                    reload={reload}
                />
            </div>

            <div className="bg-white p-3 rounded mb-3">
                <Subtitle customClass="text-lg font-bold text-gray-800" text="Usuarios Vencidos" />
                <AbstractList
                    ActionButtons={ButtonActiveUser}
                    actions={[]}
                    change={() => { }}
                    crud="user/subscription/expiration/last"
                    param=""
                    reload={reload}
                />
            </div>

            <div className="bg-white p-3 rounded mb-3">
                <Subtitle customClass="text-lg font-bold text-gray-800" text="Usuarios Desactivados" />
                <AbstractList
                    ActionButtons={ButtonActiveUser}
                    actions={[]}
                    change={() => { }}
                    crud="user/subscription/expiration/disactive"
                    param=""
                    reload={reload}
                />
            </div>

        </div>
    )
}
