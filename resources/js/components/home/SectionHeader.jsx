export default function SectionHeader({ title, subtitle }) {
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
