const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: Endpoints para gestión de turnos
 */

/**
 * @swagger
 * /api/turnos:
 *   get:
 *     summary: Obtener todos los turnos
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos
 *   post:
 *     summary: Crear un nuevo turno
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inicio:
 *                 type: string
 *                 example: '2025-08-30T19:00'
 *               fin:
 *                 type: string
 *                 example: '2025-08-30T21:00'
 *               sala:
 *                 type: string
 *                 example: 'Sala 2'
 *               precio:
 *                 type: string
 *                 example: '5'
 *               idioma:
 *                 type: string
 *                 example: 'dob'
 *               formato:
 *                 type: string
 *                 example: '2D'
 *               aforo:
 *                 type: integer
 *                 example: 100
 *               estado:
 *                 type: string
 *                 example: 'activo'
 *               pelicula_id:
 *                 type: string
 *                 example: '8'
 *     responses:
 *       201:
 *         description: Turno creado
 */

/**
 * @swagger
 * /api/turnos/{id}:
 *   get:
 *     summary: Obtener un turno por ID
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno encontrado
 *   put:
 *     summary: Actualizar un turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inicio:
 *                 type: string
 *                 example: '2025-08-30T19:00'
 *               fin:
 *                 type: string
 *                 example: '2025-08-30T21:00'
 *               sala:
 *                 type: string
 *                 example: 'Sala 2'
 *               precio:
 *                 type: string
 *                 example: '5'
 *               idioma:
 *                 type: string
 *                 example: 'dob'
 *               formato:
 *                 type: string
 *                 example: '2D'
 *               aforo:
 *                 type: integer
 *                 example: 100
 *               estado:
 *                 type: string
 *                 example: 'activo'
 *               pelicula_id:
 *                 type: string
 *                 example: '8'
 *     responses:
 *       200:
 *         description: Turno actualizado
 *   delete:
 *     summary: Eliminar un turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno eliminado
 */
const turnosController = require("../app/controllers/turnoController");

router.get("/turnos", turnosController.getTurnos);
router.post("/turnos", turnosController.createTurno);
router.get("/turnos/:id", turnosController.getTurnoById);
router.put("/turnos/:id", turnosController.updateTurno);
router.patch("/turnos/:id", turnosController.updateTurno);
router.delete("/turnos/:id", turnosController.deleteTurno);

module.exports = router;
