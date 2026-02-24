import { useFadeIn } from '../../hooks/use-fadeIn';
import SectionHeader from './SectionHeader';

export default function Services({ services = [], settings }) {
    const [ref, visible] = useFadeIn();

    return (
        <section id="service" className="bg-slate-50 py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <SectionHeader
                    title={settings?.service_title || 'Services'}
                    subtitle={
                        settings?.service_subtitle || 'What I Can Build For You'
                    }
                />

                <div
                    ref={ref}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gray-700"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible
                                    ? 'translateY(0)'
                                    : 'translateY(24px)',
                                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                            }}
                        >
                            {/* Icon + Title */}
                            <div className="flex items-center gap-4">
                                {service.icon && (
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                        {service.icon}
                                    </div>
                                )}
                                <h3 className="text-lg leading-7 font-semibold text-slate-800 capitalize transition-colors group-hover:text-gray-600 dark:text-slate-100 dark:group-hover:text-gray-400">
                                    {service.title}
                                </h3>
                            </div>

                            <div className="border-t border-slate-50 dark:border-slate-800" />

                            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: service.content,
                                    }}
                                />
                            </p>
                        </div>
                    ))}

                    {services.length === 0 &&
                        /* Placeholder cards */
                        [
                            {
                                title: 'Laravel Development',
                                icon: '⚙️',
                                desc: 'Scalable SaaS platforms, REST APIs, and complex backend systems built with Laravel.',
                            },
                            {
                                title: 'React / Next.js Frontend',
                                icon: '⚛️',
                                desc: 'Performant, modern UIs with React and Next.js — from landing pages to full web apps.',
                            },
                            {
                                title: 'WordPress Engineering',
                                icon: '🌐',
                                desc: 'Custom themes, plugins, and headless WordPress setups optimised for speed and SEO.',
                            },
                            {
                                title: 'API Integration',
                                icon: '🔗',
                                desc: 'Third-party API integrations, payment gateways, and microservice connections.',
                            },
                            {
                                title: 'Docker & Deployment',
                                icon: '🐳',
                                desc: 'Containerised environments, CI/CD pipelines, and production deployment setup.',
                            },
                            {
                                title: 'SaaS Architecture',
                                icon: '🏗️',
                                desc: 'Multi-tenant SaaS design with subscriptions, auth, and scalable data models.',
                            },
                        ].map((s, i) => (
                            <div
                                key={s.title}
                                className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gray-700"
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible
                                        ? 'translateY(0)'
                                        : 'translateY(24px)',
                                    transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                        {s.icon}
                                    </div>
                                    <h3 className="text-lg leading-7 font-semibold text-slate-800 capitalize transition-colors group-hover:text-gray-600 dark:text-slate-100 dark:group-hover:text-gray-400">
                                        {s.title}
                                    </h3>
                                </div>
                                <div className="border-t border-slate-50 dark:border-slate-800" />
                                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                </div>

                {/* Stats strip */}
                <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                        {[
                            { num: '6+', label: 'Years Experience' },
                            { num: '40+', label: 'Projects Delivered' },
                            { num: '100%', label: 'Remote Ready' },
                            { num: '🟢', label: 'Available Now' },
                        ].map((s, i) => (
                            <div
                                key={s.label}
                                className={`${
                                    i > 0
                                        ? 'border-l border-slate-100 dark:border-slate-800'
                                        : ''
                                }`}
                            >
                                <div className="text-2xl font-bold text-slate-700 dark:text-white">
                                    {s.num}
                                </div>
                                <div className="mt-1 text-[9px] font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
