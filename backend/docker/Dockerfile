FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Instalar herramientas y extensiones necesarias
RUN apt-get update && apt-get install -y unzip git libzip-dev && docker-php-ext-install pdo pdo_mysql zip && docker-php-ext-enable pdo_mysql

# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html
