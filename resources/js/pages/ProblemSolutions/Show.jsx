import { Link } from '@inertiajs/react';
import Footer from '../../components/home/Footer';
import Navbar from '../../components/home/Navbar';
import { useDarkMode } from '../../lib/utils';

const DIFFICULTY_STYLES = {
    easy: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    medium: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    complex:
        'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400',
};

function BeforeAfterBar({ metric }) {
    const beforePct = Math.round((metric.before_val / metric.max) * 100);
    const afterPct = Math.round((metric.after_val / metric.max) * 100);
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {metric.label}
                </span>
                <span className="text-xs font-bold text-emerald-500">
                    {metric.before} → {metric.after}
                </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                    className="h-full rounded-full bg-red-300 dark:bg-red-700"
                    style={{ width: `${beforePct}%` }}
                />
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                    className="h-full rounded-full bg-emerald-400 dark:bg-emerald-500"
                    style={{ width: `${afterPct}%` }}
                />
            </div>
            <div className="flex justify-between text-[9px] font-semibold tracking-widest text-slate-400 uppercase">
                <span>Before</span>
                <span>After</span>
            </div>
        </div>
    );
}

export default function Show({ solution, settings = {} }) {
    const steps = (solution.the_solution ?? []).map((s) => s.step ?? s);
    const results = (solution.results ?? []).map((r) => r.item ?? r);
    const [dark, setDark] = useDarkMode();

    const sections = [
        'Context',
        'Problem',
        'Thinking',
        'Solution',
        'Results',
        "What's Next",
    ];

    return (
        <>
            <Navbar dark={dark} setDark={setDark} settings={settings} />

            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* ── Hero ───────────────────────────────────────────────── */}
                <div className="border-b border-slate-100 bg-slate-50 pt-24 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
                        <Link
                            href="/case-studies"
                            className="mb-8 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            ← Back to all breakdowns
                        </Link>

                        <div className="mb-5 flex flex-wrap items-center gap-2">
                            <span className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-[10px] font-bold tracking-wider text-gray-600 uppercase dark:border-gray-700 dark:bg-slate-800 dark:text-gray-400">
                                {solution.problem_type}
                            </span>
                            <span
                                className={`rounded-lg border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${DIFFICULTY_STYLES[solution.difficulty] ?? DIFFICULTY_STYLES.medium}`}
                            >
                                {solution.difficulty}
                            </span>
                            <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                {solution.source}
                            </span>
                            {solution.time_to_solve && (
                                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                                    ⏱ {solution.time_to_solve}
                                </span>
                            )}
                        </div>

                        <h1 className="mb-6 text-3xl leading-tight font-bold text-slate-800 lg:text-4xl dark:text-white">
                            {solution.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-2">
                            {solution.tech_stack?.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    {tech}
                                </span>
                            ))}
                            <span className="ml-auto flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                                ⚡ {solution.result_highlight}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Body ───────────────────────────────────────────────── */}
                <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
                    {/* Cover image */}
                    {solution.image && (
                        <div className="mb-10 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700">
                            <img
                                src={`/storage/${solution.image}`}
                                alt={solution.title}
                                className="h-64 w-full object-cover lg:h-80"
                            />
                        </div>
                    )}

                    {/* Quick jump nav */}
                    <div className="mb-10 flex flex-wrap gap-2">
                        {sections.map((s, i) => (
                            <a
                                key={s}
                                href={`#section-${i + 1}`}
                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase transition-all hover:border-slate-400 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300"
                            >
                                {String(i + 1).padStart(2, '0')} {s}
                            </a>
                        ))}
                    </div>

                    {/* ── 01 Context ───────────────────────────────────────── */}
                    <Section
                        id="section-1"
                        number="01"
                        color="bg-slate-900 dark:bg-white"
                        label="Context"
                    >
                        <Body>{solution.context}</Body>
                    </Section>

                    {/* ── 02 Problem ───────────────────────────────────────── */}
                    <Section
                        id="section-2"
                        number="02"
                        color="bg-red-500"
                        label="The Problem"
                        border="border-red-100 dark:border-red-900/30"
                    >
                        <Body>{solution.the_problem}</Body>
                    </Section>

                    {/* Common mistake */}
                    {solution.common_mistake && (
                        <div className="mb-8 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800/40 dark:bg-amber-900/10">
                            <span className="mt-0.5 text-base">⚠️</span>
                            <div>
                                <p className="mb-1.5 text-[10px] font-bold tracking-widest text-amber-600 uppercase dark:text-amber-500">
                                    Common Mistake
                                </p>
                                <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-300">
                                    {solution.common_mistake}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── 03 My Thinking ───────────────────────────────────── */}
                    <Section
                        id="section-3"
                        number="03"
                        color="bg-blue-500"
                        label="My Thinking"
                        border="border-blue-100 dark:border-blue-900/30"
                        badge={
                            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-blue-600 uppercase dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                The part most devs skip
                            </span>
                        }
                    >
                        <Body>{solution.my_thinking}</Body>
                    </Section>

                    {/* ── 04 The Solution ──────────────────────────────────── */}
                    {steps.length > 0 && (
                        <Section
                            id="section-4"
                            number="04"
                            color="bg-slate-900 dark:bg-white"
                            label="The Solution"
                        >
                            <ul className="space-y-4">
                                {steps.map((step, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                            {step}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {/* ── 05 Results ───────────────────────────────────────── */}
                    {results.length > 0 && (
                        <Section
                            id="section-5"
                            number="05"
                            color="bg-emerald-500"
                            label="Results"
                            border="border-emerald-100 dark:border-emerald-900/30"
                        >
                            <ul className="space-y-3">
                                {results.map((result, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="mt-0.5 flex-shrink-0 font-bold text-emerald-500">
                                            ✓
                                        </span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {result}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {solution.before_after?.length > 0 && (
                                <div className="mt-8 space-y-5 border-t border-slate-100 pt-8 dark:border-slate-700">
                                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                                        Before vs After
                                    </p>
                                    {solution.before_after.map((metric, i) => (
                                        <BeforeAfterBar
                                            key={i}
                                            metric={metric}
                                        />
                                    ))}
                                </div>
                            )}
                        </Section>
                    )}

                    {/* ── 06 What's Next ───────────────────────────────────── */}
                    {solution.whats_next && (
                        <Section
                            id="section-6"
                            number="06"
                            color="bg-slate-400 dark:bg-slate-600"
                            label="What I'd Do Next"
                        >
                            <Body>{solution.whats_next}</Body>
                        </Section>
                    )}

                    {/* ── CTA ──────────────────────────────────────────────── */}
                    <div className="mt-16 rounded-2xl border border-slate-100 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-800/60">
                        <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                            Have a similar problem?
                        </p>
                        <h2 className="mb-3 text-2xl font-bold text-slate-800 dark:text-white">
                            Let's fix it together.
                        </h2>
                        <p className="mx-auto mb-8 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                            I'm available for freelance work. Reach out and
                            let's talk about your project.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-xs font-bold tracking-widest text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-gray-600 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-200"
                            >
                                Get in touch →
                            </a>
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-xs font-bold tracking-widest text-slate-600 uppercase transition-all hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                                More breakdowns
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer settings={settings} />
        </>
    );
}

// ── Reusable section wrapper ───────────────────────────────────────────────
function Section({
    id,
    number,
    color,
    label,
    border = 'border-slate-100 dark:border-slate-700',
    badge,
    children,
}) {
    return (
        <div id={id} className="mb-8 scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white ${color}`}
                >
                    {number}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                    {label}
                </span>
                {badge}
            </div>
            <div
                className={`rounded-2xl border bg-white p-8 dark:bg-slate-800 ${border}`}
            >
                {children}
            </div>
        </div>
    );
}

function Body({ children }) {
    return (
        <p className="text-sm leading-7 whitespace-pre-line text-slate-600 dark:text-slate-400">
            {children}
        </p>
    );
}
