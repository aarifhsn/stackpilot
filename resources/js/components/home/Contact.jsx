import { useState } from 'react';
import { useFadeIn } from '../../hooks/use-fadeIn';
import ContactForm from './ContactForm';
import SectionHeader from './SectionHeader';

export default function Contact({ settings }) {
    console.log('CONTACT SETTINGS:', settings);
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
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-slate-700">
                                        {link.emoji}
                                    </div>
                                    <div>
                                        <div className="max-w-45 truncate text-sm font-bold text-slate-700 dark:text-slate-100">
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
                            <p className="text-sm font-bold text-slate-700 dark:text-white">
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
                                className="shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-gray-400 hover:text-gray-500 dark:border-slate-600 dark:text-slate-300"
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
                            <h3 className="mb-1 text-lg font-bold text-slate-700 dark:text-white">
                                Send a Message
                            </h3>
                            <p className="mb-7 text-xs text-slate-400 dark:text-slate-500">
                                Fill out the form and I'll get back to you
                                within 24 hours.
                            </p>

                            <ContactForm
                                form={form}
                                setForm={setForm}
                                status={status}
                                setStatus={setStatus}
                            />
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
                                <div className="min-h-50 flex-1 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <iframe
                                        className="h-full min-h-50 w-full"
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
