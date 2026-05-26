const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const orcamentoRoutes = require('./routes/orcamentoRoutes');
const db = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health/db', async (req, res, next) => {
  try {
    await db.execute('SELECT 1');
    res.json({ status: 'ok', banco: 'conectado' });
  } catch (error) {
    next(error);
  }
});

app.get('/', (req, res) => {
  res.redirect('/pages/login.html');
});

app.use('/api/auth', authRoutes);
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/orcamentos', orcamentoRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ erro: 'Email ja cadastrado' });
  }

  if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    return res.status(500).json({
      erro: 'Erro ao acessar o MySQL. Confira DB_USER e DB_PASSWORD no arquivo .env do backend.'
    });
  }

  if (err.code === 'ER_BAD_DB_ERROR') {
    return res.status(500).json({
      erro: 'Banco de dados nao encontrado. Execute o script database/script.sql.'
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(500).json({
      erro: 'Nao foi possivel conectar ao MySQL. Verifique se o MySQL esta rodando.'
    });
  }

  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor'
  });
});

module.exports = app;
