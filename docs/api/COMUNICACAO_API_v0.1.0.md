# Comunicação da API — v0.1.0 escolar

**Issue de documentação:** I01 — #6.

**Estado:** documentação do comportamento planejado. A implementação e a validação serão realizadas nas Issues indicadas em cada endpoint.

Todos os dados, senhas e tokens apresentados nos exemplos são fictícios.

## Como ler este documento

**Request** é a solicitação enviada à API. Ela pode conter:

- Método HTTP.
- Endereço da rota.
- Headers.
- Parâmetros de caminho.
- Parâmetros de consulta.
- Corpo da requisição.

**Response** é a resposta da API. Ela contém:

- Status HTTP.
- Headers.
- Corpo, quando aplicável.

Exemplo:

- `GET /api/v1/tracks/1` consulta a faixa de identificador `1`.
- Em `/tracks/{id}`, `{id}` representa um parâmetro de caminho.
- Em `/tracks?page=0&size=20`, `page` e `size` são parâmetros de consulta.

A documentação descreve o resultado esperado. A existência de um exemplo não comprova que o endpoint já está implementado.

## Endereço e headers

### Base local

```text
http://localhost:8080/api/v1
```

Esse endereço serve para chamadas realizadas no próprio computador que executa a API.

Em outro computador, emulador ou celular, configure um endereço que consiga alcançar o backend. No celular, `localhost` aponta para o próprio dispositivo.

### Requisições JSON

POST e PUT com corpo JSON utilizam:

```http
Content-Type: application/json
Accept: application/json
```

Respostas com corpo JSON utilizam:

```http
Content-Type: application/json
```

### Rotas privadas

As rotas REST protegidas recebem:

```http
Authorization: Bearer ACCESS_TOKEN_FICTICIO
```

Não coloque aspas ao redor do token.

Login, cadastro, confirmação e recuperação não exigem access token. Refresh e logout REST recebem o refresh token no corpo, conforme suas seções.

### Requisições e respostas sem corpo

- As consultas GET apresentadas neste documento não recebem corpo.
- Uma resposta `204 No Content` não possui corpo.
- Não retornar `{}` ou outro JSON em uma resposta 204.

## Padrões compartilhados

### Identificadores e textos

- IDs são números inteiros positivos.
- Nomes e títulos obrigatórios não podem ficar vazios após remover espaços nas extremidades.
- Nome de usuário: de 2 a 120 caracteres.
- E-mail: formato válido, até 160 caracteres, com normalização conforme as decisões da equipe.
- Senha: de 8 a 64 caracteres, respeitando o limite de 72 bytes em UTF-8 do BCrypt.
- A senha não deve ser alterada por remoção automática de espaços ou conversão de maiúsculas e minúsculas.
- Senhas são armazenadas como hash BCrypt, nunca em texto original.

### Datas

- Instantes de criação e expiração utilizam UTC e ISO 8601.
- Exemplo de instante: `2026-10-13T12:00:00Z`.
- Datas de lançamento de álbuns utilizam somente `YYYY-MM-DD`.
- Exemplo de data de lançamento: `2026-10-13`.

### Paginação

- A primeira página é `0`.
- `page`: inteiro maior ou igual a zero.
- `size`: inteiro de 1 a 50.
- Valores padrão: `page=0` e `size=20`.
- Ordenação padrão: `sort=id,asc`.
- Uma página além do final retorna 200 com `items: []`.
- Parâmetros malformados ou fora dos limites retornam 400.

Ordenações permitidas:

| Recurso | Valores de `sort` |
| --- | --- |
| Faixas | `id,asc`, `id,desc`, `title,asc`, `title,desc` |
| Álbuns | `id,asc`, `id,desc`, `title,asc`, `title,desc` |
| Artistas | `id,asc`, `id,desc`, `name,asc`, `name,desc` |

Em ordenações por título ou nome, utilizar o ID como desempate na mesma direção.

### Dados que não podem aparecer nas respostas públicas

Não retornar:

- Senha original.
- Hash de senha.
- Caminho físico do arquivo de áudio.
- Segredo de assinatura.
- Hash de tokens.
- Tokens em respostas de catálogo ou DTOs de usuário.

Access e refresh tokens aparecem somente nas respostas específicas de login e renovação.

### Criação, alteração e remoção

