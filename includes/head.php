<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="description" content="<?= e($c['metaDescription']) ?>">
    <meta property="og:title" content="<?= e($c['pageTitle']) ?> · Wedding Invitation">
    <meta property="og:description" content="<?= e($c['dateText']) ?> · <?= e($c['venueName']) ?>, <?= e($c['city']) ?>. Tap to open the invitation.">
    <meta name="twitter:image" content="<?= e($c['ogImageUrl']) ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= e($c['siteUrl']) ?>">
    <meta property="og:image" content="<?= e($c['ogImageUrl']) ?>">
    <meta property="og:image:secure_url" content="<?= e($c['ogImageUrl']) ?>">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:alt" content="<?= e($c['bride']) ?> and <?= e($c['groom']) ?> in their wedding garlands">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="theme-color" content="<?= e($c['themeColor']) ?>">
    <title><?= e($c['pageTitle']) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Noto+Serif+Telugu:wght@500;700&family=Great+Vibes&family=Waterfall&family=Outfit:wght@400;500&display=swap">
    <link rel="stylesheet" href="assets/css/style.css?v=<?= filemtime(__DIR__ . '/../assets/css/style.css') ?>">
</head>
