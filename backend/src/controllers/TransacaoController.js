// Funcoes das transacoes financeiras.

const Transacao = require('../models/Transacao');
const criarErro = require('../utils/httpError');

function validarTransacao(dados = {}) {
  const categoria = dados.categoria?.trim();
  const valor = Number(dados.valor);

  if (!['receita', 'despesa'].includes(dados.tipo)) {
    throw criarErro('Tipo deve ser receita ou despesa', 400);
  }

  if (!categoria || dados.valor === undefined || !dados.data) {
    throw criarErro('Categoria, valor e data sao obrigatorios', 400);
  }

  if (!Number.isFinite(valor) || valor <= 0) {
    throw criarErro('Valor deve ser maior que zero', 400);
  }
}

function montarTransacao(usuarioId, dados) {
  return {
    usuario_id: usuarioId,
    tipo: dados.tipo,
    categoria: dados.categoria.trim(),
    descricao: dados.descricao?.trim() || '',
    valor: Number(dados.valor),
    data: dados.data
  };
}

// lista as transacoes do usuario logado
async function listar(req, res, next) {
  try {
    const transacoes = await Transacao.listarPorUsuario(req.usuario.id);
    res.json(transacoes);
  } catch (error) {
    next(error);
  }
}

// cadastra uma receita ou despesa
async function criar(req, res, next) {
  try {
    validarTransacao(req.body);

    const dados = montarTransacao(req.usuario.id, req.body);
    const transacao = await Transacao.criar(dados);

    res.status(201).json(transacao);
  } catch (error) {
    next(error);
  }
}

// atualiza uma transacao
async function atualizar(req, res, next) {
  try {
    validarTransacao(req.body);

    const dados = montarTransacao(req.usuario.id, req.body);
    const atualizado = await Transacao.atualizar(req.params.id, req.usuario.id, dados);

    if (!atualizado) {
      throw criarErro('Transacao nao encontrada', 404);
    }

    res.json({ mensagem: 'Transacao atualizada com sucesso' });
  } catch (error) {
    next(error);
  }
}

// remove uma transacao
async function remover(req, res, next) {
  try {
    const removido = await Transacao.remover(req.params.id, req.usuario.id);

    if (!removido) {
      throw criarErro('Transacao nao encontrada', 404);
    }

    res.json({ mensagem: 'Transacao removida com sucesso' });
  } catch (error) {
    next(error);
  }
}

// mostra o total de receitas, despesas e saldo
async function resumo(req, res, next) {
  try {
    const resumo = await Transacao.resumo(req.usuario.id);
    const receitas = Number(resumo.receitas);
    const despesas = Number(resumo.despesas);

    res.json({
      receitas,
      despesas,
      saldo: receitas - despesas
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  criar,
  atualizar,
  remover,
  resumo
};
