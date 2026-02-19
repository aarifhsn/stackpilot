<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\Service;
use App\Models\SiteSetting;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::where('is_published', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'description' => $p->description,
                'image' => $p->image ? asset('storage/' . $p->image) : null,
                'project_link' => $p->project_link,
                'category' => $p->category,
                'tech_stack' => $p->tech_stack ?? [],
                'features' => $p->features,
            ]);

        $services = Service::where('is_published', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'title' => $s->title,
                'icon' => $s->icon,
                'content' => $s->content,
            ]);

        // Build settings array from SiteSetting model
        $keys = [
            'site_title',
            'meta_description',
            'hero_greeting',
            'hero_name',
            'hero_content',
            'about_content',
            'resume_url',
            'portfolio_title',
            'service_title',
            'service_subtitle',
            'contact_title',
            'github_url',
            'linkedin_url',
            'twitter_url',
            'whatsapp_url',
            'telegram_url',
            'contact_email',
            'contact_phone',
            'contact_address',
            'map_url',
            'blog_url',
        ];

        $settings = SiteSetting::whereIn('key', $keys)
            ->pluck('value', 'key')
            ->toArray();

        return Inertia::render('Portfolio', [
            'portfolios' => $portfolios,
            'services' => $services,
            'settings' => $settings,
        ]);
    }

    public function contact(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'message' => 'required|string|max:2000',
        ]);

        // Option 1 — Mail
        // \Mail::to(SiteSetting::get('contact_email'))->send(new \App\Mail\ContactMail($validated));

        // Option 2 — Store in DB (create a contact_messages table for this)
        // \DB::table('contact_messages')->insert([...$validated, 'created_at' => now()]);

        return response()->json(['success' => true]);
    }
}
