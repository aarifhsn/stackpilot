import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function BlogNavbar({ settings }) {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href={settings?.blog_url || '/'} className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
                        <rect width="48" height="48" rx="9" fill="#0F172A" />
                        <polygon points="24,6 13,42 19,42 24,20" fill="#F59E0B" />
                        <polygon points="24,6 35,42 29,42 24,20" fill="#F59E0B" />
                        <rect x="14" y="28" width="20" height="3" rx="1.5" fill="#F59E0B" />
                    </svg>
                    <div>
                        <div className="text-sm font-black text-slate-900 dark:text-white">
                            arif<span className="font-light">hassan</span>
                            <span className="ml-2 text-xs font-bold text-gray-500 tracking-widest uppercase">Blog</span>
                        </div>
                    </div>
                </a>
                
                    href="https://arifhassan.com"
                    className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    style={{ textDecoration: 'none' }}
                >
                    ← Portfolio
                </a>
            </div>
        </header>
    );
}

function PostCard({ post }) {
    return (
        <Link
            href={`/${post.slug}`}
            className="group block bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden"
            style={{ textDecoration: 'none' }}
        >
            {/* Thumbnail */}
            <div className="h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                {post.featured_image ? (
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                        ✍️
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Category + Date */}
                <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                        <span className="px-2.5 py-1 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-wide">
                            {post.category}
                        </span>
                    )}
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                        {post.published_at}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 line-clamp-3">
                        {post.excerpt}
                    </p>
                )}

                {/* Author + Read more */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {post.author}
                    </span>
                    <span className="text-xs font-bold text-gray-500 group-hover:translate-x-1 transition-transform inline-block">
                        Read more →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function BlogIndex({ posts, categories, settings }) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = activeCategory === 'all'
        ? posts.data
        : posts.data.filter(p => p.category === activeCategory);

    return (
        <>
            <Head title={`Blog — ${settings?.site_title || 'Arif Hassan'}`}>
                <meta name="description" content="Articles on Laravel, React, WordPress and full-stack development." />
            </Head>

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-poppins">
                <BlogNavbar settings={settings} />

                {/* Hero */}
                <div className="pt-32 pb-16 px-6 text-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                        Writing & Thoughts
                    </p>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">
                        The Blog
                    </h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm max-w-md mx-auto leading-7">
                        Articles on Laravel, React, WordPress, SaaS architecture and remote work.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-16">
                    {/* Category filters */}
                    {categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-12 justify-center">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border cursor-pointer transition-all ${
                                    activeCategory === 'all'
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                                        : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:text-slate-400'
                                }`}
                            >
                                All Posts
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border cursor-pointer transition-all ${
                                        activeCategory === cat.name
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900'
                                            : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:text-slate-400'
                                    }`}
                                >
                                    {cat.name}
                                    <span className="ml-1.5 opacity-50">({cat.posts_count})</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Posts grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        {filtered.length === 0 && (
                            <div className="col-span-3 text-center py-24 text-slate-400">
                                <span className="text-5xl block mb-4">✍️</span>
                                <p className="font-semibold">No posts yet in this category.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {(posts.prev_page_url || posts.next_page_url) && (
                        <div className="flex justify-center gap-3 mt-16">
                            {posts.prev_page_url && (
                                <Link
                                    href={posts.prev_page_url}
                                    className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-gray-400 transition-all"
                                    style={{ textDecoration: 'none' }}
                                >
                                    ← Previous
                                </Link>
                            )}
                            {posts.next_page_url && (
                                <Link
                                    href={posts.next_page_url}
                                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-gray-400 hover:text-slate-900 transition-all"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Next →
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-400 dark:text-slate-600">
                    © {new Date().getFullYear()} Arif Hassan ·{' '}
                    <a href="https://arifhassan.com" className="hover:text-gray-500 transition-colors">
                        Portfolio
                    </a>
                </footer>
            </div>
        </>
    );
}