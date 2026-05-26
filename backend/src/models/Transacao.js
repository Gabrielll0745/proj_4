const db = require('../config/database');

async function listarPorUsuario(usuarioId) {
  const [rows] = await db.execute(
    'SELECT * FROM transacoes WHERE usuario_id = ? ORDER BY data DESC, id DESC',
    [usuarioId]
  );
  return rows;
}

async function criar(transacao) {
  const [result] = await db.execute(
    `INSERT INTO transacoes
     (usuario_id, tipo, categoria, descricao, valor, data)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      transacao.usuario_id,
      transacao.tipo,
      transacao.categoria,
      transacao.descricao,
      transacao.valor,
      transacao.data
    ]
  );

  return { id: result.insertId, ...transacao };
}

async function atualizar(id, usuarioId, transacao) {
  const [result] = await db.execute(
    `UPDATE transacoes
     SET tipo = ?, categoria = ?, descricao = ?, valor = ?, data = ?
     WHERE id = ? AND usuario_id = ?`,
    [
      transacao.tipo,
      transacao.categoria,
      transacao.descricao,
      transacao.valor,
      transacao.data,
      id,
      usuarioId
    ]
  );

  return result.affectedRows > 0;
}

async function remover(id, usuarioId) {
  const [result] = await db.execute(
    'DELETE FROM transacoes WHERE id = ? AND usuario_id = ?',
    [id, usuarioId]
  );
  return result.affectedRows > 0;
}

async function resumo(usuarioId) {
  const [rows] = await db.execute(
    `SELECT
      COALESCE(SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END), 0) AS receitas,
      COALESCE(SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END), 0) AS despesas
     FROM transacoes
     WHERE usuario_id = ?`,
    [usuarioId]
  );

  return rows[0];
}

module.exports = {
  listarPorUsuario,
  criar,
  atualizar,
  remover,
  resumo
};
