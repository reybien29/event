#!/bin/sh
set -e

cd /var/www/html

export PORT="${PORT:-10000}"

envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

php artisan storage:link 2>/dev/null || true

php artisan package:discover --ansi

# When using the default sqlite connection (no DATABASE_URL / DB_URL on the host), ensure the file exists.
if [ "${DB_CONNECTION:-}" = "sqlite" ] || [ -z "${DATABASE_URL:-}${DB_URL:-}" ]; then
    mkdir -p database
    touch database/database.sqlite
fi

php artisan migrate --force

php artisan optimize

php-fpm -D
exec nginx -g 'daemon off;'
