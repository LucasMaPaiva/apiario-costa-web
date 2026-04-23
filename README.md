# Apiário Costa - Site Institucional com Loja Integrada

Este projeto e o site do **Apiário Costa**, combinando uma presença institucional com uma experiência de loja. Ele nao funciona apenas como e-commerce: a aplicacao apresenta a marca, os diferenciais do produto e, dentro do mesmo site, disponibiliza um catalogo online.

O projeto segue uma arquitetura monolitica com **Laravel** no backend e **React** no frontend, rodando em ambiente **Docker**.

## Visao Geral do Produto

Hoje o sistema possui estes modulos implementados:

- **Pagina inicial** com apresentacao da marca, proposta de valor, destaques visuais, vitrine de produtos e chamadas para contato.
- **Pagina da loja** com listagem de produtos cadastrados, exibicao por categorias e carregamento dos dados via API.
- **Login administrativo** para autenticacao de usuarios com Laravel Sanctum.

Em outras palavras, o site tem dois papeis principais:

- **Institucional**: fortalecer a comunicacao da marca e explicar o produto.
- **Comercial**: exibir catalogo e direcionar interesse de compra.

## Modulos Entregues

### 1. Pagina inicial

Rota principal: `/`

A home e renderizada em React dentro do `MainLayout` e atualmente reune secoes como:

- Hero principal da marca
- Sobre
- Vitrine de produtos em destaque
- Diferenciais
- Showcase visual
- Chamada para contato

Objetivo do modulo:

- apresentar o Apiario Costa como marca;
- comunicar qualidade, origem e posicionamento do produto;
- conduzir o usuario para a loja ou para canais de contato.

### 2. Loja

Rota principal: `/loja`

A loja consome dados do backend e exibe:

- lista de produtos ativos;
- categorias para filtro;
- cards com nome, descricao, preco e imagem;
- CTA de interesse comercial em cada produto.

Objetivo do modulo:

- transformar o site institucional em um canal de descoberta e conversao;
- permitir navegacao por catalogo sem separar a experiencia do restante do site.

### 3. Login administrativo

Rotas principais:

- tela de login: `/laravel-admin`
- area autenticada atual: `/admin`

O fluxo atual faz:

- envio das credenciais pelo frontend React;
- autenticacao no Laravel;
- geracao de token com Sanctum;
- redirecionamento para a area autenticada.

Observacao: a rota `/admin` existe hoje como uma tela simples de confirmacao de acesso logado, servindo como base inicial para futura expansao do painel administrativo.

## Arquitetura Atual

### Frontend

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS 4**
- **React Router**
- **Axios**

Responsavel por:

- renderizar a SPA;
- controlar navegacao entre home, loja e login;
- consumir as rotas de autenticacao e catalogo.

### Backend

- **Laravel 13**
- **PHP 8.3+**
- **Laravel Sanctum**
- **PostgreSQL**

Responsavel por:

- autenticar usuarios;
- disponibilizar produtos e categorias via API;
- manter a regra de negocio e acesso aos dados.

## Rotas Principais

### Web

- `POST /auth/login`: autentica usuario.
- `POST /auth/logout`: encerra sessao autenticada.
- `GET /{any}`: entrega a SPA React para as rotas publicas.

### API

- `GET /api/products`: lista produtos ativos.
- `GET /api/products/{slug}`: detalha um produto pelo slug.
- `GET /api/categories`: lista categorias disponiveis.

## Estrutura Resumida

- `resources/js/pages/home`: pagina inicial.
- `resources/js/pages/store`: pagina da loja.
- `resources/js/pages/auth/login.tsx`: tela de login.
- `resources/js/modules/auth`: servicos e componentes de autenticacao.
- `resources/js/modules/products`: servicos e componentes da loja.
- `app/Http/Controllers`: controllers de autenticacao, produtos e categorias.
- `app/Models`: modelos `Product`, `Category` e `User`.
- `routes/web.php`: rotas web e entrada da SPA.
- `routes/api.php`: endpoints de produtos e categorias.

## Como Comecar

### Pre-requisitos

- **Docker** e **Docker Compose**
- **Make**

### Instalacao

1. Clone o repositorio.
2. Configure o arquivo `.env`:
   ```bash
   cp .env.example .env
   ```
3. Inicialize o ambiente:
   ```bash
   make install
   ```

O site estara disponivel em `http://localhost:8000`.

## Comandos do Makefile

| Comando | Descricao |
| :--- | :--- |
| `make up` | Sobe os containers do ambiente |
| `make down` | Para e remove os containers |
| `make stop` | Apenas para os containers |
| `make npm-dev` | Inicia o Vite em desenvolvimento |
| `make npm-build` | Gera o build de producao do frontend |
| `make shell` | Abre o terminal do container PHP |
| `make migrate` | Executa as migracoes |
| `make fix-permissions` | Corrige permissoes de escrita |

## Fluxo de Desenvolvimento

1. Suba o ambiente com `make up`.
2. Em outro terminal, execute `make npm-dev`.
3. Acesse `http://localhost:8000`.

## Documentacao Detalhada

Para mais detalhes tecnicos, consulte a pasta `/docs`:

- [Visao Geral do Projeto](./docs/project-overview.md)
- [Infraestrutura Docker](./docs/infrastructure.md)
- [Guia de Primeiros Passos](./docs/getting-started.md)

## Documentacao de IA

O projeto possui uma base de orientacao para agentes de IA em `ai/`.

- Para tarefas full stack, use [`gemini.md`](./gemini.md)
- Para o mapa geral da estrutura de IA, use [`ai/index.md`](./ai/index.md)
- Para backend, o ponto de entrada principal e `ai/agents/backend-agent.md`
- Para frontend, o ponto de entrada principal e `ai/agents/frontend-agent.md`

## Infraestrutura

- **PHP**: 8.4-FPM (Alpine) no ambiente Docker
- **Banco de Dados**: PostgreSQL 16
- **Servidor Web**: Nginx
- **Frontend**: React + Vite + Tailwind CSS 4
