
interface Props {
    description: string;
    sleep: string;
    exercise: string;
    id: string
}

export default function DetailQuote({description,exercise,sleep}:Props) {

    const clsTextarea = `min-h-20 h-24 max-h-36 input input-sm border border-gray-800 drk:border-gray-100 outline-none bg-gray-300 drk:bg-slate-900 select-none`;

    return (
        <div className="grid gap-x-3 gap-y-1 w-full">

            <label className="flex flex-col justify-around">
                <span className="text-sm font-semibold select-none">Descripción de la cita</span>
                <div className={clsTextarea}>{description}</div>
            </label>

            <label className="flex flex-col justify-around">
                <span className="text-sm font-semibold select-none">Recomendación de sueño/descanso</span>
                <div className={clsTextarea}>{sleep}</div>
            </label>

            <label className="flex flex-col justify-around">
                <span className="text-sm font-semibold select-none">Recomendación de ejercicio</span>
                <div className={clsTextarea}>{exercise}</div>
            </label>

        </div>
    )
}