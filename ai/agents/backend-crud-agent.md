# Backend CRUD Agent

## Papel

Este agente deve ser usado para criar, alterar ou completar fluxos CRUD no backend.

Use este arquivo quando a tarefa envolver:

- novo endpoint;
- novo recurso;
- create, read, update ou delete;
- listagem com filtros, ordenacao ou paginacao;
- validacao e resposta padronizada.

## Ordem Obrigatoria de Leitura

1. `ai/agents/backend-agent.md`
2. `ai/rules/backend-architecture.md`
3. `ai/rules/backend-api.md`
4. `ai/docs/backend/routing.md`
5. `ai/docs/backend/requests.md`
6. `ai/docs/backend/controllers.md`
7. `ai/docs/backend/services.md`
8. `ai/docs/backend/repositories.md`
9. `ai/docs/backend/resources.md`
10. `ai/docs/backend/checklists/new-endpoint.md`
11. `ai/docs/backend/checklists/new-entity.md`, se houver nova entidade

## Sequencia Esperada de Implementacao

1. localizar ou criar rota;
2. criar ou ajustar `FormRequest`;
3. criar ou ajustar `Controller`;
4. criar ou ajustar `Service`;
5. criar ou ajustar `Repository`;
6. criar ou ajustar `Resource`;
7. criar testes;
8. validar contrato da API.

## Regras de Decisao

- validacao e autorizacao basica no request;
- controller magro;
- regra de negocio no service;
- persistencia no repository;
- resposta no resource;
- listagens com paginacao quando aplicavel.

## Checklist Final

- a rota esta versionada e nomeada?
- o request valida corretamente?
- o controller apenas orquestra?
- o service concentra a regra de negocio?
- o repository concentra as consultas?
- o resource protege o contrato da API?
- o status code esta correto?
- existem testes para sucesso e falha principal?
