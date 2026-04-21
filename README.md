# Apiário Costa - E-commerce

Este é um projeto monolítico de E-commerce construído com **Laravel** (PHP 8.4) e **React** (Vite), rodando em um ambiente **Docker** personalizado.

## 🚀 Como Começar (Nova Máquina)

Siga estes passos para configurar o projeto do zero:

### Pré-requisitos
- **Docker** e **Docker Compose**
- **Make** (geralmente já vem no Linux/Mac)

### Instalação
1. Clone o repositório.
2. Configure o arquivo `.env`:
   ```bash
   cp .env.example .env
   ```
3. Inicialize o ambiente (isso fará build, download de dependências e migrações):
   ```bash
   make install
   ```

O site estará disponível em: `http://localhost:8000`

---

## 🛠️ Comandos do Makefile

O projeto utiliza um `Makefile` para simplificar os comandos Docker:

| Comando | Descrição |
| :--- | :--- |
| `make up` | Sobe os containers (App, DB, Nginx) |
| `make down` | Para e remove os containers |
| `make stop` | Apenas para os containers |
| `make npm-dev` | Inicia o **Hot Reload** do React/Vite |
| `make npm-build` | Gera o build de produção do frontend |
| `make shell` | Abre o terminal dentro do container PHP |
| `make migrate` | Executa as migrações do banco de dados |
| `make fix-permissions` | Corrige erros de permissão (`storage/cache`) |

---

## 💻 Fluxo de Desenvolvimento

Para trabalhar no frontend (React):
1. Em um terminal, deixe o ambiente rodando: `make up`
2. Em outro terminal, inicie o servidor de desenvolvimento: `make npm-dev`
3. Acesse `http://localhost:8000`. Qualquer alteração nos arquivos em `resources/js/` será refletida instantaneamente.

---

## 📂 Documentação Detalhada

Para mais detalhes técnicos, consulte a pasta `/docs`:
- [Infraestrutura Docker](./docs/infrastructure.md)
- [Guia de Primeiros Passos](./docs/getting-started.md)

## 🐳 Infraestrutura

- **PHP**: 8.4-FPM (Alpine)
- **Banco de Dados**: PostgreSQL 16
- **Servidor Web**: Nginx
- **Frontend**: React + Vite + TailwindCSS 4
