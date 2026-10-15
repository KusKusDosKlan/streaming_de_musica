# Sistema de Streaming de Música

Projeto acadêmico de uma plataforma de música com catálogo compartilhado, reprodução online e aplicativo com suporte futuro a músicas baixadas para uso offline.

A solução reúne uma API e um cliente web em Java Spring Boot, um painel administrativo em PHP e um aplicativo em React Native. O backend Java centraliza as regras de negócio, a autenticação, a autorização e o acesso ao MySQL.

> **Estado atual:** estrutura inicial dos módulos e documentação da fundação. Os principais fluxos ainda precisam ser implementados e testados. A versão funcional v0.1.0 ainda não foi concluída.

## Objetivo

Desenvolver um sistema integrado em que:

- O administrador organiza o catálogo por meio do painel PHP.
- O usuário consulta e reproduz músicas pela web ou pelo aplicativo.
- O aplicativo permite, em uma etapa posterior, reproduzir arquivos previamente baixados sem conexão.
- A equipe consegue executar e validar o projeto localmente antes da publicação em servidor.

O escopo escolar não inclui planos pagos, cobrança, DRM ou validade temporal obrigatória para reprodução offline.

## Arquitetura

| Componente | Responsabilidade |
| --- | --- |
| API Java | Disponibilizar endpoints REST e aplicar regras de conta, catálogo e administração |
| Web Thymeleaf | Apresentar as páginas do usuário, utilizando sessão e os serviços Java |
| Painel PHP | Oferecer a interface administrativa e consumir a API por HTTP |
| App React Native | Apresentar o catálogo e integrar os fluxos mobile |
| MySQL | Armazenar contas, metadados e relacionamentos |
| Armazenamento de áudio | Guardar os arquivos de música, com acesso controlado pelo backend nas versões de reprodução |

O painel PHP não acessa diretamente o MySQL. As operações administrativas passam pela API Java.

A API REST e o cliente web compartilham a camada de serviços. Assim, as regras de negócio permanecem centralizadas.

## Tecnologias

| Área | Base do projeto |
| --- | --- |
| Backend | Java 17, Spring Boot 3.5.16 e Maven |
| Web | Spring MVC e Thymeleaf |
| Persistência | Spring Data JPA, MySQL 8.x e Flyway |
| Segurança | Spring Security |
| E-mail | JavaMailSender e SMTP de teste |
| Administração | PHP e Composer |
| Mobile | React Native, React e TypeScript |

As versões declaradas nos manifests devem orientar a preparação do ambiente. Alterações de versão precisam ser combinadas e validadas pela equipe.

## Organização do repositório

| Caminho | Conteúdo |
| --- | --- |
| `api-java-backend/` | API REST, cliente web, serviços, persistência e testes Java |
| `admin-panel-php/` | Painel administrativo e cliente HTTP da API |
| `mobile-app-reactnative/` | Aplicativo e organização inicial dos recursos mobile |
| `docs/` | Escopo, comunicação da API e orientações da equipe |
| `.github/` | Templates e regras de colaboração |

No Java, os controllers recebem as requisições, os services aplicam as regras e os repositories acessam os dados. Os DTOs definem os campos de entrada e saída da API.

## Primeira versão: v0.1.0 — Fundação

A fundação prevê:

- Configuração dos ambientes locais.
- Banco versionado com Flyway.
- Cadastro, confirmação de e-mail e recuperação de senha.
- Login, renovação de acesso e logout.
- Permissões USER e ADMIN.
- Consulta paginada de metadados do catálogo.
- Administração inicial de artistas e álbuns.
- Integração básica com web, painel PHP e Android.
- Testes e documentação para reproduzir a execução.

**Esta versão ainda não exige tocar músicas.**

Player, streaming, upload de áudio, playlists, download, reprodução offline e publicação em servidor pertencem às etapas seguintes.

## Execução local

### Preparação

Para começar, configure:

- JDK 17 e Maven, instalado no sistema ou disponibilizado pela IDE.
- MySQL local.
- PHP e Composer para o painel.
- Ambiente Node/Android compatível para a preparação mobile.
- SMTP de teste para validar mensagens sem utilizar destinatários reais.

Utilize as variáveis descritas nos exemplos dos módulos. Não coloque senhas, tokens ou configurações privadas no Git.

Os arquivos `.env.example` são referências de configuração. Sua existência não significa que cada módulo carregue arquivos `.env` automaticamente.

### Java

Na pasta `api-java-backend`, configure as variáveis de banco e os serviços necessários. Depois execute:

```sh
mvn spring-boot:run
```

O endereço local padrão é:

```text
http://localhost:8080
```

O health-check está em:

```text
http://localhost:8080/actuator/health
```

A configuração inicial de segurança libera o health-check e bloqueia as demais rotas. Os endpoints documentados precisam ser implementados antes de serem utilizados pelos clientes.

### PHP

Na pasta `admin-panel-php`:

```sh
composer install
php -S 127.0.0.1:8000 -t public
```

A página inicial fica em:

```text
http://127.0.0.1:8000
```

A configuração definitiva de rotas, autenticação e integração será concluída na Issue #18.

### Mobile

A estrutura atual ainda precisa da integração do projeto nativo Android. A existência dos diretórios e scripts não comprova que o aplicativo já inicia.

A preparação e a validação do app fazem parte da Issue #17.

No emulador Android padrão, o endereço do computador hospedeiro normalmente utiliza `10.0.2.2`. Em aparelho físico, utilize um endereço do computador acessível pela rede local.

## Testes

Na pasta `api-java-backend`:

```sh
mvn test
```

O teste inicial existente é mínimo e não comprova os fluxos de conta, segurança ou catálogo.

As funcionalidades devem receber testes de regras de negócio, respostas HTTP e persistência conforme seu escopo. Testes com banco precisam utilizar uma base separada da utilizada no desenvolvimento.

Para alterações somente documentais, conferir conteúdo, exemplos, caminhos e apresentação no GitHub.

## Trabalho em equipe

A distribuição planejada é:

| Frente | Integrantes |
| --- | ---: |
| Java e web | 4 |
| Mobile | 2 |
| PHP | 2 |
| Infraestrutura | 1 |

Cada Issue deve ter um responsável principal e apoio definido. Alterações passam por branch própria e PR para `develop`.

A branch `main` recebe integrações aprovadas. A versão v0.1.0 será identificada por tag somente após a validação integrada da fundação.

Consulte o [fluxo da equipe](docs/FLUXO-DE-EQUIPE.md).

## Cuidados com dados e configuração

- Não versionar senhas, tokens, backups ou dados pessoais.
- Utilizar dados fictícios nos testes e nas evidências.
- Não expor hashes, caminhos físicos de armazenamento ou informações internas nas respostas públicas.
- Criar novas migrations para alterações do banco; não reescrever migrations compartilhadas ou aplicadas.
- Não versionar dependências instaladas, caches ou saídas de build.

## Documentação

- [Escopo do projeto](docs/ESCOPO_DO_PROJETO.md)
- [Índice da documentação da API](docs/api/api-contratos.md)
- [Comunicação da API v0.1.0](docs/api/COMUNICACAO_API_v0.1.0.md)
- [Decisões da equipe](docs/api/DECISOES_DA_EQUIPE.md)
- [Fluxo da equipe](docs/FLUXO-DE-EQUIPE.md)
- [GitHub e servidor](docs/GITHUB-VS-SERVIDOR.md)
- [Arquitetura de referência](docs/arquitetura-streaming.pdf)

As decisões ainda identificadas como propostas precisam ser revisadas pelas áreas envolvidas antes da implementação.
