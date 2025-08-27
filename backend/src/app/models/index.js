const Pelicula = require('./Pelicula');
const Turno = require('./Turno');

Pelicula.hasMany(Turno, { foreignKey: 'pelicula_id' });
Turno.belongsTo(Pelicula, { foreignKey: 'pelicula_id' });

module.exports = {
  Pelicula,
  Turno
};