- Criação bem-sucedida: HTTP 201.
- Criação administrativa: incluir o header `Location` com a rota do recurso criado.
- Consulta ou atualização bem-sucedida: HTTP 200.
- Remoção bem-sucedida: HTTP 204, sem corpo.

Exemplo de criação administrativa:

```http
Location: /api/v1/admin/artists/1
```

## Autenticação e validade dos tokens

| Item | Regra |
| --- | --- |
| Access token | JWT assinado, válido por 10 minutos |
| `expiresIn` | Validade do access token em segundos: `600` |
| Refresh token | Valor aleatório opaco, válido por 24 horas a partir de sua emissão |
| Armazenamento do refresh | Somente seu hash no banco |
| Renovação | Consome o refresh recebido e emite um novo par de tokens |
| Novo access | Válido por 10 minutos |
| Novo refresh | Válido por 24 horas a partir da nova emissão |
| Logout REST | Revoga o refresh informado; o cliente remove seus tokens locais |
| Access após logout | Mantém apenas o tempo restante de sua validade original |
| Redefinição de senha | Revoga todos os refresh tokens do usuário e invalida suas sessões web anteriores |

A renovação deve ser atômica: o mesmo refresh antigo não pode produzir duas renovações válidas.

Esta versão não implementa uma lista de bloqueio por access token. Por isso, um access já emitido pode permanecer tecnicamente válido até expirar, mesmo após logout ou redefinição de senha.

O limite é de 10 minutos contados da emissão do access token. Logout e redefinição de senha não reiniciam esse prazo.

Esses prazos pertencem à autenticação da API. Não representam uma licença temporal para reproduzir músicas baixadas.

Referência: [Decisões da equipe](DECISOES_DA_EQUIPE.md).

## Status HTTP

| Status | Uso |
| --- | --- |
| 200 | Consulta, login, renovação ou solicitação neutra de recuperação |
| 201 | Cadastro ou criação de recurso |
| 204 | Confirmação, redefinição, logout ou remoção sem corpo |
| 400 | Entrada inválida, parâmetro inválido ou token de conta inválido, expirado ou utilizado |
| 401 | Autenticação ausente ou inválida; credenciais ou refresh inválidos |
| 403 | Conta sem confirmação no login ou usuário sem permissão |
| 404 | Recurso ou relacionamento inexistente |
| 409 | E-mail duplicado ou remoção impedida por dependências |
| 429 | Limite de tentativas atingido, quando essa proteção estiver implementada |
| 500 | Falha inesperada |
| 503 | Serviço necessário temporariamente indisponível, quando houver tratamento explícito |

Respostas de erro não devem expor stack traces, senhas, tokens ou detalhes internos de infraestrutura.

Nos erros 401 de recursos protegidos por bearer, configurar o header de desafio de autenticação pertinente, como:

```http
WWW-Authenticate: Bearer
```

## Formato de erro

O formato compartilhado utiliza:

- `error`: código estável utilizado pelos clientes.
- `message`: explicação legível.
- `fields`: mensagens por campo, somente quando necessário.

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

