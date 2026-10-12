<!--
COMO PREENCHER
1. Use um título Conventional Commits: tipo(escopo): mudança concreta.
   Exemplos de tipos: feat, fix, docs, refactor, test, ci, chore.
2. Preencha as seções principais. Remova os blocos técnicos que não se aplicam.
3. Marque uma caixa somente após verificar o item. Para algo não aplicável,
   remova o item e registre a justificativa no campo correspondente.
4. Enquanto houver implementação, teste ou decisão pendente, mantenha o PR como Draft.
5. Configure Assignees, Reviewers, Labels, Milestone e Projects na interface do GitHub.
   Escrever esses dados no corpo do PR não configura os campos automaticamente.
6. Não inclua senhas, tokens, dados pessoais reais ou áudio sem autorização nas evidências.
-->

## Objetivo e resultado

<!-- Explique o problema, a mudança e o comportamento esperado. Evite apenas listar arquivos. -->
**Problema ou necessidade:**

**Solução implementada:**

**Resultado esperado / antes e depois:**

## Issues e organização da entrega

| Campo | Preenchimento |
| --- | --- |
| Issue principal | <!-- Número ou URL da tarefa. Toda mudança deve ter uma Issue. --> |
| Outras Issues relacionadas | <!-- Links ou “Nenhuma”. --> |
| Project | <!-- URL do quadro; confirmar que a Issue está nele. --> |
| Milestone | <!-- Entrega prevista, igual à da Issue; ou “Não se aplica” com motivo. --> |
| Labels | <!-- Labels reais selecionadas na interface, coerentes com tipo e área. --> |
| Responsável | <!-- Conta responsável pela mudança; definir também em Assignees. --> |
| Revisor(es) | <!-- Conta(s) solicitada(s) em Reviewers, incluindo áreas afetadas. --> |

<!--
VÍNCULO E FECHAMENTO
- Para PR de tarefa com base develop: mencione a Issue e faça o vínculo manual
  em Development, com permissão adequada. Use “Relacionado a #NUMERO”.
- Closes/Fixes/Resolves na descrição só têm efeito de fechamento/vínculo automático
  quando o PR tem como destino a branch padrão. Se ela for main, o merge em develop
  não fecha a Issue automaticamente.
- Para PR destinado à branch padrão que conclui a tarefa: use “Closes #NUMERO”.
- Para tarefa parcial: use referência simples, sem palavra de fechamento.
- Release com várias Issues: use uma expressão completa de fechamento para cada
  Issue realmente concluída. Não feche tarefas com critérios ainda pendentes.
Substitua NUMERO pelo número real e mantenha abaixo somente a forma apropriada.
-->
**Referência ou fechamento das Issues:**

## Escopo

<!-- Marque todas as áreas realmente alteradas. -->
- [ ] API / backend Java
- [ ] Cliente web Thymeleaf
- [ ] Painel administrativo PHP
- [ ] App React Native
- [ ] Banco / migrations Flyway
- [ ] Infraestrutura / publicação
- [ ] CI / configuração do repositório
- [ ] Documentação

**Principais alterações:**

- <!-- Mudança concreta e seu propósito. -->

**Fora do escopo / continuação:**
<!-- Informe “Nenhum” ou vincule as Issues que continuarão o trabalho. -->

## Critérios de aceite

<!-- Copie os critérios relevantes da Issue e vincule uma evidência para cada um.
Se uma entrega parcial foi combinada, registre-a na Issue e neste PR. -->
| Critério | Como foi verificado | Resultado / evidência |
| --- | --- | --- |
| <!-- Critério concreto. --> | <!-- Teste ou verificação. --> | <!-- Passou, falhou ou pendente; link quando houver. --> |

## Validação

<!--
Preencha conforme a alteração deste PR.
Inclua somente verificações relevantes e realmente realizadas.
Quando um campo não se aplicar, escreva “Não se aplica” e explique brevemente.
Não inclua senhas, tokens ou dados pessoais nas instruções e evidências.
-->

### Ambiente e preparação

**Ambiente utilizado:**
<!-- Sistema operacional, versões relevantes, navegador ou dispositivo. -->

