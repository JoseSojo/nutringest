
export default function LandingSection() {

    return (
        <section className="bg-white drk:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl drk:text-white">
                    Planifique, administre y evolucione con <br /> <strong className="text-gray-600">Nutringest.</strong>
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl drk:text-gray-400">
                    La herramienta perfecta para el nutricionista en constante evolución. Tu aliado seguro una adminstración de tus citas, pacientes y alimentos.
                    </p>
                    <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                        {/* <a href="https://github.com/themesberg/landwind" className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 drk:text-white drk:border-gray-700 drk:hover:bg-gray-700 drk:focus:ring-gray-800">
                            <span>icono</span> View on GitHub
                        </a> */}
                        {/* <a href="https://www.figma.com/community/file/1125744163617429490" className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 drk:focus:ring-gray-700 drk:bg-gray-800 drk:text-gray-400 drk:border-gray-600 drk:hover:text-white drk:hover:bg-gray-700">
                            <span>icono</span> Get Figma file
                        </a> */}
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="/hero.png" alt="hero image" />
                </div>
            </div>
        </section>
    )
}
