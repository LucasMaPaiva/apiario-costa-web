# Backend Requests Guide

## Objetivo

`FormRequest` e a camada padrao para validacao e autorizacao basica da entrada HTTP. Ele protege o restante da aplicacao de dados invalidos.

## Responsabilidades

- validar entrada da requisicao;
- centralizar regras de validacao;
- centralizar autorizacao simples quando fizer sentido;
- entregar dados limpos ao controller via `validated()`.

## O Que o Request Deve Fazer

- declarar `rules()` de forma clara e previsivel;
- declarar `authorize()` com regra objetiva;
- usar `Rules` customizadas quando a validacao ficar complexa;
- manter mensagens customizadas apenas quando houver necessidade real.

## O Que o Request Nao Deve Fazer

- conter regra de negocio;
- consultar diretamente o banco para orquestrar fluxo de aplicacao;
- disparar persistencia;
- formatar resposta da API;
- substituir a responsabilidade do `Service`.

## Quando Usar Rule Customizada

Use `app/Rules` quando:

- a validacao for reutilizavel;
- a regra ficar extensa demais para ficar inline;
- a legibilidade do request melhorar com extração.

## Leitura Recomendada Antes de Alterar um Request

1. rota relacionada;
2. controller que recebe o request;
3. service que usa os dados validados;
4. rules customizadas relacionadas, se existirem;
5. policy relacionada, se houver autorizacao mais ampla.

## Checklist de Request

- existe `FormRequest` para entradas relevantes?
- `authorize()` esta claro e correto?
- `rules()` cobre obrigatoriedade, tipos e limites?
- validacoes complexas foram extraidas para `Rules` quando necessario?
- o controller usa `validated()` ao inves de dados crus?

## Norte Pratico

Se a duvida for "isso e validacao ou regra de negocio?":

- validacao de formato e obrigatoriedade fica no `Request`;
- decisao de negocio fica no `Service`.
