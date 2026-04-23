# Gemini Guide

## Objetivo

Este arquivo e o ponto de entrada geral para tarefas neste projeto quando a solicitacao puder envolver backend, frontend ou os dois ao mesmo tempo.

Use este arquivo primeiro para decidir:

- qual area da aplicacao sera afetada;
- qual agent consultar;
- em que ordem pesquisar;
- como dividir a tarefa entre frontend e backend sem misturar responsabilidades.

## Regra Geral

Se a tarefa for:

- apenas backend: siga `ai/agents/backend-agent.md`
- apenas frontend: siga `ai/agents/frontend-agent.md`
- full stack: leia este arquivo e depois consulte os dois agents

## Ordem de Leitura Para Tarefas Full Stack

Quando a tarefa envolver frontend e backend, siga nesta ordem:

1. `gemini.md`
2. `ai/index.md`
3. `ai/agents/backend-agent.md`
4. `ai/agents/frontend-agent.md`

Depois disso, aprofunde conforme o tipo de mudanca.

## Como Decidir Se a Tarefa e Backend, Frontend ou Ambos

### Backend

A tarefa e de backend quando envolver:

- rotas de API;
- controllers;
- services;
- repositories;
- models;
- migrations;
- seeders;
- autenticacao no Laravel;
- regras de negocio;
- persistencia de dados.

### Frontend

A tarefa e de frontend quando envolver:

- pages;
- layouts;
- components;
- hooks;
- services de consumo de API;
- routes do frontend;
- DTOs;
- models do frontend;
- validators;
- UX, UI e fluxo de navegacao.

### Full Stack

A tarefa e full stack quando envolver ao mesmo tempo:

- novo fluxo de tela com nova integracao de API;
- formulario que exige backend e frontend;
- listagem que depende de novo endpoint;
- autenticacao com impacto em tela e servidor;
- checkout, carrinho, pedidos ou qualquer fluxo que mude contrato de API e interface.

## Regra de Separacao

Nunca misture responsabilidades entre as camadas.

- frontend organiza experiencia;
- backend controla regra.

Em tarefas full stack:

- backend define validacao, regra, persistencia e contrato;
- frontend consome o contrato, organiza UX e renderiza a experiencia.

## Onde Ir Em Tarefas Full Stack

### Se a tarefa comecar por um endpoint ou regra

Leia primeiro:

1. `ai/agents/backend-agent.md`
2. `ai/agents/backend-crud-agent.md`, se houver endpoint novo ou alterado
3. `ai/docs/backend/index.md`

Depois leia o frontend:

1. `ai/agents/frontend-agent.md`
2. `ai/agents/frontend-feature-agent.md`
3. `ai/docs/frontend/index.md`

### Se a tarefa comecar por uma tela, formulario ou fluxo visual

Leia primeiro:

1. `ai/agents/frontend-agent.md`
2. `ai/agents/frontend-feature-agent.md` ou `ai/agents/frontend-form-agent.md`
3. `ai/docs/frontend/index.md`

Depois confirme o backend:

1. `ai/agents/backend-agent.md`
2. `ai/agents/backend-crud-agent.md`, se houver mudanca de contrato ou endpoint
3. `ai/docs/backend/index.md`

### Se a tarefa envolver banco de dados

Leia obrigatoriamente:

1. `ai/agents/backend-db-agent.md`
2. `ai/docs/backend/database.md`
3. `database/migrations`
4. `database/seeders`

Depois avalie o impacto no frontend:

- services;
- models;
- hooks;
- components ou pages que consomem o dado.

## Fluxo de Trabalho Recomendado

Em tarefas que envolvem os dois lados, siga esta sequencia:

1. entender o fluxo completo do usuario;
2. localizar o contrato entre frontend e backend;
3. ajustar primeiro o backend quando o contrato precisar mudar;
4. ajustar o frontend para consumir o contrato final;
5. validar que nomes, estados e respostas continuam coerentes;
6. revisar separacao de responsabilidades.

## Checklists de Apoio

### Backend

- `ai/docs/backend/checklists/new-endpoint.md`
- `ai/docs/backend/checklists/new-entity.md`
- `ai/docs/backend/checklists/code-review.md`

### Frontend

- `ai/docs/frontend/checklists/new-feature.md`
- `ai/docs/frontend/checklists/new-form.md`
- `ai/docs/frontend/checklists/code-review.md`

## Agents Especializados

### Backend

- geral: `ai/agents/backend-agent.md`
- banco: `ai/agents/backend-db-agent.md`
- endpoint/CRUD: `ai/agents/backend-crud-agent.md`
- review: `ai/agents/backend-review-agent.md`

### Frontend

- geral: `ai/agents/frontend-agent.md`
- feature: `ai/agents/frontend-feature-agent.md`
- formulario: `ai/agents/frontend-form-agent.md`
- review: `ai/agents/frontend-review-agent.md`

## Prompts Recomendados

### Full stack geral

```txt
Siga gemini.md para esta tarefa full stack.
```

### Full stack com foco em endpoint e tela

```txt
Siga gemini.md. A tarefa envolve backend e frontend, com mudanca de endpoint e tela.
```

### Full stack com foco em formulario

```txt
Siga gemini.md. A tarefa envolve backend e frontend, com formulario, validacao e integracao.
```

### Full stack com foco em banco

```txt
Siga gemini.md. A tarefa envolve banco, backend e impacto no frontend.
```

## Norte Rapido

Se a tarefa tocar os dois lados, comece por aqui:

1. `gemini.md`
2. `ai/agents/backend-agent.md`
3. `ai/agents/frontend-agent.md`

Se houver mudanca de contrato, banco ou regra, priorize backend primeiro.

Se houver apenas ajuste de experiencia consumindo contrato existente, priorize frontend primeiro.
