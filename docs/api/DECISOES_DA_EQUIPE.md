# Decisões da fundação — v0.1.0

**Issue principal:** #6 — Documentar comunicação da API e decisões da fundação.

**Situação:** decisões documentadas e revisão das áreas registrada. A implementação e a validação dos comportamentos serão realizadas nas respectivas Issues.

Este documento registra as regras compartilhadas pelo backend Java, painel PHP, cliente web e aplicativo mobile. Os exemplos de requests, responses e erros estão em [Comunicação da API](COMUNICACAO_API_v0.1.0.md).

## Decisões compartilhadas

| Assunto | Decisão | Motivo / impacto |
| --- | --- | --- |
| Prefixo REST | `/api/v1` | Todos os clientes utilizam a mesma base da API. |
| Papéis | `USER` e `ADMIN` | O cadastro público cria somente usuários `USER`. |
| E-mail não verificado | Login retorna `403 EMAIL_NOT_VERIFIED`, sem emitir tokens. | A confirmação de e-mail faz parte do fluxo de cadastro. |
| Access token | JWT assinado, com validade de 10 minutos. A resposta informa `expiresIn: 600`. | `expiresIn` representa a validade do access token em segundos. |
| Refresh token | Valor aleatório opaco, com validade de 24 horas a partir da emissão de cada token. Somente seu hash é armazenado no banco. | Permite renovar o acesso e revogar a autorização de renovação. |
| Renovação | Cada refresh válido é consumido e substituído por outro em uma operação atômica. O novo access token vale 10 minutos e o novo refresh vale 24 horas. | O mesmo refresh antigo não pode gerar duas renovações válidas. |
| Reutilização de refresh | Retorna `401 INVALID_REFRESH_TOKEN`, sem emitir novos tokens. | Tokens expirados, revogados, inexistentes ou já utilizados não podem renovar o acesso. A revogação de toda uma família de tokens fica como melhoria futura. |
| Logout REST | `POST /api/v1/auth/logout`, com refresh token no corpo. A API revoga esse refresh; o cliente remove os tokens locais. | Não exige access token válido, pois ele pode ter expirado. |
| Refresh inválido no logout | Retorna `401 INVALID_REFRESH_TOKEN`. O cliente remove seus tokens locais mesmo nessa situação. | O encerramento local não depende de uma renovação ainda válida no servidor. |
| Access já emitido após logout | Pode continuar tecnicamente válido até sua expiração original: no máximo 10 minutos contados da emissão. | O logout não reinicia esse prazo. Não haverá lista de bloqueio por access token nesta versão. |
| Redefinição de senha | Consome o token de recuperação, altera a senha e revoga todos os refresh tokens do usuário. As sessões web anteriores também devem ser invalidadas. | Access tokens já emitidos podem permanecer válidos pelo tempo restante, limitado à validade original de 10 minutos. |
| Token de confirmação de e-mail | Aleatório, de uso único e válido por 24 horas. | Permite confirmar a conta sem colocar a senha no link. |
| Token de recuperação de senha | Aleatório, de uso único e válido por 30 minutos. Uma nova solicitação invalida os tokens anteriores não utilizados desse fluxo. | Reduz o período de utilização de um link de recuperação. |
| Armazenamento de tokens de conta | Armazenar o hash dos tokens de confirmação e recuperação; enviar o valor original somente no link correspondente. | Tokens não devem aparecer em logs, respostas de catálogo ou DTOs de usuário. |
| Senha | Hash com BCrypt. Aceitar de 8 a 64 caracteres, respeitando o limite de 72 bytes em UTF-8. | A validação deve ser consistente. A senha original nunca é armazenada. |
| E-mail | Remover espaços nas extremidades e normalizar em minúsculas para as contas deste projeto. Limite de 160 caracteres e índice único no banco. | Evita contas duplicadas por diferenças de maiúsculas ou espaços. |
| Paginação | Página inicial `0`, tamanho padrão `20`, intervalo permitido de `1` a `50` e ordenação padrão por `id` crescente. | Evita listagens ilimitadas e mantém uma ordem previsível. |
| Datas | Instantes em UTC/ISO 8601. Datas de lançamento usam `YYYY-MM-DD`. | Um instante, como `2026-10-13T12:00:00Z`, tem finalidade diferente de uma data civil, como `2026-10-13`. |
| Exclusão de artista ou álbum | Retornar `409` quando existirem dependências que impeçam a remoção. | Não excluir faixas ou outros registros relacionados automaticamente sem uma decisão explícita. |
| PHP → Java | O administrador autentica pela API. Os tokens ficam na sessão PHP, no servidor. | A API identifica o administrador real. O painel PHP não acessa o MySQL diretamente. |
| Registro de operação administrativa | Registrar o identificador do administrador autenticado, ação, recurso, identificador do recurso, data e resultado. | A identidade vem da autenticação; não confiar em um `adminId` enviado pelo cliente. |
| Cliente web Thymeleaf | Utilizar sessão web própria, cookie `HttpOnly`, proteção CSRF nos formulários e atributo `Secure` quando houver HTTPS. | Reutiliza os serviços de conta e catálogo sem exigir JWT no navegador. |
| Mobile | Access token em memória; refresh token em armazenamento seguro do sistema. Não armazenar a senha. | A biblioteca de armazenamento deve ser escolhida e validada na implementação mobile. |
| CORS | Permitir somente as origens de navegador necessárias e configuradas. | CORS não substitui autenticação e autorização. Requisições PHP servidor a servidor e aplicativos nativos não dependem dessa política para obter permissão. |
| Tentativas de login | Implementar e documentar uma limitação simples de tentativas inválidas por conta/IP, com espera temporária, na Issue de segurança. | A proteção só deve ser considerada disponível depois de implementada e testada. |
| Erros da API | JSON com `error`, `message` e `fields` quando necessário. | Os clientes tratam o código estável de erro; a mensagem pode variar. |

