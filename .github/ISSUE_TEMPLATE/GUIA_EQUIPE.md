# Guia da equipe: da Issue ao Pull Request

Este guia explica como organizar as tarefas do projeto **streaming_de_musica**, preencher o modelo `tarefa.md` e acompanhar o desenvolvimento até a revisão e a entrega.

**Repositório:** [KusKusDosKlan/streaming_de_musica](https://github.com/KusKusDosKlan/streaming_de_musica)

Este arquivo é um manual de consulta. Não é um template de Issue e não precisa de cabeçalho YAML.

## 1. Para que serve cada recurso

| Recurso | Uso pela equipe |
| --- | --- |
| Issue | Registrar uma tarefa, um erro ou uma melhoria e definir quando estará pronto. |
| Assignee | Identificar quem conduz a tarefa. Para começar, usar um responsável principal. |
| Label | Classificar o assunto, o tipo de mudança ou um bloqueio. |
| Milestone | Agrupar tarefas de uma entrega, como Fundação ou Streaming online. |
| Project | Visualizar as tarefas e seus estados em um quadro. |
| Branch | Desenvolver a alteração separadamente da base compartilhada. |
| Pull Request (PR) | Apresentar o código ou documento alterado, explicar como testar e pedir revisão. |
| Reviewer | Conferir a alteração e pedir ajustes ou aprovar. |

A Issue descreve **o que será feito e o resultado esperado**. O PR descreve **o que foi alterado e como foi verificado**. Uma Issue pode precisar de mais de um PR, mas só estará concluída quando todos os critérios combinados forem atendidos.

## 2. Preparação inicial pelo mantenedor

Faça esta configuração uma vez e confira com a equipe:

1. Manter o modelo de tarefa em `.github/ISSUE_TEMPLATE/tarefa.md`.
2. Corrigir o cabeçalho desse arquivo: em template Markdown, usar `about`, não `description`.
3. Manter o template de PR em `.github/pull_request_template.md`.
4. Integrar os templates à branch padrão, atualmente `main`, para que apareçam no GitHub.
5. Criar as labels, Milestones e o Project escolhidos pelo grupo; os nomes abaixo são sugestões, não configurações já aplicadas.
6. Conferir permissões dos integrantes e regras de revisão de `main` e `develop`.

Cabeçalho correto de `tarefa.md`:

```yaml
---
name: Tarefa técnica
about: Registrar uma atividade do projeto
labels: ["triagem"]
---
```

Crie a label `triagem` no repositório. O restante de `tarefa.md` continua com os campos Objetivo, Módulo, Critérios de aceite, Dependências / contrato de API e Como validar.

A label triagem indica que a Issue ainda precisa ser analisada e organizada antes de alguém começar.
O mantenedor ou a equipe confere:
- Se a tarefa está clara e não é duplicada.
- Qual squad será responsável.
- Quais são a prioridade, as dependências e os critérios de aceite.
- Em qual Milestone ela entra.

Depois disso, remove triagem, adiciona as labels adequadas, como backend e funcionalidade, e coloca a tarefa em A fazer no Project.
### Labels sugeridas

| Categoria | Labels sugeridas |
| --- | --- |
| Área | `backend`, `web`, `php`, `mobile`, `banco`, `infra`, `documentacao` |
| Tipo | `funcionalidade`, `bug`, `melhoria`, `teste` |
| Acompanhamento | `triagem`, `bloqueado` |

Use pelo menos uma label de área e uma de tipo nas tarefas de desenvolvimento. Uma tarefa pode ter mais de uma área quando houver integração. Após definir escopo e responsável, remova `triagem`. Use `bloqueado` com um comentário que explique o impedimento e a dependência.

Evite criar nomes diferentes para o mesmo assunto. A prioridade pode ficar em um campo do Project, sem duplicar essa informação em várias labels.

### Milestones sugeridas

| Milestone | Entrega |
| --- | --- |
| M0 — Fundação | Contratos, entidades, migrations, autenticação e autorização. |
| M1 — Streaming online | Endpoint de áudio e players web/mobile online. |
| M2 — Administração | Painel PHP, catálogo e upload via API. |
| M3 — Offline e sincronização | Downloads protegidos, dados locais e sincronização. |
| M4 — Infraestrutura | Publicação, HTTPS, serviços e backup restaurado. |
| M5 — Consolidação | Busca, playlists, relatórios e testes finais integrados. |

Datas devem refletir o planejamento real da equipe. Uma Milestone agrupa entregas; não substitui os critérios de aceite de cada Issue.

### Project e estados

Prefira um quadro compartilhado da Organization, com as Issues do repositório:

| Estado sugerido | Quando usar |
| --- | --- |
| A fazer | Tarefa definida e ainda não iniciada. |
| Em andamento | Responsável começou a trabalhar. |
| Em revisão | PR pronto, com testes registrados e revisão solicitada. |
| Integrado em develop | Alteração revisada e integrada; aguarda a versão em `main`. |
| Concluído | Critérios atendidos e mudança entregue na versão aprovada. |

O estado **Integrado em develop** é uma recomendação para o fluxo `develop` → `main`. Se o quadro tiver somente quatro estados, registre que a tarefa aguarda release e não a marque como Concluído antes da entrega combinada.

Confira os workflows do Project. Um PR mesclado e sua Issue são itens diferentes: uma automação pode concluir o PR sem concluir a tarefa. Não presumir que todos os estados serão atualizados sozinhos.

## 3. Como escrever uma Issue agora

1. Acesse o repositório e abra **Issues → New issue**.
2. Escolha **Tarefa técnica**.
3. Escreva um título específico: ação + resultado. Exemplo: **Backend: listar faixas com paginação**.
4. Preencha o corpo usando o modelo abaixo.
5. Selecione responsável, labels, Milestone e Project na interface do GitHub, conforme suas permissões. Se algum campo não estiver disponível, peça ao mantenedor.
6. Publique e anote o número gerado pelo GitHub.

Não edite `tarefa.md` a cada tarefa: ele é o modelo compartilhado. Cada integrante preenche uma nova Issue no GitHub.

### O que escrever em cada campo

| Campo | Conteúdo esperado |
| --- | --- |
| Objetivo | Por que a tarefa existe e qual resultado ela deve produzir. |
| Módulo | Marcar somente as partes envolvidas. |
| Critérios de aceite | Resultados observáveis que comprovam a entrega. |
| Dependências / contrato de API | Tarefas prévias, rotas, dados, permissões e decisões necessárias. |
| Como validar | Passos de teste e resultado esperado. |

### Exemplo preenchido — tarefa futura de backend

**Título:** Backend: listar faixas com paginação

Copie o exemplo abaixo para o corpo da Issue e adapte o contrato aos campos aprovados pelo grupo:

```markdown
## Objetivo

Permitir que o aplicativo e o cliente web consultem o catálogo em páginas,
sem carregar todas as faixas de uma vez.

## Módulo
- [x] API Java
- [ ] Painel PHP
- [ ] App React Native
- [ ] Infra / documentação

## Critérios de aceite
- [ ] GET /api/v1/tracks aceita page e size conforme o contrato aprovado.
- [ ] A resposta contém as faixas e os metadados de paginação combinados.
- [ ] Página sem resultados retorna uma lista vazia no formato padronizado.
- [ ] Parâmetros inválidos seguem a validação e os erros do contrato.
- [ ] Requisição sem autenticação recebe 401, conforme a segurança da API REST.
- [ ] O endpoint não expõe entidades JPA, segredos ou caminhos internos do storage.
- [ ] Testes da paginação e da autorização estão registrados no PR.

## Dependências / contrato de API

Depende do mapeamento de Track e da autenticação da API.
Vincular aqui as Issues reais dessas dependências.
Antes de implementar, alinhar o DTO de resposta com web e mobile.
A consulta passa pelo service/repository; não exige alteração do painel PHP.

## Como validar

1. Preparar banco de teste com faixas fictícias e usuário de teste.
2. Autenticar e solicitar page=0&size=2; conferir itens e paginação.
3. Solicitar a próxima página e verificar a ordenação acordada.
4. Consultar uma página sem resultados e conferir a resposta vazia.
5. Enviar parâmetros inválidos e repetir a consulta sem autenticação.
6. Registrar comandos, resultados e evidências sem tokens reais no PR.
```

Configuração desse exemplo na interface:

- **Assignee:** integrante responsável pelo backend.
- **Labels:** `backend` e `funcionalidade`.
- **Milestone:** entrega aprovada para o catálogo, por exemplo M0 — Fundação.
- **Project:** quadro da equipe, inicialmente em A fazer.

Uma checkbox no corpo não adiciona labels, responsável, Project ou Milestone automaticamente. Esses campos devem ser configurados no GitHub ou por automação previamente implantada.

### Tamanho e clareza

Uma Issue deve representar uma entrega que o grupo consiga revisar. Evite tarefas como “Fazer todo o mobile”. Separe, por exemplo, navegação, listagem de faixas, player online, download e sincronização; registre as dependências entre elas.

Para um bug, acrescente passos de reprodução, resultado atual, resultado esperado e ambiente. Para documentação, valide conteúdo, links e formatação em vez de exigir a execução de todos os módulos.

## 4. Como o responsável desenvolve a tarefa

Antes de começar, leia a Issue, confira as dependências e combine quem revisará. Atualize o Project para Em andamento e informe o início em um comentário.

Exemplo: suponha que a Issue criada recebeu o número **42**. O número é fictício; use o número real da sua tarefa.

No clone, com o trabalho anterior salvo e a árvore limpa:

```bash
git status
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c feature/backend-42-listar-faixas
```

Se ainda não houver `develop` local, crie a branch de acompanhamento com `git switch -c develop --track origin/develop`, desde que ela exista no remoto. Depois continue a partir dela.

Implemente, teste e confira o diff. Adicione apenas os arquivos da tarefa. O comando abaixo usa um placeholder: substitua `CAMINHO_DO_ARQUIVO` pelo caminho real; não execute esse nome literalmente.

```bash
git diff
git add CAMINHO_DO_ARQUIVO
git diff --staged
git commit -m "feat(api): adiciona listagem paginada de faixas"
git push -u origin feature/backend-42-listar-faixas
```

Não trabalhe diretamente em `main` ou `develop`. Antes de enviar, confira se não entraram senhas, tokens, dados reais, músicas, backups ou arquivos de build.

Se houver bloqueio, aplique a label `bloqueado` e comente: o que impede o trabalho, de qual Issue/decisão depende e quem precisa ajudar. Mudanças de escopo devem ser acordadas na Issue antes de ampliar o PR.

## 5. Como preencher e revisar o PR

1. Abra um PR da branch da tarefa para **`develop`**.
2. Use título claro, por exemplo `feat(api): adiciona listagem paginada de faixas`.
3. Preencha o template profissional: problema, solução, Issue, critérios, testes, impactos e limitações.
4. Na descrição, use **Relacionado a #42** para este exemplo de tarefa em `develop`.
5. Com permissão adequada, vincule manualmente em **Development**, pelo PR ou pela Issue.
6. Selecione o revisor na interface; confirme labels, Project e Milestone pertinentes. Esses campos não são herdados automaticamente só porque a Issue foi mencionada.
7. Enquanto faltarem implementação ou testes essenciais, mantenha o PR em **Draft**. Quando estiver pronto, solicite revisão e mova a Issue para Em revisão.

Os blocos técnicos do template de PR são condicionais. Mantenha os que se aplicam e registre a justificativa dos itens não aplicáveis. Não marque todos apenas para completar o formulário.

O revisor deverá conferir o diff, as evidências e os critérios da Issue. Se pedir mudanças, o autor corrige na **mesma branch**, faz novos commits e envia com `git push`; o PR será atualizado. Não é preciso abrir outro PR para cada correção.

O mantenedor integra após aprovação, verificações exigidas e resolução das conversas. O template orienta essa rotina; regras de proteção e CI precisam estar configuradas para impor bloqueios técnicos.

## 6. Como concluir a Issue e a entrega

No fluxo adotado, `develop` integra tarefas e `main` recebe a release aprovada:

1. Após merge em `develop`, registrar o PR na Issue e mover para Integrado em develop.
2. Testar o conjunto integrado e abrir o PR de release para `main`.
3. No PR destinado à branch padrão, usar `Closes #42` somente se a tarefa estiver realmente concluída. Para várias Issues, usar uma expressão completa para cada uma.
4. Após a integração em `main`, conferir o fechamento da Issue e o estado no Project; atualizar manualmente se necessário.
5. Registrar a tag/versão quando houver release. Publicação no servidor é uma atividade própria e deve ser validada por infraestrutura.

**Atenção ao fechamento:** `Closes`, `Fixes` e `Resolves` na descrição só são interpretados para esse vínculo automático quando o PR tem como destino a branch padrão. Se a padrão for `main`, colocá-los no PR para `develop` não fecha nem cria esse vínculo automaticamente.

Concluir uma tarefa de código não comprova, por si só, que a publicação no servidor ocorreu. Issues de infraestrutura ou entrega publicada precisam ter critérios que demonstrem essa etapa.

Se houver PR parcial, não feche a Issue antes de cumprir os critérios restantes. Se a correção falhar após a entrega, reabra a Issue ou registre uma nova Issue de bug vinculada à original, conforme a causa.

## 7. Rotina curta para a equipe

| Momento | Responsável | Ação |
| --- | --- | --- |
| Planejamento | Squad e mantenedor | Conferir escopo, dependências, responsável, Milestone e critérios. |
| Início | Autor | Assumir a Issue e atualizar o Project. |
| Durante o trabalho | Autor | Registrar bloqueios e decisões; avisar consumidores se o contrato mudar. |
| Revisão | Autor e revisor | Reproduzir a validação, corrigir e revisar a versão atual. |
| Integração | Mantenedor | Conferir aprovação/checks e integrar na base correta. |
| Release | Integração e infraestrutura | Validar `main`, versão, publicação e critérios operacionais pertinentes. |

Na reunião curta, cada pessoa informa: tarefa atual, próximo passo e bloqueio. As decisões e mudanças de escopo importantes ficam registradas na Issue para que o restante da equipe consiga acompanhar.

## 8. Onde colocar este guia e como ignorá-lo

Caminho solicitado para este arquivo:

```text
.github/ISSUE_TEMPLATE/GUIA_EQUIPE.md
```

O guia não possui `name` e `about` em frontmatter: não foi preparado para aparecer como opção de nova Issue. O template que deve aparecer é `tarefa.md`.

Para ignorar **somente este guia**, acrescente à `.gitignore` da raiz:

```gitignore
/.github/ISSUE_TEMPLATE/GUIA_EQUIPE.md
```

Não ignore `.github/`, a pasta `ISSUE_TEMPLATE/` nem `tarefa.md`: os templates precisam ser versionados para o GitHub disponibilizá-los à equipe.

Se quiser manter essa exclusão apenas no seu computador, coloque o mesmo padrão em `.git/info/exclude`, sem alterar a `.gitignore` compartilhada.

**Como compartilhar:** um guia ignorado e não versionado não chega aos colegas pelo clone. Envie uma cópia a cada integrante. Se todos precisarem consultar a mesma versão pelo repositório, a alternativa é manter o guia versionado em `docs/GUIA_EQUIPE.md`, sem ignorá-lo.

Se o guia já estiver sendo rastreado pelo Git, adicionar à `.gitignore` não o remove do histórico nem do acompanhamento. Caso a equipe decida retirá-lo do repositório e mantê-lo localmente, use `git rm --cached .github/ISSUE_TEMPLATE/GUIA_EQUIPE.md` e registre essa remoção em um PR. O comando preserva a cópia local; cópias não modificadas de outros integrantes poderão ser removidas ao receberem essa alteração, por isso distribua o guia antes.

## Referências

- [Criar uma Issue — GitHub Docs](https://docs.github.com/pt/issues/tracking-your-work-with-issues/using-issues/creating-an-issue)
- [Templates de Issues e PRs — GitHub Docs](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- [Vincular PR e Issue — GitHub Docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
- [Automações de Projects — GitHub Docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations)
- [Arquivos ignorados — documentação do Git](https://git-scm.com/docs/gitignore)

Os nomes de labels, Milestones e estados deste guia são propostas para a equipe. Ajuste-os à configuração aprovada no repositório e no Project.
