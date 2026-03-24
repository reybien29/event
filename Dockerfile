# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit

COPY . .
RUN npm run build

FROM php:8.4-fpm-bookworm

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        gettext-base \
        git \
        libicu-dev \
        libonig-dev \
        libpng-dev \
        libpq-dev \
        libxml2-dev \
        libzip-dev \
        nginx \
        unzip \
        zip \
    && docker-php-ext-configure intl \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        intl \
        mbstring \
        opcache \
        pdo_pgsql \
        zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN mkdir -p /etc/nginx/templates \
    && rm -f /etc/nginx/sites-enabled/default

COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN composer install --no-dev --no-interaction --optimize-autoloader --no-scripts \
    && mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 10000

ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr

ENTRYPOINT ["/entrypoint.sh"]