Exemplo de credenciais inválidas:

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "E-mail ou senha inválidos."
}
```

Não incluir valores secretos recebidos nas mensagens de validação.

## DTOs e campos

Os tipos abaixo representam a comunicação JSON:

- `string`: texto.
- `number`: número.
- `boolean`: `true` ou `false`.
- Objeto: conjunto de campos.
- Array: lista.
- `null`: ausência de valor em campo que permita isso.

No Java, os tipos devem corresponder à finalidade de cada campo, como `Long` para IDs, `Integer` para durações e `LocalDate` ou `Instant` para datas.

| DTO | Campos | Regras principais |
| --- | --- | --- |
| RegisterRequest | `name`, `email`, `password` | Strings obrigatórias; não permite escolher `role` |
| LoginRequest | `email`, `password` | Strings obrigatórias |
| AccountTokenRequest | `token` | String obrigatória e não vazia |
| RefreshRequest | `refreshToken` | String obrigatória; não enviar na URL |
| LogoutRequest | `refreshToken` | String obrigatória; não enviar na URL |
| ForgotPasswordRequest | `email` | String obrigatória em formato válido |
| ResetPasswordRequest | `token`, `newPassword` | Strings obrigatórias; nova senha segue as regras de cadastro |
| UserResponse | `id`, `name`, `email`, `role`, `emailVerified` | ID inteiro; papel `USER` ou `ADMIN`; confirmação booleana |
| AuthResponse | `accessToken`, `refreshToken`, `expiresIn`, `tokenType`, `user` | `expiresIn` inteiro em segundos; `tokenType` igual a `Bearer` |
| ArtistRequest | `name`, `bio`, `photoUrl` | Nome obrigatório, até 150; biografia opcional, até 2000; URL opcional, até 255 |
| ArtistResponse | `id`, `name`, `bio`, `photoUrl` | ID inteiro; campos opcionais podem ser `null` |
| AlbumRequest | `title`, `artistId`, `coverUrl`, `releaseDate` | Título obrigatório, até 150; artista existente; capa e data opcionais |
| AlbumResponse | `id`, `title`, `artist`, `coverUrl`, `releaseDate` | Artista resumido com `id` e `name` |
| TrackResponse | `id`, `title`, `artist`, `album`, `durationSeconds`, `bitrateKbps` | Artista com `id` e `name`; álbum com `id` e `title`, ou `null`; duração inteira em segundos; bitrate inteiro ou `null` |
| PageResponse | `items`, `page`, `size`, `totalElements`, `totalPages` | Lista de itens e números inteiros de paginação |
| ErrorResponse | `error`, `message`, `fields` | Código e mensagem; objeto `fields` opcional |

URLs de foto e capa, quando informadas, devem utilizar HTTP ou HTTPS.

Nenhum cadastro público permite escolher o papel `ADMIN`.

## Formato de paginação

As listagens utilizam um DTO próprio. Os clientes não devem depender da serialização interna da classe `Page` do Spring.

Exemplo:

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

Exemplo sem resultados:

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

As rotas desta tabela são complementadas pelo prefixo `/api/v1`.

| Código | Operação | Método e rota | Acesso | Implementação |
| --- | --- | --- | --- | --- |
| E01 | Cadastrar conta | `POST /auth/register` | Público | I05 — #10 |
| E02 | Confirmar e-mail | `POST /auth/verify-email` | Público | I05 — #10 |
| E03 | Entrar | `POST /auth/login` | Público | I06 — #11 |
| E04 | Renovar acesso | `POST /auth/refresh` | Refresh válido no corpo | I07 — #12 |
| E05 | Sair | `POST /auth/logout` | Refresh válido no corpo | I07 — #12 |
| E06 | Solicitar recuperação | `POST /auth/forgot-password` | Público | I08 — #13 |
| E07 | Redefinir senha | `POST /auth/reset-password` | Token de recuperação no corpo | I08 — #13 |
| E08 | Listar faixas | `GET /tracks` | USER ou ADMIN | I10 — #15 |
| E09 | Detalhar faixa | `GET /tracks/{id}` | USER ou ADMIN | I10 — #15 |
| E10 | Detalhar artista | `GET /artists/{id}` | USER ou ADMIN | I10 — #15 |
| E11 | Detalhar álbum | `GET /albums/{id}` | USER ou ADMIN | I10 — #15 |
| E12 | Criar artista | `POST /admin/artists` | ADMIN | I11 — #16 |
| E13 | Listar artistas administrativos | `GET /admin/artists` | ADMIN | I11 — #16 |
| E14 | Consultar artista administrativo | `GET /admin/artists/{id}` | ADMIN | I11 — #16 |
| E15 | Atualizar artista | `PUT /admin/artists/{id}` | ADMIN | I11 — #16 |
| E16 | Remover artista | `DELETE /admin/artists/{id}` | ADMIN | I11 — #16 |
| E17 | Criar álbum | `POST /admin/albums` | ADMIN | I11 — #16 |
| E18 | Listar álbuns administrativos | `GET /admin/albums` | ADMIN | I11 — #16 |
| E19 | Consultar álbum administrativo | `GET /admin/albums/{id}` | ADMIN | I11 — #16 |
| E20 | Atualizar álbum | `PUT /admin/albums/{id}` | ADMIN | I11 — #16 |
| E21 | Remover álbum | `DELETE /admin/albums/{id}` | ADMIN | I11 — #16 |

## E01 — Cadastrar conta

**Implementação:** I05 — Issue #10.  
**Método/rota:** `POST /api/v1/auth/register`.  
**Acesso:** Público.

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

**Regras:**

- Validar nome, e-mail e senha.
- Criar a conta com papel `USER`.
- Criar a conta com e-mail ainda não confirmado.
- Rejeitar o campo `role` no cadastro público.
- Armazenar a senha como hash BCrypt.
- Gerar um token de confirmação e solicitar o envio do e-mail.
- Não retornar senha, hash ou token de confirmação na resposta.

Se o envio de e-mail falhar depois de a conta ter sido persistida, o sistema não deve informar de maneira enganosa que a conta não existe. O tratamento da falha e a possibilidade de reenvio ou recuperação da confirmação devem ser definidos e documentados na Issue #10.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: campos inválidos.
- `400 FIELD_NOT_ALLOWED`: tentativa de enviar um campo proibido, como `role`.
- `409 EMAIL_ALREADY_EXISTS`: e-mail já cadastrado.

## E02 — Confirmar e-mail

**Implementação:** I05 — Issue #10.  
**Método/rota:** `POST /api/v1/auth/verify-email`.  
**Acesso:** Público, com token de confirmação no corpo.

**Request — corpo:**

```json
{
  "token": "TOKEN_CONFIRMACAO_FICTICIO"
}
```

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:**

- O token de confirmação é aleatório, de uso único e válido por 24 horas.
- Validar o token antes de confirmar o e-mail.
- Marcar o e-mail da conta como confirmado.
- Consumir o token após a confirmação.
- Um token utilizado não pode confirmar novamente a conta.
- O link recebido por e-mail abre uma tela; a confirmação que altera o estado ocorre por POST.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: token ausente ou vazio.
- `400 ACCOUNT_TOKEN_INVALID`: token inexistente, expirado ou já utilizado.

## E03 — Entrar

**Implementação:** I06 — Issue #11.  
**Método/rota:** `POST /api/v1/auth/login`.  
**Acesso:** Público.

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
  "expiresIn": 600,
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

**Regras:**

- Exigir conta com e-mail confirmado e senha correta.
- Emitir access token com validade de 10 minutos.
- Emitir refresh token com validade de 24 horas.
- Informar `expiresIn` em segundos: `600` equivale a 10 minutos.
- Armazenar somente o hash do refresh token no banco.
- Não registrar senhas ou tokens em logs.
- Credenciais inválidas devem produzir mensagem genérica.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: dados de entrada inválidos.
- `401 INVALID_CREDENTIALS`: credenciais inválidas.
- `403 EMAIL_NOT_VERIFIED`: conta sem confirmação de e-mail.
- `429 TOO_MANY_ATTEMPTS`: limite de tentativas atingido, quando essa proteção estiver implementada.

## E04 — Renovar acesso

**Implementação:** I07 — Issue #12.  
**Método/rota:** `POST /api/v1/auth/refresh`.  
**Acesso:** Refresh token válido no corpo; não exige access token válido.

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
  "expiresIn": 600,
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

**Regras:**

- Validar o refresh recebido, incluindo expiração e revogação.
- Consumir o refresh recebido e emitir outro em uma operação atômica.
- Emitir novo access token com validade de 10 minutos.
- Emitir novo refresh token com validade de 24 horas a partir de sua emissão.
- O cliente deve substituir os dois tokens pelos valores recebidos.
- O refresh anterior não pode ser utilizado novamente.
- Um access token anterior mantém somente sua validade original restante.
- Não enviar tokens por parâmetros da URL nem registrá-los em logs.

A revogação de toda uma família de refresh tokens após detectar reutilização fica como melhoria futura; não faz parte desta implementação inicial.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: corpo ausente, campo obrigatório ausente ou entrada inválida.
- `401 INVALID_REFRESH_TOKEN`: refresh inexistente, expirado, revogado ou já utilizado.

## E05 — Sair

**Implementação:** I07 — Issue #12.  
**Método/rota:** `POST /api/v1/auth/logout`.  
**Acesso:** Refresh token válido no corpo; não exige access token válido.

**Request — corpo:**

```json
{
  "refreshToken": "REFRESH_TOKEN_FICTICIO"
}
```

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:**

- Revogar o refresh token informado.
- O cliente deve remover seus tokens locais ao encerrar a sessão.
- Se o refresh já estiver inválido, retornar `401 INVALID_REFRESH_TOKEN`.
- O cliente deve remover os tokens locais mesmo que receba esse 401.
- O logout não bloqueia imediatamente um access token já emitido.
- Esse access token pode permanecer tecnicamente válido somente até sua expiração original: no máximo 10 minutos contados de sua emissão.
- O logout não inicia um novo prazo de 10 minutos.
- Esta versão não implementa uma lista de bloqueio por access token.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: corpo ausente, campo obrigatório ausente ou entrada inválida.
- `401 INVALID_REFRESH_TOKEN`: refresh inexistente, expirado, revogado ou já utilizado.

## E06 — Solicitar recuperação

**Implementação:** I08 — Issue #13.  
**Método/rota:** `POST /api/v1/auth/forgot-password`.  
**Acesso:** Público.

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

**Regras:**

- Retornar o mesmo status e a mesma mensagem para e-mail existente ou inexistente.
- Gerar e enviar o token somente quando a conta existir.
- O token de recuperação é aleatório, de uso único e válido por 30 minutos.
- Uma nova solicitação invalida os tokens anteriores não utilizados desse fluxo.
- Falhas no envio de e-mail devem ser registradas e tratadas sem revelar se a conta existe.
- Não registrar o token em logs.
- Este endpoint apenas solicita a recuperação; a senha ainda não é alterada.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: e-mail ausente ou malformado.
- Não retornar `404` por e-mail inexistente.

## E07 — Redefinir senha

**Implementação:** I08 — Issue #13.  
**Método/rota:** `POST /api/v1/auth/reset-password`.  
**Acesso:** Token de recuperação no corpo; não exige access token.

**Request — corpo:**

```json
{
  "token": "TOKEN_RESET_FICTICIO",
  "newPassword": "OutraSenhaFicticia#456"
}
```

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:**

- Validar o token de recuperação e a nova senha.
- O token deve existir, não ter expirado e ainda não ter sido utilizado.
- Consumir o token de recuperação.
- Salvar a nova senha como hash BCrypt.
- Revogar todos os refresh tokens do usuário.
- Invalidar as sessões web anteriores do usuário.
- Não confirmar automaticamente um e-mail não verificado.
- Access tokens já emitidos podem continuar tecnicamente válidos até sua expiração original, limitada a 10 minutos contados da emissão.
- A redefinição não reinicia esse prazo.
- Não registrar o token ou a nova senha em logs.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: token ausente, nova senha ausente ou senha fora das regras.
- `400 ACCOUNT_TOKEN_INVALID`: token inexistente, expirado ou já utilizado.

## E08 — Listar faixas

**Implementação:** I10 — Issue #15.  
**Método/rota:** `GET /api/v1/tracks`.  
**Acesso:** USER ou ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetros de consulta:**

| Parâmetro | Exemplo | Regra |
| --- | --- | --- |
| `page` | `0` | Inteiro maior ou igual a zero; padrão 0 |
| `size` | `20` | Inteiro de 1 a 50; padrão 20 |
| `sort` | `id,asc` | Ordenação permitida para faixas; padrão `id,asc` |

Exemplo:

```http
GET /api/v1/tracks?page=0&size=20&sort=id,asc
```

**Request — corpo:**

Sem corpo.

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

**Regras:**

- Retornar metadados paginados.
- Não retornar áudio ou caminho físico de arquivo.
- Retornar `items: []` quando a página não possuir resultados.
- Busca textual avançada fica para uma etapa posterior.

**Falhas esperadas:**

- `400 INVALID_PAGE_PARAMETERS`: paginação ou ordenação inválida.
- `401 UNAUTHORIZED`: access token ausente, inválido ou expirado.

## E09 — Detalhar faixa

**Implementação:** I10 — Issue #15.  
**Método/rota:** `GET /api/v1/tracks/{id}`.  
**Acesso:** USER ou ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

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

**Regras:**

- Consultar a faixa pelo ID.
- Incluir artista e álbum resumidos.
- O álbum pode ser `null`.
- Não entregar áudio nem caminho físico do arquivo.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `404 TRACK_NOT_FOUND`: faixa inexistente.

## E10 — Detalhar artista

**Implementação:** I10 — Issue #15.  
**Método/rota:** `GET /api/v1/artists/{id}`.  
**Acesso:** USER ou ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:**

- Consultar o artista pelo ID.
- Não incluir listas ilimitadas de álbuns ou faixas.
- Consultas adicionais de relacionamentos podem ser criadas em etapas posteriores.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `404 ARTIST_NOT_FOUND`: artista inexistente.

## E11 — Detalhar álbum

**Implementação:** I10 — Issue #15.  
**Método/rota:** `GET /api/v1/albums/{id}`.  
**Acesso:** USER ou ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

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

**Regras:**

- Consultar o álbum pelo ID.
- Incluir o resumo do artista.
- A data de lançamento utiliza `YYYY-MM-DD`.
- A lista de faixas não é obrigatória neste DTO inicial.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `404 ALBUM_NOT_FOUND`: álbum inexistente.

## E12 — Criar artista

**Implementação:** I11 — Issue #16.  
**Método/rota:** `POST /api/v1/admin/artists`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization` e `Content-Type: application/json`.

