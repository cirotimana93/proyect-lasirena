const router = require('express').Router();


const apiKeyRequired = require('../app/middleware/apiKeyRequired');
const peliculasRoutes = require('./peliculasRoutes');
const turnosRoutes = require('./turnosRoutes');

// Proteger todas las rutas
router.use(apiKeyRequired);
router.use(peliculasRoutes);
router.use(turnosRoutes);

module.exports = router;
