# Comunicação da API — v0.1.0 escolar

**Issue:** I01, caixas 1 e 2; implementação nas Issues indicadas em cada endpoint. **Estado:** proposta para revisão; não comprova endpoints implementados. Exemplos integralmente fictícios.

## Como ler request e response

**Request** é o pedido enviado por mobile, PHP ou outra ferramenta: método, endereço, headers, parâmetros e corpo. **Response** é a resposta da API: status HTTP, headers e corpo. Documentar é registrar esses elementos e as regras de sucesso/falha em Markdown.

O prefixo local é `http://localhost:8080/api/v1`. Quando uma rota começa em `/auth`, complete com esse prefixo. `id` dentro de `{id}` é um parâmetro de caminho; `?page=0` é parâmetro de consulta. POST/PUT com JSON usam `Content-Type: application/json`; respostas JSON usam esse mesmo tipo. `Accept: application/json` solicita JSON.

Rotas privadas recebem `Authorization: Bearer TOKEN_FICTICIO`, sem aspas. Não documente valores reais. Requests GET de catálogo não têm corpo. Resposta 204 não possui JSON, nem mesmo `{}`.

## Padrões comuns

- IDs são números inteiros positivos.
- Texto obrigatório recebe trim e não pode ficar vazio. Nome de usuário: 2–120; e-mail: formato válido, até 160. Senha: conforme decisões da equipe.
- Datas de criação/expiração usam UTC: `2026-10-13T12:00:00Z`. Data de lançamento de álbum usa apenas `2026-10-13`.
- Listagens: `page` padrão 0, inteiro ≥ 0; `size` padrão 20, inteiro de 1 a 50. `sort` aceita `id,asc`, `id,desc`, `title,asc` ou `title,desc` em faixas/álbuns e `name,asc`/`name,desc` em artistas. Para títulos/nomes iguais, desempate por id na mesma direção.
- Página além do final retorna 200 com `items: []`. Parâmetro malformado ou tamanho fora do limite retorna 400.
- Não retornar `passwordHash`, `filePath`, segredo de assinatura ou tokens em catálogo/DTO de usuário. Tokens só aparecem na resposta específica de autenticação/renovação.
- A criação administrativa retorna 201 e header `Location` com a rota do recurso criado. A consulta/atualização retorna 200; remoção bem-sucedida retorna 204.

## Status e formato de erro

| Status | Uso |
| --- | --- |
| 200 | Consulta, login/refresh ou solicitação neutra de recuperação |
| 201 | Cadastro/criação de recurso |
| 204 | Confirmação, redefinição, logout ou remoção sem corpo |
| 400 | Entrada inválida, parâmetro inválido ou token de conta inválido/expirado/usado |
| 401 | Sem autenticação válida; credenciais de login/refresh inválidas |
| 403 | Conta sem confirmação no login ou papel sem permissão |
| 404 | Recurso/relacionamento inexistente |
| 409 | E-mail duplicado ou tentativa de remover recurso com dependências |
| 429 | Limite de tentativas atingido, quando I09 implementar essa regra |
| 500 | Falha inesperada; sem stack trace ou detalhes internos no corpo |
| 503 | Falha temporária de serviço necessário, quando houver tratamento explícito |

