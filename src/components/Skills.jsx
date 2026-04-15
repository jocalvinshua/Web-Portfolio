export default function Skills() {
    const skills = [
        {
            name: 'Web Development',
            icon: './assets/web-icon.png',
            description: 'Building responsive and dynamic websites using the modern MERN stack.',
            link: 'https://github.com/jocalvinshua',
        },
        {
            name: 'UI/UX Design',
            icon: './assets/ui-icon.png',
            description: 'Creating intuitive and engaging user interfaces and seamless digital experiences.',
            link: '#',
        },
        {
            name: 'Data Analysis',
            icon: './assets/graphics-icon.png',
            description: 'Organizing, storing, and maintaining data effectively for insightful business analysis.',
            link: '#',
        }
    ];

    return (
        <section id="skills" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">What I can do</h4>
            <h2 className="text-center text-5xl font-Ovo">My Skills</h2>
            
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-gray-600 dark:text-white/80">
                I am a Computer Science undergraduate at the Calvin Institute of Technology, 
                passionate about turning complex problems into elegant digital solutions.
            </p>

            {/* Fixed the grid-cols class to use standard Tailwind responsive columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                {skills.map((service, index) => (
                    <div 
                        key={index} 
                        className="border border-gray-400 dark:border-white/30 rounded-lg px-8 py-12 
                                   hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 
                                   transition-all duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
                    >
                        <img src={service.icon} alt={`${service.name} icon`} className="w-10" />
                        
                        <h3 className="text-lg my-4 text-gray-700 dark:text-white font-semibold">
                            {service.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
                            {service.description}
                        </p>
                        
                        <a 
                            href={service.link} 
                            className="flex items-center gap-2 text-sm mt-5 font-medium hover:underline"
                        >
                            Read more 
                            <img src="./assets/right-arrow.png" alt="" className="w-4" />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}