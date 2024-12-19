import AgendToDay from "../UI/_organism/Dashboard/AgendToDay";
import SectionCard from "../UI/_organism/Dashboard/SectionCard";
import SectionCoupon from "../UI/_organism/Dashboard/SectionCoupon";
import DrawenerContent from "../UI/_template/DrawenerContent";

export default function Dashboard () {

    return (
        <div className="">
            <DrawenerContent/>
            <SectionCard />

            <SectionCoupon />            

            <AgendToDay /> 
            {/* <AgendRelease /> */}

            {/* <Calendar id="" /> */}

        </div>
    )
}
