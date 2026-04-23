# Checklist Code Review

- a camada alterada esta correta?
- existe logica de negocio em controller?
- existe acesso direto a model fora do repository?
- existe regra de negocio vazando para repository?
- o request cobre validacao e autorizacao basica?
- o resource protege o contrato da API?
- o status code esta correto?
- a resposta segue o padrao do projeto?
- listagens estao paginadas quando aplicavel?
- filtros e ordenacao estao no repository?
- migration e seeder estao coerentes com a mudanca?
- existe risco de regressao nao coberto por teste?
