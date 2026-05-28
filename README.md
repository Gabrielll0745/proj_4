# IFAL - Instituto Federal de Alagoas

## Projeto de Banco de Dados

**Disciplina:** Banco de Dados  
**Curso:** Técnico em Informática  
**Título do Projeto:** FinançaFácil - Sistema de Controle Financeiro Pessoal  
**Integrantes:** Ana Beatriz Santos, Lucas Gabriel Oliveira, Mariana Costa Lima e Pedro Henrique Almeida

---

## 1. Identificação do Projeto

O projeto **FinançaFácil** consiste em um sistema simples de controle financeiro pessoal, desenvolvido com o objetivo de auxiliar usuários no registro, acompanhamento e organização de suas receitas, despesas e orçamentos mensais.

O sistema utiliza um banco de dados relacional MySQL para armazenar as informações dos usuários, suas movimentações financeiras e seus limites de orçamento por categoria. A aplicação também possui uma API backend em Node.js e Express, além de telas frontend em HTML, CSS e JavaScript.

---

## 2. Contexto e Objetivo

Atualmente, muitas pessoas têm dificuldade para acompanhar seus gastos mensais de forma organizada. Em muitos casos, o controle financeiro é feito de maneira informal, por meio de anotações em papel, mensagens no celular ou planilhas pouco atualizadas. Isso dificulta a visualização clara de quanto dinheiro entra, quanto dinheiro sai e quais categorias geram mais despesas.

Nesse contexto, o **FinançaFácil** foi proposto como uma solução simples e objetiva para registrar movimentações financeiras pessoais. O sistema permite que o usuário cadastre receitas, despesas e orçamentos mensais, facilitando a análise do saldo e o planejamento dos gastos.

O principal objetivo do projeto é aplicar os conceitos de banco de dados estudados na disciplina, como entidades, atributos, relacionamentos, chaves primárias, chaves estrangeiras, comandos SQL e consultas. Além disso, o projeto busca demonstrar como um banco de dados pode ser integrado a uma aplicação web funcional.

---

## 3. Público-Alvo

O público-alvo do sistema é formado por pessoas que desejam organizar melhor suas finanças pessoais de forma simples, sem a necessidade de utilizar ferramentas complexas.

Entre os possíveis usuários estão:

- Estudantes que recebem bolsa, mesada ou renda eventual.
- Trabalhadores que desejam acompanhar salário, gastos e economia mensal.
- Famílias que precisam controlar despesas por categoria.
- Pessoas que desejam iniciar uma rotina básica de educação financeira.

O sistema foi pensado para usuários com conhecimento básico de informática, oferecendo funcionalidades diretas e de fácil compreensão.

---

## 4. Problema a Ser Resolvido

O problema central identificado é a falta de controle organizado sobre receitas e despesas pessoais. Quando o usuário não registra seus gastos, torna-se mais difícil perceber para onde o dinheiro está indo e quais despesas podem ser reduzidas.

Essa falta de controle pode causar problemas como:

- Dificuldade para saber o saldo real disponível.
- Falta de planejamento para despesas futuras.
- Gastos acima do limite em determinadas categorias.
- Pouca clareza sobre hábitos financeiros.

O sistema busca resolver esse problema permitindo que o usuário registre suas transações, consulte seus dados financeiros e acompanhe seus orçamentos por mês e categoria.

---

## 5. Escopo e Limitações

### 5.1 Escopo

O projeto contempla as seguintes funcionalidades:

- Cadastro de usuários.
- Login com autenticação por token.
- Cadastro de receitas.
- Cadastro de despesas.
- Listagem de transações financeiras.
- Remoção e atualização de transações.
- Cadastro de orçamento por categoria, mês e ano.
- Listagem, atualização e remoção de orçamentos.
- Consulta de resumo financeiro com total de receitas, total de despesas e saldo.

### 5.2 Limitações

Por ser um projeto acadêmico, algumas funcionalidades avançadas não fazem parte do escopo inicial:

- Não há integração com bancos reais.
- Não há emissão de relatórios em PDF.
- Não há recuperação de senha por e-mail.
- Não há categorização automática por inteligência artificial.
- Não há controle de contas bancárias separadas.

Essas limitações podem ser tratadas em versões futuras do sistema.

---

## 6. Entidades do Sistema

O banco de dados foi organizado em três entidades principais: **Usuário**, **Transação** e **Orçamento**.

### 6.1 Usuário

Representa a pessoa cadastrada no sistema. Cada usuário possui seus próprios dados financeiros.

**Atributos:**

- `id`: identificador único do usuário.
- `nome`: nome completo do usuário.
- `email`: e-mail usado para login. Deve ser único.
- `senha`: senha criptografada.
- `criado_em`: data e hora de criação do cadastro.

### 6.2 Transação

Representa uma movimentação financeira cadastrada pelo usuário. Pode ser uma receita ou uma despesa.

**Atributos:**

