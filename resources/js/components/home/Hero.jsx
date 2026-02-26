import { useState } from 'react';

export default function Hero({ settings }) {
    const techStack = [
        'Laravel',
        'React',
        'NextJS',
        'TypeScript',
        'GraphQL',
        'Docker',
        'Prisma',
        'WordPress',
        'PHP',
        'Tailwind',
        'Vue JS',
        'Alpine',
        'Vanilla JS',
    ];
    const [showAll, setShowAll] = useState(false);
    const limit = 6;
    const visible = showAll ? techStack : techStack.slice(0, limit);

    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section
            id="home"
            className="relative flex min-h-[480px] items-start justify-center bg-white bg-contain bg-center bg-no-repeat pt-42 pb-24 text-start md:min-h-[80vh] dark:bg-slate-900"
        >
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <h2 className="relative text-3xl font-extrabold text-slate-700 md:text-5xl 2xl:text-6xl dark:text-slate-300">
                    <span className="block text-xl text-slate-500 md:text-2xl 2xl:text-4xl">
                        {settings?.hero_greeting || "Hi, I'm Arif Hassan"}
                    </span>
                    <span className="relative mt-6 block">
                        {settings?.hero_name || 'Laravel + React Developer'}
                    </span>
                    <span className="mt-4 block text-lg font-medium text-slate-500 md:text-xl 2xl:text-2xl dark:text-gray-400">
                        {settings?.hero_subtitle ||
                            'Building web applications ready for real users, not just demos.'}
                    </span>
                </h2>

                {/* Description */}
                <p className="my-3 max-w-2xl text-left font-poppins text-xs leading-6 font-medium text-gray-500 md:my-6 lg:text-sm lg:leading-9 dark:text-gray-300">
                    {settings?.hero_content ||
                        'I help startups and businesses build fast, reliable web apps. Specialising in Laravel + React SaaS platforms, API-driven systems, and WordPress engineering — shipped and production-ready.'}
                </p>

                {/* Tech Stack — your WP style */}
                <div className="my-8 flex flex-col items-start gap-4 sm:flex-row">
                    <div className="flex-shrink-0">
                        <span className="text-sm font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                            ⚡ Tech Stack
                        </span>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                        {visible.map((tech, index) => (
                            <span
                                key={tech}
                                className={`rounded-lg border px-3 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                                    index < 2
                                        ? 'border-gray-700 bg-gray-800 text-white dark:border-gray-200 dark:bg-gray-200 dark:text-black'
                                        : 'border-gray-100 bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200 dark:border-gray-700 dark:bg-transparent dark:text-slate-200 dark:hover:from-gray-800 dark:hover:to-gray-700'
                                }`}
                            >
                                {tech}
                            </span>
                        ))}
                        {techStack.length > limit && (
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-xs font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-600 hover:text-white dark:text-gray-400"
                            >
                                {showAll ? 'Show Less' : 'Show More...'}
                            </button>
                        )}
                    </div>
                </div>

                {/* CTAs — your WP style */}
                <div className="person_social_info mt-12">
                    <div className="cont_marge my-8 flex text-slate-600 dark:text-slate-300">
                        <h3 className="hello">
                            <button
                                onClick={() => scrollTo('contact')}
                                className="relative cursor-pointer rounded border border-solid border-slate-300 bg-transparent p-4 font-semibold text-slate-600 hover:border-slate-600 hover:text-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-400 dark:hover:text-slate-100"
                            >
                                Let's Work Together
                            </button>
                        </h3>
                        <h3 className="my_work">
                            <button
                                onClick={() => scrollTo('portfolio')}
                                className="flex cursor-pointer items-center gap-2 border-0 bg-transparent px-7 py-4 font-semibold text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
                            >
                                View Projects
                                <span className="text-xs">↗</span>
                            </button>
                        </h3>
                    </div>
                </div>

                {/* Stats row */}
                <div className="mt-8 flex flex-wrap gap-8 border-t border-slate-200 pt-8 dark:border-slate-800">
                    {[
                        { num: '6+', label: 'Years Experience' },
                        { num: '40+', label: 'Projects Shipped' },
                        { num: '100%', label: 'Remote Ready' },
                    ].map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl font-bold text-slate-700 dark:text-white">
                                {s.num}
                            </div>
                            <div className="mt-1 text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
