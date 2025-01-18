import FichaPaciente from "../../../../UI/_organism/FichaPaciente"

interface Props {
    id: string
}

export default function PatientQuote ({id}:Props) {

    return <FichaPaciente customId={id} />
} 
