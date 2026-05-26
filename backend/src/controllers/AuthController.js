const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

function criarErro(mensagem, status) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

function validarCadastro(dados) {
  if (!dados.nome || !dados.email || !dados.senha) {
    throw criarErro('Nome, email e senha sao obrigatorios', 400);
  }

  if (dados.senha.length < 6) {
    throw criarErro('A senha deve ter pelo menos 6 caracteres', 400);
  }
}

class AuthController {
  async cadastrar(req, res, next) {
    try {
      console.log('[cadastro] recebendo dados:', {
        nome: req.body.nome,
        email: req.body.email
      });

      validarCadastro(req.body);

      const usuarioExistente = await Usuario.buscarPorEmail(req.body.email);
      if (usuarioExistente) {
        throw criarErro('Email ja cadastrado', 409);
      }

      const usuario = await Usuario.criar({
        nome: req.body.nome,
        email: req.body.email,
        senha: await bcrypt.hash(req.body.senha, 10)
      });

      console.log('[cadastro] usuario criado com id:', usuario.id);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      console.log('[login] tentativa para email:', email);

      if (!email || !senha) {
        throw criarErro('Email e senha sao obrigatorios', 400);
      }

      const usuario = await Usuario.buscarPorEmail(email);
      const senhaCorreta = usuario && await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        throw criarErro('Credenciais invalidas', 401);
      }

      const dadosUsuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };

      const token = jwt.sign(
        dadosUsuario,
        process.env.JWT_SECRET || 'troque_esta_chave',
        { expiresIn: '8h' }
      );

      res.json({ token, usuario: dadosUsuario });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
