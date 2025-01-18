import { useState } from "react";
import PaginateQuote from "./components/PaginatePhoto";
import UploadPhoto from "./components/UploadPhoto"

interface Props {
    id: string;
}

export default function PhotoQuote({id}:Props) {

    const [reload, setReload] = useState(false);
    const CustomReload = () => setReload(!reload);

    return (
        <div className="grid grid-cols-[35%_1fr] gap-5">
            <div>
                <UploadPhoto reload={CustomReload} quote={id} />
            </div>
            <div>
                <PaginateQuote quote={id} reload={reload} />
            </div>
        </div>
    )
}