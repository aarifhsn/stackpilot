import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useFadeIn } from '../hooks/use-fadeIn';

export default function Portfolios({ portfolios, settings }) {
    const [ref, visible] = useFadeIn();
    const [active, setActive] = useState('All');

    // Build category list from portfolio data
    const categories = [
        'All',
        ...new Set(portfolios.map((p) => p.category).filter(Boolean)),
    ];

    const filtered =
        active === 'All'
            ? portfolios
            : portfolios.filter((p) => p.category === active);

    return (
        <>
            <Head title={`Portfolio — ${settings?.site_name || 'Projects'}`} />

            <main className="min-h-screen bg-white font-poppins dark:bg-gray-950">
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '3rem 1.5rem 5rem',
                    }}
                >
                    {/* ── Page Header ─────────────────────────── */}
                    <div className="mb-10">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-slate-400 uppercase no-underline transition-colors hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200"
                            style={{ letterSpacing: '1.5px' }}
                        >
                            ← Back
                        </Link>

                        <p
                            className="mt-4 text-xs font-bold text-slate-300 uppercase dark:text-slate-600"
                            style={{ letterSpacing: '1.5px' }}
                        >
                            Work
                        </p>
                        <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-slate-50">
                            All Projects
                        </h1>
                        <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                            {settings?.portfolio_subtitle ||
                                'A collection of things Ive built — SaaS, dashboards, APIs, and more.'}
                        </p>
                    </div>

                    {/* ── Category Filter ──────────────────────── */}
                    {categories.length > 1 && (
                        <div className="mb-8 flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActive(cat)}
                                    className={`rounded-lg border px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                                        active === cat
                                            ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-800 dark:border-slate-800 dark:bg-transparent dark:text-slate-500 dark:hover:border-slate-600 dark:hover:text-slate-300'
                                    }`}
                                    style={{ letterSpacing: '1.5px' }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ── Portfolio Grid ───────────────────────── */}
                    <div
                        ref={ref}
                        className={`grid grid-cols-1 gap-5 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-3 ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0'
                        }`}
                    >
                        {filtered.length > 0 ? (
                            filtered.map((project, i) => (
                                <PortfolioCard
                                    key={project.id}
                                    project={project}
                                    index={i}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center">
                                <p className="mb-3 text-4xl">📂</p>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                    No projects in this category yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

function PortfolioCard({ project, index }) {
    return (
        <article
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:border-slate-200 hover:shadow-sm dark:border-slate-800 dark:bg-gray-950 dark:hover:border-slate-700"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Thumbnail */}
            <div
                className="relative overflow-hidden bg-slate-100 dark:bg-slate-800"
                style={{ aspectRatio: '16/10' }}
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span
                            className="font-extrabold text-slate-300 dark:text-slate-600"
                            style={{ fontSize: 'clamp(1.5rem, 6%, 3rem)' }}
                        >
                            AH
                        </span>
                    </div>
                )}

                {/* Category badge over image */}
                {project.category && (
                    <span
                        className="absolute top-3 left-3 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                        style={{ fontSize: '10px', letterSpacing: '1.5px' }}
                    >
                        {project.category}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h3
                    className="mb-2 leading-snug font-bold text-slate-900 dark:text-slate-100"
                    style={{ fontSize: '15px' }}
                >
                    {project.project_link ? (
                        <a
                            href={project.project_link}
                            target="_blank"
                            rel="noreferrer"
                            className="no-underline transition-colors hover:text-slate-500 dark:hover:text-slate-300"
                        >
                            {project.title}
                        </a>
                    ) : (
                        project.title
                    )}
                </h3>

                {project.description && (
                    <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
                        {project.description}
                    </p>
                )}

                {/* Tech stack */}
                {project.tech_stack?.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tech_stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-transparent dark:text-slate-500"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer row */}
                {project.project_link && (
                    <div className="mt-auto border-t border-slate-100 pt-4 dark:border-slate-800">
                        <a
                            href={project.project_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase no-underline transition-colors hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-200"
                            style={{ letterSpacing: '1.5px' }}
                        >
                            View Project
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                                →
                            </span>
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
}
