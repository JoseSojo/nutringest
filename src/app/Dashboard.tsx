import AgendToDay from "../UI/_organism/Dashboard/AgendToDay";
import SectionCard from "../UI/_organism/Dashboard/SectionCard";
import DrawenerContent from "../UI/_template/DrawenerContent";
import Calendar from "../UI/_organism/Dashboard/Calendar";


export default function Dashboard () {

    return (
        <div className="">
            <DrawenerContent/>
            <SectionCard />
            <Calendar id="" />

            <AgendToDay /> 
            {/* <AgendRelease /> */}

            {/* <Calendar id="" /> */}

        </div>
    )
}
