# Backend Services Guide

## Objetivo

Service e o centro da regra de negocio. Ele coordena o comportamento da aplicacao sem depender de HTTP e sem assumir persistencia direta.

## Responsabilidades

- receber dados primitivos ou DTOs;
- aplicar regra de negocio;
- coordenar um ou mais repositories;
- compor outros services quando necessario;
- abrir transacao quando houver multiplas escritas dependentes;
- disparar jobs, events ou notifications apos a conclusao da regra principal.

## O Que o Service Nao Pode Fazer

- depender de `Request`, `Response`, `Session` ou `Header`;
- acessar `Model` diretamente;
- montar query diretamente;
- formatar resposta JSON;
- assumir responsabilidade de camada HTTP.

## Quando Abrir Transacao

Use transacao quando:

- mais de uma escrita precisa ocorrer em conjunto;
- a consistencia depende de tudo ou nada;
- existe risco de estado parcial no banco.

## Leitura Recomendada Antes de Alterar um Service

1. controller que chama o service;
2. requests de entrada;
3. repositories usados;
4. models impactados;
5. jobs ou events disparados;
6. testes existentes do fluxo.

## Checklist de Service

- a regra de negocio esta centralizada aqui?
- o service recebe dados desacoplados de HTTP?
- a persistencia passa por repository?
- existe transacao quando o fluxo exige atomicidade?
- existe dispatch de job quando a tarefa nao deve travar a request?

## Exemplo Mental

Service correto:

- recebe dados validados;
- decide o fluxo;
- chama repository;
- dispara job se necessario;
- retorna resultado para o controller.

Service incorreto:

- recebe `Request`;
- usa `Model::query()`;
- monta JSON final da API.
