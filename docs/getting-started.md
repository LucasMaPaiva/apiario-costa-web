# Primeiros Passos

Este guia ajuda você a configurar o ambiente de desenvolvimento local.

## Pré-requisitos

- Docker instalado.
- Make instalado.

## Configuração Inicial

1. Clone o repositório.
2. Certifique-se de ter um arquivo `.env` configurado. Se não tiver, copie o exemplo:
   ```bash
   cp .env.example .env
   ```
3. Inicialize o projeto:
   ```bash
   make install
   ```
   *Este comando irá carregar as imagens, subir os containers, instalar dependências, gerar a chave do Laravel e rodar as migrações.*

## Uso Diário

Para iniciar o ambiente:
```bash
make up
```

Para rodar o front-end (React/Vite) em modo de desenvolvimento:
```bash
make npm-dev
```

Para rodar comandos artisan:
```bash
make shell
# Dentro do container:
php artisan make:controller MyController
```

## Banco de Dados

O banco utilizado é o **PostgreSQL**. As configurações de acesso estão no `.env` e são gerenciadas pelo container `db`.
A porta exposta para acesso externo (ex: DBeaver) é a **5432**.
