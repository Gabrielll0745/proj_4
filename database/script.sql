-- Este script cria o banco de dados usado pelo sistema financeiro.
-- Execute este arquivo no MySQL antes de iniciar o backend pela primeira vez.

-- Cria o banco se ele ainda nao existir.
-- utf8mb4 permite salvar acentos e caracteres especiais corretamente.
CREATE DATABASE IF NOT EXISTS gestor_financas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco para que as tabelas sejam criadas dentro dele.
USE gestor_financas;

-- Tabela de usuarios do sistema.
-- Cada usuario tem nome, email unico e senha criptografada.
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transacoes financeiras.
-- Cada transacao pertence a um usuario e pode ser receita ou despesa.
CREATE TABLE IF NOT EXISTS transacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo ENUM('receita', 'despesa') NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  valor DECIMAL(12, 2) NOT NULL,
  data DATE NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Chave estrangeira liga transacoes ao usuario.
  -- ON DELETE CASCADE apaga as transacoes quando o usuario for apagado.
  CONSTRAINT fk_transacoes_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- Tabela de orcamentos mensais.
-- Cada orcamento define um limite para uma categoria em um mes/ano.
CREATE TABLE IF NOT EXISTS orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  valor_limite DECIMAL(12, 2) NOT NULL,
  mes TINYINT NOT NULL,
  ano SMALLINT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Chave estrangeira liga orcamentos ao usuario.
  -- ON DELETE CASCADE apaga os orcamentos quando o usuario for apagado.
  CONSTRAINT fk_orcamentos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE,

  -- Garante no banco que o mes fique entre janeiro (1) e dezembro (12).
  CONSTRAINT chk_orcamentos_mes CHECK (mes BETWEEN 1 AND 12)
);