**Pré-requisitos:**
<!-- Serviços necessários, configuração e dados fictícios para reproduzir a validação. -->

### Como conferir a alteração

<!-- Descreva passos concretos para outra pessoa verificar a entrega.
Para documentação, indique arquivos, conteúdo, links e formatação a conferir.
Para código, indique a pasta de execução, comandos e ações necessárias.
Adicione ou remova passos conforme o escopo.
-->

1. Preparar ou acessar: `<ambiente, arquivo ou tela>`.
2. Executar ou conferir: `<comando, ação ou conteúdo>`.
3. Verificar: `<comportamento ou resultado esperado>`.

**Resultado esperado:**
<!-- Explique o resultado que comprova os critérios de aceite da Issue. -->

### Verificação realizada pelo autor

<!-- Registre o que foi verificado e o resultado observado.
Podem ser testes automatizados, verificações manuais ou revisão de documentação.
Não marque como aprovado algo que ainda não foi conferido.
-->

| Verificação | Comando ou procedimento utilizado | Resultado observado |
| --- | --- | --- |
| `<item verificado>` | `<como foi conferido>` | `<resultado>` |

**Cenários adicionais verificados:**
<!-- Quando aplicável: entrada inválida, acesso negado, falha de rede,
ausência de dados, responsividade ou regressão em outro módulo. -->

### Evidências

<!-- Inclua links de execução da CI, saída resumida de comandos,
screenshots ou gravações quando ajudarem o revisor.
Se não forem necessárias, explique como reproduzir a verificação.
-->

### Pendências e limitações

**O que não foi verificado:**
<!-- Informe “Nenhum” ou descreva a verificação pendente. -->

**Motivo e impacto:**
<!-- Explique por que não foi verificado e o que isso impede de confirmar. -->

**Próxima ação:**
<!-- Informe como resolver a pendência e vincule uma Issue, se necessário.
Pendências que impeçam cumprir os critérios de aceite mantêm o PR em Draft.
-->

## Impactos, compatibilidade e dependências

**Áreas e squads afetadas:**

**Dependências de outras entregas:**
<!-- Links de PRs/Issues que precisam entrar antes; ou “Nenhuma”. -->

**Contrato ou comportamento alterado:**
<!-- Rotas, JSON, códigos HTTP, configurações, schema, formatos locais ou “Nenhum”. -->

**Mudança incompatível:** <!-- Não / Sim. Se sim, explicar consumidores afetados e plano de transição. -->

**Documentação atualizada:**
<!-- Caminhos/links do contrato, README, instruções de operação ou “Não se aplica” com motivo. -->

## Publicação e recuperação

<!-- Para PR sem impacto operacional, escreva “Não se aplica” e justifique.
Merge em develop não implica publicação em produção. -->
**Risco e efeitos possíveis:**

**Ações necessárias para publicar:**
<!-- Ordem dos módulos; migrations; variáveis novas (somente nomes); serviços ou permissões. -->

**Plano de recuperação:**
<!-- Como retornar à versão anterior; backup/restore se houver mudança em dados.
Reverter código não desfaz automaticamente migrations ou arquivos de áudio. -->

## Checklist do autor

- [ ] Issue vinculada, critérios de aceite definidos e escopo conferido.
- [ ] Branch de destino correta: tarefa para `develop`; release aprovada para `main`, salvo exceção documentada.
- [ ] Assignees, Reviewers, Labels, Milestone e Project configurados quando aplicáveis.
- [ ] Revisei o diff: sem segredos, dados reais, logs, backups, dependências instaladas ou artefatos de build.
- [ ] Documentei os passos de teste, os resultados e as limitações; verifiquei os critérios desta entrega.
- [ ] Atualizei a documentação necessária e registrei impactos nos outros módulos.
- [ ] Checks exigidos para esta mudança passaram; se ainda não existe CI, registrei as verificações manuais.
- [ ] O PR está pronto para revisão, sem pendência que impeça o aceite.

**Itens não aplicáveis e justificativas:**

<details>
<summary>Validações específicas — manter somente os blocos aplicáveis</summary>

### API, segurança e cliente web

