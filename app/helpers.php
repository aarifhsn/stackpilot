<?php

if (!function_exists('wp_decode')) {
    function wp_decode(string $str): string
    {
        return html_entity_decode($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
}