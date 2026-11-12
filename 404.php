<?php
// 404-pagina van de site (ErrorDocument in .htaccess). Agents die om Markdown
// vragen krijgen out/404.md, browsers out/404.html. In PHP omdat Hostinger
// een <If>-blok in .htaccess negeert.
http_response_code(404);
header('Vary: Accept');
if (stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'text/markdown') !== false) {
    header('Content-Type: text/markdown; charset=utf-8');
    readfile(__DIR__ . '/out/404.md');
} else {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/out/404.html');
}
