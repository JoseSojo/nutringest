export default function TestimonialSection () {
    return (
        <section className="bg-gray-50 drk:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                    <span className="h-12 mx-auto mb-3 text-gray-400 drk:text-gray-600">
                        {/* Icon placeholder */}
                        <span>icono</span>
                    </span>
                    <blockquote>
                        <p className="text-xl font-medium text-gray-900 md:text-2xl drk:text-white">
                            "Landwind is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."
                        </p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
                        <div className="flex items-center divide-x-2 divide-gray-500 drk:divide-gray-700">
                            <div className="pr-3 font-medium text-gray-900 drk:text-white">Micheal Gough</div>
                            <div className="pl-3 text-sm font-light text-gray-500 drk:text-gray-400">CEO at Google</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};
