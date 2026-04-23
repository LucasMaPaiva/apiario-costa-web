# Backend Core Rules

## Objetivo

Estas sao as regras centrais de qualidade para qualquer tarefa de backend.

## Principios Obrigatorios

- escrever codigo legivel, simples e expressivo;
- priorizar clareza sobre complexidade desnecessaria;
- aplicar separacao de responsabilidades;
- seguir TDD sempre que viavel;
- manter alto desacoplamento e alta coesao;
- otimizar para manutencao futura, nao para atalhos imediatos.

## Regras de Qualidade

- comentarios apenas quando explicarem o por que, nao o que;
- nomes devem ser explicitos e previsiveis;
- evitar metodos longos e com muitos ramos;
- preferir guard clauses;
- evitar `else` quando um retorno antecipado resolver;
- manter um nivel de indentacao por metodo sempre que possivel.

## SOLID Aplicado

- cada classe deve ter uma razao clara para mudar;
- estender comportamento sem reescrever fluxos existentes sem necessidade;
- depender de contratos e abstracoes quando a arquitetura exigir;
- nao acoplar regra de negocio a HTTP ou ORM.

## Seguranca e Configuracao

- nunca expor detalhes internos de excecao ao cliente;
- sempre registrar erros internos em log;
- nunca colocar segredo no codigo;
- usar `.env` e `config()` para configuracoes sensiveis.
