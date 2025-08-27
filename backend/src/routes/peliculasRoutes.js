const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Peliculas
 *   description: Endpoints para gestión de películas
 */

/**
 * @swagger
 * /api/peliculas:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Peliculas]
 *     responses:
 *       200:
 *         description: Lista de películas
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Peliculas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: 'Shrek 5'
 *               fecha_estreno:
 *                 type: string
 *                 example: '2025-08-15'
 *               estado:
 *                 type: string
 *                 example: 'activo'
 *               sinopsis:
 *                 type: string
 *                 example: 'La saga Sigue'
 *               duracion_min:
 *                 type: integer
 *                 example: 120
 *               clasificacion:
 *                 type: string
 *                 example: 'A'
 *               generos:
 *                 type: string
 *                 example: 'Infantil'
 *     responses:
 *       201:
 *         description: Película creada
 */

/**
 * @swagger
 * /api/peliculas/{id}:
 *   get:
 *     summary: Obtener una película por ID
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película encontrada
 *   put:
 *     summary: Actualizar una película
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película actualizada
 *   delete:
 *     summary: Eliminar una película
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película eliminada
 */
const peliculasController = require("../app/controllers/peliculaController");

router.get("/peliculas", peliculasController.getPeliculas);
router.post("/peliculas", peliculasController.createPelicula);
router.get("/peliculas/:id", peliculasController.getPeliculaById);
router.put("/peliculas/:id", peliculasController.updatePelicula);
router.patch("/peliculas/:id", peliculasController.updatePelicula);
router.delete("/peliculas/:id", peliculasController.deletePelicula);
router.post("/peliculas/:id/turnos:bulkCreate", peliculasController.bulkCreateTurnos);

module.exports = router;
