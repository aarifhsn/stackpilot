import { useState } from 'react';
import { useFadeIn } from '../../hooks/use-fadeIn';
import PortfolioCard from './PortfolioCard';
import SectionHeader from './SectionHeader';

const INITIAL_LIMIT = 6;

export default function Portfolio({ portfolios = [], settings }) {
    const allCategories = [
        ...new Set(portfolios.map((p) => p.category).filter(Boolean)),
    ];

    const [active, setActive] = useState('all');
    const [ref, visible] = useFadeIn();

    // Sort by sort_order ascending
    const sorted = [...portfolios].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
    );

    // If "all" is selected, show only first 6. Otherwise show all of that category.
    const filtered =
        active === 'all'
            ? sorted.slice(0, INITIAL_LIMIT)
            : sorted.filter((p) => p.category === active);

    const tabs = ['all', ...allCategories];

    return (
        <section
            id="portfolio"
            className="bg-white px-6 py-24 lg:px-8 dark:bg-slate-900"
        >
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <SectionHeader
                    title={settings?.portfolio_title || 'Recent Projects'}
                    subtitle={
                        active === 'all'
                            ? `Showing ${filtered.length} of ${portfolios.length} projects`
                            : `${filtered.length} of ${portfolios.length} projects`
                    }
                />

                {/* Filter tabs */}
                {allCategories.length > 0 && (
                    <div className="mb-12 flex flex-wrap justify-center gap-2">
                        {tabs.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`cursor-pointer rounded-full border px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                                    active === cat
                                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-700'
                                        : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500'
                                }`}
                            >
                                {cat === 'all' ? 'All' : cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Portfolio cards */}
                <div ref={ref} className="space-y-12">
                    {filtered.map((project, i) => (
                        <PortfolioCard
                            key={project.id}
                            project={project}
                            reverse={i % 2 !== 0}
                            visible={visible}
                            delay={i * 100}
                        />
                    ))}

                    {filtered.length === 0 && (
                        <div className="py-24 text-center text-slate-400 dark:text-slate-600">
                            <span className="mb-4 block text-5xl">📁</span>
                            <p className="font-semibold">
                                No projects in this category yet.
                            </p>
                        </div>
                    )}
                </div>

                {/* View all link — show when on "all" tab and there are more than 6 */}
                {active === 'all' && portfolios.length > INITIAL_LIMIT && (
                    <div className="mt-16 flex justify-center">
                        <a
                            href="/portfolio"
                            className="group inline-flex transform items-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-400 hover:text-slate-700 dark:bg-slate-700 hover:dark:bg-gray-400"
                            style={{ textDecoration: 'none' }}
                        >
                            View All Projects
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
