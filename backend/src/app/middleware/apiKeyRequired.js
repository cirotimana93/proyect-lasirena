const config = require("../../../config.json");


module.exports = function apiKeyRequired(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const validKey = config.API_KEY || '';
  if (!apiKey || apiKey !== validKey) {
    return res.status(401).json({ error: 'API Key invalida o faltante' });
  }
  next();
};
