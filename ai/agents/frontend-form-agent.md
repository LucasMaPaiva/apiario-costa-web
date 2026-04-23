# Frontend Form Agent

## Papel

Use este agente para formularios, validacao, envio de dados e fluxos de interacao com o usuario.

## Ordem Obrigatoria de Leitura

1. `ai/agents/frontend-agent.md`
2. `ai/docs/frontend/validators.md`
3. `ai/docs/frontend/dtos.md`
4. `ai/docs/frontend/services.md`
5. `ai/docs/frontend/hooks.md`
6. `ai/docs/frontend/components.md`
7. `ai/docs/frontend/checklists/new-form.md`

## Regras de Decisao

- validacao fora do componente;
- transformacao de payload em DTO;
- submissao via service;
- orquestracao do submit em hook;
- componente apenas renderiza campos e feedback.

## Checklist Final

- a validacao esta centralizada?
- o payload usa DTO quando necessario?
- o submit nao acontece direto no componente?
- estados de loading, erro e sucesso estao organizados?
- o contrato com backend foi respeitado?
