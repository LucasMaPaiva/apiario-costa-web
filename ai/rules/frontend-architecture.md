# Frontend Architecture Rules

## Regra Central

`components exibem -> hooks orquestram -> services comunicam -> DTOs transformam -> models representam`

## Components

Devem:

- renderizar interface;
- receber dados e callbacks;
- manter foco em exibicao.

Nao devem:

- chamar API diretamente;
- conter regra de negocio;
- concentrar logica pesada da feature.

## Hooks

Devem:

- orquestrar logica da feature;
- lidar com estado, efeitos e integracao com services;
- encapsular queries, mutations e regras de interacao.

## Services

Devem:

- comunicar com o backend;
- usar `httpClient`;
- consumir rotas centralizadas;
- transformar leitura com models quando aplicavel.

Nao devem:

- manipular UI;
- usar estado React;
- conter regra visual.

## Routes

Devem:

- centralizar endpoints da API.

Nao devem:

- chamar API;
- conter logica.

## DTOs

- transformam dados antes de enviar ao backend.

## Models

- adaptam dados recebidos da API para uso no frontend.

## Validators

- centralizam validacao de formulario;
- ficam fora dos componentes.
