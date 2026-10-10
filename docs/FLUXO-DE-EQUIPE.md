# Fluxo da equipe de 9 pessoas

## Sugestão de squads

| Squad | Pessoas | Escopo inicial |
|---|---:|---|
| Backend Java | 4 | Autenticação/segurança; entidades e migrations; catálogo/streaming; e-mail, playlists, sincronização e testes de integração. Dividir explicitamente os arquivos e contratos para reduzir conflitos. |
| Mobile React Native | 3 | Navegação e telas; consumo da API/autenticação; player, downloads/offline e sincronização. Adicionar bibliotecas nativas em PR próprio e testar compatibilidade. |
| Admin PHP | 2 | Estrutura MVC e sessão; integração via `ApiClient`; dashboard, listagem e upload por endpoints da API. Não criar conexão direta ao MySQL. |

Nomeiem um mantenedor do repositório e um responsável pela integração/release. Esses papéis podem ser acumulados por integrantes das squads; não é necessário que todos sejam administradores do GitHub.

## Branches

- `main`: versão estável/publicável. Nunca usar para trabalho diário.
- `develop`: integração das três squads.
- `feature/<squad>-<tarefa>`: funcionalidade nova, criada a partir de `develop`.
- `fix/<squad>-<problema>`: correção.

Exemplo de início de tarefa:

```bash
git switch develop
git pull origin develop
git switch -c feature/backend-auth-jwt
# editar, testar e revisar o diff
git add caminho/do/arquivo
git commit -m "feat(api): inicia contrato de autenticação"
git push -u origin feature/backend-auth-jwt
```

Depois, abra Pull Request para `develop`. Peça revisão de outra pessoa, responda às observações e só faça merge após os testes acordados. Se `develop` avançar durante o trabalho, sincronize sua branch conforme a convenção combinada; se não tiver certeza sobre `rebase` ou resolução de conflito, peça ajuda antes de forçar push.

## Configuração inicial no GitHub

1. Crie um repositório privado vazio; extraia o ZIP e envie os arquivos iniciais.
2. Adicione os oito colegas restantes como colaboradores. Dê permissão de escrita somente a quem precisa; reserve administração para poucas pessoas.
3. Crie e envie a branch `develop`.
4. Ative proteção de `main` e `develop` quando o plano do GitHub permitir: PR obrigatório, pelo menos uma aprovação, conversas resolvidas e checks automatizados assim que existirem. Desabilite force-push e exclusão dessas branches.
5. Se o plano da conta não oferecer proteção para repositório privado, mantenham a regra explícita de nunca enviar diretamente a `main`/`develop`, ou usem uma configuração de organização/plano que ofereça a regra.
6. Crie Issues para tarefas e associem cada PR a uma Issue. Evitem que duas pessoas assumam o mesmo arquivo principal sem alinhar.

## Git diário: comandos úteis

```bash
git status
git fetch origin
git branch --all
git diff
git log --oneline --graph --decorate -15
```

- Antes de começar: `git status` e atualização da branch-base.
- Antes de commitar: confira `git diff` e garanta que segredos e artefatos não entraram.
- Evite commits enormes e mensagens como `alterações` ou `final`.
- Não use `git push --force` em branch compartilhada sem combinar com a equipe.
- Nunca resolva conflito apagando mudanças de outra pessoa sem entender a diferença.
- Não edite o mesmo arquivo de configuração central em várias branches ao mesmo tempo; indique uma pessoa responsável e peça revisão.

## Contratos de integração

Antes de implementar telas e endpoints em paralelo, concordem e documentem: prefixo `/api/v1`, campos JSON, status HTTP, política de JWT/refresh, papéis (`USER`, `ADMIN`, `PREMIUM` se aplicável), formato de erros, upload multipart e datas em UTC. O backend publica um contrato e as demais squads implementam contra esse contrato; mudanças incompatíveis precisam de aviso e teste integrado.
