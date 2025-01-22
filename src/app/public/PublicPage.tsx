// import FAQSection from "./ui/FAQSection";
// import Footer from "./ui/Footer";
// import FreeTrialSection from "./ui/FreeTrialSection";
// import Header from "./ui/Header";
// import LandingSection from "./ui/LandingSection";
// import PricingSection from "./ui/PricingSection";
// import TestimonialSection from "./ui/TestimonialSection";
// import ToolsSection from "./ui/ToolSection";
// import TrustSection from "./ui/TrustSection";

import { useNavigate } from "react-router-dom";
import Image from "../../UI/_atom/Image";
import Button from "../../UI/_atom/Button";
import Subtitle from "../../UI/_atom/Subtitle";
import Paragraph from "../../UI/_atom/Paragraph";
import { IcoCheck } from "../../UI/_compound/Icons/AllIcon";


export default function PublicPage() {

    const navigate = useNavigate();
    const aNavCls = `font-bold text-sm py-3 px-5 bg-purple-400 text-white hover:bg-purple-500 duration-200`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-300 pb-10">

            <nav className="p-3 flex justify-between items-center m-auto max-w-5xl">
                <ul className="flex">
                    <a href="#services" className={aNavCls}>Servicios</a>
                    <a href="#subscription" className={aNavCls}>Subscripción</a>
                    <a href="#contact" className={aNavCls}>Contacto</a>
                </ul>

                <div>
                    <Image
                        alt=""
                        customClass="w-16"
                        path="/android-chrome-512x512.png"
                    />
                </div>

                <ul className="flex gap-2">
                    <Button click={() => navigate(`/login`, { viewTransition: true })} customClass={`font-bold text-sm py-2 px-5 duration-200 rounded-full border border-emerald-900 font-black text-purple-600 hover:bg-purple-400 hover:border-purple-400 hover:text-purple-50`} text="Iniciar Sesión" />
                    <Button click={() => navigate(`/register`, { viewTransition: true })} customClass={`font-bold text-sm py-2 px-5 duration-200 rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-400 hover:border-emerald-400 hover:text-emerald-50`} text="Prueba Gratuita" />
                </ul>
            </nav>

            <section className="m-auto max-w-2xl mt-5">
                <Subtitle customClass="w-full text-6xl font-bold text-center text-purple-700" text="La precisión de la nutrición al alcance de tu mano." />
                <Paragraph customClass="w-full text-sm mt-5 font-semibold text-center" text="La herramienta perfecta para el nutricionista en constante evolución. Tu aliado seguro una adminstración de tus citas, pacientes y alimentos." />
            </section>

            <section id="services" className="m-auto max-w-6xl mt-10">
                <Subtitle customClass="flex-1 w-full text-center text-2xl font-bold text-purple-700" text="¿Qué ofrecemos?" />

                <div className="flex gap-3">
                    <div className="max-w-sm w-full lg:max-w-md lg:flex">
                        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: "url('/n1.webp')", backgroundPosition: `center` }} title="Woman holding a mug">
                        </div>
                        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8 flex flex-col justify-center items-center h-full">
                                <div className="text-gray-900 font-bold text-xl mb-2">Listas de intercambio</div>
                                <p className="text-gray-700 text-base">
                                    Desarrolla tus propias listas de intercambio especialmente para tus pacientes, y puedes reutilizarlas para otros pacientes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-sm w-full lg:max-w-md lg:flex">
                        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: "url('/n2.webp')", backgroundPosition: `center` }} title="Woman holding a mug">
                        </div>
                        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8 flex flex-col justify-center items-center h-full">
                                <div className="text-gray-900 font-bold text-xl mb-2">Menús</div>
                                <p className="text-gray-700 text-base">
                                    Crea menús de forma facil y rápida, solo seleccionando dentro de nuestra extensa lista de alimentos.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-sm w-full lg:max-w-md lg:flex">
                        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: "url('/n3.webp')", backgroundPosition: `center` }} title="Woman holding a mug">
                        </div>
                        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8 flex flex-col justify-center items-center h-full">
                                <div className="text-gray-900 font-bold text-xl mb-2">Pacientes</div>
                                <p className="text-gray-700 text-base">
                                    Administra de forma sencilla tus pacientes, agrega nuevos pacientes, actualiza los actuales y avanza día a día junto a ellos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section id="subscription" className="m-auto max-w-6xl mt-10">
                <Subtitle customClass="flex-1 w-full text-center text-2xl font-bold text-purple-700" text="Subscripción" />

                <div className="mt-10 border-t-4 border-emerald-700 flex-col relative w-full lg:max-w-lg bg-white p-5 rounded-2xl m-auto flex justify-center items-center">
                    <Button click={() => navigate(`/register`, { viewTransition: true })} customClass="absolute w-full lg:max-w-sm rounded-full py-1 flex justify-center items-center -top-3 bg-emerald-700 text-white font-bold text-sm" text="Crear cuenta, 5 días de prueba gratuita" />

                    <span className="m-auto w-full text-center mt-3 text-gray-500 font-bold">Costo mensual</span>

                    <div className="flex items-end">
                        <Subtitle customClass="text-4xl lg:text-6xl font-bold text-emerald-700" text="24.99$" />
                        <span className="text-emerald-900 font-black scale-y-150">/ mes</span>
                    </div>

                    <ul className="grid mt-5">
                        <li className="flex items-center gap-3"><i className="text-emerald-700">{<IcoCheck size={24} />}</i> <span className="text-sm font-mono">Gestión de listas de intercambio</span></li>
                        <li className="flex items-center gap-3"><i className="text-emerald-700">{<IcoCheck size={24} />}</i> <span className="text-sm font-mono">Gestión de menús</span></li>
                        <li className="flex items-center gap-3"><i className="text-emerald-700">{<IcoCheck size={24} />}</i> <span className="text-sm font-mono">Gestión de pacientes</span></li>
                        <li className="flex items-center gap-3"><i className="text-emerald-700">{<IcoCheck size={24} />}</i> <span className="text-sm font-mono">Administración de consultas</span></li>
                        <li className="flex items-center gap-3"><i className="text-emerald-700">{<IcoCheck size={24} />}</i> <span className="text-sm font-mono">Agenda</span></li>
                    </ul>

                    <Button
                        click={() => navigate(`/register`, { viewTransition: true })}
                        customClass="mt-5 py-2 w-full lg:max-w-sm rounded-full py-1 flex justify-center items-center bg-emerald-700 text-white font-bold text-sm"
                        text="Prueba Gratuita"
                    />

                </div>

            </section>

            <section id="contact" className="m-auto max-w-6xl mt-10">
                <Subtitle customClass="flex-1 w-full text-center text-2xl font-bold text-purple-700" text="Contacto" />

                <form className="grid grid-cols-2 gap-3 mt-10 flex-col relative w-full lg:max-w-lg bg-white p-5 rounded-2xl m-auto">

                    <div className="w-full">
                        <label htmlFor="inputname" className="block text-gray-800 font-semibold text-sm">
                            Asunto
                        </label>
                        <input
                            type="text"
                            name="inputname"
                            className="input input-sm border border-gray-300"
                        />
                        <label className="pt-1 block text-gray-500 text-sm">tema del contacto.</label>
                    </div>

                    <div className="w-full">
                        <label htmlFor="inputname" className="block text-gray-800 font-semibold text-sm">
                            Correo Electrónico
                        </label>
                        <input
                            type="text"
                            name="inputname"
                            className="input input-sm border border-gray-300"
                        />
                        <label className="pt-1 block text-gray-500 text-sm">Deja tu correo electrónico.</label>
                    </div>

                    <div className="w-full mt-5 col-span-2">
                        <label htmlFor="inputname" className="block text-gray-800 font-semibold text-sm">
                            Mensaje
                        </label>
                        <input
                            type="text"
                            name="inputname"
                            className="w-full textarea textarea-md border border-gray-300"
                        />
                        <label className="pt-1 block text-gray-500 text-sm">Dejanos tu mensaje.</label>
                    </div>


                </form>

                <div className="flex justify-center mt-5 gap-5">
                    <a target="_blank" href="" className="flex justify-center items-center flex-col gap-y-3 border-4 p-5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="url(#a)" height="40" width="40"><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a"><stop offset="0%" stop-color="#0062E0" /><stop offset="100%" stop-color="#19AFFF" /></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" /><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" /></svg>
                        <span className="text-xs text-gray-600">Socail media</span>
                    </a>

                    <a target="_blank" href="" className="flex justify-center items-center flex-col gap-y-3 border-4 p-5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path fill="#fff" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z" /></svg>
                        <span className="text-xs text-gray-600">Socail media</span>
                    </a>

                    <a target="_blank" href="" className="flex justify-center items-center flex-col gap-y-3 border-4 p-5 rounded-lg">
                        <svg viewBox="0 0 256 259" width="40" height="40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z" fill="#00E676" /><path d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z" fill="#FFF" /></svg>
                        <span className="text-xs text-gray-600">Socail media</span>
                    </a>

                    <a target="_blank" href="" className="flex justify-center items-center flex-col gap-y-3 border-4 p-5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" preserveAspectRatio="xMidYMid" viewBox="0 0 256 290"><path fill="#FF004F" d="M189.72022 104.42148c18.67797 13.3448 41.55932 21.19661 66.27233 21.19661V78.08728c-4.67694.001-9.34196-.48645-13.91764-1.4554v37.41351c-24.71102 0-47.5894-7.85181-66.27232-21.19563v96.99656c0 48.5226-39.35537 87.85513-87.8998 87.85513-18.11308 0-34.94847-5.47314-48.93361-14.85978 15.96175 16.3122 38.22162 26.4315 62.84826 26.4315 48.54742 0 87.90477-39.33253 87.90477-87.85712v-96.99457h-.00199Zm17.16896-47.95275c-9.54548-10.4231-15.81283-23.89299-17.16896-38.78453v-6.11347h-13.18894c3.31982 18.92715 14.64335 35.09738 30.3579 44.898ZM69.67355 225.60685c-5.33316-6.9891-8.21517-15.53882-8.20226-24.3298 0-22.19236 18.0009-40.18631 40.20915-40.18631 4.13885-.001 8.2529.6324 12.19716 1.88328v-48.59308c-4.60943-.6314-9.26154-.89945-13.91167-.80117v37.82253c-3.94726-1.25089-8.06328-1.88626-12.20313-1.88229-22.20825 0-40.20815 17.99196-40.20815 40.1873 0 15.6937 8.99747 29.28075 22.1189 35.89954Z" /><path d="M175.80259 92.84876c18.68293 13.34382 41.5613 21.19563 66.27232 21.19563V76.63088c-13.79353-2.93661-26.0046-10.14114-35.18573-20.16215-15.71554-9.80162-27.03808-25.97185-30.3579-44.898H141.8876v189.84333c-.07843 22.1318-18.04855 40.05229-40.20915 40.05229-13.05889 0-24.66039-6.22169-32.00788-15.8595-13.12044-6.61879-22.1179-20.20683-22.1179-35.89854 0-22.19336 17.9999-40.1873 40.20815-40.1873 4.255 0 8.35614.66217 12.20312 1.88229v-37.82254c-47.69165.98483-86.0473 39.93316-86.0473 87.83429 0 23.91184 9.55144 45.58896 25.05353 61.4276 13.98514 9.38565 30.82053 14.85978 48.9336 14.85978 48.54544 0 87.89981-39.33452 87.89981-87.85612V92.84876h-.00099Z" /><path fill="#00F2EA" d="M242.07491 76.63088V66.51456c-12.4384.01886-24.6326-3.46278-35.18573-10.04683 9.34196 10.22255 21.64336 17.27121 35.18573 20.16315Zm-65.54363-65.06015a67.7881 67.7881 0 0 1-.72869-5.45726V0h-47.83362v189.84531c-.07644 22.12883-18.04557 40.04931-40.20815 40.04931-6.50661 0-12.64987-1.54375-18.09025-4.28677 7.34749 9.63681 18.949 15.8575 32.00788 15.8575 22.15862 0 40.13171-17.9185 40.20915-40.0503V11.57073h34.64368ZM99.96593 113.58077V102.8112c-3.9969-.54602-8.02655-.82003-12.06116-.81805C39.35537 101.99315 0 141.32669 0 189.84531c0 30.41846 15.46735 57.22621 38.97116 72.99536-15.5021-15.83765-25.05353-37.51576-25.05353-61.42661 0-47.90014 38.35466-86.84847 86.0483-87.8333Z" /></svg>
                        <span className="text-xs text-gray-600">Socail media</span>
                    </a>

                </div>

            </section>



            {/* <Header /> */}

            {/* <LandingSection /> */}

            {/* <ToolsSection /> */}

            {/* <TrustSection /> */}

            {/* <TestimonialSection /> */}

            {/* <PricingSection /> */}

            {/* <FAQSection /> */}

            {/* <FreeTrialSection /> */}

            {/* <Footer /> */}

        </div>
    )
}
