import SelectPaymentMethod from "../../_logic/Subscription/SelectPaymentMethod";
import SelectSubsction from "../../_logic/Subscription/SelectSubscription";

export default function Setting () {

    return (
        <div>
            
            <SelectSubsction />

            <SelectPaymentMethod />

        </div>
    )
}
