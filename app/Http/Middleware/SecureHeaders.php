<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecureHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);

        /*
        |--------------------------------------------------------------------------
        | BASIC HARDENING
        |--------------------------------------------------------------------------
        */

        // Prevent MIME sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Prevent clickjacking
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Control referrer data
        $response->headers->set(
            'Referrer-Policy',
            'strict-origin-when-cross-origin'
        );

        /*
        |--------------------------------------------------------------------------
        | PERMISSIONS POLICY (modern replacement for Feature-Policy)
        |--------------------------------------------------------------------------
        */
        $response->headers->set(
            'Permissions-Policy',
            'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        );

        /*
        |--------------------------------------------------------------------------
        | HSTS (ONLY ON HTTPS)
        |--------------------------------------------------------------------------
        */
        if ($request->isSecure()) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | CONTENT SECURITY POLICY (SAFE DEFAULT)
        |--------------------------------------------------------------------------
        | Relaxed enough for most Laravel + Livewire + Alpine apps
        | Tighten later if needed
        */
        if (app()->environment('production')) {
            $response->headers->set(
                'Content-Security-Policy',
                $this->buildCsp()
            );
        }

        /*
        |--------------------------------------------------------------------------
        | REMOVE USELESS/LEGACY HEADERS
        |--------------------------------------------------------------------------
        */
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        return $response;
    }

    private function buildCsp(): string
    {
        return implode('; ', [
            "default-src 'self'",

            // Scripts (adjust if using CDN)
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",

            // Styles
            "style-src 'self' 'unsafe-inline' https:",

            // Images
            "img-src 'self' data: https:",

            // Fonts
            "font-src 'self' data: https:",

            // AJAX / APIs
            "connect-src 'self' https:",

            // Media
            "media-src 'self' https:",

            // Prevent object embeds
            "object-src 'none'",

            // Prevent base tag attacks
            "base-uri 'self'",

            // Form submissions
            "form-action 'self'",

            // Frame ancestors (clickjacking protection)
            "frame-ancestors 'self'",

            // Upgrade HTTP → HTTPS
            "upgrade-insecure-requests"
        ]);
    }
}
