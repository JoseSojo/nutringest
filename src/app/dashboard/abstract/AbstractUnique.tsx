import { useParams } from "react-router-dom";

interface Props {
}

export default function AbstractUnique({ }: Props) {

    const { crud, id } = useParams();    

    return (
        <div className="w-full py-10 flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 shadow p-3 rounded text-slate-950 dark:text-slate-50">
            Único - {crud} - {id}
        </div>
    )
}
