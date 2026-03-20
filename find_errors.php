<?php
$logFilePath = __DIR__ . '/storage/logs/laravel.log';
if (file_exists($logFilePath)) {
    $content = file_get_contents($logFilePath);
    preg_match_all('/local\.ERROR: (.*)/', $content, $matches);
    $lastMatches = array_slice($matches[0], -5);
    echo implode("\n", $lastMatches);
} else {
    echo "Log file not found.";
}
