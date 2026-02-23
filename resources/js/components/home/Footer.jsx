import SiteLogo from './icons/SiteLogo';
import SocialIcon from './icons/SocialIcon';

export default function Footer({ settings }) {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-slate-800 bg-slate-900 px-6 py-12 dark:bg-slate-950">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3">
                    <SiteLogo />
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
