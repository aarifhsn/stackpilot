import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function useDarkMode() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return (
                localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
            );
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    return [dark, setDark];
}

function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.1 },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

function Navbar({ dark, setDark, settings }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState('home');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Services', id: 'service' },
        { label: 'About', id: 'about' },
        {
            label: 'Blog',
            href: settings?.blog_url || '/blog',
        },
    ];

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95'
                    : 'bg-white/80 backdrop-blur-sm dark:bg-slate-900/80'
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <a
                    href="/"
                    className="group flex items-center gap-3"
                    style={{ textDecoration: 'none' }}
                >
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="38"
                            height="38"
                        >
                            <rect
                                width="48"
                                height="48"
                                rx="9"
                                fill="#0F172A"
                            />
                            <g transform="translate(9, 9) scale(0.513, 0.513)">
                                <path
                                    fill="white"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.001,60.789c-0.035-1.043,0.688-1.877,1.143-2.73c1.366-2.564,2.773-5.168,4.073-7.799c0.877-1.774,1.632-3.578,2.682-5.266c1.522-2.443,2.786-5.109,4.123-7.748c1.328-2.621,2.551-5.293,3.974-7.896c0.907-1.66,1.74-3.559,2.781-5.115c1.132-1.693,2.556-2.883,5.066-3.031c1.251-0.072,2.631,0.051,4.023,0.051c2.819,0,5.181,0.096,8.146,0c0.917-0.029,3.203-0.285,3.477,0.397c0.23,0.572-0.667,1.922-0.993,2.533C33.044,34.4,27.843,44.621,22.402,54.879c-1.497,2.822-2.565,5.977-6.358,6.408c-1.579,0.178-3.569,0.088-5.513,0.049c-2.601-0.051-5.559-0.049-8.245-0.049C1.479,61.287,0.464,61.498,0.001,60.789z"
                                />
                                <path
                                    fill="white"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M59.852,60.84c-0.643,0.906-2.301,0.648-3.725,0.596c-2.814-0.105-5.394-0.051-8.344-0.051c-1.988,0-4.132,0.225-5.563-0.348c-2.343-0.936-3.468-3.621-4.619-5.91c-0.661-1.314-1.435-2.611-2.136-3.873c-0.689-1.24-1.352-2.598-2.086-3.975C33.049,46.66,32.7,46,32.336,45.293c-0.449-0.869-1.65-2.438-0.199-2.682c1.135-0.191,2.587,0,3.924,0c2.558,0,5.311-0.101,7.848,0c2.417,0.096,4.574-0.219,6.159,0.744c1.861,1.131,2.852,3.371,3.725,5.414c0.437,1.024,1.022,2.033,1.54,3.029c1.026,1.978,2.035,3.959,3.08,5.961C58.934,58.76,59.591,59.713,59.852,60.84z"
                                />
                            </g>
                        </svg>
                    </div>
                    <div>
                        <div className="text-[15px] leading-none font-black tracking-widest text-slate-500 dark:text-white">
                            arif<span className="font-light"> hassan</span>
                        </div>
                        <div className="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase">
                            Full-Stack Dev
                        </div>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) =>
                        link.href ? (
                            link.label === 'Blog' ? (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="rounded-lg px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase transition-all hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase transition-all hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    style={{ textDecoration: 'none' }}
                                >
                                    {link.label}
                                </a>
                            )
                        ) : (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.id)}
                                className={`cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-all ${
                                    active === link.id
                                        ? 'bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                                }`}
                            >
                                {link.label}
                            </button>
                        ),
                    )}
                    <button
                        onClick={() => scrollTo('contact')}
                        className="ml-2 cursor-pointer rounded-lg border-0 bg-gray-800 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-slate-100 uppercase transition-all hover:bg-gray-500"
                    >
                        Contact
                    </button>
                </nav>

                {/* Desktop Right */}
                <div className="hidden items-center gap-2 lg:flex">
                    {settings?.github_url && (
                        <SocialIcon href={settings.github_url} icon="github" />
                    )}
                    {settings?.linkedin_url && (
                        <SocialIcon
                            href={settings.linkedin_url}
                            icon="linkedin"
                        />
                    )}
                    {settings?.twitter_url && (
                        <SocialIcon
                            href={settings.twitter_url}
                            icon="twitter"
                        />
                    )}

                    <div className="ml-1 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 dark:border-emerald-800 dark:bg-emerald-900/30">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-400">
                            Available
                        </span>
                    </div>

                    {/* Dark toggle */}
                    <button
                        onClick={() => setDark(!dark)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-base transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                    >
                        {dark ? '🔆' : '🌙'}
                    </button>
                </div>

                {/* Mobile hamburger */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={() => setDark(!dark)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-base dark:border-slate-700 dark:bg-slate-800"
                    >
                        {dark ? '🔆' : '🌙'}
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-transparent text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                        <span className="text-lg">
                            {mobileOpen ? '✕' : '☰'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 lg:hidden ${
                    mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{
                    background: dark
                        ? 'rgba(15,23,42,0.98)'
                        : 'rgba(255,255,255,0.98)',
                }}
            >
                <div className="flex flex-col gap-1 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
                    {navLinks.map((link) =>
                        link.href ? (
                            link.label === 'Blog' ? (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="border-b border-slate-50 py-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="border-b border-slate-50 py-3 text-xs font-bold tracking-widest text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                                    style={{ textDecoration: 'none' }}
                                >
                                    {link.label}
                                </a>
                            )
                        ) : (
                            <button
                                key={link.label}
                                onClick={() => {
                                    scrollTo(link.id);
                                    setMobileOpen(false);
                                }}
                                className="cursor-pointer border-x-0 border-t-0 border-b border-slate-50 bg-transparent py-3 text-left text-xs font-bold tracking-widest text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                            >
                                {link.label}
                            </button>
                        ),
                    )}
                    <button
                        onClick={() => {
                            scrollTo('contact');
                            setMobileOpen(false);
                        }}
                        className="mt-3 cursor-pointer rounded-lg border-0 bg-gray-400 py-3 text-xs font-bold tracking-widest text-slate-900 uppercase"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </header>
    );
}

function SocialIcon({ href, icon }) {
    const icons = {
        github: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
            >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        linkedin: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
            >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        twitter: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-gray-400 hover:text-gray-500 dark:border-slate-700 dark:text-slate-400"
            style={{ textDecoration: 'none' }}
        >
            {icons[icon]}
        </a>
    );
}

function Hero({ settings }) {
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
                        {visible.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-lg border border-gray-100 bg-gray-100 px-3 py-2 text-sm font-semibold whitespace-nowrap text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-200 dark:border-gray-700 dark:bg-transparent dark:text-slate-200 dark:hover:from-gray-800 dark:hover:to-gray-700"
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
                                className="relative cursor-pointer rounded border border-solid border-slate-300 bg-transparent p-4 font-semibold text-slate-600 hover:border-slate-600 hover:text-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-400 dark:hover:text-slate-100"
                            >
                                Let's Work Together
                            </button>
                        </h3>
                        <h3 className="my_work">
                            <button
                                onClick={() => scrollTo('portfolio')}
                                className="flex cursor-pointer items-center gap-2 border-0 bg-transparent px-7 py-4 font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
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
                            <div className="text-3xl font-black text-slate-900 dark:text-white">
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

function SectionHeader({ title, subtitle }) {
    return (
        <div className="mb-16 text-center">
            <h2 className="mb-3 text-5xl font-black tracking-tight text-slate-900 uppercase dark:text-white">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm font-semibold tracking-wide text-slate-400 dark:text-slate-500">
                    {subtitle}
                </p>
            )}
            <div className="mt-4 flex justify-center gap-1">
                <span className="h-1 w-8 rounded-full bg-gray-400" />
                <span className="h-1 w-2 rounded-full bg-gray-300" />
                <span className="h-1 w-1 rounded-full bg-gray-200" />
            </div>
        </div>
    );
}

function About({ settings }) {
    const [ref, visible] = useFadeIn();

    const skills = [
        { label: 'Backend', value: 'Laravel, REST APIs, GraphQL' },
        { label: 'Frontend', value: 'React, Next.js, Tailwind' },
        { label: 'DevOps', value: 'Docker, Deployments, CI/CD' },
        { label: 'CMS', value: 'WordPress Engineering' },
    ];

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

                        <h3 className="mb-4 text-2xl leading-snug font-black text-slate-900 dark:text-white">
                            I build web apps that are ready for{' '}
                            <span className="text-gray-500">real users </span>
                            not just demos.
                        </h3>

                        <p className="mb-6 text-sm leading-8 text-slate-500 dark:text-slate-400">
                            {settings?.about_content ||
                                'I help startups and growing businesses turn ideas into fast, reliable web applications. My core stack is Laravel + React for SaaS platforms, dashboards, and API-driven systems, with 6+ years of hands-on experience shipping production-ready solutions using Next.js, GraphQL, Docker, and WordPress.'}
                        </p>

                        <ul className="space-y-3">
                            {[
                                'Clean, maintainable architecture built to scale with your product',
                                'SaaS platforms, internal dashboards, and client-facing web apps',
                                'API integrations, performance tuning, and full deployment setup',
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
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:opacity-90 dark:bg-white dark:text-slate-900"
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
                                Currently Focused On
                            </p>
                            <p className="mb-5 text-lg font-black text-slate-900 dark:text-white">
                                SaaS & Full-Stack Product Development
                            </p>
                            <div className="space-y-3">
                                {skills.map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`flex items-center justify-between py-3 text-sm ${
                                            i < skills.length - 1
                                                ? 'border-b border-slate-100 dark:border-slate-800'
                                                : ''
                                        }`}
                                    >
                                        <span className="font-medium text-slate-400 dark:text-slate-500">
                                            {s.label}
                                        </span>
                                        <span className="text-right text-xs font-bold text-slate-700 dark:text-slate-200">
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
                                        <div className="text-2xl font-black text-slate-900 dark:text-white">
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
                                <p className="text-sm font-bold text-slate-900 dark:text-white">
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

function Portfolio({ portfolios = [], settings }) {
    // Collect unique categories from portfolio data
    const allCategories = [
        ...new Set(portfolios.map((p) => p.category).filter(Boolean)),
    ];
    const [active, setActive] = useState(allCategories[0] || 'all');
    const [ref, visible] = useFadeIn();

    const filtered =
        active === 'all'
            ? portfolios
            : portfolios.filter((p) => p.category === active);

    return (
        <section
            id="portfolio"
            className="bg-white px-6 py-24 lg:px-8 dark:bg-slate-900"
        >
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <SectionHeader
                    title={settings?.portfolio_title || 'Recent Projects'}
                    subtitle={`${filtered.length} of ${portfolios.length} projects`}
                />

                {/* Filter tabs */}
                {allCategories.length > 0 && (
                    <div className="mb-12 flex flex-wrap justify-center gap-2">
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`cursor-pointer rounded-full border px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                                    active === cat
                                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                                        : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500'
                                }`}
                            >
                                {cat}
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

                {/* View all link */}
                {portfolios.length > 6 && (
                    <div className="mt-16 flex justify-center">
                        <a
                            href="/portfolio"
                            className="group inline-flex transform items-center gap-3 rounded-xl bg-slate-900 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-400 hover:text-slate-900 dark:bg-slate-700 hover:dark:bg-gray-400"
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

function PortfolioCard({ project, reverse, visible, delay }) {
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

function Services({ services = [], settings }) {
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
                            className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gray-700"
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
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl dark:bg-gray-900/20">
                                        {service.icon}
                                    </div>
                                )}
                                <h3 className="text-base leading-snug font-bold text-slate-800 transition-colors group-hover:text-gray-600 dark:text-slate-100 dark:group-hover:text-gray-400">
                                    {service.title}
                                </h3>
                            </div>

                            <div className="border-t border-slate-50 dark:border-slate-800" />

                            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                                {service.content}
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
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl dark:bg-gray-900/20">
                                        {s.icon}
                                    </div>
                                    <h3 className="text-base leading-snug font-bold text-slate-800 transition-colors group-hover:text-gray-600 dark:text-slate-100 dark:group-hover:text-gray-400">
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
                                <div className="text-2xl font-black text-slate-900 dark:text-white">
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

function Contact({ settings }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
    const [ref, visible] = useFadeIn();

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document.querySelector('meta[name="csrf-token"]')
                            ?.content || '',
                },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    const quickLinks = [
        settings?.whatsapp_url && {
            href: `https://wa.me/${settings.whatsapp_url.replace(/\D/g, '')}`,
            emoji: '💬',
            label: 'WhatsApp Me',
            sub: 'Usually within 1 hour',
            color: 'emerald',
        },
        settings?.contact_email && {
            href: `mailto:${settings.contact_email}`,
            emoji: '✉️',
            label: settings.contact_email,
            sub: 'Detailed project discussion',
            color: 'slate',
        },
        settings?.telegram_url && {
            href: settings.telegram_url,
            emoji: '✈️',
            label: 'Telegram',
            sub: 'Quick & async friendly',
            color: 'blue',
        },
        settings?.linkedin_url && {
            href: settings.linkedin_url,
            emoji: '💼',
            label: 'LinkedIn',
            sub: 'Professional inquiries',
            color: 'blue',
        },
    ].filter(Boolean);

    return (
        <section id="contact" className="bg-white py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <SectionHeader
                    title={settings?.contact_title || 'Get In Touch'}
                    subtitle="Have a project in mind? I'm available — reach out any way you prefer."
                />

                <div
                    ref={ref}
                    className={`space-y-6 transition-all duration-700 ${
                        visible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    {/* Quick action cards */}
                    {quickLinks.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-gray-500"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-slate-700">
                                        {link.emoji}
                                    </div>
                                    <div>
                                        <div className="max-w-[180px] truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                                            {link.label}
                                        </div>
                                        <div className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                                            {link.sub}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Availability strip */}
                    <div className="flex flex-col items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800">
                        <span className="text-xl">🟢</span>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                Currently available for new projects
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                                Open to freelance contracts, long-term
                                collaborations, and full-time remote roles
                            </p>
                        </div>
                        {settings?.github_url && (
                            <a
                                href={settings.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-gray-400 hover:text-gray-500 dark:border-slate-600 dark:text-slate-300"
                                style={{ textDecoration: 'none' }}
                            >
                                GitHub →
                            </a>
                        )}
                    </div>

                    {/* Main grid: form + info */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Contact form */}
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
                            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                                Send a Message
                            </h3>
                            <p className="mb-7 text-xs text-slate-400 dark:text-slate-500">
                                Fill out the form and I'll get back to you
                                within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="Your name"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="your@email.com"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                                        Message
                                    </label>
                                    <textarea
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                message: e.target.value,
                                            })
                                        }
                                        required
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full cursor-pointer rounded-xl border-0 bg-slate-900 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-gray-400 hover:text-slate-900 disabled:opacity-60 dark:bg-white dark:text-slate-900"
                                >
                                    {status === 'sending'
                                        ? 'Sending…'
                                        : 'Send Message →'}
                                </button>

                                {status === 'success' && (
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                                        ✓ Message sent! I'll reply within 24
                                        hours.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                                        Something went wrong. Please email me
                                        directly.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Sidebar info */}
                        <div className="flex flex-col gap-5">
                            {(settings?.contact_phone ||
                                settings?.contact_email ||
                                settings?.contact_address) && (
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                                    <p className="mb-5 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                        Contact Info
                                    </p>
                                    <div className="space-y-5">
                                        {[
                                            {
                                                icon: '📞',
                                                label: 'Phone / WhatsApp',
                                                value: settings?.contact_phone,
                                            },
                                            {
                                                icon: '✉️',
                                                label: 'Email',
                                                value: settings?.contact_email,
                                            },
                                            {
                                                icon: '📍',
                                                label: 'Location',
                                                value: settings?.contact_address,
                                            },
                                        ]
                                            .filter((i) => i.value)
                                            .map((item) => (
                                                <div
                                                    key={item.label}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="mt-0.5 text-base">
                                                        {item.icon}
                                                    </span>
                                                    <div>
                                                        <div className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                                            {item.label}
                                                        </div>
                                                        <div className="mt-0.5 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                            {item.value}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {settings?.map_url && (
                                <div className="min-h-[200px] flex-1 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <iframe
                                        className="h-full min-h-[200px] w-full"
                                        src={settings.map_url}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Location map"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer({ settings }) {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-slate-800 bg-slate-900 px-6 py-12 dark:bg-slate-950">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="32"
                        height="32"
                    >
                        <rect width="48" height="48" rx="9" fill="#1E293B" />
                        <polygon
                            points="24,6 13,42 19,42 24,20"
                            fill="#F59E0B"
                        />
                        <polygon
                            points="24,6 35,42 29,42 24,20"
                            fill="#F59E0B"
                        />
                        <rect
                            x="14"
                            y="28"
                            width="20"
                            height="3"
                            rx="1.5"
                            fill="#F59E0B"
                        />
                    </svg>
                    <div>
                        <div className="text-sm font-black text-white">
                            arif<span className="font-light">hassan</span>
                        </div>
                        <div className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                            Full-Stack Dev
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-500">
                    © {year} Arif Hassan. Built with Laravel & React.
                </p>

                <div className="flex items-center gap-3">
                    {settings?.github_url && (
                        <SocialIcon href={settings.github_url} icon="github" />
                    )}
                    {settings?.linkedin_url && (
                        <SocialIcon
                            href={settings.linkedin_url}
                            icon="linkedin"
                        />
                    )}
                    {settings?.twitter_url && (
                        <SocialIcon
                            href={settings.twitter_url}
                            icon="twitter"
                        />
                    )}
                </div>
            </div>
        </footer>
    );
}

export default function PortfolioPage({
    portfolios = [],
    services = [],
    settings = {},
}) {
    const [dark, setDark] = useDarkMode();
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 200); // show after 200px scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head
                title={
                    settings?.site_title || 'Arif Hassan — Full-Stack Developer'
                }
            >
                <meta
                    name="description"
                    content={
                        settings?.meta_description ||
                        'Laravel, React & WordPress developer available for remote work.'
                    }
                />
            </Head>

            <div className={dark ? 'dark' : ''}>
                <div className="min-h-screen bg-white font-poppins transition-colors duration-300 dark:bg-slate-900">
                    <Navbar dark={dark} setDark={setDark} settings={settings} />

                    <main>
                        <Hero settings={settings} />
                        <About settings={settings} />
                        <Portfolio
                            portfolios={portfolios}
                            settings={settings}
                        />
                        <Services services={services} settings={settings} />
                        <Contact settings={settings} />
                    </main>

                    <Footer settings={settings} />

                    {/* Back to top */}
                    {showTop && (
                        <button
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                            className="fixed right-6 bottom-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-slate-100 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-500 hover:shadow-xl"
                            title="Back to top"
                        >
                            ↑
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
