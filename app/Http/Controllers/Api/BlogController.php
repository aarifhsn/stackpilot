<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BlogController extends Controller
{
    public function index()
    {
        $response = Http::get(config('services.wp.url') . '/wp-json/wp/v2/posts');

        return $response->json();
    }

    public function show($id)
    {
        $response = Http::get(config('services.wp.url') . "/wp-json/wp/v2/posts/$id");

        return $response->json();
    }
}
