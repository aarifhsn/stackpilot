import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SiteLogo from './icons/SiteLogo';

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
        { label: 'About', id: 'about' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Services', id: 'service' },
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
                <SiteLogo />
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
                        onClick={() => {
                            const next = !dark;
                            setDark(next);
                            localStorage.setItem(
                                'theme',
                                next ? 'dark' : 'light',
                            );
                            document.documentElement.classList.toggle(
                                'dark',
                                next,
                            );
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-base transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                    >
                        {dark ? '🔆' : '🌙'}
                    </button>
                </div>

                {/* Mobile hamburger */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={() => {
                            const next = !dark;
                            setDark(next);
                            localStorage.setItem(
                                'theme',
                                next ? 'dark' : 'light',
                            );
                            document.documentElement.classList.toggle(
                                'dark',
                                next,
                            );
                        }}
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
