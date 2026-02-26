import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import About from '../components/home/About';
import Contact from '../components/home/Contact';
import Footer from '../components/home/Footer';
import Hero from '../components/home/Hero';
import Navbar from '../components/home/Navbar';
import Portfolio from '../components/home/Portfolio';
import Services from '../components/home/Services';

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function useDarkMode() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme');
            if (stored !== null) return stored === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement; // ← always target html element
        root.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    return [dark, setDark];
}

export default function HomePage({
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

            <div className="min-h-screen bg-white font-poppins transition-colors duration-300 dark:bg-slate-900">
                <Navbar dark={dark} setDark={setDark} settings={settings} />

                <main>
                    <Hero settings={settings} />
                    <About settings={settings} />
                    <Portfolio portfolios={portfolios} settings={settings} />
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
        </>
    );
}
