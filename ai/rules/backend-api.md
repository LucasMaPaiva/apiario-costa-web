# Backend API Rules

## Versionamento

- toda API deve ser versionada por URL;
- padrao esperado: `/api/v1/...`.

## Formato de Resposta

Sucesso:

- deve conter `data`;
- deve conter `message` quando fizer sentido;
- deve conter `success: true`.

Erro de cliente:

- deve conter `message`;
- deve conter `errors` quando houver falha de validacao;
- deve conter `success: false`.

Erro de servidor:

- deve conter mensagem generica;
- deve conter `success: false`;
- nunca deve expor stack trace ou detalhe tecnico.

## Status Codes

- `200 OK` para leitura ou atualizacao com retorno;
- `201 Created` para criacao;
- `204 No Content` para sucesso sem corpo;
- `400 Bad Request` para requisicao malformada;
- `401 Unauthorized` para falha de autenticacao;
- `403 Forbidden` para falta de permissao;
- `404 Not Found` para recurso ausente;
- `409 Conflict` para conflito de estado;
- `422 Unprocessable Entity` para validacao;
- `500 Internal Server Error` para erro inesperado.

- sempre usar constantes de `Illuminate\Http\Response`.

## Listagens

- endpoints de lista devem ser paginados quando aplicavel;
- filtros devem usar query params simples;
- ordenacao deve usar `sort`;
- ordenacao descendente deve usar prefixo `-`.

## Estrutura de Listagem

- `data` deve conter os itens;
- `meta` deve conter pagina atual, ultima pagina, total e `per_page`;
- `links` deve ficar fora de `data`.