## Como interpretar os prazos dos tokens

- **Access token:** autoriza chamadas às rotas privadas durante 10 minutos.
- **Refresh token:** permite solicitar novos tokens durante sua validade de 24 horas.
- **Renovação:** substitui o refresh utilizado e emite um novo access token.
- **Logout:** revoga o refresh informado e remove os tokens do cliente.
- **Access após logout:** não ganha mais 10 minutos; conserva apenas o tempo que restava desde sua emissão.
- **Redefinição de senha:** revoga todos os refresh tokens do usuário e deve invalidar suas sessões web anteriores.

Esses prazos pertencem à autenticação. Não representam uma licença temporal para reproduzir músicas baixadas.

## Matriz de acesso

| Operação | Anônimo | USER | ADMIN |
| --- | --- | --- | --- |
| Health | Permitido | Permitido | Permitido |
| Cadastro, confirmação, login e recuperação | Permitido conforme a validação do fluxo | Permitido conforme a validação do fluxo | Permitido conforme a validação do fluxo |
| Refresh e logout REST | Exige refresh válido no corpo | Exige refresh válido no corpo | Exige refresh válido no corpo |
| Catálogo REST | `401` | Permitido | Permitido |
| `/api/v1/admin/**` | `401` | `403` | Permitido |
| Catálogo web | Redireciona para o login | Permitido com sessão web válida | Permitido com sessão web válida |

A matriz descreve o comportamento que deverá ser implementado. Sua presença na documentação não comprova que as permissões já estão funcionando.

## Registro da revisão

| Área | Responsável pela revisão | Resultado registrado |
| --- | --- | --- |
| Java | Nicolas | Concluído |
| PHP | Ronaldo | Concluído |
| Mobile | Pedro | Concluído |

Os comentários e PRs relacionados devem ser vinculados à Issue #6 para manter o histórico das decisões.

Quando uma decisão mudar, atualizar no mesmo PR:

- Este documento.
- Os exemplos e as regras da comunicação da API.
- As implementações e os testes afetados, quando já existirem.
- As instruções dos clientes que dependam do comportamento alterado.
