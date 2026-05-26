const db = require('../config/database');

async function criar(usuario) {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [usuario.nome, usuario.email, usuario.senha]
  );

  return {
    id: result.insertId,
    nome: usuario.nome,
    email: usuario.email
  };
}

async function buscarPorEmail(email) {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0] || null;
}

module.exports = {
  criar,
  buscarPorEmail
};
