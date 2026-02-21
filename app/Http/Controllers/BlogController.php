<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BlogController extends Controller
{
    private string $apiBase;

    public function __construct()
    {
        $this->apiBase = config('services.wp.url') . '/wp-json/wp/v2';
    }

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

    private function formatPost(array $post): array
    {
        return [
            'id' => $post['id'],
            'title' => wp_decode($post['title']['rendered']),
            'slug' => $post['slug'],
            'excerpt' => strip_tags($post['excerpt']['rendered']),
            'content' => $post['content']['rendered'],
            'featured_image' => $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null,
            'published_at' => \Carbon\Carbon::parse($post['date'])->format('M d, Y'),
            'category' => $post['_embedded']['wp:term'][0][0]['name'] ?? null,
            'author' => $post['_embedded']['author'][0]['name'] ?? null,
        ];
    }

    public function index()
    {
        $page = request('page', 1);

        $catId = request('category', null);
        $cacheKey = "blog_posts_page_{$page}_cat_{$catId}";

        $cached = Cache::remember($cacheKey, 300, function () use ($page, $catId) {

            $params = [
                'per_page' => 9,
                'page' => $page,
                '_embed' => 1,
            ];

            // pass category filter to WP API
            if ($catId) {
                $params['categories'] = $catId;
            }


            $response = Http::timeout(15)
                ->withHeaders(['Accept' => 'application/json'])
                ->get("{$this->apiBase}/posts", $params);

            if (!$response->successful() || empty($response->json())) {
                return [
                    'posts' => [],
                    'total' => 0,
                    'pages' => 0,
                ];
            }

            return [
                'posts' => $response->json(),
                'total' => (int) $response->header('X-WP-Total'),
                'pages' => (int) $response->header('X-WP-TotalPages'),
            ];
        });

        $posts = collect($cached['posts'])->map(fn($p) => $this->formatPost($p));

        $categories = Cache::remember('blog_categories', 600, function () {
            $res = Http::timeout(10)->get("{$this->apiBase}/categories");
            return $res->successful() ? $res->json() : [];
        });

        return Inertia::render('Blog/Index', [
            'posts' => [
                'data' => $posts,
                'total' => $cached['total'],
                'current_page' => (int) $page,
                'last_page' => $cached['pages'],
                'prev_page_url' => $page > 1
                    ? url("/blog?page=" . ($page - 1) . ($catId ? "&category={$catId}" : ''))
                    : null,
                'next_page_url' => $page < $cached['pages']
                    ? url("/blog?page=" . ($page + 1) . ($catId ? "&category={$catId}" : ''))
                    : null,
            ],
            'categories' => collect($categories)->map(fn($c) => [
                'id' => $c['id'],
                'name' => $c['name'],
                'posts_count' => $c['count'],
            ]),
            'active_category' => $catId ? (int) $catId : null,
            'settings' => $this->sharedSettings(),
        ]);
    }

    public function show(string $slug)
    {
        // WP REST API fetch by slug
        $response = Http::get("{$this->apiBase}/posts", [
            'slug' => $slug,
            '_embed' => true,
        ]);

        $data = $response->json();

        if (empty($data)) {
            abort(404);
        }

        $post = $this->formatPost($data[0]);

        // Related posts — same category
        $catId = $data[0]['categories'][0] ?? null;
        $related = [];

        if ($catId) {
            $relatedResponse = Http::get("{$this->apiBase}/posts", [
                'categories' => $catId,
                'exclude' => $data[0]['id'],
                'per_page' => 3,
                '_embed' => true,
            ]);
            $related = collect($relatedResponse->json())
                ->map(fn($p) => $this->formatPost($p))
                ->toArray();
        }

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'related' => $related,
            'settings' => $this->sharedSettings(),
        ]);
    }
}