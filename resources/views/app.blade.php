@php
try {
  $ssr = Http::post('http://localhost:8080/render', $page)->throw()->json();
} catch (Exception $e) {
  $ssr = null;
}
@endphp
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" defer></script>
    <script src="https://www.googletagmanager.com/gtag/js?id=UA-140425344-1" async></script>
    <script src="{{ mix('/js/app.js') }}" defer></script>
    @foreach($ssr['head'] ?? [] as $element)
      {!! $element !!}
    @endforeach
  </head>
  <body>
    @if ($ssr)
      {!! $ssr['body'] !!}
    @else
      @inertia
    @endif
  </body>
</html>
