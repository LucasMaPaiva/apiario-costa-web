# Infraestrutura Docker

Este documento detalha a arquitetura Docker personalizada criada para este projeto monolítico (Laravel + React).

## Estrutura de Arquivos

- **`.docker/`**: Centraliza as configurações dos serviços.
  - `php-fpm/Dockerfile`: Baseado em PHP 8.4-FPM Alpine. Inclui extensões `pdo_pgsql`, `bcmath`, `gd`, `intl`, `opcache`, `zip` e o binário do `nodejs/npm` para suporte ao Vite.
  - `nginx/Dockerfile` & `default.conf`: Configuração do servidor web apontando para o container `app`.
  - `pgsql/Dockerfile`: Imagem base PostgreSQL 16 Alpine.
- **`docker-compose.yml`**: Define os serviços e redes.
- **`Makefile`**: Atalhos para facilitar a gestão do ambiente.

## Docker Compose & Perfis (Profiles)

O arquivo `docker-compose.yml` utiliza a funcionalidade de **Profiles** para distinguir o que sobe em cada ambiente.

- **Profile `local`**: Sobe `app`, `web` (nginx) e `db` (postgresql).
- **Profile `prod`**: Sobe `app` e `web`, configurados para se conectarem à rede externa `nginx-proxy-manager`. O banco de dados geralmente é externo em produção, por isso não está no perfil `prod` por padrão.

### Redes

- `apiario-network`: Rede interna (bridge) para comunicação entre os serviços no Docker.
- `nginx-proxy-manager`: Rede externa necessária para o proxy reverso em produção. No ambiente local, o `Makefile` cria essa rede automaticamente se ela não existir para evitar erros.

## Makefile

Comandos disponíveis:

| Comando | Descrição |
| :--- | :--- |
| `make install` | Executa build, sobe containers e inicializa o projeto (composer, npm, migrations). |
| `make build` | Apenas reconstrói as imagens Docker. |
| `make up` | Sobe os containers e aplica correções de permissão. |
| `make down` | Para e remove os containers. |
| `make shell` | Abre o terminal dentro do container PHP (`app`). |
| `make fix-permissions` | Ajusta permissões das pastas `storage` e `bootstrap/cache`. |
| `make npm-dev` | Inicia o servidor Vite (React) com Hot Reload. |

## Solução de Problemas Comuns

### 1. Erro `tempnam()` ou 500
Causado por falta de permissão de escrita. Resolvido automaticamente pelo `make up` ou `make fix-permissions`, que aplica `chmod -R 777` nas pastas necessárias.

### 2. Rede `nginx-proxy-manager` ausente
O Docker exige que redes externas existam antes do `up`. O `Makefile` automatiza isso com:
`docker network inspect nginx-proxy-manager || docker network create nginx-proxy-manager`

### 3. Falta de espaço em disco
Se o build falhar com `No space left on device`, execute:
`docker system prune -a --volumes`