- [ ] Entradas são validadas; responses usam DTOs e erros/status seguem o contrato.
- [ ] Autenticação, papéis e propriedade dos recursos foram testados, incluindo acesso negado.
- [ ] Tokens, sessão, cookies e CSRF foram tratados conforme o fluxo alterado, sem exposição de credenciais.
- [ ] Regras de negócio permanecem na camada de serviço; clientes não contornam a API para gravar dados.
- [ ] Alterações no cliente web foram verificadas no navegador, incluindo páginas privadas sem sessão.

### Banco e migrations

- [ ] Criei uma migration nova; não reescrevi migration já aplicada ou compartilhada.
- [ ] Testei a migration em banco vazio e na atualização de uma base de teste existente, quando aplicável.
- [ ] Verifiquei relacionamentos, restrições e índices afetados, sem depender de dados de produção.
- [ ] Documentei alterações destrutivas, compatibilidade entre versões e recuperação de dados.

### Upload e streaming

- [ ] Upload valida permissão, tamanho e conteúdo; o nome/caminho final é controlado pela API.
- [ ] Áudio fica fora da raiz pública; o backend não carrega o arquivo completo na memória para atender intervalos.
- [ ] Testei reprodução/seek e respostas `200`, `206`, `416`, arquivo ausente e acesso negado, conforme a mudança.
- [ ] Os arquivos de teste têm autorização de uso e não incluem conteúdo indevido no repositório.

### Painel PHP

- [ ] Operações usam a API; o painel não acessa o MySQL diretamente.
- [ ] Autorização e sessão administrativa foram verificadas; tokens não chegam ao navegador.
- [ ] Falhas, timeouts e respostas inválidas da API são tratados sem expor segredos ou stack traces.
- [ ] Formulários e operações de escrita têm validações e proteção apropriada, incluindo CSRF quando aplicável.

### Mobile, offline e sincronização

- [ ] Registrei o dispositivo/plataforma testado; dependências nativas foram verificadas quando alteradas.
- [ ] Testei player, navegação e erros de rede afetados; background e reinício quando pertinentes.
- [ ] Downloads usam armazenamento protegido e chaves seguras, sem credenciais embutidas.
- [ ] Testei modo avião, reinício do app, licença expirada e revalidação, conforme o escopo.
- [ ] Testei interrupção de download, integridade e falta de espaço quando o fluxo foi alterado.
- [ ] A fila de sincronização persiste, trata conflitos/reenvios e não duplica efeitos ao repetir eventos.

### Infraestrutura e CI

- [ ] Novas configurações estão documentadas por ambiente, sem valores secretos.
- [ ] HTTPS, portas expostas e permissões foram verificados conforme o escopo; banco e serviços internos não foram publicados.
- [ ] Health-check, logs e reinício dos serviços foram testados quando afetados.
- [ ] Backup/restore e retorno de versão foram demonstrados quando a mudança depende desses procedimentos.
- [ ] Workflows usam permissões mínimas; checks obrigatórios concluem em todos os PRs aos quais se aplicam.

### Documentação e interface

- [ ] Links, Markdown, tabelas e diagramas foram conferidos na visualização do GitHub.
- [ ] Instruções correspondem aos arquivos e comportamentos atuais; recursos futuros estão identificados.
- [ ] Mudanças de interface incluem evidências e verificação de responsividade, estados de erro e acessibilidade relevantes.

</details>

## Revisão e conclusão

<!-- Bloco para o revisor/mantenedor. Não marcar em nome de outra pessoa. -->
- [ ] Outra pessoa revisou o diff e verificou a evidência dos critérios de aceite.
- [ ] Conversas e pedidos de alteração foram resolvidos; dependências de integração foram atendidas.
- [ ] Checks exigidos passaram e não há conflito pendente; a revisão corresponde à versão atual do PR.

**Após o merge — responsável e ação:**
<!-- Atualizar o Project e a Issue; indicar versão/tag quando houver release.
No fluxo develop/main, distinguir “integrado em develop” de “disponível na release”.
Não marcar a Issue como concluída apenas porque um PR parcial foi mesclado.
Conferir automações do Project: status de PR e status de Issue podem ter regras diferentes. -->
