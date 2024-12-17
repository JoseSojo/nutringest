import CustomCalendar from "../../../../UI/_organism/Dashboard/Calendar";

interface Props {
    id: string
}

export default function CalendarQuote ({id}:Props) {

    return (
        <div className=''>
            <CustomCalendar id={id} /> 
        </div>
    )
} 
