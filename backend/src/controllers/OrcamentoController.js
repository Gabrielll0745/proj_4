// Funcoes dos orcamentos mensais.

const Orcamento = require('../models/Orcamento');
const criarErro = require('../utils/httpError');

function validarOrcamento(dados = {}) {
  const categoria = dados.categoria?.trim();
  const valorLimite = Number(dados.valor_limite);
  const mes = Number(dados.mes);
  const ano = Number(dados.ano);

  if (!categoria || dados.valor_limite === undefined || !dados.mes || !dados.ano) {
    throw criarErro('Categoria, valor limite, mes e ano sao obrigatorios', 400);
  }

  if (!Number.isFinite(valorLimite) || valorLimite <= 0) {
    throw criarErro('Valor limite deve ser maior que zero', 400);
  }

  if (!Number.isInteger(mes) || mes < 1 || mes > 12) {
    throw criarErro('Mes deve estar entre 1 e 12', 400);
  }

  if (!Number.isInteger(ano) || ano < 1900 || ano > 2100) {
    throw criarErro('Ano invalido', 400);
  }
}

function montarOrcamento(usuarioId, dados) {
  return {
    usuario_id: usuarioId,
    categoria: dados.categoria.trim(),
    valor_limite: Number(dados.valor_limite),
    mes: Number(dados.mes),
    ano: Number(dados.ano)
  };
}

// lista os orcamentos do usuario logado
async function listar(req, res, next) {
  try {
    const orcamentos = await Orcamento.listarPorUsuario(req.usuario.id);
    res.json(orcamentos);
  } catch (error) {
    next(error);
  }
}

// cadastra um orcamento
async function criar(req, res, next) {
  try {
    validarOrcamento(req.body);

    const dados = montarOrcamento(req.usuario.id, req.body);
    const orcamento = await Orcamento.criar(dados);

    res.status(201).json(orcamento);
  } catch (error) {
    next(error);
  }
}

// atualiza um orcamento
async function atualizar(req, res, next) {
  try {
    validarOrcamento(req.body);

    const dados = montarOrcamento(req.usuario.id, req.body);
    const atualizado = await Orcamento.atualizar(req.params.id, req.usuario.id, dados);

    if (!atualizado) {
      throw criarErro('Orcamento nao encontrado', 404);
    }

    res.json({ mensagem: 'Orcamento atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
}

// remove um orcamento
async function remover(req, res, next) {
  try {
    const removido = await Orcamento.remover(req.params.id, req.usuario.id);

    if (!removido) {
      throw criarErro('Orcamento nao encontrado', 404);
    }

    res.json({ mensagem: 'Orcamento removido com sucesso' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  criar,
  atualizar,
  remover
};
