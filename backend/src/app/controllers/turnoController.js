const { Turno, Pelicula } = require("../models");

// crear turno
const createTurno = async (req, res) => {
  try {
    console.log("creando turno", req.body);
    const turno = await Turno.create(req.body);
    res.status(201).json(turno);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener todos los turnos (con filtros)
const getTurnos = async (req, res) => {
  try {
    const { peliculaId, sala, desde, hasta } = req.query;
  const where = { deleted_at: null };
  if (peliculaId) where.pelicula_id = peliculaId;
  if (sala) where.sala = sala;
  if (desde && hasta) where.inicio = { [require('sequelize').Op.between]: [desde, hasta] };
  else if (desde) where.inicio = { [require('sequelize').Op.gte]: desde };
  else if (hasta) where.inicio = { [require('sequelize').Op.lte]: hasta };
  const turnos = await Turno.findAll({ where, include: [{ model: Pelicula }] });
  res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener turno por ID (incluye película)
const getTurnoById = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByPk(id, { include: Pelicula });
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.status(200).json(turno);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// actualizar turno
const updateTurno = async (req, res) => {
    console.log("actualizando turno", req.body);
  try {
    const { id } = req.params;
    const turno = await Turno.findByPk(id);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    await turno.update(req.body);
    res.status(200).json(turno);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// eliminar turno (soft delete)
const deleteTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByPk(id);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    turno.deleted_at = new Date();
    await turno.save();
    res.status(200).json({ message: "Turno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTurno,
  getTurnos,
  getTurnoById,
  updateTurno,
  deleteTurno,
};