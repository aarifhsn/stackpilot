import { Head, Link } from '@inertiajs/react';

function BlogNavbar({ settings }) {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
                        <rect width="48" height="48" rx="9" fill="#0F172A" />
                        <polygon points="24,6 13,42 19,42 24,20" fill="#F59E0B" />
                        <polygon points="24,6 35,42 29,42 24,20" fill="#F59E0B" />
                        <rect x="14" y="28" width="20" height="3" rx="1.5" fill="#F59E0B" />
                    </svg>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                        arif<span className="font-light">hassan</span>
                        <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase">Blog</span>
                    </div>
                </Link>
                <Link
                    href="/"
                    className="text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
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

            <div className="min-h-screen bg-white dark:bg-slate-900 font-poppins">
                <BlogNavbar settings={settings} />

                {/* Hero image */}
                {post.featured_image && (
                    <div className="pt-16 w-full h-72 md:h-96 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Article */}
                <article className={`max-w-3xl mx-auto px-6 ${post.featured_image ? 'pt-12' : 'pt-32'} pb-24`}>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {post.category && (
                            <span className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-wide">
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
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <div
                        className="prose prose-slate dark:prose-invert prose-lg max-w-none
                            prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white
                            prose-a:text-gray-600 dark:prose-a:text-gray-400 prose-a:no-underline hover:prose-a:underline
                            prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-xl
                            prose-img:rounded-xl prose-img:shadow-md
                            prose-blockquote:border-gray-400 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share strip */}
                    <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Written by</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{post.author}</p>
                        </div>
                        <div className="flex gap-3">
                            
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-gray-400 hover:text-gray-500 transition-all"
                                style={{ textDecoration: 'none' }}
                            >
                                Share on X →
                            </a>
                            <Link
                                href="/"
                                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-gray-400 hover:text-slate-900 transition-all"
                                style={{ textDecoration: 'none' }}
                            >
                                ← All Posts
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Related posts */}
                {related?.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-16 px-6">
                        <div className="max-w-5xl mx-auto">
                            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-8 text-center">
                                Related Posts
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {related.map(p => (
                                    <Link
                                        key={p.id}
                                        href={`/${p.slug}`}
                                        className="group block bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {p.featured_image && (
                                            <div className="h-40 overflow-hidden">
                                                <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="p-5">
                                            {p.category && (
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                    {p.category}
                                                </span>
                                            )}
                                            <h4 className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                                                {p.title}
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-400">{p.published_at}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-400 dark:text-slate-600">
                    © {new Date().getFullYear()} Arif Hassan ·{' '}
                    <a href="https://arifhassan.com" className="hover:text-gray-500 transition-colors">Portfolio</a>
                </footer>
            </div>
        </>
    );
}