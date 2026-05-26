# Gestor Financas

Sistema simples de controle financeiro pessoal. O projeto permite cadastrar usuarios, fazer login, registrar receitas e despesas, criar orcamentos por categoria e visualizar relatorios financeiros.

## Como o projeto funciona

O sistema foi dividido em tres partes principais:

- `backend`: API feita com Node.js e Express. Ela recebe as requisicoes do frontend, valida os dados, conversa com o banco MySQL e devolve respostas em JSON.
- `frontend`: telas feitas com HTML, CSS e JavaScript puro. As paginas chamam a API usando `fetch`.
- `database`: script SQL responsavel por criar o banco de dados e as tabelas.

## Fluxo do sistema

1. O usuario cria uma conta na pagina `cadastro.html`.
2. O backend salva o usuario no banco com a senha criptografada.
3. O usuario entra pela pagina `login.html`.
4. Se o login estiver correto, o backend devolve um token JWT.
5. O frontend salva esse token no `localStorage`.
6. As paginas protegidas usam o token para acessar transacoes, orcamentos e relatorios.
7. O backend identifica o usuario pelo token e retorna apenas os dados dele.

## Estrutura de pastas

```text
gestor-financas/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuracao do banco de dados
│   │   ├── models/          # Funcoes de acesso ao banco de cada entidade
│   │   ├── controllers/     # Validam dados e respondem as requisicoes
│   │   ├── routes/          # Rotas da API
│   │   ├── middlewares/     # Middleware de autenticacao JWT
│   │   └── app.js           # Configuracao principal do Express
│   ├── server.js            # Inicializacao do servidor
│   └── package.json         # Dependencias e scripts do backend
│
├── frontend/
│   ├── pages/               # Paginas HTML
│   ├── css/                 # Estilos
│   └── js/                  # Scripts do frontend
│
└── database/
    └── script.sql           # Criacao do banco e tabelas
```

## Requisitos

- Node.js instalado
- MySQL instalado e rodando
- Navegador web

## Como rodar o projeto

### 1. Criar o banco de dados

Abra o MySQL e execute o arquivo:

```text
database/script.sql
```

Esse script cria o banco `gestor_financas` e as tabelas:

- `usuarios`
- `transacoes`
- `orcamentos`

### 2. Instalar as dependencias do backend

No terminal, entre na pasta do backend:

```powershell
cd gestor-financas/backend
```

Instale as dependencias:

```powershell
npm install
```

### 3. Configurar o arquivo `.env`

Crie um arquivo `.env` copiando o exemplo:

```powershell
Copy-Item .env.example .env
```

Depois abra o arquivo `.env` e ajuste os dados do seu MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=gestor_financas
JWT_SECRET=uma_chave_secreta
```

Se o seu MySQL nao tiver senha, deixe `DB_PASSWORD=` vazio.

### 4. Iniciar o backend

Ainda dentro da pasta `backend`, rode:

```powershell
npm run dev
```

Se preferir rodar sem `nodemon`, use:

```powershell
npm start
```

A API ficara disponivel em:

```text
http://localhost:3000/api
```

Para testar se o backend subiu, acesse:

```text
http://localhost:3000/api/health
```

A resposta esperada e:

```json
{
  "status": "ok"
}
```

### 5. Abrir o frontend

Abra no navegador:

```text
gestor-financas/frontend/pages/login.html
```

Para criar uma conta, abra:

```text
gestor-financas/frontend/pages/cadastro.html
```

Depois de cadastrar, faca login e use as telas do sistema.

## Paginas do frontend

- `login.html`: entrada do usuario no sistema.
- `cadastro.html`: criacao de nova conta.
- `home.html`: resumo com receitas, despesas e saldo.
- `transacoes.html`: lista de transacoes cadastradas.
- `cadastro-transacao.html`: formulario para cadastrar receita ou despesa.
- `orcamentos.html`: cadastro e listagem de orcamentos.
- `relatorios.html`: resumo financeiro e despesas por categoria.

## Rotas principais da API

### Autenticacao

- `POST /api/auth/cadastro`: cria um usuario.
- `POST /api/auth/login`: autentica o usuario e retorna um token.

### Transacoes

- `GET /api/transacoes`: lista as transacoes do usuario logado.
- `POST /api/transacoes`: cria uma nova transacao.
- `PUT /api/transacoes/:id`: atualiza uma transacao.
- `DELETE /api/transacoes/:id`: remove uma transacao.
- `GET /api/transacoes/resumo`: retorna receitas, despesas e saldo.

### Orcamentos

- `GET /api/orcamentos`: lista os orcamentos do usuario logado.
- `POST /api/orcamentos`: cria um novo orcamento.
- `PUT /api/orcamentos/:id`: atualiza um orcamento.
- `DELETE /api/orcamentos/:id`: remove um orcamento.

## Observacoes importantes

- O backend precisa estar rodando para o frontend funcionar corretamente.
- O frontend esta configurado para chamar a API em `http://localhost:3000/api`.
- O token de login fica salvo no `localStorage` do navegador.
- As rotas de transacoes e orcamentos exigem o token JWT.
