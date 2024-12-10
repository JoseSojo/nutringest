import AbstractList from "../../abstract/AbstractList"

interface Props {
    id: string
}

export default function HistoryQuote({id}:Props) {

    return (
        <div>
            <AbstractList param={``} change={()=>{}} reload={true} crud={`quote/history`} query={`id=${id}`} actions={[]} />

        </div>
    )
}