// Funcoes de cadastro e login.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const criarErro = require('../utils/httpError');

function validarCadastro(dados = {}) {
  const nome = dados.nome?.trim();
  const email = dados.email?.trim();

  if (!nome || !email || !dados.senha) {
    throw criarErro('Nome, email e senha sao obrigatorios', 400);
  }

  if (dados.senha.length < 6) {
    throw criarErro('A senha deve ter pelo menos 6 caracteres', 400);
  }
}

// rota para cadastrar usuario
async function cadastrar(req, res, next) {
  try {
    validarCadastro(req.body);

    const nome = req.body.nome.trim();
    const email = req.body.email.trim().toLowerCase();

    const usuarioExistente = await Usuario.buscarPorEmail(email);
    if (usuarioExistente) {
      throw criarErro('Email ja cadastrado', 409);
    }

    const senha = await bcrypt.hash(req.body.senha, 10);
    const usuario = await Usuario.criar({ nome, email, senha });

    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}

// rota para fazer login
async function login(req, res, next) {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { senha } = req.body;

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

module.exports = {
  cadastrar,
  login
};