**Request — corpo:**

```json
{
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Response de sucesso:** HTTP 201.

**Header de resposta:**

```http
Location: /api/v1/admin/artists/1
```

**Corpo:**

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:**

- `name`: obrigatório, até 150 caracteres.
- `bio`: opcional, até 2000 caracteres.
- `photoUrl`: opcional, URL HTTP/HTTPS de até 255 caracteres.
- Campos opcionais podem ser `null`.
- Duplicidade de nome não é proibida nesta definição.
- Registrar a operação com a identidade do administrador autenticado.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: dados inválidos.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.

## E13 — Listar artistas administrativos

**Implementação:** I11 — Issue #16.  
**Método/rota:** `GET /api/v1/admin/artists`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetros de consulta:** `page`, `size` e `sort`, conforme os padrões compartilhados para artistas.

Exemplo:

```http
GET /api/v1/admin/artists?page=0&size=20&sort=id,asc
```

**Request — corpo:**

Sem corpo.

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

**Regras:**

- Utilizar a paginação compartilhada.
- Permitir ordenação por ID ou nome.
- Retornar uma lista vazia quando não houver resultados.

**Falhas esperadas:**

- `400 INVALID_PAGE_PARAMETERS`: paginação ou ordenação inválida.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.

## E14 — Consultar artista administrativo

**Implementação:** I11 — Issue #16.  
**Método/rota:** `GET /api/v1/admin/artists/{id}`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Artista fictício da demonstração.",
  "photoUrl": null
}
```