- `id`: identificador único da transação.
- `usuario_id`: identifica o usuário dono da transação.
- `tipo`: indica se a transação é `receita` ou `despesa`.
- `categoria`: categoria financeira, como alimentação, transporte ou salário.
- `descricao`: descrição opcional da transação.
- `valor`: valor monetário da transação.
- `data`: data em que a transação ocorreu.
- `criado_em`: data e hora de cadastro no sistema.

### 6.3 Orçamento

Representa um limite de gasto definido pelo usuário para uma categoria em determinado mês e ano.

**Atributos:**

- `id`: identificador único do orçamento.
- `usuario_id`: identifica o usuário dono do orçamento.
- `categoria`: categoria controlada pelo orçamento.
- `valor_limite`: valor máximo planejado para a categoria.
- `mes`: mês do orçamento, de 1 a 12.
- `ano`: ano do orçamento.
- `criado_em`: data e hora de cadastro no sistema.

---

## 7. Modelo Conceitual (DER em Texto)

O modelo conceitual descreve as entidades do sistema e os relacionamentos existentes entre elas.

### 7.1 Entidades

- **Usuário:** armazena os dados de acesso e identificação do usuário.
- **Transação:** armazena receitas e despesas cadastradas pelo usuário.
- **Orçamento:** armazena limites de gastos definidos pelo usuário.

### 7.2 Relacionamentos

**Usuário possui Transações**

- Um usuário pode cadastrar várias transações.
- Cada transação pertence obrigatoriamente a um único usuário.
- Cardinalidade: **1:N**.

Representação textual:

```text
Usuário (1) ----- (N) Transação
```

**Usuário possui Orçamentos**

- Um usuário pode cadastrar vários orçamentos.
- Cada orçamento pertence obrigatoriamente a um único usuário.
- Cardinalidade: **1:N**.

Representação textual:

```text
Usuário (1) ----- (N) Orçamento
```

### 7.3 Observação sobre Relacionamentos N:N

Neste projeto não existe relacionamento muitos-para-muitos (**N:N**). As entidades `transacoes` e `orcamentos` se relacionam diretamente com `usuarios`, sempre por meio da chave estrangeira `usuario_id`.

---

## 8. Modelo Relacional

O modelo relacional transforma o DER em tabelas. Cada tabela possui uma chave primária e, quando necessário, chaves estrangeiras para representar os relacionamentos.

### 8.1 Tabela `usuarios`

- Chave primária: `id`.
- Restrição de unicidade: `email`.

### 8.2 Tabela `transacoes`

- Chave primária: `id`.
- Chave estrangeira: `usuario_id`, referenciando `usuarios(id)`.
- Relacionamento: muitos registros de transações pertencem a um usuário.

### 8.3 Tabela `orcamentos`

- Chave primária: `id`.
- Chave estrangeira: `usuario_id`, referenciando `usuarios(id)`.
- Relacionamento: muitos registros de orçamento pertencem a um usuário.

---

## 9. Script SQL do Modelo Relacional

```sql
CREATE DATABASE IF NOT EXISTS gestor_financas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gestor_financas;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo ENUM('receita', 'despesa') NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  valor DECIMAL(12, 2) NOT NULL,
  data DATE NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_transacoes_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orcamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  valor_limite DECIMAL(12, 2) NOT NULL,
  mes TINYINT NOT NULL,
  ano SMALLINT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orcamentos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE,
  CONSTRAINT chk_orcamentos_mes CHECK (mes BETWEEN 1 AND 12)
);
```

---

## 10. Exemplos de Cadastros com INSERT

Os comandos abaixo demonstram como inserir dados manualmente no banco.

### 10.1 Cadastro de Usuários

```sql
INSERT INTO usuarios (nome, email, senha)
VALUES
  ('Ana Beatriz Santos', 'ana.santos@email.com', '$2a$10$senhaCriptografadaExemplo1'),
  ('Lucas Gabriel Oliveira', 'lucas.oliveira@email.com', '$2a$10$senhaCriptografadaExemplo2');
```

**Explicação:** cadastra dois usuários. A senha aparece como texto criptografado, pois o sistema não deve salvar senhas em formato original.

### 10.2 Cadastro de Transações

```sql
INSERT INTO transacoes (usuario_id, tipo, categoria, descricao, valor, data)
VALUES
  (1, 'receita', 'Salário', 'Salário mensal', 1800.00, '2026-05-05'),
  (1, 'despesa', 'Alimentação', 'Compras no supermercado', 320.50, '2026-05-08'),
  (1, 'despesa', 'Transporte', 'Passagens de ônibus', 95.00, '2026-05-10'),
  (2, 'receita', 'Bolsa', 'Bolsa de estudos', 700.00, '2026-05-06');
```

**Explicação:** cadastra receitas e despesas para usuários diferentes. O campo `usuario_id` identifica a quem pertence cada transação.

### 10.3 Cadastro de Orçamentos

```sql
INSERT INTO orcamentos (usuario_id, categoria, valor_limite, mes, ano)
VALUES
  (1, 'Alimentação', 600.00, 5, 2026),
  (1, 'Transporte', 150.00, 5, 2026),
  (2, 'Lazer', 200.00, 5, 2026);
```

