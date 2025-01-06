import { useState } from "react";
import Button from "../../_atom/Button";
import Subtitle from "../../_atom/Subtitle";

export default function PorfolioDescription () {
    const [section, setSection] = useState(`SOCIAL_MEDIA`); // SOCIAL_MEDIA | EDUCATION | WORK

    return <div className="flex flex-col justify-center text-sm items-center mt-3">
        <div className="flex justify-between w-full mb-5">
            <div>
                <Subtitle customClass="text-2xl font-bold flex-1" text={section === `SOCIAL_MEDIA` ? `REDES SOCIALES` : section === `FOTO` ? `FOTO` : `SOBRE MÍ`} />
            </div>
            <div role="tablist" className="tabs tabs-lifted w-[50%]">
                <Button click={() => setSection(`SOCIAL_MEDIA`)} customClass={`tab text-sm ${section === `SOCIAL_MEDIA` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Redes sociales" />
                <Button click={() => setSection(`FOTO`)} customClass={`tab text-sm ${section === `FOTO` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Foto" />
                <Button click={() => setSection(`ABOUT`)} customClass={`tab text-sm ${section === `ABOUT` ? `tab-active font-black bg-gray-300` : `font-semibold`}`} text="Sobre mí" />
            </div>
        </div>
        

        { section === `SOCIAL_MEDIA` && SocialMedia() }
        { section === `FOTO` && Foto() }
        { section === `ABOUT` && About() }
    </div>
}

function SocialMedia () {

    return <p>
        En <b>desarrollo</b>, Aquí podras registrar tus redes sociales, facebook, instagram, tiktok, x, linkeind.
    </p>    
}

function Foto () {

    return <p>
        En <b>desarrollo</b>, Aquí podras subir fotos profesionales para que tus cliente o posibles clientes te conozcan.
    </p>
}

function About () {

    return <p>
        En <b>desarrollo</b>, Aquí registrarás una descripción breve y de lo que haces como lo haces y por que lo haces, esta
        será tu presentación a tus clientes o posibles clientes. 
    </p>
}