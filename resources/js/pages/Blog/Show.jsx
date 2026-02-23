import Footer from '@/components/home/Footer';
import { Head, Link } from '@inertiajs/react';
import BlogNavbar from '../../components/blog/BlogNavbar';

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
                    className={`mx-auto max-w-3xl overflow-hidden px-6 ${post.featured_image ? 'pt-12' : 'pt-32'} pb-24`}
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
                    <h1 className="mb-8 text-3xl leading-tight font-black text-slate-700 md:text-5xl dark:text-white">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <div
                        className="prose prose-slate dark:prose-invert prose-lg prose-headings:font-black prose-headings:text-slate-700 dark:prose-headings:text-white prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:break-words prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl max-w-none [&_.wp-block-kevinbatdorf-code-block-pro]:max-w-full [&_.wp-block-kevinbatdorf-code-block-pro]:overflow-x-auto [&_.wp-block-kevinbatdorf-code-block-pro]:rounded-xl [&_figure]:max-w-full [&_figure]:overflow-x-auto [&_pre]:max-w-full [&_pre]:overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share strip */}
                    <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center dark:border-slate-800">
                        <div>
                            <p className="mb-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                Written by
                            </p>
                            <p className="font-bold text-slate-700 dark:text-slate-200">
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
                                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gray-400 hover:text-slate-700 dark:bg-white dark:text-slate-700"
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
                                            <h4 className="mt-2 text-sm leading-snug font-bold text-slate-700 transition-colors group-hover:text-gray-600 dark:text-slate-100 dark:group-hover:text-gray-400">
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

                <Footer settings={settings} />
            </div>
        </>
    );
}
