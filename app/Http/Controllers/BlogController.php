<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\SiteSetting;
use Inertia\Inertia;

class BlogController extends Controller
{
    private function sharedSettings(): array
    {
        return SiteSetting::whereIn('key', [
            'site_title',
            'github_url',
            'linkedin_url',
            'twitter_url',
            'blog_url',
        ])->pluck('value', 'key')->toArray();
    }

    public function index()
    {
        $posts = Post::where('is_published', true)
            ->with('category', 'author')
            ->orderByDesc('published_at')
            ->paginate(9)
            ->through(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'excerpt' => $p->excerpt,
                'featured_image' => $p->featured_image
                    ? asset('storage/' . $p->featured_image)
                    : null,
                'published_at' => $p->published_at?->format('M d, Y'),
                'category' => $p->category?->name,
                'author' => $p->author?->name,
            ]);

        $categories = Category::where('type', 'blog')
            ->withCount(['posts' => fn($q) => $q->where('is_published', true)])
            ->get();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'settings' => $this->sharedSettings(),
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)
            ->where('is_published', true)
            ->with('category', 'author')
            ->firstOrFail();

        $related = Post::where('is_published', true)
            ->where('id', '!=', $post->id)
            ->where('category_id', $post->category_id)
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'excerpt' => $p->excerpt,
                'featured_image' => $p->featured_image
                    ? asset('storage/' . $p->featured_image)
                    : null,
                'published_at' => $p->published_at?->format('M d, Y'),
                'category' => $p->category?->name,
            ]);

        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'excerpt' => $post->excerpt,
                'featured_image' => $post->featured_image
                    ? asset('storage/' . $post->featured_image)
                    : null,
                'published_at' => $post->published_at?->format('M d, Y'),
                'category' => $post->category?->name,
                'author' => $post->author?->name,
            ],
            'related' => $related,
            'settings' => $this->sharedSettings(),
        ]);
    }
}