Exemplo de validação:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Confira os campos informados.",
  "fields": {
    "email": "Informe um e-mail válido."
  }
}
```
Exemplo de acesso negado:
```json
{
  "error": "FORBIDDEN",
  "message": "Você não tem permissão para esta operação."
}
```
O campo `fields` aparece só em erro de campos. Para falhas de credenciais, a mensagem é genérica. Se a equipe mantiver apenas `{"error":"codigo"}`, atualize todos os exemplos/clientes de forma consistente; não alternar formatos sem decisão.

## DTOs e exemplos de recursos

Tipos abaixo são da comunicação JSON: `string` é texto, `number` é número, `boolean` é true/false, objeto tem campos internos e array é uma lista. No Java, IDs podem usar Long, durações Integer, datas LocalDate/Instant conforme finalidade.

| DTO / campos | Tipos | Obrigatoriedade e regra |
| --- | --- | --- |
| RegisterRequest: name, email, password | string, string, string | Todos obrigatórios; limites definidos nas regras de conta; sem role |
| LoginRequest: email, password | string, string | Ambos obrigatórios; não retornar password |
| AccountTokenRequest: token | string | Obrigatório, não vazio; usado em confirmação |
| RefreshRequest / LogoutRequest: refreshToken | string | Obrigatório, não vazio; nunca enviar no parâmetro da URL |
| ForgotPasswordRequest: email | string | Obrigatório, formato válido |
| ResetPasswordRequest: token, newPassword | string, string | Ambos obrigatórios; nova senha segue a mesma validação do cadastro |
| UserResponse: id, name, email, role, emailVerified | number inteiro, string, string, string, boolean | role é USER/ADMIN; não contém password/hash |
| AuthResponse: accessToken, refreshToken, expiresIn, tokenType, user | string, string, number inteiro, string, objeto | expiresIn em segundos; tokenType Bearer; user segue UserResponse |
| ArtistRequest: name, bio, photoUrl | string, string ou null, string ou null | name obrigatório ≤150; bio ≤2000; photoUrl HTTP/HTTPS ≤255 |
| ArtistResponse | Campos de ArtistRequest + id number inteiro | Representa dados públicos do artista |
| AlbumRequest: title, artistId, coverUrl, releaseDate | string, number inteiro, string ou null, string ou null | title obrigatório ≤150; artista existente; coverUrl HTTP/HTTPS ≤255; data YYYY-MM-DD |
| AlbumResponse: id, title, artist, coverUrl, releaseDate | number inteiro, string, objeto, string ou null, string ou null | artist tem id number e name string |
| TrackResponse: id, title, artist, album, durationSeconds, bitrateKbps | number inteiro, string, objeto, objeto ou null, number inteiro, number inteiro ou null | album tem id/title quando presente; duração em segundos; sem filePath |
| PageResponse: items, page, size, totalElements, totalPages | array, number inteiro, number inteiro, number inteiro, number inteiro | items contém os DTOs do recurso; página começa em 0 |
| ErrorResponse: error, message, fields | string, string, objeto opcional | fields relaciona nome do campo com mensagem; não incluir valor secreto recebido |

Exemplo de header de criação administrativa: `Location: /api/v1/admin/artists/1`. Nos erros 401 de recursos protegidos por bearer, configurar também o header apropriado de desafio de autenticação, como `WWW-Authenticate: Bearer`, conforme a implementação de segurança.

UserResponse: `id`, `name`, `email`, `role`, `emailVerified`. Nenhum endpoint de conta permite escolher ADMIN em cadastro público.
ArtistResponse: `id`, `name`, `bio`, `photoUrl`. Campos opcionais podem ser `null`.
AlbumResponse: `id`, `title`, resumo `artist`, `coverUrl`, `releaseDate`.
TrackResponse: `id`, `title`, resumo `artist`, resumo `album` ou `null`, `durationSeconds`, `bitrateKbps` ou `null`. Não inclui endereço físico de áudio.

Página usa um DTO próprio com os campos abaixo; não depender da serialização interna da classe `Page` do Spring:
```json
{
  "items": [
    {
      "id": 1,
      "title": "Faixa de Teste",
      "artist": {
        "id": 1,
        "name": "Artista de Teste"
      },
      "album": {
        "id": 1,
        "title": "Álbum de Teste"
      },
      "durationSeconds": 180,
      "bitrateKbps": 128
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

Página vazia:
```json
{
  "items": [],
  "page": 0,
  "size": 20,
  "totalElements": 0,
  "totalPages": 0
}
```

## Catálogo de endpoints

| Operação | Método e rota após /api/v1 | Acesso | Issue |
| --- | --- | --- | --- |
| Cadastrar conta | `POST /auth/register` | Público | I05 |
| Confirmar e-mail | `POST /auth/verify-email` | Público | I05 |
| Entrar | `POST /auth/login` | Público | I06 |
| Renovar acesso | `POST /auth/refresh` | Refresh válido no corpo | I07 |
| Sair | `POST /auth/logout` | Refresh válido no corpo | I07 |
| Solicitar recuperação | `POST /auth/forgot-password` | Público | I08 |
| Redefinir senha | `POST /auth/reset-password` | Token de conta no corpo | I08 |
| Listar faixas | `GET /tracks?page=0&size=20&sort=id,asc` | USER ou ADMIN | I10 |
| Detalhar faixa | `GET /tracks/{id}` | USER ou ADMIN | I10 |
| Detalhar artista | `GET /artists/{id}` | USER ou ADMIN | I10 |
| Detalhar álbum | `GET /albums/{id}` | USER ou ADMIN | I10 |
| Criar artista | `POST /admin/artists` | Somente ADMIN | I11 |
| Listar artistas administrativos | `GET /admin/artists?page=0&size=20&sort=id,asc` | Somente ADMIN | I11 |
| Consultar artista administrativo | `GET /admin/artists/{id}` | Somente ADMIN | I11 |
| Atualizar artista | `PUT /admin/artists/{id}` | Somente ADMIN | I11 |
| Remover artista | `DELETE /admin/artists/{id}` | Somente ADMIN | I11 |
| Criar álbum | `POST /admin/albums` | Somente ADMIN | I11 |
| Listar álbuns administrativos | `GET /admin/albums?page=0&size=20&sort=id,asc` | Somente ADMIN | I11 |
| Consultar álbum administrativo | `GET /admin/albums/{id}` | Somente ADMIN | I11 |
| Atualizar álbum | `PUT /admin/albums/{id}` | Somente ADMIN | I11 |
| Remover álbum | `DELETE /admin/albums/{id}` | Somente ADMIN | I11 |

## E01 — Cadastrar conta

**Implementação:** I05. **Método/rota:** `POST /api/v1/auth/register`. **Acesso:** Público.

**Request — corpo:**

```json
{
  "name": "Aluno de Teste",
  "email": "aluno@example.test",
  "password": "SenhaFicticia#123"
}
```

**Response de sucesso:** HTTP 201.

```json
{
  "id": 1,
  "name": "Aluno de Teste",
  "email": "aluno@example.test",
  "role": "USER",
  "emailVerified": false
}
```

**Regras:** Salvar como USER e sem confirmação; disparar mensagem de confirmação. Rejeitar campo role no cadastro público. Um erro de SMTP depois de persistir a conta não deve provocar mensagem enganosa de que o cadastro não existe: a equipe precisa implementar reenvio ou recuperação da confirmação.

**Falhas esperadas:** 400 VALIDATION_ERROR ou FIELD_NOT_ALLOWED; 409 EMAIL_ALREADY_EXISTS. Falha de envio é registrada sem segredos e tratada no fluxo escolhido.

## E02 — Confirmar e-mail

**Implementação:** I05. **Método/rota:** `POST /api/v1/auth/verify-email`. **Acesso:** Público.

**Request — corpo:**

```json
{
  "token": "TOKEN_CONFIRMACAO_FICTICIO"
}
```

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:** Confirmar e-mail e consumir o token. O link abre a página de confirmação; a ação que altera estado deve chamar este POST. Token válido por 24 h.

**Falhas esperadas:** 400 ACCOUNT_TOKEN_INVALID para inexistente, expirado ou já usado.

## E03 — Entrar

**Implementação:** I06. **Método/rota:** `POST /api/v1/auth/login`. **Acesso:** Público.

**Request — corpo:**

```json
{
  "email": "aluno@example.test",
  "password": "SenhaFicticia#123"
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "accessToken": "ACCESS_TOKEN_FICTICIO",
  "refreshToken": "REFRESH_TOKEN_FICTICIO",
  "expiresIn": 900,
  "tokenType": "Bearer",
  "user": {
    "id": 1,
    "name": "Aluno de Teste",
    "email": "aluno@example.test",
    "role": "USER",
    "emailVerified": true
  }
}
```

**Regras:** Conta confirmada e senha correta. Access válido 15 min e refresh 7 dias. expiresIn é medido em segundos.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 INVALID_CREDENTIALS; 403 EMAIL_NOT_VERIFIED; 429 TOO_MANY_ATTEMPTS quando limite implementado.

## E04 — Renovar acesso

**Implementação:** I07. **Método/rota:** `POST /api/v1/auth/refresh`. **Acesso:** Refresh válido no corpo.

**Request — corpo:**

```json
{
  "refreshToken": "REFRESH_TOKEN_FICTICIO"
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "accessToken": "NOVO_ACCESS_FICTICIO",
  "refreshToken": "NOVO_REFRESH_FICTICIO",
  "expiresIn": 900,
  "tokenType": "Bearer",
  "user": {
    "id": 1,
    "name": "Aluno de Teste",
    "email": "aluno@example.test",
    "role": "USER",
    "emailVerified": true
  }
}
```

**Regras:** Consumir o refresh recebido e emitir outro. Cliente substitui ambos os tokens; acesso antigo segue sua validade restante.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 INVALID_REFRESH_TOKEN para inválido/expirado/revogado/reutilizado.

## E05 — Sair

**Implementação:** I07. **Método/rota:** `POST /api/v1/auth/logout`. **Acesso:** Refresh válido no corpo.

**Request — corpo:**

```json
{
  "refreshToken": "REFRESH_TOKEN_FICTICIO"
}
```

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:** Revogar o refresh informado e apagar tokens locais. Access já emitido pode valer até expirar. Se refresh já inválido, resposta 401; cliente deve apagar seus tokens mesmo assim.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 INVALID_REFRESH_TOKEN.

## E06 — Solicitar recuperação

**Implementação:** I08. **Método/rota:** `POST /api/v1/auth/forgot-password`. **Acesso:** Público.

**Request — corpo:**

```json
{
  "email": "aluno@example.test"
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "message": "Se houver uma conta para este e-mail, enviaremos as instruções."
}
```

**Regras:** Retornar o mesmo corpo/status para e-mail existente ou inexistente. Gerar/enviar token somente para conta existente. Token válido 30 min. Uma falha do SMTP deve ser registrada/tratada sem transformar a resposta pública em indicação de que a conta existe; manter a resposta neutra neste fluxo.

**Falhas esperadas:** 400 VALIDATION_ERROR para e-mail malformado; nunca 404 por e-mail inexistente.

## E07 — Redefinir senha

**Implementação:** I08. **Método/rota:** `POST /api/v1/auth/reset-password`. **Acesso:** Token de conta no corpo.

**Request — corpo:**

```json
{
  "token": "TOKEN_RESET_FICTICIO",
  "newPassword": "OutraSenhaFicticia#456"
}
```

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:** Consumir token, salvar nova senha com BCrypt e revogar refresh tokens do usuário. Não confirmar automaticamente um e-mail não verificado.

**Falhas esperadas:** 400 VALIDATION_ERROR ou ACCOUNT_TOKEN_INVALID.

## E08 — Listar faixas

**Implementação:** I10. **Método/rota:** `GET /api/v1/tracks?page=0&size=20&sort=id,asc`. **Acesso:** USER ou ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "items": [
    {
      "id": 1,
      "title": "Faixa de Teste",
      "artist": {
        "id": 1,
        "name": "Artista de Teste"
      },
      "album": {
        "id": 1,
        "title": "Álbum de Teste"
      },
      "durationSeconds": 180,
      "bitrateKbps": 128
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

**Regras:** Listar metadados paginados; size no intervalo 1–50. Busca textual avançada fica para depois.

**Falhas esperadas:** 400 INVALID_PAGE_PARAMETERS; 401 UNAUTHORIZED.

## E09 — Detalhar faixa

**Implementação:** I10. **Método/rota:** `GET /api/v1/tracks/{id}`. **Acesso:** USER ou ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "title": "Faixa de Teste",
  "artist": {
    "id": 1,
    "name": "Artista de Teste"
  },
  "album": {
    "id": 1,
    "title": "Álbum de Teste"
  },
  "durationSeconds": 180,
  "bitrateKbps": 128
}
```

**Regras:** ID positivo; incluir artista/álbum resumidos; não entregar áudio nem filePath.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 404 TRACK_NOT_FOUND.

## E10 — Detalhar artista

**Implementação:** I10. **Método/rota:** `GET /api/v1/artists/{id}`. **Acesso:** USER ou ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:** Não embutir listas ilimitadas de álbuns/faixas; relações completas podem ser outra consulta futura.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 404 ARTIST_NOT_FOUND.

## E11 — Detalhar álbum

**Implementação:** I10. **Método/rota:** `GET /api/v1/albums/{id}`. **Acesso:** USER ou ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "title": "Álbum de Teste",
  "artist": {
    "id": 1,
    "name": "Artista de Teste"
  },
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Regras:** Incluir resumo do artista; listas de faixas não são obrigatórias neste DTO inicial.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 404 ALBUM_NOT_FOUND.

## E12 — Criar artista

**Implementação:** I11. **Método/rota:** `POST /api/v1/admin/artists`. **Acesso:** Somente ADMIN.

**Request — corpo:**

```json
{
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Response de sucesso:** HTTP 201.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:** name obrigatório, até 150; bio opcional, até 2000 pela API; photoUrl opcional, até 255, URL HTTP/HTTPS. Duplicidade de nome/título não é proibida pelo schema; não retornar 409 por esse motivo sem nova regra.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 ARTIST_NOT_FOUND se vínculo inválido.

## E13 — Listar artistas administrativos

**Implementação:** I11. **Método/rota:** `GET /api/v1/admin/artists?page=0&size=20&sort=id,asc`. **Acesso:** Somente ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "items": [
    {
      "id": 1,
      "name": "Artista de Teste",
      "bio": "Artista fictício da demonstração.",
      "photoUrl": null
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

**Regras:** Paginação padrão compartilhada; ordenação alternativa por name.

**Falhas esperadas:** 400 INVALID_PAGE_PARAMETERS; 401 UNAUTHORIZED; 403 FORBIDDEN.

## E14 — Consultar artista administrativo

**Implementação:** I11. **Método/rota:** `GET /api/v1/admin/artists/{id}`. **Acesso:** Somente ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:** Retornar o recurso para a tela administrativa.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 RESOURCE_NOT_FOUND.

## E15 — Atualizar artista

**Implementação:** I11. **Método/rota:** `PUT /api/v1/admin/artists/{id}`. **Acesso:** Somente ADMIN.

**Request — corpo:**

```json
{
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:** name obrigatório, até 150; bio opcional, até 2000 pela API; photoUrl opcional, até 255, URL HTTP/HTTPS. PUT substitui todos os campos editáveis; enviar campos opcionais como null para limpá-los.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 RESOURCE_NOT_FOUND ou ARTIST_NOT_FOUND.

## E16 — Remover artista

**Implementação:** I11. **Método/rota:** `DELETE /api/v1/admin/artists/{id}`. **Acesso:** Somente ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:** Bloquear se houver álbuns ou faixas ligados ao artista. Registrar o administrador autenticado.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 RESOURCE_NOT_FOUND; 409 RESOURCE_HAS_DEPENDENCIES.

## E17 — Criar álbum

**Implementação:** I11. **Método/rota:** `POST /api/v1/admin/albums`. **Acesso:** Somente ADMIN.

**Request — corpo:**

```json
{
  "title": "Álbum de Teste",
  "artistId": 1,
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Response de sucesso:** HTTP 201.

```json
{
  "id": 1,
  "title": "Álbum de Teste",
  "artist": {
    "id": 1,
    "name": "Artista de Teste"
  },
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Regras:** title obrigatório, até 150; artistId obrigatório e existente; coverUrl opcional, até 255, URL HTTP/HTTPS; releaseDate opcional em YYYY-MM-DD. Não usar data-hora nesse campo. Duplicidade de nome/título não é proibida pelo schema; não retornar 409 por esse motivo sem nova regra.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 ARTIST_NOT_FOUND se vínculo inválido.

## E18 — Listar álbuns administrativos

**Implementação:** I11. **Método/rota:** `GET /api/v1/admin/albums?page=0&size=20&sort=id,asc`. **Acesso:** Somente ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "items": [
    {
      "id": 1,
      "title": "Álbum de Teste",
      "artist": {
        "id": 1,
        "name": "Artista de Teste"
      },
      "coverUrl": null,
      "releaseDate": "2026-10-13"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

**Regras:** Paginação padrão compartilhada; ordenação alternativa por title.

**Falhas esperadas:** 400 INVALID_PAGE_PARAMETERS; 401 UNAUTHORIZED; 403 FORBIDDEN.

## E19 — Consultar álbum administrativo

**Implementação:** I11. **Método/rota:** `GET /api/v1/admin/albums/{id}`. **Acesso:** Somente ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "title": "Álbum de Teste",
  "artist": {
    "id": 1,
    "name": "Artista de Teste"
  },
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Regras:** Retornar o recurso para a tela administrativa.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 RESOURCE_NOT_FOUND.

## E20 — Atualizar álbum

**Implementação:** I11. **Método/rota:** `PUT /api/v1/admin/albums/{id}`. **Acesso:** Somente ADMIN.

**Request — corpo:**

```json
{
  "title": "Álbum de Teste",
  "artistId": 1,
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "title": "Álbum de Teste",
  "artist": {
    "id": 1,
    "name": "Artista de Teste"
  },
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Regras:** title obrigatório, até 150; artistId obrigatório e existente; coverUrl opcional, até 255, URL HTTP/HTTPS; releaseDate opcional em YYYY-MM-DD. Não usar data-hora nesse campo. PUT substitui todos os campos editáveis; enviar campos opcionais como null para limpá-los.

**Falhas esperadas:** 400 VALIDATION_ERROR; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 RESOURCE_NOT_FOUND ou ARTIST_NOT_FOUND.

## E21 — Remover álbum

**Implementação:** I11. **Método/rota:** `DELETE /api/v1/admin/albums/{id}`. **Acesso:** Somente ADMIN.

**Request — corpo:**

Sem corpo. Para listagem, os parâmetros de consulta estão na rota e seguem as regras comuns.

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:** Bloquear se houver faixas ligadas ao álbum. Registrar o administrador autenticado.

**Falhas esperadas:** 400 INVALID_ID; 401 UNAUTHORIZED; 403 FORBIDDEN; 404 RESOURCE_NOT_FOUND; 409 RESOURCE_HAS_DEPENDENCIES.

## Health e web

`GET /actuator/health` não usa o prefixo `/api/v1`. Deve responder 200/UP quando dependências verificadas estiverem saudáveis; banco indisponível pode produzir status de indisponibilidade. Não exibir detalhes internos publicamente. Esse check não valida login/catalogo.

Rotas web propostas para I14: `GET /login` exibe formulário, `POST /login` autentica com campos `username` (e-mail) e `password` e CSRF; `GET /catalogo` exige sessão web; `POST /logout` encerra sessão com CSRF. O login web não entrega JSON/JWT e utiliza os mesmos serviços/regras de conta. Sessão ausente redireciona para `/login`; falha de formulário retorna à página com mensagem genérica. Definir redirecionamentos exatos no PR web.

Página `GET /confirmar-email?token=...` e `GET /redefinir-senha?token=...` são telas propostas para os links de e-mail, a entregar nos fluxos correspondentes. GET apenas exibe o formulário; confirmação/reset ocorre após POST. Se os clientes adotarem outra tela, atualizar os textos de e-mail e APP_PUBLIC_BASE_URL.

## Como preencher a documentação depois de implementar

Para cada endpoint, compare o exemplo com uma chamada real em dados fictícios e anote o commit/PR que confirmou o comportamento. Se a implementação divergir, corrija a implementação ou revise a proposta com os consumidores. Não escreva “implementado” só porque um exemplo JSON foi produzido.

Swagger/OpenAPI e Postman são ferramentas opcionais para apresentação. Para o trabalho escolar, este Markdown e exemplos reproduzíveis são suficientes; não instalar ferramentas de contrato somente para cumprir I01.

Checklist de revisão da I01: método/rota; autenticação; headers; parâmetros e limites; corpo e tipos; exemplo de sucesso; erros/status; efeito no banco/conta; dependências; compatibilidade PHP/mobile.
