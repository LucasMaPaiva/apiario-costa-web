# Backend Resources Guide

## Objetivo

`Resource` e a camada de apresentacao da API. Ele transforma dados internos em um contrato de resposta previsivel e consistente.

## Responsabilidades

- formatar a saida do recurso;
- controlar os campos expostos ao cliente;
- garantir consistencia no contrato da API;
- separar apresentacao de persistencia e de regra de negocio.

## O Que o Resource Deve Fazer

- expor apenas os campos necessarios;
- renomear ou reorganizar dados quando o contrato da API exigir;
- usar acesso seguro a dados quando apropriado;
- manter a serializacao simples e previsivel.

## O Que o Resource Nao Deve Fazer

- conter regra de negocio;
- consultar banco;
- chamar service ou repository;
- decidir fluxo da aplicacao;
- compensar problemas de arquitetura das camadas anteriores.

## Quando Criar um Resource

Crie `Resource` quando:

- o endpoint expoe entidade ou colecao ao cliente;
- o contrato precisa ser estavel;
- voce quer evitar retornar o model cru;
- existem campos internos que nao devem ser expostos.

## Leitura Recomendada Antes de Alterar um Resource

1. controller que usa o resource;
2. service que retorna o dado;
3. model ou estrutura de origem;
4. padrao de resposta da API em `ai/rules/backend-api.md`.

## Checklist de Resource

- o resource expoe apenas o necessario?
- o contrato esta consistente com outros endpoints?
- nao existe regra de negocio aqui?
- colecoes retornam estrutura compativel com `data`, `meta` e `links` quando paginadas?

## Norte Pratico

Se o controller estiver montando arrays grandes de resposta, provavelmente falta um `Resource`.
