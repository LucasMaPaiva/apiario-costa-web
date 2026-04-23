# Backend Repositories Guide

## Objetivo

Repository e a camada tecnica de acesso a dados. Ele protege o restante da aplicacao da implementacao concreta de persistencia.

## Responsabilidades

- executar CRUD;
- encapsular consultas;
- aplicar filtros, ordenacao e paginacao;
- centralizar acesso ao ORM e query builder;
- expor metodos previsiveis para leitura e escrita.

## O Que o Repository Nao Pode Fazer

- conter regra de negocio;
- decidir fluxo de aplicacao;
- conhecer controller;
- conhecer HTTP;
- abrir transacoes;
- disparar jobs, events ou notifications.

## Quando Usar Scope no Model

Use scope quando a logica de consulta:

- for reutilizavel;
- for claramente ligada a entidade;
- melhorar legibilidade do repository.

O repository continua sendo o orquestrador da consulta, mesmo usando scopes.

## Cache em Repository

O repository pode centralizar a geracao da chave de cache em metodo estatico.

Exemplo de responsabilidade correta:

- repository gera chave;
- service decide usar cache;
- callback resolve dependencia via container.

## Leitura Recomendada Antes de Alterar um Repository

1. service que usa o repository;
2. model relacionado;
3. migrations da tabela;
4. seeders que influenciam comportamento;
5. listagens e filtros ja existentes.

## Checklist de Repository

- este codigo e apenas persistencia ou consulta?
- ha regra de negocio vazando para o repository?
- filtros e ordenacao estao centralizados aqui?
- a paginação esta implementada aqui quando a tarefa for listagem?
- o model usado representa corretamente a estrutura atual do banco?

## Exemplo Mental

Repository correto:

- busca por filtros;
- pagina resultados;
- cria ou atualiza dados.

Repository incorreto:

- decide permissao;
- dispara job;
- define mensagem de resposta;
- combina fluxos de negocio complexos.
