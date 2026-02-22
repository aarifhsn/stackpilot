import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Navbar({ dark, setDark, settings }) {
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
            // href: settings?.blog_url || '/blog', // redirect to wp site
            href: '/blog',
        },
    ];

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

    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

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
                                    className="rounded-lg px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase transition-all hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase transition-all hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
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
                                        ? 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-white'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
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
                        className="mt-3 cursor-pointer rounded-lg border-0 bg-gray-400 py-3 text-xs font-bold tracking-widest text-slate-700 uppercase"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </header>
    );
}
