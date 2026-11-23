<?php
/* Small helpers + derived values. Config ni marchandi: config.php lo. */

function e($v): string
{
    return htmlspecialchars((string) ($v ?? ''), ENT_QUOTES, 'UTF-8');
}

/* 'Dr. Ravi' lanti title ni vere chesi initial teesukuntundi */
function bare_name(string $n): string
{
    return preg_match('/^\s*((?:dr|mr|mrs|ms|er|prof)\.?)\s+(.+)$/i', $n, $m) ? $m[2] : $n;
}

function first_char(string $s): string
{
    return preg_match('/^./su', $s, $m) ? $m[0] : '';   // mbstring avasaram ledu
}

function youtube_id(?string $u): ?string
{
    return preg_match('~(?:youtu\.be/|[?&]v=|/embed/|/shorts/|/live/)([\w-]{11})~', (string) $u, $m) ? $m[1] : null;
}

function load_invite_config(string $file): array
{
    $c = require $file;

    $c['groomInitial'] = first_char(bare_name($c['groom']));
    $c['brideInitial'] = first_char(bare_name($c['bride']));

    $dir   = fn (string $q) => 'https://www.google.com/maps/dir/?api=1&destination=' . rawurlencode($q ?: $c['city']);
    $place = fn (string $q) => 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode($q ?: $c['city']);

    $c['mapDirectionsUrl'] = $c['mapQuery'] ? $dir($c['mapQuery']) : ($c['mapUrl'] ?: $dir(''));
    $c['mapViewUrl']       = $c['mapUrl'] ?: $place($c['mapQuery']);

    $vid = youtube_id($c['youtubeUrl']);
    $c['youtubeWatchUrl'] = $vid ? 'https://www.youtube.com/watch?v=' . $vid : ($c['youtubeUrl'] ?: 'https://www.youtube.com/');

    $c['brandInstagramUrl'] = 'https://instagram.com/' . ltrim($c['brandInstagram'], '@');
    $c['brandPhoneUrl']     = 'tel:+91' . substr(preg_replace('/\D/', '', $c['brandPhone']), -10);
    $c['brandWebsiteUrl']   = 'https://' . strtolower(preg_replace('~^https?://~i', '', $c['brandWebsite']));

    if (empty($c['siteUrl'])) {
        $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
        $base  = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), '/\\');
        $c['siteUrl'] = ($https ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . $base . '/';
    }
    $c['ogImageUrl'] = rtrim($c['siteUrl'], '/') . '/' . ltrim($c['ogImage'], '/');
    $c['pageTitle']  = $c['bride'] . ' & ' . $c['groom'];

    return $c;
}
