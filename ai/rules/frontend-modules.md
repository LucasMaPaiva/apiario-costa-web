# Frontend Modules Rules

## Estrutura Modular

O frontend deve ser orientado a dominio e organizado por feature.

Padrao esperado:

- `modules/home`
- `modules/products`
- `modules/cart`
- `modules/checkout`
- `modules/orders`
- `modules/auth`

## Regra por Modulo

Cada modulo deve concentrar sua propria logica, organizando quando necessario:

- `components`
- `dtos`
- `hooks`
- `models`
- `routes`
- `services`
- `validators`

## Regras de Organizacao

- separar por dominio, nao por tipo global de feature;
- pagina integra modulos;
- common guarda apenas o que e realmente compartilhado;
- nao espalhar logica de um dominio em outro sem necessidade.
