<?php
$logFilePath = __DIR__ . '/storage/logs/laravel.log';
if (file_exists($logFilePath)) {
    $lines = file($logFilePath);
    $lastLines = array_slice($lines, -100);
    echo implode('', $lastLines);
} else {
    echo "Log file not found.";
}
