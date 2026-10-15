# Documentação da API

Este índice reúne as referências utilizadas por Java, PHP e mobile para integrar os módulos do projeto.

O nome do arquivo foi mantido por continuidade. Seu conteúdo trata da comunicação técnica da API, sem exigência de contrato comercial ou ferramenta de testes de contrato.

## Referências principais

| Documento | Conteúdo |
| --- | --- |
| [Comunicação da API v0.1.0](COMUNICACAO_API_v0.1.0.md) | Métodos, rotas, autenticação, parâmetros, DTOs, requests, responses e erros |
| [Decisões da equipe](DECISOES_DA_EQUIPE.md) | Políticas de conta, tokens, permissões e integração |
| [Escopo do projeto](../ESCOPO_DO_PROJETO.md) | Limites da fundação e recursos das próximas etapas |
| [Fluxo da equipe](../FLUXO-DE-EQUIPE.md) | Revisão, integração e acompanhamento das tarefas |

## Base de comunicação

O prefixo REST planejado é `/api/v1`.

A API Java centraliza as regras de negócio e o acesso ao banco. PHP e mobile consomem os endpoints; o cliente web Thymeleaf também pode reutilizar os serviços Java dentro da aplicação.

Requests e responses devem seguir os campos, tipos, códigos HTTP e permissões definidos na documentação.

## Estado da documentação

A referência inicial foi adicionada pela Issue #6.

Os documentos descrevem o comportamento esperado. Sua existência não comprova que os endpoints foram implementados ou testados.

Decisões identificadas como propostas ou pendentes precisam ter seu aceite registrado pelos representantes das áreas.

## Como manter

Ao alterar uma rota, campo, regra ou resposta:

1. Atualizar o documento de comunicação.
2. Atualizar as decisões afetadas.
3. Informar os consumidores no PR.
4. Ajustar os testes pertinentes.
5. Registrar incompatibilidades e a ordem necessária de integração.

Evitar duplicar exemplos completos em vários arquivos. Este índice aponta para a referência principal, reduzindo divergências.

## Escopo da fundação

A v0.1.0 contempla contas, autenticação, autorização, metadados do catálogo e administração inicial.

Reprodução de áudio, uploads, playlists, downloads, offline e publicação em servidor pertencem às etapas seguintes.
