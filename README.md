# Proyecto Lasirena

## Requisitos previos
- Node.js v18+ y npm
- PostgreSQL instalado localmente

## 1. Base de datos
1. Abre tu gestor de PostgreSQL (pgAdmin, DBeaver, etc).
2. Ejecuta el script SQL que está en la carpeta `Script_db` para crear la base de datos y las tablas necesarias.

## 2. Backend
1. Ve a la carpeta `backend`:
   ```sh
   cd backend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Configura el archivo `config.json` con tus credenciales de base de datos y la API_KEY.
4. Inicia el servidor:
   ```sh
   npm run dev
   ```
   El backend estará disponible en `http://localhost:3000`.

## 3. Frontend
1. Ve a la carpeta `frontend`:
   ```sh
   cd ../frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Configura el archivo `.env.local` con la URL del backend:
   ```env
   VITE_API_BASE_URL=
   VITE_API_KEY=
   ```
4. Inicia la aplicación:
   ```sh
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:5173`.

## 4. Documentación API
- Accede a la documentación Swagger en `http://localhost:3000/api-docs`.
- Todas las rutas requieren el header `x-api-key` (ver `config.json`).

## Notas
- Si tienes problemas con la conexión a la base de datos, revisa las credenciales y el puerto en `config.json` y en el script SQL.


---
¡Listo para usar! Si tienes dudas, revisa los archivos de configuración o contacta al autor ciro timana.


# Instrucciones para correr en Docker

## 1. Prepara la base de datos
- Asegúrate que el archivo `Script_db.sql` esté en la carpeta `Script_db` en la raíz del proyecto.

## 2. Configura el backend
- Abre `backend/config.json` y cambia:
   ```json
   "DB_HOST": "localhost"
   ```
   por:
   ```json
   "DB_HOST": "db"
   ```
   Esto permite que el backend se conecte al contenedor de la base de datos.

## 3. Levanta los contenedores
En la raíz del proyecto ejecuta:
```sh
docker compose down -v
docker compose up -d --build
```
Esto construye y levanta los servicios:
- db: PostgreSQL con la base de datos y tablas.
- backend: API Node.js.
- frontend: React + Vite.

## 4. Acceso
- Frontend: http://localhost:5173
- Backend/API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## 5. Notas
- Si quieres correr el backend localmente (sin Docker), vuelve a poner `"DB_HOST": "localhost"` en `backend/config.json`.
- Si tienes problemas con la base de datos, elimina los volúmenes con `docker-compose down -v` y vuelve a levantar todo.
- El archivo `.env` no es necesario para Docker si usas `config.json`.

---
Para ver logs de los contenedores:
```sh
docker logs <nombre-del-contenedor>
```
Por ejemplo:
```sh
docker logs proyect-lasirena-backend-1
```