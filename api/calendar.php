<?php
// Server-side proxy for the VRBO availability calendar.
// Browsers can't fetch the VRBO .ics URL directly (VRBO sends no
// Access-Control-Allow-Origin header), so this fetches it here and
// relays the raw text. Upload this file to public_html/api/calendar.php
// on GoDaddy shared hosting alongside the built static site.

header('Content-Type: text/calendar; charset=utf-8');
header('Cache-Control: max-age=900'); // 15 min, avoid hammering VRBO on every page load

$icsUrl = 'https://www.vrbo.com/icalendar/e093697f12a04b218d199a606fcd2d3b.ics?nonTentative&includeTentative=true';
$ics = @file_get_contents($icsUrl);

if ($ics === false) {
    http_response_code(502);
    echo '';
    exit;
}

echo $ics;
