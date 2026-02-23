import Footer from '@/components/home/Footer';
import { Head, Link, router } from '@inertiajs/react';
import BlogNavbar from '../../components/blog/BlogNavbar';

function PostCard({ post }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-gray-700"
            style={{ textDecoration: 'none' }}
        >
            {/* Thumbnail */}
            <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                {post.featured_image ? (
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl opacity-20">
                        ✍️
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Category + Date */}
                <div className="mb-3 flex items-center gap-3">
                    {post.category && (
                        <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-bold tracking-wide text-gray-700 uppercase dark:border-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                            {post.category}
                        </span>
                    )}
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                        {post.published_at}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mb-3 text-lg leading-snug font-bold text-slate-700 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-400">
                    {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {post.excerpt}
                    </p>
                )}

                {/* Author + Read more */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-50 pt-4 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {post.author}
                    </span>
                    <span className="inline-block text-xs font-bold text-gray-500 transition-transform group-hover:translate-x-1">
                        Read more →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function BlogIndex({
    posts,
    categories,
    settings,
    active_category,
}) {
    function filterByCategory(catId) {
        router.get('/blog', catId ? { category: catId } : {}, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <>
            <Head title={`Blog — ${settings?.site_title || 'Arif Hassan'}`}>
                <meta
                    name="description"
                    content="Articles on Laravel, React, WordPress and full-stack development."
                />
            </Head>

            <div className="min-h-screen bg-slate-50 font-poppins dark:bg-slate-950">
                <BlogNavbar settings={settings} />

                {/* Hero */}
                <div className="border-b border-slate-100 bg-white px-6 pt-32 pb-16 text-center dark:border-slate-800 dark:bg-slate-900">
                    <p className="mb-3 text-xs font-bold tracking-widest text-gray-500 uppercase">
                        Writing & Thoughts
                    </p>
                    <h1 className="mb-4 text-5xl font-black text-slate-700 dark:text-white">
                        The Blog
                    </h1>
                    <p className="mx-auto max-w-md text-sm leading-7 text-slate-400 dark:text-slate-500">
                        Articles on Laravel, React, WordPress, SaaS architecture
                        and remote work.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl px-6 py-16">
                    {/* Category filters */}
                    {categories?.length > 0 && (
                        <div className="mb-12 flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => filterByCategory(null)}
                                className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                                    !active_category
                                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-700'
                                        : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400'
                                }`}
                            >
                                All Posts
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => filterByCategory(cat.id)}
                                    className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                                        active_category === cat.id
                                            ? 'border-slate-900 bg-slate-900 text-white dark:bg-white dark:text-slate-700'
                                            : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400'
                                    }`}
                                >
                                    {cat.name}
                                    <span className="ml-1.5 opacity-50">
                                        ({cat.posts_count})
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Posts grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {(posts.prev_page_url || posts.next_page_url) && (
                        <div className="mt-16 flex justify-center gap-3">
                            {posts.prev_page_url && (
                                <Link
                                    href={posts.prev_page_url}
                                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600 transition-all hover:border-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    style={{ textDecoration: 'none' }}
                                >
                                    ← Previous
                                </Link>
                            )}
                            {posts.next_page_url && (
                                <Link
                                    href={posts.next_page_url}
                                    className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-gray-400 hover:text-slate-700 dark:bg-white dark:text-slate-700"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Next →
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <Footer settings={settings} />
            </div>
        </>
    );
}
