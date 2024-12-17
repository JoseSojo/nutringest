import AgendRelease from "../UI/_organism/Dashboard/AgendRelease";
import AgendToDay from "../UI/_organism/Dashboard/AgendToDay";
import Calendar from "../UI/_organism/Dashboard/Calendar";
import SectionCard from "../UI/_organism/Dashboard/SectionCard";
import DrawenerContent from "../UI/_template/DrawenerContent";

export default function Dashboard () {

    return (
        <div className="">
            <DrawenerContent/>
            <SectionCard />

            <AgendToDay /> 
            <AgendRelease />

            <Calendar id="" />



        </div>
    )
}
