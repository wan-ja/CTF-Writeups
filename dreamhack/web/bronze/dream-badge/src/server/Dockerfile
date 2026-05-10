FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

RUN mkdir -p /db && chmod -R 777 /db

WORKDIR /var/www/html

COPY . .

RUN echo 'DH{sample_flag}' > /flag

EXPOSE 80

CMD ["apache2-foreground"]