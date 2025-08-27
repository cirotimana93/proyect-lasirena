const Pelicula = require("../models/Pelicula");
const Turno = require("../models/Turno");

// crear pelicula
const createPelicula = async (req, res) => {
  try {
    console.log("creado pelicula", req.body);
    const pelicula = await Pelicula.create(req.body);
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener todas las peliculas (con filtros y paginacion)
const getPeliculas = async (req, res) => {
  try {
    const { search, genero, estado, page = 1, pageSize = 20 } = req.query;
    const where = {};
    if (search) where.titulo = { [require('sequelize').Op.iLike]: `%${search}%` };
    if (estado) where.estado = estado;
    if (genero) where.generos = { [require('sequelize').Op.like]: `%${genero}%` };
    const offset = (page - 1) * pageSize;
    const { count, rows } = await Pelicula.findAndCountAll({ where, offset, limit: parseInt(pageSize, 10) });
    res.status(200).json({ total: count, page: parseInt(page, 10), pageSize: parseInt(pageSize, 10), data: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// obtener pelicula por ID (incluye turnos)
const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findByPk(id, { include: Turno });
    if (!pelicula) {
      return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// actualizar pelicula
const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) {
      return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    await pelicula.update(req.body);
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// eliminar pelicula (soft delete)
const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) {
      return res.status(404).json({ message: "Pelicula no encontrada" });
    }
    pelicula.deleted_at = new Date();
    await pelicula.save();
    res.status(200).json({ message: "Pelicula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// asignacion masiva de turnos
const bulkCreateTurnos = async (req, res) => {
  try {
    const { id } = req.params;
    const turnos = req.body.turnos;
    if (!Array.isArray(turnos)) {
      return res.status(400).json({ message: "turnos debe ser un array" });
    }
    const created = await Promise.all(turnos.map(t => Turno.create({ ...t, pelicula_id: id })));
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPelicula,
  getPeliculas,
  getPeliculaById,
  updatePelicula,
  deletePelicula,
  bulkCreateTurnos,
};