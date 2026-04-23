# Backend Docs Index

## Objetivo

Este diretorio e a base de referencia do backend. O agent principal consulta este indice para decidir onde pesquisar conforme o tipo de tarefa.

## Como Usar

Se a tarefa for:

- arquitetura ou camada correta: leia `ai/rules/backend-architecture.md`
- contrato de API: leia `ai/rules/backend-api.md`
- qualidade de codigo: leia `ai/rules/backend-core.md`
- banco de dados: leia `ai/docs/backend/database.md`
- controller: leia `ai/docs/backend/controllers.md`
- service: leia `ai/docs/backend/services.md`
- repository: leia `ai/docs/backend/repositories.md`
- request: leia `ai/docs/backend/requests.md`
- resource: leia `ai/docs/backend/resources.md`
- rotas: leia `ai/docs/backend/routing.md`
- nomenclatura: leia `ai/docs/backend/naming-conventions.md`
- testes e TDD: leia `ai/docs/backend/testing-tdd.md`

## Mapa Rapido de Pesquisa

### Endpoint novo ou alterado

Leia nesta ordem:

1. `routes/api.php`
2. `routes/api/` ou estrutura equivalente
3. `app/Http/Controllers`
4. `app/Http/Requests`
5. `app/Http/Resources`
6. `app/Services`
7. `app/Repositories`
8. `app/Models`

### Regra de negocio

Leia nesta ordem:

1. `app/Services`
2. `app/Repositories`
3. `app/Models`
4. `app/Jobs`, se houver processo assincrono

### Banco de dados

Leia nesta ordem:

1. `ai/docs/backend/database.md`
2. `database/migrations`
3. `database/seeders`
4. `app/Models`
5. `app/Repositories`

### Validacao

Leia nesta ordem:

1. `app/Http/Requests`
2. `app/Rules`
3. `app/Policies`, se houver autorizacao por regra

### Resposta da API

Leia nesta ordem:

1. `app/Http/Resources`
2. trait base de resposta, se existir
3. `ai/rules/backend-api.md`

## Convencoes Estruturais Esperadas

- `app/Http/Controllers`: fluxo HTTP
- `app/Http/Requests`: validacao e autorizacao basica
- `app/Http/Resources`: formato de saida
- `app/Services`: regra de negocio
- `app/Repositories`: persistencia
- `app/Models`: relacoes, casts e scopes
- `database/migrations`: estrutura do banco
- `database/seeders`: dados iniciais e dependencias de banco

## Proximo Documento de Referencia

Para tarefas envolvendo banco, consulte `ai/docs/backend/database.md`.

## Documentos Disponiveis

- `ai/docs/backend/controllers.md`
- `ai/docs/backend/services.md`
- `ai/docs/backend/repositories.md`
- `ai/docs/backend/requests.md`
- `ai/docs/backend/resources.md`
- `ai/docs/backend/routing.md`
- `ai/docs/backend/naming-conventions.md`
- `ai/docs/backend/database.md`
- `ai/docs/backend/testing-tdd.md`

## Checklists Disponiveis

- `ai/docs/backend/checklists/new-endpoint.md`
- `ai/docs/backend/checklists/new-entity.md`
- `ai/docs/backend/checklists/code-review.md`

## Agentes Especializados

- `ai/agents/backend-db-agent.md`
- `ai/agents/backend-crud-agent.md`
- `ai/agents/backend-review-agent.md`
