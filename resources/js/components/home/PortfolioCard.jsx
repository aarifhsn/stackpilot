export default function PortfolioCard({ project, reverse, visible, delay }) {
    const features = project.features
        ? project.features
              .split(',')
              .map((f) => f.trim())
              .filter(Boolean)
        : [
              'Responsive Design',
              'Custom Development',
              'Performance Optimization',
              'Modern UI/UX',
          ];

    return (
        <div
            className={`flex flex-col ${
                reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } group items-center gap-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
            }}
        >
            {/* Image */}
            <div className="relative h-72 w-full flex-shrink-0 overflow-hidden lg:h-96 lg:w-1/2">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                        <span className="text-5xl opacity-30">📁</span>
                    </div>
                )}

                {/* Hover overlay */}
                {project.project_link && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <a
                            href={project.project_link}
                            target="_blank"
                            rel="noreferrer"
                            className="transform rounded-xl bg-gray-400 px-6 py-3 text-sm font-bold tracking-wide text-slate-900 uppercase shadow-lg transition-all hover:scale-105 hover:bg-gray-500"
                            style={{ textDecoration: 'none' }}
                        >
                            View Project →
                        </a>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="w-full space-y-4 p-8 lg:w-1/2">
                {/* Category badge */}
                {project.category && (
                    <span className="inline-block rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold tracking-wider text-gray-700 uppercase dark:border-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        {project.category}
                    </span>
                )}

                <h3 className="text-2xl leading-tight font-black text-slate-900 lg:text-3xl dark:text-white">
                    {project.title}
                </h3>

                {project.description && (
                    <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {project.description}
                    </p>
                )}

                {/* Tech stack */}
                {project.tech_stack?.length > 0 && (
                    <div>
                        <p className="mb-2 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                            ⚡ Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features */}
                <div>
                    <p className="mb-3 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                        Key Features
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {features.slice(0, 6).map((f) => (
                            <div
                                key={f}
                                className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400"
                            >
                                <span className="mt-0.5 flex-shrink-0 font-bold text-emerald-500">
                                    ✓
                                </span>
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