**Explicação:** cadastra limites mensais de gastos por categoria. Esses limites podem ser comparados com as despesas registradas.

---

## 11. Exemplos de Consultas com SELECT

### 11.1 Listar Transações de um Usuário

```sql
SELECT
  id,
  tipo,
  categoria,
  descricao,
  valor,
  data
FROM transacoes
WHERE usuario_id = 1
ORDER BY data DESC;
```

**Explicação:** retorna todas as transações do usuário de id 1, ordenadas da mais recente para a mais antiga.

### 11.2 Calcular Receitas, Despesas e Saldo

```sql
SELECT
  COALESCE(SUM(CASE WHEN tipo = 'receita' THEN valor ELSE 0 END), 0) AS total_receitas,
  COALESCE(SUM(CASE WHEN tipo = 'despesa' THEN valor ELSE 0 END), 0) AS total_despesas,
  COALESCE(SUM(CASE WHEN tipo = 'receita' THEN valor ELSE -valor END), 0) AS saldo
FROM transacoes
WHERE usuario_id = 1;
```

**Explicação:** calcula o total de receitas, o total de despesas e o saldo do usuário. O saldo é obtido subtraindo as despesas das receitas.

### 11.3 Total de Despesas por Categoria

```sql
SELECT
  categoria,
  SUM(valor) AS total_gasto
FROM transacoes
WHERE usuario_id = 1
  AND tipo = 'despesa'
GROUP BY categoria
ORDER BY total_gasto DESC;
```

**Explicação:** mostra quanto o usuário gastou em cada categoria. Essa consulta ajuda a identificar quais áreas consomem mais dinheiro.

### 11.4 Comparar Orçamento com Gastos do Mês

```sql
SELECT
  o.categoria,
  o.valor_limite,
  COALESCE(SUM(t.valor), 0) AS total_gasto,
  o.valor_limite - COALESCE(SUM(t.valor), 0) AS valor_restante
FROM orcamentos o
LEFT JOIN transacoes t
  ON t.usuario_id = o.usuario_id
  AND t.categoria = o.categoria
  AND t.tipo = 'despesa'
  AND MONTH(t.data) = o.mes
  AND YEAR(t.data) = o.ano
WHERE o.usuario_id = 1
  AND o.mes = 5
  AND o.ano = 2026
GROUP BY o.id, o.categoria, o.valor_limite;
```

**Explicação:** compara o limite de cada orçamento com o total gasto na mesma categoria, mês e ano. O resultado mostra quanto ainda resta do orçamento.

---

## 12. Funcionalidades do Sistema

O sistema possui as seguintes funcionalidades principais:

- Criar uma conta de usuário.
- Realizar login com e-mail e senha.
- Proteger rotas usando token JWT.
- Registrar receitas e despesas.
- Consultar histórico de transações.
- Excluir e atualizar transações.
- Criar orçamentos mensais por categoria.
- Consultar orçamentos cadastrados.
- Calcular resumo financeiro com receitas, despesas e saldo.

---

## 13. Estrutura Técnica do Projeto

O projeto foi dividido em três partes:

- `backend`: API desenvolvida em Node.js e Express.
- `frontend`: telas desenvolvidas com HTML, CSS e JavaScript.
- `database`: script SQL de criação do banco de dados.

Estrutura simplificada:

```text
gestor-financas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── package.json
├── database/
│   └── script.sql
└── frontend/
    ├── css/
    ├── js/
    └── pages/
```

---

## 14. Como Executar o Projeto

### 14.1 Criar o Banco de Dados

Abra o MySQL e execute o arquivo:

```text
database/script.sql
```

Esse script cria o banco `gestor_financas` e as tabelas necessárias.

### 14.2 Instalar as Dependências do Backend

No terminal, acesse a pasta do backend:

```powershell
cd backend
```

Instale as dependências:

```powershell
npm install
```

### 14.3 Configurar o Arquivo `.env`

Crie um arquivo `.env` dentro da pasta `backend`, usando o `.env.example` como base:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=gestor_financas
JWT_SECRET=uma_chave_secreta
```

Se o MySQL não tiver senha, o campo `DB_PASSWORD` pode ficar vazio.

### 14.4 Iniciar o Servidor

Dentro da pasta `backend`, execute:

```powershell
npm run dev
```

Ou, sem o nodemon:

```powershell
npm start
```

A API ficará disponível em:

```text
http://localhost:3000/api
```

Para testar se o backend está funcionando, acesse:

```text
http://localhost:3000/api/health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

---

## 15. Conclusão

O projeto **FinançaFácil** demonstra a aplicação prática de conceitos fundamentais de banco de dados em um sistema web funcional. A modelagem utiliza entidades bem definidas, relacionamentos simples e coerentes, chaves primárias e estrangeiras, além de consultas SQL úteis para análise financeira.

Com isso, o sistema atende ao objetivo acadêmico de representar um problema real por meio de um banco de dados relacional, permitindo cadastro, armazenamento, consulta e organização de informações financeiras pessoais.