**Regras:**

- Consultar o artista pelo ID.
- Retornar os dados necessários para a tela administrativa.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ARTIST_NOT_FOUND`: artista inexistente.

## E15 — Atualizar artista

**Implementação:** I11 — Issue #16.  
**Método/rota:** `PUT /api/v1/admin/artists/{id}`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization` e `Content-Type: application/json`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

```json
{
  "name": "Artista de Teste",
  "bio": "Biografia atualizada do artista fictício.",
  "photoUrl": null
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "name": "Artista de Teste",
  "bio": "Biografia atualizada do artista fictício.",
  "photoUrl": null
}
```

**Regras:**

- Exigir que o artista exista.
- Aplicar os mesmos limites do cadastro.
- PUT substitui os campos editáveis do recurso.
- Enviar campos opcionais como `null` para limpá-los.
- Não permitir alteração do ID pelo corpo.
- Registrar a operação com a identidade do administrador autenticado.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `400 VALIDATION_ERROR`: campos inválidos.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ARTIST_NOT_FOUND`: artista inexistente.

## E16 — Remover artista

**Implementação:** I11 — Issue #16.  
**Método/rota:** `DELETE /api/v1/admin/artists/{id}`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:**

- Exigir que o artista exista.
- Bloquear a exclusão se houver álbuns ou faixas ligados ao artista.
- Não excluir registros relacionados automaticamente.
- Registrar a operação com a identidade do administrador autenticado.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ARTIST_NOT_FOUND`: artista inexistente.
- `409 RESOURCE_HAS_DEPENDENCIES`: existem registros que impedem a exclusão.

