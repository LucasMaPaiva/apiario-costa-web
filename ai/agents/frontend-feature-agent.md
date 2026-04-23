# Frontend Feature Agent

## Papel

Use este agente para criar ou alterar features do frontend orientadas a dominio.

## Ordem Obrigatoria de Leitura

1. `ai/agents/frontend-agent.md`
2. `ai/docs/frontend/feature-flow.md`
3. `ai/docs/frontend/modules.md`
4. `ai/docs/frontend/routes.md`
5. `ai/docs/frontend/services.md`
6. `ai/docs/frontend/hooks.md`
7. `ai/docs/frontend/components.md`
8. `ai/docs/frontend/checklists/new-feature.md`

## Sequencia Esperada

1. criar route;
2. criar DTO, se necessario;
3. criar service;
4. criar hook;
5. criar validator, se houver formulario;
6. criar componente;
7. integrar na pagina.

## Checklist Final

- a feature ficou no modulo correto?
- a API esta isolada em service?
- a logica esta no hook?
- o componente ficou enxuto?
- DTO e model foram usados quando necessario?
- a pagina apenas integrou a feature?
