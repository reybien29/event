#!/bin/sh
set -e

cd /var/www/html

export PORT="${PORT:-10000}"

envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

php artisan storage:link 2>/dev/null || true

php artisan package:discover --ansi

php artisan optimize

php-fpm -D
exec nginx -g 'daemon off;'
