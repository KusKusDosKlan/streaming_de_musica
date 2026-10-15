# Decisões da fundação — proposta preenchida

**Issue principal:** I01. **Critério específico:** I07, caixa 4, sobre validade restante de access tokens.

As decisões abaixo já têm uma proposta concreta. Java, PHP e mobile devem revisar os nomes e efeitos antes de implementar. **Situação: proposta; revisão entre squads concluida.**

| Assunto | Proposta | Motivo / impacto |
| --- | --- | --- |
| Prefixo REST | `/api/v1` | Todos os clientes usam a mesma base |
| Papéis | USER e ADMIN | Cadastro público cria somente USER |
| E-mail não verificado | Login retorna 403 `EMAIL_NOT_VERIFIED`, sem tokens | Confirmação é parte do fluxo da fundação |
| Access token | JWT assinado, validade de 10 min; `expiresIn: 900` | Limita a validade restante após logout/reset |
| Refresh token | Valor aleatório opaco, 24 horas, hash armazenado no banco | Pode ser revogado e não precisa carregar informações no token |
| Renovação | Cada refresh válido é consumido/revogado e substituído; operação atômica | O mesmo refresh antigo não pode gerar dois novos acessos |
| Logout REST | `POST /auth/logout` com refresh no corpo; revoga o refresh e apaga tokens do cliente | Sem exigir access válido, pois ele pode ter expirado |
| Reutilização de refresh | 401, sem emissão de novos tokens | Detecção de uso duplicado; revogação de toda uma família de tokens é melhoria futura, não requisito oculto |
| Access já emitido após logout | Permanece tecnicamente válido até expirar, no máximo 15 min | Sem implementar lista de bloqueio por token nesta versão escolar |
| Reset de senha | Revogar todos os refresh tokens do usuário; sessões web antigas invalidadas na implementação web | Access já emitido segue a validade restante; registrar esse limite na demonstração |
| Token de confirmação | Aleatório, uso único, validade de 24 h | Confirmar conta sem usar senha no link |
| Token de recuperação | Aleatório, uso único, validade de 30 min | Nova solicitação invalida tokens anteriores não usados do mesmo fluxo |
| Armazenamento de tokens de conta | Preferir hash do token no banco; enviar somente o valor original no link | Requer ajuste de modelo/migration e nunca exibir token em resposta de catálogo |
| Senha | BCrypt, 8–64 caracteres e até 72 bytes UTF-8 | Definir validação consistente; nunca armazenar senha original |
| E-mail | Trim; normalização em minúsculas para as contas deste projeto; máximo 160 caracteres | Evitar duplicação por maiúsculas/espaços; índice único continua obrigatório |
| Paginação | Página inicial 0; tamanho padrão 20, permitido 1–50; ordem padrão id asc | Evita lista ilimitada e páginas com ordem instável |
| Datas | Instantes em UTC/ISO 8601; data de lançamento é `YYYY-MM-DD` | `2026-10-13T12:00:00Z` é instante; `2026-10-13` é data civil |
| Exclusão de artista/álbum | 409 se existirem dependências | Não apagar faixas/albuns sem decisão explícita |
| PHP → Java | Login do administrador usando a mesma API; token guardado na sessão PHP no servidor | A API identifica o ADMIN real; sem segredo único compartilhado entre todos os admins |
| Registro de operação admin | Registrar id do administrador autenticado, ação, recurso/id, data e resultado | O servidor obtém identidade do token; não confiar em `adminId` enviado pelo cliente |
| Web Thymeleaf | Sessão própria, cookie HttpOnly, CSRF nos formulários; Secure quando houver HTTPS | Reusa serviços de conta/catálogo sem exigir JWT no navegador |
| Mobile | Access em memória; refresh em armazenamento seguro do sistema; nunca guardar senha | A biblioteca e integração do armazenamento ainda precisam ser escolhidas/testadas em I12 |
| CORS | Permitir apenas origens do navegador necessárias e configuradas | PHP servidor a servidor e app nativo não dependem de CORS para autorização |
| Tentativas de login | Proposta simples: limitar tentativas inválidas consecutivas por conta/IP, com espera temporária | Recurso deve ser implementado/documentado em I09; não alegar proteção se só há texto |
| Erros | JSON com `error`, `message`, `fields` quando necessário | Clientes tratam o código estável; mensagem pode variar |

## Matriz de acesso

| Operação | Anônimo | USER | ADMIN |
| --- | --- | --- | --- |
| Health | Permitido | Permitido | Permitido |
| Cadastro / confirmação / login / recuperação | Permitido conforme validação | Permitido conforme validação | Permitido conforme validação |
| Refresh / logout | Exige refresh válido, não papel | Exige refresh válido | Exige refresh válido |
| Catálogo REST | 401 | Permitido | Permitido |
| `/api/v1/admin/**` | 401 | 403 | Permitido |
| Catálogo web | Redireciona para login | Permitido com sessão web | Permitido com sessão web |

As respostas 401/403 acima dependem da configuração final. A política temporária da `main` não corresponde ainda a essa matriz.

## Registro da revisão

| Área | Responsável pela revisão | Resultado |
| --- | --- | --- |
| Java | Nicolas| Concluido |
| PHP | Ronaldo | Concluido |
| Mobile | Pedro | Concluido |

Registrar a aprovação com comentário na I01 e link do PR. A existência desta tabela não é aprovação. Se alterarem qualquer decisão, atualizem os exemplos da API e os casos de teste no mesmo PR.
