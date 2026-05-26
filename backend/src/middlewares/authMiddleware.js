const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token nao informado' });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ erro: 'Token invalido' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'troque_esta_chave');
    req.usuario = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token expirado ou invalido' });
  }
}

module.exports = authMiddleware;
