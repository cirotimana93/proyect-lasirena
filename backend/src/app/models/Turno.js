const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db").sequelize;
const Pelicula = require("./Pelicula");

class Turno extends Model {}

Turno.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pelicula_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: Pelicula,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    sala: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0,
    },
    idioma: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isIn: [["dob", "sub"]],
      },
    },
    formato: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        isIn: [["2D", "3D"]],
      },
    },
    aforo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "activo",
      validate: {
        isIn: [["activo", "inactivo"]],
      },
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
    },
  },
  {
    sequelize,
    modelName: "Turno",
    tableName: "turnos",
    timestamps: false,
  }
);



module.exports = Turno;
