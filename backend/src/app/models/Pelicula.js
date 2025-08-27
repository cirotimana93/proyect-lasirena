const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db").sequelize;

class Pelicula extends Model {}

Pelicula.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duracion_min: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  clasificacion: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  generos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'activo',
    validate: {
      isIn: [['activo', 'inactivo']]
    }
  },
  fecha_estreno: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  created_by: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.STRING(150),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: "Pelicula",
  tableName: "peliculas",
  timestamps: false,
});

module.exports = Pelicula;