## E17 — Criar álbum

**Implementação:** I11 — Issue #16.  
**Método/rota:** `POST /api/v1/admin/albums`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization` e `Content-Type: application/json`.

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

**Header de resposta:**

```http
Location: /api/v1/admin/albums/1
```

**Corpo:**

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

**Regras:**

- `title`: obrigatório, até 150 caracteres.
- `artistId`: obrigatório, inteiro positivo e referente a um artista existente.
- `coverUrl`: opcional, URL HTTP/HTTPS de até 255 caracteres.
- `releaseDate`: opcional, no formato `YYYY-MM-DD`.
- Não utilizar data e hora em `releaseDate`.
- Duplicidade de título não é proibida nesta definição.
- Registrar a operação com a identidade do administrador autenticado.

**Falhas esperadas:**

- `400 VALIDATION_ERROR`: dados inválidos.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ARTIST_NOT_FOUND`: artista informado não existe.

## E18 — Listar álbuns administrativos

**Implementação:** I11 — Issue #16.  
**Método/rota:** `GET /api/v1/admin/albums`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetros de consulta:** `page`, `size` e `sort`, conforme os padrões compartilhados para álbuns.

Exemplo:

```http
GET /api/v1/admin/albums?page=0&size=20&sort=id,asc
```

**Request — corpo:**

