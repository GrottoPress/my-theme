ARG PHP_VERSION=7.4
ARG THEME_NAME=jentil-theme
ARG WORDPRESS_VERSION=5.3

FROM prooph/composer:${PHP_VERSION} as vendor

WORKDIR /tmp

COPY composer.json composer.json
COPY composer.lock composer.lock

RUN composer update \
        --no-autoloader \
        --no-dev \
        --no-interaction \
        --no-scripts \
        --prefer-dist

RUN composer dump-autoload \
        --no-dev \
        --no-interaction \
        --no-scripts \
        --optimize

FROM grottopress/wordpress:${WORDPRESS_VERSION}-php${PHP_VERSION}-fpm-alpine

ENV WORDPRESS_DIR=/var/www/html
ENV THEME_DIR=${WORDPRESS_DIR}/wp-content/themes/${THEME_NAME}

COPY --chown=www-data . ${THEME_DIR}/
COPY --chown=www-data --from=vendor /tmp/vendor/ ${THEME_DIR}/vendor/