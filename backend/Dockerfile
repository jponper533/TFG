FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && a2enmod rewrite

WORKDIR /var/www/html

COPY . .

COPY ./docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

RUN ls -la
RUN ls -la public

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
# CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]