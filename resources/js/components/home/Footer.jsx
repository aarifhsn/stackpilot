export default function Footer({ settings }) {
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
