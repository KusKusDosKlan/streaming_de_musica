# Sistema de Streaming de Música

Monorepositório inicial para o projeto acadêmico descrito no documento técnico. A solução é composta por **API/Web Java Spring Boot**, **painel administrativo PHP MVC** e **app mobile React Native**. A API Java é a fonte única de verdade; o painel PHP consome a API e não acessa o MySQL diretamente.

> **Estado do repositório:** estrutura inicial e arquivos-base. Autenticação JWT completa, catálogo, upload/streaming de áudio, reprodução offline, sincronização e deploy ainda precisam ser implementados e testados pela equipe. Não é uma aplicação pronta para produção.

## Estrutura

- `api-java-backend/`: API REST, player web Thymeleaf, segurança, persistência JPA e migrações Flyway.
- `admin-panel-php/`: painel MVC PHP, cliente HTTP da API e telas administrativas.
- `mobile-app-reactnative/`: aplicação móvel, telas e camadas para API, player, downloads e dados offline.
- `docs/GITHUB-VS-SERVIDOR.md`: o que versionar no GitHub e o que guardar apenas no Windows Server.
- `docs/FLUXO-DE-EQUIPE.md`: fluxo de branches, Pull Requests e organização dos nove integrantes.

## Regra de ouro: GitHub não é o servidor de produção

**Versione no GitHub** o código-fonte, migrations SQL, arquivos de dependência, testes, documentação e exemplos sem segredos (`.env.example`). **Não versione** senhas reais, tokens, chaves privadas, banco de dados de produção, backups, logs, nem arquivos de áudio carregados. Esses dados ficam em locais protegidos no servidor. O APK/AAB é distribuído por um canal próprio; não é executado pelo IIS.

## Ferramentas de desenvolvimento

- Git e conta GitHub para todos os integrantes.
- Java 17+ e Maven para o backend. O `pom.xml` usa Spring Boot 3.5.x e Java 17 como base inicial.
- MySQL 8.x para o banco local/de desenvolvimento; Workbench é opcional.
- PHP 8.2+ e Composer para o painel.
- Node.js 22.13+ para o app React Native 0.87; o ambiente Android precisa de Android Studio, JDK e SDK compatíveis. Para compilar iOS é necessário macOS com Xcode.
- IntelliJ IDEA para Java e VS Code para PHP/React Native são sugestões, não obrigações.

## Executar o backend localmente

1. Instale MySQL e crie um banco vazio chamado `streaming_app` e um usuário local de desenvolvimento.
2. Configure variáveis de ambiente a partir dos nomes em `api-java-backend/.env.example` (não renomeie o arquivo para `.env` e o versione; configure as variáveis no terminal/IDE).
3. Na pasta `api-java-backend/`, execute:

   ```bash
   mvn spring-boot:run
   ```

4. O Flyway aplica `src/main/resources/db/migration/V1__create_tables.sql` ao iniciar. O projeto ainda está em fase de estruturação; endpoints funcionais serão adicionados nas tarefas de backend.

Variáveis locais comuns: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `STORAGE_AUDIO_DIR`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` e `JWT_SECRET`. Não use senha real no README, issue, commit ou Pull Request.

## Instalar dependências do painel PHP

Na pasta `admin-panel-php/`, configure as variáveis `STREAMING_API_BASE_URL` e `STREAMING_ADMIN_API_TOKEN` no ambiente local e execute:

```bash
composer install
```

O painel não deve ter credenciais de banco MySQL nem conexão direta ao banco. O token de serviço é um segredo e não pode ser colocado em `config/api.php` como texto fixo.

## Preparar o app React Native

Esta estrutura inclui os arquivos de camadas/telas da aplicação, mas não contém os projetos nativos completos gerados pelo CLI. Na pasta `mobile-app-reactnative/`, crie o projeto base com a versão definida pelo time e integre os arquivos `src/` e `App.tsx`. Na data de criação deste scaffold, a versão estável consultada é React Native 0.87; confirme a compatibilidade das bibliotecas de áudio/offline antes de adicioná-las.

```bash
npx @react-native-community/cli@latest init StreamingMobile --version 0.87.0
```

**Atenção:** faça essa geração fora do repositório ou em uma pasta temporária, compare os arquivos e integre os diretórios `android/` e `ios/` gerados, preservando os arquivos de plataforma. Versione os fontes nativos e os arquivos Gradle/Xcode relevantes; ignore apenas caches, dependências instaladas e saídas de build. Não coloque `node_modules/` no Git.

## Fluxo de trabalho resumido

1. Criem um repositório **privado** no GitHub e adicionem os nove integrantes com permissão adequada.
2. Mantenham `main` estável e `develop` como integração.
3. Cada tarefa começa em uma branch `feature/...` ou `fix/...` baseada em `develop`.
4. Façam commits pequenos, enviem a branch e abram Pull Request para `develop`; outra pessoa revisa e o autor resolve comentários.
5. A equipe testa o conjunto integrado. Releases aprovadas seguem de `develop` para `main` por Pull Request.
6. Só então publiquem artefatos versionados no Windows Server. Não desenvolvam diretamente nos arquivos em produção.

Detalhes práticos e limites entre GitHub/servidor estão em `docs/`.
