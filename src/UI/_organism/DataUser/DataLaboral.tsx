import Subtitle from "../../_atom/Subtitle";

interface Props {
    user: any;
    userId: string;
}

export default function DataLaboral({ userId }: Props) {

    userId

    return (
        <div className="py-5">
            <Subtitle customClass="w-full bg-slate-900 text-slate-300 text-center p-2 rounded-xl" text="en desarrollo..." />            
        </div>
    )
}
