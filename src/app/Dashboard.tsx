import Calendar from "../UI/_organism/Dashboard/Calendar";
import SectionCard from "../UI/_organism/Dashboard/SectionCard";
import DrawenerContent from "../UI/_template/DrawenerContent";


export default function Dashboard () {

    return (
        <div className="">
            <DrawenerContent/>
            <SectionCard />

            <Calendar />

        </div>
    )
}
