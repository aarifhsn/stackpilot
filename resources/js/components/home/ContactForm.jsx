import { useForm, usePage } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();

        post('/contact', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="mx-auto max-w-xl">
            <h1 className="mb-6 text-2xl font-bold">Contact</h1>

            {flash?.success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                    ✓ {flash.success}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Your name"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="your@email.com"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                        Subject
                    </label>
                    <input
                        type="text"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        required
                        placeholder="What's this about?"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    />
                    {errors.subject && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.subject}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                        Message
                    </label>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-gray-400 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    />
                    {errors.message && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full cursor-pointer rounded-xl border-0 bg-slate-900 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-gray-400 hover:text-slate-700 disabled:opacity-60 dark:bg-white dark:text-slate-700"
                >
                    {processing ? 'Sending…' : 'Send Message →'}
                </button>
            </form>
        </div>
    );
}
