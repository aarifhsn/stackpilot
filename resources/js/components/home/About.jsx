import { useFadeIn } from '../../hooks/use-fadeIn';
import SectionHeader from './SectionHeader';

export default function About({ settings }) {
    const [ref, visible] = useFadeIn();

    const skills = [
        {
            label: 'SaaS & Dashboards',
            value: 'Building internal tools and client-facing platforms',
        },
        {
            label: 'API-Driven Systems',
            value: 'REST APIs, authentication flows, third-party integrations',
        },
        {
            label: 'Modern Full-Stack',
            value: 'Laravel + React with clean, maintainable structure',
        },
    ];

    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="about" className="bg-slate-50 py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <SectionHeader
                    title="About Me"
                    subtitle="Developer · Problem Solver · Remote Ready"
                />

                <div
                    ref={ref}
                    className={`grid grid-cols-1 items-start gap-8 transition-all duration-700 lg:grid-cols-5 ${
                        visible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    {/* Main bio card — spans 3 cols */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm lg:col-span-3 dark:border-slate-800 dark:bg-slate-900">
                        {/* Tags */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {['Laravel', 'React', 'Next.js', 'WordPress'].map(
                                (t) => (
                                    <span
                                        key={t}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    >
                                        {t}
                                    </span>
                                ),
                            )}
                        </div>

                        <h3 className="mb-4 text-2xl leading-snug font-bold text-slate-800 md:text-3xl dark:text-white">
                            From Idea to Production-Ready Systems
                        </h3>

                        <p className="mb-6 text-sm leading-7 text-slate-500 dark:text-slate-400">
                            {settings?.about_content ||
                                'I specialize in building real-world applications that scale beyond MVPs. My experience spans freelance client work, commercial WordPress products, and modern full-stack development with Laravel, React, and Next.js.'}
                        </p>

                        <ul className="space-y-3">
                            {[
                                'SaaS platforms and internal tools',
                                'Clean architecture built for long-term growth',
                                'API integrations and performance optimization',
                                'Deployment-ready systems (Docker, CI/CD)',
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400"
                                >
                                    <span className="mt-0.5 flex-shrink-0 font-bold text-emerald-500">
                                        ✓
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {settings?.resume_url && (
                            <a
                                href={settings.resume_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:opacity-90 dark:bg-white dark:text-slate-700"
                                style={{ textDecoration: 'none' }}
                            >
                                View Resume →
                            </a>
                        )}
                    </div>

                    {/* Right column — spans 2 cols */}
                    <div className="flex flex-col gap-5 lg:col-span-2">
                        {/* Currently focused */}
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <p className="mb-2 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                Core Expertise
                            </p>
                            <p className="mb-5 text-xl font-bold text-slate-800 dark:text-white">
                                What I Focus On
                            </p>
                            <div className="space-y-3">
                                {skills.map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`flex items-center justify-between gap-8 py-3 text-sm ${
                                            i < skills.length - 1
                                                ? 'border-b border-slate-100 dark:border-slate-800'
                                                : ''
                                        }`}
                                    >
                                        <span className="font-medium text-slate-400 dark:text-slate-500">
                                            {s.label}
                                        </span>
                                        <span className="text-right text-sm font-semibold text-slate-500 dark:text-slate-200">
                                            {s.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {[
                                    { num: '6+', label: 'Years' },
                                    { num: '40+', label: 'Projects' },
                                    { num: '100%', label: 'Remote' },
                                ].map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={
                                            i === 1
                                                ? 'border-x border-slate-100 dark:border-slate-800'
                                                : ''
                                        }
                                    >
                                        <div className="text-2xl font-bold text-slate-700 dark:text-white">
                                            {s.num}
                                        </div>
                                        <div className="mt-1 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <span className="flex-shrink-0 text-xl">🟢</span>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-slate-700 dark:text-white">
                                    Available for Freelance & Remote
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                                    Open to full-time roles too — let's talk
                                </p>
                            </div>
                            <button
                                onClick={() => scrollTo('contact')}
                                className="flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-transparent px-3 py-1.5 text-xs font-bold text-slate-600 transition-all hover:border-gray-400 hover:text-gray-500 dark:border-slate-700 dark:text-slate-300"
                            >
                                Hire Me →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
