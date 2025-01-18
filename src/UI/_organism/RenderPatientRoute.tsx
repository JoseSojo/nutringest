import { useParams } from "react-router-dom";
import FichaPaciente from "./FichaPaciente";

export default function RenderPatientRoute() {
    const {id} = useParams() as {id:string} 

    return <FichaPaciente customId={id} options />
}
