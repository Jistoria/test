# Instrucciones para ejecutar el proyecto

## Backend

1. Navega al directorio del backend:
    ```bash
    cd test-backend
    ```

2. Instala las dependencias:
    ```bash
    composer install
    ```

3. Copia el archivo de configuración .env:
    ```bash
    cp .env.example .env
    ```

4. Genera la clave de la aplicación:
    ```bash
    php artisan key:generate
    ```

5. Configura la base de datos en el archivo .env.

6. Ejecuta las migraciones con los datos iniciales (si los hay):
    ```bash
    php artisan migrate --seed
    ```

7. Inicia el servidor de desarrollo:
    ```bash
    php artisan serve
    ```
