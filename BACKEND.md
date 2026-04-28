# PASOS CADA VEZ QUE COPIE BACKEND
 ## ARREGLAR MENSAJERIA DE RESETEAR CONTRASEÑA
  - en config/app.php pegar lo siguiente -> 
  ```
  'frontend_url' => env('FRONTEND_URL', 'https://default.com'),
  ```
  - pegar esto en App/Providers/AppServiceProvider.php dentro de la funcion boost() -> 
  ```
ResetPassword::createUrlUsing(function ($user, string $token) {
    return rtrim(config('app.frontend_url'), '/') .
        "/reset-password?token={$token}&email={$user->email}";
});
```

- LIMPIAR CACHE DESPUES DE TODO
```
php artisan config:clear
php artisan config:cache
```

## PONER EL SERVIDOR CON NGINX
 - en /etc/nginx/sites-availables
 ```
 server {
    listen 80;
    server_name IP-PUBLICA-AWS;

    root /var/www/backend/public;

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

- tirar el siguiente comando en la carpetas de sites-availables
```
sudo ln -s /etc/nginx/sites-available/NOMBRE-PROYECTO /etc/nginx/sites-enabled/
```

- Reiniciamos el servicio
```
sudo systemctl restart nginx
``` 

- Dar permisos
```
sudo chown -R www-data:www-data /var/www/tu-proyecto
sudo chmod -R 775 storage bootstrap/cache
```