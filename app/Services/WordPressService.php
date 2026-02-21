<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WordPressService
{
    public function posts()
    {
        return Http::get(config('services.wp.url') . '/wp-json/wp/v2/posts')
            ->json();
    }
}