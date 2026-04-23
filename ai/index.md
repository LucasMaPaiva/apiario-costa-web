# AI Index

## Objetivo

Este arquivo e o mapa principal da pasta `ai/`. Use este documento para decidir qual agent referenciar no prompt, conforme o tipo de tarefa.

## Regra Geral

Se a tarefa for de backend, o ponto de entrada principal e:

- `ai/agents/backend-agent.md`

Se a tarefa for de frontend, o ponto de entrada principal e:

- `ai/agents/frontend-agent.md`

## Qual Arquivo Referenciar no Prompt

### Backend

Uso geral:

- `ai/agents/backend-agent.md`

Casos especificos:

- banco de dados: `ai/agents/backend-db-agent.md`
- CRUD e endpoints: `ai/agents/backend-crud-agent.md`
- review: `ai/agents/backend-review-agent.md`

### Frontend

Uso geral:

- `ai/agents/frontend-agent.md`

Casos especificos:

- feature de interface: `ai/agents/frontend-feature-agent.md`
- formularios: `ai/agents/frontend-form-agent.md`
- review: `ai/agents/frontend-review-agent.md`

## Como Pensar a Hierarquia

- `agents/`: ponto de entrada e modo de trabalho
- `rules/`: regras curtas e obrigatorias
- `docs/`: referencia detalhada por camada

Fluxo esperado da IA:

1. ler o `agent` principal da area
2. abrir as `rules` referenciadas
3. consultar os `docs` necessarios para a tarefa
4. executar seguindo o checklist quando aplicavel

## Estrutura Disponivel

### Backend

- `ai/agents/backend-agent.md`
- `ai/agents/backend-db-agent.md`
- `ai/agents/backend-crud-agent.md`
- `ai/agents/backend-review-agent.md`
- `ai/docs/backend/index.md`

### Frontend

- `ai/agents/frontend-agent.md`
- `ai/agents/frontend-feature-agent.md`
- `ai/agents/frontend-form-agent.md`
- `ai/agents/frontend-review-agent.md`
- `ai/docs/frontend/index.md`

## Exemplos de Prompt

### Backend geral

```txt
Siga ai/agents/backend-agent.md para esta tarefa.
```

### Backend com foco em banco

```txt
Siga ai/agents/backend-db-agent.md para esta tarefa.
```

### Backend com foco em endpoint

```txt
Siga ai/agents/backend-crud-agent.md para criar ou ajustar este endpoint.
```

### Frontend geral

```txt
Siga ai/agents/frontend-agent.md para esta tarefa.
```

### Frontend com foco em feature

```txt
Siga ai/agents/frontend-feature-agent.md para esta tarefa.
```

### Frontend com foco em formulario

```txt
Siga ai/agents/frontend-form-agent.md para esta tarefa.
```

### Review de backend

```txt
Revise seguindo ai/agents/backend-review-agent.md.
```

### Review de frontend

```txt
Revise seguindo ai/agents/frontend-review-agent.md.
```

## Norte Rapido

Se estiver em duvida, use:

- backend: `ai/agents/backend-agent.md`
- frontend: `ai/agents/frontend-agent.md`
