
const { Sequelize } = require("sequelize");
const config = require("../../config.json");

// cargamos las variables de entorno
const env = process.env.NODE_ENV || "development";

// Usar directamente los valores del config.json
const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    port: config.DB_PORT,
    logging: false,
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexion exitosa a la base de datos PostgreSQL local.`);
  } catch (error) {
    console.error(`No se pudo conectar a la base de datos:`, error);
  }
};

module.exports = { sequelize, connect };
