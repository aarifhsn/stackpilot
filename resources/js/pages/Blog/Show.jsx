import { Head, Link } from '@inertiajs/react';

function BlogNavbar({ settings }) {
    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-3"
                    style={{ textDecoration: 'none' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="32"
                        height="32"
                    >
                        <rect width="48" height="48" rx="9" fill="#0F172A" />
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
                    <div className="text-sm font-black text-slate-800 dark:text-white">
                        arif<span className="font-light">hassan</span>
                        <span className="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
                            Blog
                        </span>
                    </div>
                </Link>
                <Link
                    href="/blog"
                    className="text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                    style={{ textDecoration: 'none' }}
                >
                    ← All Posts
                </Link>
            </div>
        </header>
    );
}

export default function BlogShow({ post, related, settings }) {
    return (
        <>
            <Head title={`${post.title} — Arif Hassan`}>
                <meta name="description" content={post.excerpt || post.title} />
            </Head>

            <div className="min-h-screen bg-white font-poppins dark:bg-slate-900">
                <BlogNavbar settings={settings} />

                {/* Hero image */}
                {post.featured_image && (
                    <div className="h-72 w-full overflow-hidden bg-slate-100 pt-16 md:h-96 dark:bg-slate-800">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                {/* Article */}
                <article
                    className={`mx-auto max-w-3xl px-6 ${post.featured_image ? 'pt-12' : 'pt-32'} pb-24`}
                >
                    {/* Meta */}
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        {post.category && (
                            <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold tracking-wide text-gray-700 uppercase dark:border-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                                {post.category}
                            </span>
                        )}
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            {post.published_at}
                        </span>
                        {post.author && (
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                · by {post.author}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="mb-8 text-3xl leading-tight font-black text-slate-800 md:text-5xl dark:text-white">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <div
                        className="prose prose-slate dark:prose-invert prose-lg prose-headings:font-black prose-headings:text-slate-800 dark:prose-headings:text-white prose-a:text-gray-600 dark:prose-a:text-gray-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-xl prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-gray-400 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share strip */}
                    <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center dark:border-slate-800">
                        <div>
                            <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                Written by
                            </p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">
                                {post.author}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-gray-400 hover:text-gray-500 dark:border-slate-700 dark:text-slate-300"
                                style={{ textDecoration: 'none' }}
                            >
                                Share on X →
                            </a>
                            <Link
                                href="/"
                                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gray-400 hover:text-slate-800 dark:bg-white dark:text-slate-800"
                                style={{ textDecoration: 'none' }}
                            >
                                ← All Posts
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Related posts */}
                {related?.length > 0 && (
                    <div className="border-t border-slate-100 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-950">
                        <div className="mx-auto max-w-5xl">
                            <h3 className="mb-8 text-center text-xs font-bold tracking-widest text-slate-400 uppercase">
                                Related Posts
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {related.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/${p.slug}`}
                                        className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-gray-700"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {p.featured_image && (
                                            <div className="h-40 overflow-hidden">
                                                <img
                                                    src={p.featured_image}
                                                    alt={p.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="p-5">
                                            {p.category && (
                                                <span className="text-xs font-bold tracking-wide text-gray-500 uppercase">
                                                    {p.category}
                                                </span>
                                            )}
                                            <h4 className="mt-2 text-sm leading-snug font-bold text-slate-800 transition-colors group-hover:text-gray-600 dark:text-slate-100 dark:group-hover:text-gray-400">
                                                {p.title}
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-400">
                                                {p.published_at}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400 dark:border-slate-800 dark:text-slate-600">
                    © {new Date().getFullYear()} Arif Hassan ·{' '}
                    <a
                        href="https://arifhassan.com"
                        className="transition-colors hover:text-gray-500"
                    >
                        Portfolio
                    </a>
                </footer>
            </div>
        </>
    );
}
