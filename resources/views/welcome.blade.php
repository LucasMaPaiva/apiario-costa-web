<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Mel puro, natural e direto da colmeia. Conheça os produtos artesanais do Apiário Costa.">

        <title>Apiário Costa — Mel Puro Direto da Colmeia</title>

        <link rel="icon" type="image/jpeg" href="/logo.jpg">
        <link rel="apple-touch-icon" href="/logo.jpg">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="antialiased">
        <div id="app"></div>
    </body>
</html>