Sem corpo.

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

**Regras:**

- Utilizar a paginação compartilhada.
- Permitir ordenação por ID ou título.
- Retornar uma lista vazia quando não houver resultados.

**Falhas esperadas:**

- `400 INVALID_PAGE_PARAMETERS`: paginação ou ordenação inválida.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.

## E19 — Consultar álbum administrativo

**Implementação:** I11 — Issue #16.  
**Método/rota:** `GET /api/v1/admin/albums/{id}`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

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

**Regras:**

- Consultar o álbum pelo ID.
- Retornar os dados necessários para a tela administrativa.
- Incluir o resumo do artista relacionado.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ALBUM_NOT_FOUND`: álbum inexistente.

## E20 — Atualizar álbum

**Implementação:** I11 — Issue #16.  
**Método/rota:** `PUT /api/v1/admin/albums/{id}`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization` e `Content-Type: application/json`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

```json
{
  "title": "Álbum de Teste Atualizado",
  "artistId": 1,
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Response de sucesso:** HTTP 200.

```json
{
  "id": 1,
  "title": "Álbum de Teste Atualizado",
  "artist": {
    "id": 1,
    "name": "Artista de Teste"
  },
  "coverUrl": null,
  "releaseDate": "2026-10-13"
}
```

**Regras:**

- Exigir que o álbum exista.
- Exigir que o artista informado exista.
- Aplicar os mesmos limites do cadastro.
- PUT substitui os campos editáveis do recurso.
- Enviar campos opcionais como `null` para limpá-los.
- Não permitir alteração do ID pelo corpo.
- Registrar a operação com a identidade do administrador autenticado.

**Falhas esperadas:**

- `400 INVALID_ID`: ID de caminho inválido.
- `400 VALIDATION_ERROR`: campos inválidos.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ALBUM_NOT_FOUND`: álbum inexistente.
- `404 ARTIST_NOT_FOUND`: artista informado não existe.

## E21 — Remover álbum

**Implementação:** I11 — Issue #16.  
**Método/rota:** `DELETE /api/v1/admin/albums/{id}`.  
**Acesso:** Somente ADMIN.

**Headers:** access token no header `Authorization`.

**Parâmetro de caminho:** `id`, inteiro positivo.

**Request — corpo:**

Sem corpo.

**Response de sucesso:** HTTP 204.

Sem corpo.

**Regras:**

- Exigir que o álbum exista.
- Bloquear a exclusão se houver faixas ligadas ao álbum.
- Não excluir faixas automaticamente.
- Registrar a operação com a identidade do administrador autenticado.

**Falhas esperadas:**

- `400 INVALID_ID`: ID inválido.
- `401 UNAUTHORIZED`: autenticação ausente ou inválida.
- `403 FORBIDDEN`: usuário sem papel ADMIN.
- `404 ALBUM_NOT_FOUND`: álbum inexistente.
- `409 RESOURCE_HAS_DEPENDENCIES`: existem registros que impedem a exclusão.

## Health

O endpoint de saúde não utiliza o prefixo `/api/v1`.

```http
GET /actuator/health
```

Com as dependências verificadas saudáveis, a resposta esperada é HTTP 200:

```json
{
  "status": "UP"
}
```

A implementação deve definir quais dependências participam da verificação.

Uma dependência monitorada indisponível, como o banco, pode produzir uma resposta de indisponibilidade conforme a configuração do Actuator.

Não expor detalhes internos publicamente.

O health-check não substitui os testes de login, catálogo ou integração.

## Cliente web Thymeleaf

**Implementação:** I14 — Issue #19.

O cliente web utiliza sessão própria e os mesmos serviços de conta e catálogo do backend.

O login web não retorna o JSON de autenticação REST e não exige que o navegador armazene JWT.

### Rotas propostas

