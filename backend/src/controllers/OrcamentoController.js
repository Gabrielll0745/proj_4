const Orcamento = require('../models/Orcamento');

function criarErro(mensagem, status) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

function validarOrcamento(dados) {
  if (!dados.categoria || !dados.valor_limite || !dados.mes || !dados.ano) {
    throw criarErro('Categoria, valor limite, mes e ano sao obrigatorios', 400);
  }

  if (Number(dados.valor_limite) <= 0) {
    throw criarErro('Valor limite deve ser maior que zero', 400);
  }

  if (Number(dados.mes) < 1 || Number(dados.mes) > 12) {
    throw criarErro('Mes deve estar entre 1 e 12', 400);
  }
}

function montarOrcamento(usuarioId, dados) {
  return {
    usuario_id: usuarioId,
    categoria: dados.categoria,
    valor_limite: Number(dados.valor_limite),
    mes: Number(dados.mes),
    ano: Number(dados.ano)
  };
}

class OrcamentoController {
  async listar(req, res, next) {
    try {
      const orcamentos = await Orcamento.listarPorUsuario(req.usuario.id);
      res.json(orcamentos);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      validarOrcamento(req.body);

      const orcamento = await Orcamento.criar(montarOrcamento(req.usuario.id, req.body));
      res.status(201).json(orcamento);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      validarOrcamento(req.body);

      const atualizado = await Orcamento.atualizar(
        req.params.id,
        req.usuario.id,
        montarOrcamento(req.usuario.id, req.body)
      );

      if (!atualizado) {
        throw criarErro('Orcamento nao encontrado', 404);
      }

      res.json({ mensagem: 'Orcamento atualizado com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async remover(req, res, next) {
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
}

module.exports = new OrcamentoController();
