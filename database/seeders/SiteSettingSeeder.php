<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'site_title' => 'Arif Hassan — Full-Stack Developer',
            'meta_description' => 'Laravel, React & WordPress developer available for remote work.',
            'hero_greeting' => "Hi, I'm Arif Hassan",
            'hero_name' => 'Laravel + React Developer',
            'hero_content' => 'I help startups and businesses build fast, reliable web apps. Specialising in Laravel + React SaaS platforms, API-driven systems, and WordPress engineering — shipped and production-ready.',
            'about_content' => '',
            'resume_url' => '',
            'portfolio_title' => 'Recent Projects',
            'service_title' => 'Services',
            'service_subtitle' => 'What I Can Build For You',
            'contact_title' => 'Get In Touch',
            'contact_email' => '',
            'contact_phone' => '',
            'contact_address' => '',
            'map_url' => '',
            'whatsapp_url' => '',
            'telegram_url' => '',
            'linkedin_url' => '',
            'github_url' => '',
            'twitter_url' => '',
            'blog_url' => '',
        ];

        foreach ($defaults as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}