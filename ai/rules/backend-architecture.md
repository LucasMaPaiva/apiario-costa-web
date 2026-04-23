# Backend Architecture Rules

## Fluxo Obrigatorio

Toda requisicao backend deve respeitar este fluxo:

`Request HTTP -> Controller -> Service -> Repository -> Model`

## Controller

Deve:

- receber `FormRequest` quando houver entrada validavel;
- delegar a um metodo publico do `Service`;
- retornar resposta formatada com `Resource` ou padrao consistente;
- usar status HTTP correto.

Nao deve:

- conter logica de negocio;
- acessar `Model` ou query builder diretamente;
- persistir dados diretamente;
- concentrar autorizacao complexa.

## Service

Deve:

- receber dados primitivos ou DTOs;
- centralizar regra de negocio e orquestracao;
- chamar repositories;
- compor outros services quando necessario;
- abrir transacao quando houver multiplas escritas dependentes;
- disparar jobs, events ou notifications quando adequado.

Nao deve:

- conhecer HTTP;
- conhecer `Request`, `Response`, `Session` ou `Header`;
- acessar `Model` ou query builder diretamente;
- formatar resposta de API.

## Repository

Deve:

- concentrar CRUD e consultas;
- implementar filtros, ordenacao e paginacao;
- ser o unico ponto de acesso direto ao ORM ou query builder.

Nao deve:

- conter regra de negocio;
- conhecer `Service` ou `Controller`;
- abrir transacoes;
- disparar job, event ou notification.

## Model

Deve:

- representar tabela;
- declarar relacionamentos;
- declarar casts;
- encapsular scopes reutilizaveis.

Nao deve:

- orquestrar fluxos de negocio;
- conhecer `Service` ou `Controller`;
- chamar repository ou service.

## Jobs e Cache

- tarefas lentas, falhaveis ou nao imediatas devem ir para `Job`;
- cache deve ser orquestrado no `Service`;
- chave de cache deve ser centralizada no `Repository`;
- cache deve falhar com seguranca, sem derrubar o fluxo principal.
