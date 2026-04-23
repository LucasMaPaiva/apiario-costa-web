# Backend Controllers Guide

## Objetivo

Controller e a camada de entrada HTTP. Ele deve ser fino, previsivel e orientado a fluxo.

## Responsabilidades

- receber a requisicao;
- usar `FormRequest` para validacao e autorizacao quando aplicavel;
- delegar a execucao ao `Service`;
- transformar a saida com `Resource` ou padrao consistente;
- retornar status HTTP correto.

## Fluxo Obrigatorio

1. receber request validada;
2. chamar um metodo publico de `Service`;
3. encapsular a resposta com `Resource` quando fizer sentido;
4. retornar resposta padronizada.

## O Que o Controller Nao Pode Fazer

- conter regra de negocio;
- acessar `Model` diretamente;
- montar query com query builder;
- persistir dado diretamente;
- formatar manualmente estruturas complexas de resposta quando houver `Resource`;
- centralizar fluxo transacional.

## Leitura Recomendada Antes de Alterar um Controller

1. rota relacionada;
2. `FormRequest` relacionado;
3. `Service` chamado;
4. `Resource` usado na resposta;
5. trait base de resposta, se existir.

## Checklist de Controller

- usa `FormRequest` quando necessario?
- delega para `Service`?
- evita acesso direto a `Model`?
- usa status code correto?
- resposta segue padrao da API?

## Exemplo Mental

Controller correto:

- valida;
- chama service;
- retorna resource.

Controller incorreto:

- valida;
- consulta model;
- aplica regra;
- salva no banco;
- monta array de resposta manualmente.
