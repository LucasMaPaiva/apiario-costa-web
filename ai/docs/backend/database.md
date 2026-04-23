# Backend Database Guide

## Objetivo

Este documento orienta a leitura de estrutura de banco no projeto.

## Ordem de Pesquisa

Quando a tarefa envolver banco, leia nesta ordem:

1. `database/migrations`
2. `database/seeders`
3. `app/Models`
4. `app/Repositories`
5. `app/Services`

## O que Confirmar nas Migrations

- nome da tabela;
- colunas e tipos;
- `nullable`;
- `default`;
- `unique`;
- foreign keys;
- comportamento de delete e update;
- indices;
- timestamps.

## O que Confirmar nos Seeders

- dados base obrigatorios;
- dependencias de execucao entre tabelas;
- valores que o sistema assume como existentes;
- relacoes criadas durante o seeding.

## O que Confirmar no Model

- nome e representacao da entidade;
- `fillable` ou protecao equivalente;
- relacionamentos;
- casts;
- scopes que impactam consultas.

## O que Confirmar no Repository

- consultas existentes;
- filtros e ordenacao implementados;
- paginacao;
- pontos centralizados de persistencia;
- chaves de cache, quando existirem.

## Regra de Implementacao

- toda mudanca estrutural deve nascer em migration;
- toda leitura de comportamento de dados deve considerar migration e seeder, nao apenas model;
- regra de negocio que dependa de banco deve ficar no `Service`, nao no `Repository`.
