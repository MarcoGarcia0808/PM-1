const jwt = require('jsonwebtoken');

function autenticarJWT(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [tipo, token] = authorization.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = autenticarJWT;
