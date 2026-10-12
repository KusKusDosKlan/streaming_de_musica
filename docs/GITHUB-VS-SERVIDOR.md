# O que vai para o GitHub e o que vai para o Windows Server

## Princípio

O GitHub guarda **código-fonte e histórico de desenvolvimento**. O Windows Server guarda **a implantação em execução e os dados operacionais**. O servidor não deve ser usado como pasta compartilhada em que nove pessoas editam código diretamente.

## Matriz de decisão

| Item | GitHub? | Windows Server? | Orientação |
|---|---|---|---|
| Código Java, PHP e TypeScript | Sim | Cópia publicada do código PHP e artefato compilado da API | O source é revisado no GitHub; a produção recebe uma release aprovada. |
| `pom.xml`, `composer.json`, `package.json` e arquivos de lock | Sim | Não são dados do servidor; usados para compilar/instalar durante publicação | Versione também `composer.lock` e `package-lock.json` quando forem gerados. |
| Arquivos `.env.example` e YAML sem segredos | Sim | Não precisa copiá-los como segredos; use-os como referência | São modelos/documentação. Nunca devem conter credenciais válidas. |
| `.env`, senhas de banco, token de serviço, `JWT_SECRET`, senha SMTP | **Não** | Sim, por variáveis de ambiente ou gerenciador seguro | Restringir leitura à conta do serviço e aos administradores necessários. |
| Migrações `db/migration/V*.sql` (Flyway) | Sim | Aplicadas ao MySQL pelo Flyway durante a implantação | Não versionar dump de produção como se fosse migration. |
| Dados do MySQL de produção | **Não** | Sim, no MySQL Server 8.x | Fazer backup controlado fora do GitHub. Nunca exportar dados pessoais para issues/PRs. |
| Arquivos de áudio enviados e capas privadas | **Não** | Sim, por exemplo em `D:\StreamingApp\storage\audio\` | Manter permissões restritas e verificar direitos de uso. Não servir como diretório de escrita pública do IIS. |
| Upload temporário do painel PHP | Não | Sim, temporário; limpar após processar | O fluxo envia o arquivo à API Java; a API decide armazenamento e metadados. |
| Logs e relatórios operacionais | Não | Sim, pasta de logs com rotação e permissões | Redigir tokens, senhas e dados pessoais nos logs. |
| Backup (`mysqldump`, áudio, configurações) | **Não** | Sim, em destino de backup separado e protegido | Backups devem ter política de retenção e teste de restauração; não confiar no Git. |
| `streaming-app.jar` compilado | Não no histórico normal do source | Sim, como artefato implantado; idealmente vindo de CI/release | Construir com `mvn clean package`; copie apenas o JAR publicado e identificado. |
| Pasta `vendor/` do PHP | Não | Gerada na publicação com Composer | Em implantação: `composer install --no-dev --optimize-autoloader`. |
| `node_modules/`, cache Gradle, `target/`, builds | Não | Não necessário como fonte de produção | São dependências instaladas/cache/saídas de build. |
| Fontes de `android/` e `ios/` | Sim, quando o projeto nativo tiver sido gerado | Não são executados no servidor IIS | Versionar os projetos nativos; ignorar `Pods`, build, caches, `node_modules` e APK/AAB. |
| APK/AAB/IPA do app | Normalmente não no código-fonte | Não no IIS como aplicação de servidor | Distribuir por release, repositório de artefatos ou canal da instituição. |
| Certificado TLS público e chave privada | A configuração-modelo pode ser documentada; **chave privada nunca** | Sim, instalada/renovada no servidor | Nunca enviar `.pfx`, `.p12`, `.key` ou senha do certificado ao GitHub. |
| Configuração do IIS / WinSW / NSSM | Modelo sanitizado/documentação: sim | Configuração ativa no servidor | Remover senhas, tokens, IPs privados que não precisam ser públicos e caminhos sensíveis do modelo commitado. |
| Coleção Postman sem segredos, contratos e testes | Sim | Não | Use variáveis de ambiente locais e não compartilhe tokens reais. |

## Exemplo de organização no servidor

```text
D:\StreamingApp\
├── app\
│   └── streaming-app.jar        # release aprovada da API
├── storage\
│   └── audio\                  # arquivos reais; fora do repositório Git
├── logs\                       # logs rotacionados
└── backups\                    # destino protegido; idealmente fora do disco de produção

D:\Sites\StreamingAdmin\        # versão publicada do painel PHP
```

O MySQL é instalado como serviço do Windows. O IIS termina HTTPS na porta pública 443 e encaminha as rotas para os serviços internos conforme a configuração aprovada. O JAR roda como serviço do Windows por WinSW/NSSM. A pasta de áudio deve ser gravável apenas pela conta de serviço responsável; o diretório não deve ser um repositório Git.

## Variáveis a configurar fora do Git

### API Java

- `SPRING_PROFILES_ACTIVE=prod`
- `DB_URL` (JDBC para o MySQL do servidor)
- `DB_USERNAME` e `DB_PASSWORD`
- `JWT_SECRET` (gerado aleatoriamente, longo e privado)
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`
- `STORAGE_AUDIO_DIR=D:\StreamingApp\storage\audio`
- `APP_PUBLIC_BASE_URL` (domínio HTTPS real, quando definido)

Os nomes acima são exemplos de variáveis; o responsável pelo backend precisa confirmar que todos estão conectados ao `application.yml` antes do deploy. Nunca compartilhe os valores em chat público, repositório ou PR.

### Painel PHP

- `STREAMING_API_BASE_URL` (endereço HTTPS da API)
- `STREAMING_ADMIN_API_TOKEN` ou mecanismo de autenticação de serviço escolhido pela equipe

O painel PHP não deve receber usuário/senha do banco MySQL. A API é a única camada que acessa o banco e valida as operações de catálogo.

## Publicação segura

1. Integrar e testar por Pull Request.
2. Criar release/tag de um commit aprovado de `main`.
3. Compilar o JAR, instalar dependências PHP sem dependências de desenvolvimento e empacotar a versão mobile separadamente.
4. Fazer backup do banco e do storage antes de migration/deploy; confirmar um plano de rollback.
5. Copiar os artefatos ao servidor por canal administrativo seguro, configurar as variáveis e permissões, executar migrations e validar health-check.
6. Nunca fazer `git push` da máquina de produção nem editar arquivos de produção como fluxo normal de desenvolvimento.
