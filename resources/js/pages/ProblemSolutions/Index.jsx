import { router } from '@inertiajs/react';
import Footer from '../../components/home/Footer';
import Navbar from '../../components/home/Navbar';
import ProblemSolutionCard from '../../components/ProblemSolutions/ProblemSolutionCard';
import { useFadeIn } from '../../hooks/use-fadeIn';
import { useDarkMode } from '../../lib/utils';

export default function Index({
    solutions = [],
    types = [],
    activeType = 'all',
    settings = {},
}) {
    const [dark, setDark] = useDarkMode();
    const [ref, visible] = useFadeIn();
    const tabs = ['all', ...types];

    function handleTypeChange(type) {
        router.get('/case-studies', type !== 'all' ? { type } : {}, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <>
            <Navbar dark={dark} setDark={setDark} settings={settings} />

            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* ── Page header — matches your SectionHeader style ──────── */}
                <div className="border-b border-slate-100 bg-slate-50 pt-24 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto max-w-6xl px-6 py-14 text-center lg:px-8">
                        <p className="mb-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                            Problem → Solution Library
                        </p>
                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-800 uppercase lg:text-5xl dark:text-white">
                            How I Solve Client Problems
                        </h1>
                        {/* Underline accent — same as your SectionHeader */}
                        <div className="mx-auto mb-6 h-0.5 w-12 bg-slate-300 dark:bg-slate-600" />
                        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Real-world problems sourced from platforms like
                            Upwork, broken down step by step. Each breakdown
                            shows my thinking — not just the solution.
                        </p>
                        <p className="mt-3 text-xs text-slate-400 dark:text-slate-600">
                            Some are simulated from actual client scenarios to
                            sharpen my approach.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
                    {/* Filter tabs — same style as your Portfolio tabs */}
                    {tabs.length > 1 && (
                        <div className="mb-12 flex flex-wrap justify-center gap-2">
                            {tabs.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleTypeChange(type)}
                                    className={`cursor-pointer rounded-full border px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                                        activeType === type
                                            ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-700'
                                            : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500'
                                    }`}
                                >
                                    {type === 'all' ? 'All' : type}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Count */}
                    <p className="mb-8 text-center text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {solutions.length} breakdown
                        {solutions.length !== 1 ? 's' : ''}{' '}
                        {activeType !== 'all' ? `in ${activeType}` : 'total'}
                    </p>

                    {/* Grid */}
                    <div
                        ref={ref}
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {solutions.map((solution, i) => (
                            <ProblemSolutionCard
                                key={solution.id}
                                solution={solution}
                                visible={visible}
                                delay={i * 80}
                            />
                        ))}

                        {solutions.length === 0 && (
                            <div className="col-span-3 py-24 text-center text-slate-400 dark:text-slate-600">
                                <span className="mb-4 block text-5xl">🔍</span>
                                <p className="font-semibold">
                                    No breakdowns in this category yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ── Bottom CTA ─────────────────────────────────────── */}
                    <div className="mt-20 rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-800/60">
                        <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                            Common problems I solve
                        </p>
                        <h2 className="mb-4 text-2xl font-bold text-slate-800 dark:text-white">
                            Facing a similar issue?
                        </h2>
                        <p className="mx-auto mb-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Slow Laravel apps · WordPress performance · React UX
                            issues · API bottlenecks · Production bugs
                        </p>
                        <p className="mx-auto mb-8 max-w-md text-xs text-slate-400 dark:text-slate-500">
                            I'll diagnose the real problem first — not just
                            patch the symptom.
                        </p>
                        <a
                            href="/#contact"
                            className="inline-flex items-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-600 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-200"
                        >
                            Let's Fix It Together →
                        </a>
                    </div>
                </div>
            </div>

            <Footer settings={settings} />
        </>
    );
}
