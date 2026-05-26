const Transacao = require('../models/Transacao');

function criarErro(mensagem, status) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

function validarTransacao(dados) {
  if (!['receita', 'despesa'].includes(dados.tipo)) {
    throw criarErro('Tipo deve ser receita ou despesa', 400);
  }

  if (!dados.categoria || !dados.valor || !dados.data) {
    throw criarErro('Categoria, valor e data sao obrigatorios', 400);
  }

  if (Number(dados.valor) <= 0) {
    throw criarErro('Valor deve ser maior que zero', 400);
  }
}

function montarTransacao(usuarioId, dados) {
  return {
    usuario_id: usuarioId,
    tipo: dados.tipo,
    categoria: dados.categoria,
    descricao: dados.descricao || '',
    valor: Number(dados.valor),
    data: dados.data
  };
}

class TransacaoController {
  async listar(req, res, next) {
    try {
      const transacoes = await Transacao.listarPorUsuario(req.usuario.id);
      res.json(transacoes);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      validarTransacao(req.body);

      const transacao = await Transacao.criar(montarTransacao(req.usuario.id, req.body));
      res.status(201).json(transacao);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      validarTransacao(req.body);

      const atualizado = await Transacao.atualizar(
        req.params.id,
        req.usuario.id,
        montarTransacao(req.usuario.id, req.body)
      );

      if (!atualizado) {
        throw criarErro('Transacao nao encontrada', 404);
      }

      res.json({ mensagem: 'Transacao atualizada com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async remover(req, res, next) {
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

  async resumo(req, res, next) {
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
}

module.exports = new TransacaoController();
