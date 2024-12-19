import AgendRelease from "../UI/_organism/Dashboard/AgendRelease";
import AgendToDay from "../UI/_organism/Dashboard/AgendToDay";
import Calendar from "../UI/_organism/Dashboard/Calendar";

export default function CalendarPage () {

    return (
        <div className="grip">

            <AgendToDay /> 
            <AgendRelease />

            <Calendar id="" />

        </div>
    )
}
