# Visao Geral do Projeto

## Resumo

O **Apiario Costa** e um site institucional com loja integrada. A proposta do projeto nao e ser apenas um e-commerce tradicional, mas unir apresentacao da marca, narrativa do produto e catalogo comercial em uma unica experiencia.

Atualmente, os modulos prontos sao:

- pagina inicial;
- pagina da loja com produtos;
- login administrativo.

## Objetivo do Sistema

O sistema atende a dois objetivos ao mesmo tempo:

- **Institucional**: apresentar a marca, a identidade do produto e seus diferenciais.
- **Comercial**: exibir o catalogo e gerar interesse de compra.

## Modulos Implementados

### Pagina inicial

Rota: `/`

Responsavel por apresentar o Apiario Costa como marca. A home foi organizada em secoes reutilizaveis no frontend, incluindo:

- hero principal;
- sobre;
- vitrine de produtos;
- diferenciais;
- showcase visual;
- chamada para contato.

Essa pagina funciona como a camada institucional do projeto e conduz o usuario para a loja ou para o contato.

Arquivos principais:

- `resources/js/pages/home/index.tsx`
- `resources/js/modules/home/components/Hero.tsx`
- `resources/js/modules/home/components/Products.tsx`

### Loja

Rota: `/loja`

Este modulo implementa a parte comercial do site. A pagina busca os dados do backend e monta um catalogo navegavel com:

- produtos ativos;
- categorias;
- filtros por categoria;
- cards com preco, imagem e descricao.

Os dados sao carregados a partir de endpoints Laravel e consumidos com Axios no frontend.

Arquivos principais:

- `resources/js/pages/store/index.tsx`
- `resources/js/modules/products/services/productService.ts`
- `resources/js/modules/products/components/ProductCard.tsx`
- `app/Http/Controllers/ProductController.php`
- `app/Http/Controllers/CategoryController.php`

### Login administrativo

Rotas:

- `/laravel-admin`
- `/admin`

O login permite autenticar usuarios usando Laravel Sanctum. O frontend envia as credenciais, recebe o token e redireciona o usuario para a area autenticada.

No estado atual do projeto, a rota `/admin` funciona como uma pagina simples de validacao do fluxo de acesso, servindo de base para futuras funcionalidades administrativas.

Arquivos principais:

- `resources/js/pages/auth/login.tsx`
- `resources/js/modules/auth/components/LoginForm.tsx`
- `resources/js/modules/auth/services/authService.ts`
- `app/Http/Controllers/AuthController.php`
- `app/Services/Auth/LoginService.php`
- `app/Services/Auth/LogoutService.php`

## Arquitetura da Aplicacao

### Frontend

O frontend e uma SPA em React, com roteamento feito por `react-router-dom`.

Rotas principais configuradas:

- `/`: home
- `/loja`: catalogo
- `/laravel-admin`: login
- `/admin`: area autenticada atual

Arquivo central de rotas:

- `resources/js/app/router/index.tsx`

### Backend

O backend em Laravel expoe endpoints para autenticacao e catalogo. A aplicacao usa:

- `web.php` para login, logout e entrega da SPA;
- `api.php` para produtos e categorias.

Endpoints atuais:

- `POST /auth/login`
- `POST /auth/logout`
- `GET /api/products`
- `GET /api/products/{slug}`
- `GET /api/categories`

## Modelos Principais

### Product

Representa os itens da loja. Campos principais identificados no modelo:

- `category_id`
- `name`
- `slug`
- `description`
- `price`
- `image_path`
- `stock`
- `is_active`

Relacionamento:

- um produto pertence a uma categoria.

### Category

Responsavel pela classificacao dos produtos.

Campos principais:

- `name`
- `slug`

Relacionamento:

- uma categoria possui varios produtos.

## Estrutura de Pastas Relevante

- `app/Http/Controllers`: controllers do backend.
- `app/Models`: modelos da aplicacao.
- `app/Services`: regras de negocio, incluindo autenticacao.
- `resources/js/pages`: paginas da SPA.
- `resources/js/modules`: modulos de dominio do frontend.
- `resources/js/common`: componentes e servicos compartilhados.
- `routes/web.php`: rotas web.
- `routes/api.php`: rotas de API.

## Estado Atual do Projeto

O projeto ja entrega a base funcional principal do site:

- comunicacao institucional da marca;
- exibicao de catalogo integrado ao site;
- autenticacao inicial para area administrativa.

Pelo estado atual do codigo, ainda nao existe um painel administrativo completo implementado no frontend, apenas a estrutura inicial de login e area autenticada.
