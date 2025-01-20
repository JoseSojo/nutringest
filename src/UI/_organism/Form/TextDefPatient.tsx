
interface Props {
    cols: string,
    col?: boolean,
    item: string[]
}

export default function TextDefPatient({ cols, col,item }: Props) {

    return (
        // <div className={`${cols}`}>
            <label className={`${cols} rounded relative ${col ? `flex flex-col` : `input input-sm input-bordered grid grid-cols-[auto_1fr] items-center gap-2`}`}>
                <span className="text-gray-600 text-sm font-bold">{item[0]}:</span>
                <span className={`w-full grow ${col ? `input input-sm input-bordered` : ``}`}>{item[1]}</span>
            </label>
        // </div>
    )
}

