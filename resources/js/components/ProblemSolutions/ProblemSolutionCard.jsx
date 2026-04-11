import { Link } from '@inertiajs/react';

const DIFFICULTY_STYLES = {
    easy: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    medium: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    complex:
        'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400',
};

export default function ProblemSolutionCard({ solution, visible, delay }) {
    return (
        <div
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease`,
            }}
        >
            {/* Image */}
            {solution.image && (
                <div className="relative h-44 w-full overflow-hidden">
                    <img
                        src={`/storage/${solution.image}`}
                        loading="lazy"
                        alt={solution.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col space-y-4 p-6">
                {/* Top meta row */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Problem type badge */}
                    <span className="inline-block rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold tracking-wider text-gray-600 uppercase dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                        {solution.problem_type}
                    </span>

                    {/* Difficulty badge */}
                    <span
                        className={`inline-block rounded-lg border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${DIFFICULTY_STYLES[solution.difficulty] ?? DIFFICULTY_STYLES.medium}`}
                    >
                        {solution.difficulty}
                    </span>

                    {/* Time to solve */}
                    {solution.time_to_solve && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                            <span>⏱</span>
                            {solution.time_to_solve}
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link
                    href={`/case-studies/${solution.slug}`}
                    className="block text-lg leading-tight font-bold text-slate-800 transition-colors hover:text-slate-500 dark:text-white dark:hover:text-slate-300"
                >
                    {solution.title}
                </Link>

                {/* Summary */}
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {solution.summary}
                </p>

                {/* Tech stack */}
                {solution.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {solution.tech_stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Result highlight + CTA */}
                <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-700">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <span>⚡</span>
                        {solution.result_highlight}
                    </span>
                    <Link
                        // href={route('solutions.show', solution.slug)}
                        href={`/case-studies/${solution.slug}`}
                        className="group/cta inline-flex items-end gap-1.5 text-right text-xs font-bold tracking-wider text-slate-700 uppercase transition-colors hover:text-slate-400 dark:text-slate-300 dark:hover:text-slate-500"
                    >
                        View Breakdown
                        <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