| Método e rota | Finalidade |
| --- | --- |
| `GET /login` | Exibir o formulário de login |
| `POST /login` | Autenticar e iniciar a sessão web |
| `GET /catalogo` | Exibir o catálogo para usuário com sessão válida |
| `POST /logout` | Encerrar a sessão web |

### Regras

- O formulário de login utiliza `username` para o e-mail e `password` para a senha, conforme a configuração adotada.
- Formulários que alteram estado devem enviar o token CSRF.
- O cookie de sessão utiliza `HttpOnly`.
- Utilizar o atributo `Secure` quando o ambiente tiver HTTPS.
- Acesso ao catálogo sem sessão válida redireciona para `/login`.
- Falhas de login devem apresentar mensagem genérica.
- O logout web encerra a sessão e exige proteção CSRF.
- Definir e documentar os redirecionamentos finais no PR de implementação.
- A invalidação das sessões anteriores após redefinição de senha deve ser implementada e testada.

O logout web e o logout REST são fluxos diferentes: o primeiro encerra a sessão do navegador; o segundo revoga o refresh token informado.

## Telas dos links de e-mail

Telas propostas para os fluxos de confirmação e recuperação:

```http
GET /confirmar-email?token=TOKEN_CONFIRMACAO_FICTICIO
GET /redefinir-senha?token=TOKEN_RESET_FICTICIO
```

### Regras

- GET apenas apresenta a tela ou o formulário.
- A confirmação e a redefinição que alteram estado devem ocorrer por POST.
- A confirmação deve utilizar o fluxo de E02.
- A redefinição deve utilizar o fluxo de E07.
- Tokens reais não devem aparecer em logs ou evidências.
- Se a equipe adotar outras telas ou endereços, atualizar os textos dos e-mails e a configuração `APP_PUBLIC_BASE_URL`.

## Integração com PHP e mobile

### Painel PHP

- O painel se comunica com a API por HTTP.
- O painel não acessa o MySQL diretamente.
- O administrador autentica utilizando o fluxo REST.
- Os tokens permanecem na sessão PHP, no servidor.
- Chamadas administrativas enviam o access token no header `Authorization`.
- O backend verifica o papel ADMIN em cada operação protegida.
- O painel deve tratar erros de validação, acesso negado, falha de conexão e respostas inválidas.

### Aplicativo mobile

- O aplicativo se comunica com a mesma API REST.
- O access token permanece em memória.
- O refresh token utiliza armazenamento seguro do sistema.
- A senha não deve ser armazenada.
- Após renovação, substituir os dois tokens.
- Ao encerrar a sessão, remover os tokens locais.
- A URL da API precisa ser acessível pelo dispositivo.
- Falhas de rede e expiração da autenticação devem ser tratadas na interface.

## Como atualizar esta documentação após implementar

Para cada endpoint:

1. Preparar dados fictícios.
2. Executar uma chamada real.
3. Comparar método, rota, headers, corpo e resposta com o documento.
4. Conferir os cenários de sucesso e os erros relevantes.
5. Registrar a verificação no PR.
6. Vincular o PR à Issue correspondente.
7. Corrigir divergências entre documentação e implementação.

Se uma decisão mudar, atualizar os documentos e avisar as áreas consumidoras no mesmo PR.

Não escrever “implementado” ou “testado” somente porque um exemplo JSON foi produzido.

Swagger/OpenAPI e coleções do Postman são ferramentas opcionais. Para o escopo escolar, este Markdown e procedimentos reproduzíveis de validação são suficientes.

## Checklist da documentação

- [X] Métodos e rotas estão definidos.
- [X] Requisitos de autenticação e autorização estão indicados.
- [X] Headers necessários estão documentados.
- [X] Parâmetros, tipos e limites estão descritos.
- [X] Requests e responses possuem exemplos fictícios.
- [X] Status HTTP e códigos de erro estão definidos.
- [X] Efeitos sobre conta, tokens e registros estão explicados.
- [X] Prazos de autenticação estão consistentes com as decisões da equipe.
- [X] PHP e mobile possuem informações suficientes para consumir os endpoints.
- [ ] Implementações já concluídas foram comparadas com chamadas reais e vinculadas aos respectivos PRs.

O último item deve acompanhar a implementação dos endpoints. Ele não precisa ser marcado para considerar concluída apenas a elaboração inicial da documentação da Issue #6.
