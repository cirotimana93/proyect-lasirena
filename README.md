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
- Todas las rutas requieren el header `x-api-key` (ver `.env`).

## Notas
- Si tienes problemas con la conexión a la base de datos, revisa las credenciales y el puerto en `.env` y en el script SQL.


---
¡Listo para usar! Si tienes dudas, revisa los archivos de configuración o contacta al autor ciro timana.
