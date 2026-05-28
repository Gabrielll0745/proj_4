// Consultas da tabela de orcamentos.

const db = require('../config/database');

async function listarPorUsuario(usuarioId) {
  const [rows] = await db.execute(
    'SELECT * FROM orcamentos WHERE usuario_id = ? ORDER BY ano DESC, mes DESC, categoria',
    [usuarioId]
  );
  return rows;
}

async function criar(orcamento) {
  const [result] = await db.execute(
    `INSERT INTO orcamentos (usuario_id, categoria, valor_limite, mes, ano)
     VALUES (?, ?, ?, ?, ?)`,
    [
      orcamento.usuario_id,
      orcamento.categoria,
      orcamento.valor_limite,
      orcamento.mes,
      orcamento.ano
    ]
  );

  return { id: result.insertId, ...orcamento };
}

async function atualizar(id, usuarioId, orcamento) {
  const [result] = await db.execute(
    `UPDATE orcamentos
     SET categoria = ?, valor_limite = ?, mes = ?, ano = ?
     WHERE id = ? AND usuario_id = ?`,
    [
      orcamento.categoria,
      orcamento.valor_limite,
      orcamento.mes,
      orcamento.ano,
      id,
      usuarioId
    ]
  );

  return result.affectedRows > 0;
}

async function remover(id, usuarioId) {
  const [result] = await db.execute(
    'DELETE FROM orcamentos WHERE id = ? AND usuario_id = ?',
    [id, usuarioId]
  );

  return result.affectedRows > 0;
}

module.exports = {
  listarPorUsuario,
  criar,
  atualizar,
  remover
};
