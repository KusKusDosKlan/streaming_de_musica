<!--
COMO PREENCHER

1. Utilize um título Conventional Commits:
   tipo(escopo): mudança concreta

   Exemplos de tipos:
   feat, fix, docs, refactor, test, ci e chore.

2. Preencha as seções principais e mantenha somente os blocos técnicos
   aplicáveis à alteração.

3. Marque uma caixa somente depois de conferir o item.
   Para itens não aplicáveis, remova-os e registre a justificativa.

4. Mantenha o PR como Draft enquanto houver pendência que impeça cumprir
   os critérios de aceite da entrega.

5. Configure Assignees, Reviewers, Labels e Milestone na interface
   quando aplicáveis. Confirme que a Issue está no Project.
   O quadro do projeto acompanha as Issues; não é necessário adicionar
   este PR como outro cartão.

6. Escrever nomes, labels ou milestone nesta descrição não configura
   automaticamente os campos da interface.

7. Não inclua senhas, tokens ou dados pessoais reais nas instruções,
   exemplos, logs ou evidências.
-->

## Objetivo e resultado

**Problema ou necessidade:**
<!-- Explique o problema concreto ou a necessidade atendida. -->

**Solução implementada:**
<!-- Descreva a mudança e como ela resolve o problema. -->

**Resultado esperado / antes e depois:**
<!-- Explique o comportamento resultante.
Para documentação, indique o que passou a estar definido ou explicado. -->

## Issues e organização da entrega

| Campo | Preenchimento |
| --- | --- |
| Issue principal | <!-- Número e título da Issue. --> |
| Outras Issues relacionadas | <!-- Links ou “Nenhuma”. --> |
| Project da Issue | <!-- Nome ou URL do quadro. --> |
| Milestone | <!-- Versão prevista; ou “Não se aplica”, com motivo. --> |
| Labels | <!-- Labels selecionadas na interface. --> |
| Responsável | <!-- @usuario; configurar também em Assignees. --> |
| Revisor(es) | <!-- @usuario ou equipe; solicitar em Reviewers. --> |
| Branch de origem | <!-- Ex.: docs/6-comunicacao-api. --> |
| Branch de destino | <!-- Normalmente develop; main para integração de release. --> |

**Referência ou fechamento das Issues:**

<!--
Para tarefa integrada em develop:
Relacionado a #NUMERO

Para PR destinado à branch padrão que conclui a Issue:
Closes #NUMERO

Se a branch padrão for main, o merge de um PR em develop não fecha
automaticamente a Issue pelo uso de Closes.

Para entregas parciais, use uma referência simples e registre o que falta.

Para release com várias Issues concluídas, utilize uma expressão completa
por Issue, por exemplo:

Closes #NUMERO
Closes #OUTRO_NUMERO

Substitua os exemplos pelos números reais.
-->

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

- <!-- Alteração concreta e sua finalidade. -->

**Fora do escopo / continuação:**
<!-- Informe “Nenhum” ou descreva o trabalho futuro, vinculando as Issues. -->

## Critérios de aceite

<!--
Copie os critérios relevantes da Issue e registre como foram conferidos.

Se a entrega for parcial, deixe isso explícito na Issue e neste PR.
Não indique que a Issue inteira foi concluída quando ainda há critérios pendentes.
-->

| Critério | Como foi verificado | Resultado / evidência |
| --- | --- | --- |
| <!-- Critério concreto. --> | <!-- Teste ou procedimento. --> | <!-- Resultado observado e link, quando houver. --> |

## Validação

<!--
Registre somente verificações relevantes e realmente realizadas.

Para alteração apenas de documentação, confira conteúdo, links e formatação.
Não é necessário executar o aplicativo se a mudança não depende disso.

Quando um campo não se aplicar, escreva “Não se aplica” e explique brevemente.
-->

### Ambiente e preparação

**Ambiente utilizado:**
<!-- Sistema operacional, versões relevantes, navegador, emulador ou dispositivo. -->

**Pré-requisitos:**
<!-- Serviços, configuração sem valores secretos e dados fictícios necessários. -->

### Como conferir a alteração

<!--
Escreva passos que outra pessoa consiga reproduzir.

Para código:
- Informe a pasta de execução.
- Inclua os comandos reais.
- Descreva as ações e os resultados a observar.

Para documentação:
- Informe os caminhos dos arquivos.
- Indique as seções, os links e as regras a conferir.

Substitua os exemplos abaixo pelos passos reais.
-->

1. Preparar o ambiente ou abrir: `<serviço, documento ou tela>`.
2. Executar, a partir de `<pasta ou estado inicial>`: `<comando ou ação>`.
3. Conferir: `<resultado esperado>`.
4. Verificar, quando aplicável: `<cenário de falha, permissão ou regressão>`.

**Resultado esperado:**
<!-- Descreva o resultado que comprova os critérios de aceite da entrega. -->

### Verificação realizada pelo autor

<!--
Informe o procedimento realmente executado e o resultado observado.
Não use apenas “testado” ou “funcionando”.
-->

| Verificação | Comando ou procedimento | Resultado observado |
| --- | --- | --- |
| <!-- Ex.: teste unitário, integração, navegação ou revisão de links. --> | <!-- Comando real e pasta; ou procedimento manual. --> | <!-- O que aconteceu e se corresponde ao esperado. --> |

**Cenários adicionais verificados:**
<!-- Quando aplicável: entrada inválida, acesso negado, falha de rede,
ausência de dados, responsividade ou regressão em outro módulo. -->

### Evidências

<!--
Inclua links da CI, saída resumida de comandos, screenshots ou gravações
quando ajudarem o revisor.

Remova segredos e dados reais.

Se não forem necessárias evidências adicionais, indique que a verificação
pode ser reproduzida pelos passos documentados.
-->

### Pendências e limitações

**O que não foi verificado:**
<!-- Informe “Nenhum” ou descreva a verificação pendente. -->

**Motivo e impacto:**
<!-- Explique a limitação e o que ela impede de confirmar. -->

**Próxima ação:**
<!-- Informe como resolver a pendência e vincule uma Issue quando necessário.
Pendências que impeçam cumprir os critérios de aceite mantêm o PR como Draft. -->

## Impactos, compatibilidade e dependências

**Áreas e equipes afetadas:**
<!-- Java, PHP, mobile, infraestrutura ou outra área envolvida. -->

**Dependências de outras entregas:**
<!-- Links de Issues/PRs necessários antes desta integração; ou “Nenhuma”. -->

**API ou comportamento alterado:**
<!-- Rotas, JSON, códigos HTTP, autenticação, configurações, schema,
formatos locais ou “Nenhum”. -->

**Mudança incompatível:**
<!-- Não / Sim.
Se sim, explique os consumidores afetados e como ocorrerá a adaptação. -->

**Documentação atualizada:**
<!-- Caminhos ou links dos documentos alterados.
Se não for necessário atualizar, explique brevemente. -->

## Publicação e recuperação

<!--
Para PR sem impacto operacional, informe “Não se aplica” e justifique.
A integração em develop não significa publicação em produção.
-->

**Risco e efeitos possíveis:**
<!-- Descreva os efeitos relevantes da alteração. -->

**Ações necessárias para publicar:**
<!-- Ordem dos módulos, migrations, nomes de variáveis novas,
serviços ou permissões. Não incluir valores secretos. -->

**Plano de recuperação:**
<!-- Explique como retornar ao estado anterior.
Se houver alteração de dados, informe o procedimento de recuperação.
Reverter código não desfaz automaticamente migrations ou arquivos. -->

## Checklist do autor

- [ ] A Issue está referenciada e o escopo corresponde aos critérios da entrega.
- [ ] A branch de destino está correta.
- [ ] Configurei responsáveis, revisores, labels e milestone quando aplicáveis.
- [ ] Confirmei que a Issue está no Project e com o status adequado.
- [ ] Revisei o diff e removi segredos, dados reais, logs desnecessários e artefatos.
- [ ] Registrei os passos de validação, os resultados observados e as limitações.
- [ ] Atualizei a documentação necessária e registrei os impactos nos outros módulos.
- [ ] Os checks exigidos passaram; quando ainda não há CI, registrei as verificações realizadas.
- [ ] Não há pendência que impeça o aceite do escopo apresentado.

**Itens não aplicáveis e justificativas:**
<!-- Explique os itens removidos ou as verificações que não se aplicam. -->

<details>
<summary>Validações específicas — manter somente os blocos aplicáveis</summary>

### API, autenticação e cliente web

- [ ] As entradas são validadas e as respostas utilizam DTOs.
- [ ] Status HTTP, campos JSON e erros seguem a documentação da API.
- [ ] Testei as regras de negócio alteradas, incluindo falhas relevantes.
- [ ] Testei autenticação, papéis e propriedade dos recursos quando afetados.
- [ ] Tokens, sessões, cookies e CSRF seguem o fluxo documentado.
- [ ] Prazos e respostas da autenticação estão consistentes entre código, documentação e testes.
- [ ] As regras de negócio permanecem na camada de serviço.
- [ ] O cliente web foi verificado no navegador, incluindo acesso a páginas privadas sem sessão.

### Banco e migrations

- [ ] Criei uma migration nova quando alterei o schema.
- [ ] Não reescrevi uma migration já aplicada ou compartilhada.
- [ ] Testei a criação em banco vazio e a atualização de uma base de teste, quando aplicável.
- [ ] Conferi relacionamentos, restrições e índices afetados.
- [ ] Registrei alterações destrutivas e o procedimento de recuperação quando necessário.

### Upload e streaming

- [ ] Uploads validam permissão, tamanho e conteúdo conforme o fluxo implementado.
- [ ] O nome e o caminho final dos arquivos são controlados pelo backend.
- [ ] Os arquivos de áudio ficam fora da raiz pública.
- [ ] O streaming não carrega o arquivo inteiro em memória para atender intervalos.
- [ ] Testei reprodução, busca de posição e respostas HTTP pertinentes ao comportamento alterado.
- [ ] Testei arquivo ausente, intervalo inválido e acesso negado quando aplicáveis.
- [ ] Utilizei arquivos de teste adequados, sem adicionar arquivos grandes desnecessários ao repositório.

### Painel PHP

- [ ] O painel utiliza a API Java e não acessa o MySQL diretamente.
- [ ] Testei a sessão administrativa e as permissões afetadas.
- [ ] Os tokens permanecem no servidor PHP, sem exposição ao navegador.
- [ ] Falhas, timeouts e respostas inválidas da API são tratados.
- [ ] Formulários possuem validação e proteção CSRF quando aplicável.
- [ ] Mensagens e logs não expõem credenciais ou detalhes internos indevidos.

### Mobile

- [ ] Registrei a plataforma, o emulador ou o dispositivo utilizado.
- [ ] Verifiquei as dependências nativas quando alteradas.
- [ ] Testei as telas e a navegação afetadas.
- [ ] Testei carregamento, ausência de dados e falhas de rede relevantes.
- [ ] Verifiquei expiração, renovação e remoção de tokens quando o fluxo foi alterado.
- [ ] O armazenamento de credenciais segue as decisões da equipe, sem salvar a senha.

### Download, reprodução offline e sincronização

<!--
Manter este bloco somente quando o PR alterar esses recursos.
Não é exigido para a fundação mobile de login e catálogo.

O escopo escolar não exige licença temporal de reprodução
nem revalidação periódica obrigatória de músicas já baixadas.
-->

- [ ] Os downloads utilizam o armazenamento do aplicativo.
- [ ] O app diferencia arquivos concluídos, incompletos e indisponíveis.
- [ ] Testei reprodução de arquivo baixado em modo avião.
- [ ] Testei a reprodução após reiniciar o aplicativo, quando aplicável.
- [ ] Testei interrupção de download e falta de espaço quando o fluxo foi alterado.
- [ ] A expiração da autenticação não foi utilizada como licença temporal de reprodução offline.
- [ ] Quando há sincronização, testei reenvios e interrupções sem duplicar os efeitos da mesma operação.

### Infraestrutura e CI

- [ ] As configurações necessárias estão documentadas por ambiente, sem segredos.
- [ ] Portas, permissões e HTTPS foram verificados conforme o ambiente e o escopo.
- [ ] Banco e serviços internos não foram expostos sem necessidade.
- [ ] Health-check, logs e reinício foram testados quando afetados.
- [ ] Backup e restauração foram verificados quando a alteração depende desses procedimentos.
- [ ] Os workflows utilizam as permissões necessárias ao trabalho executado.
- [ ] Os checks exigidos executam e concluem nos PRs aos quais se aplicam.

### Documentação e interface

- [ ] Conferi links, Markdown, tabelas e diagramas na visualização do GitHub.
- [ ] As instruções correspondem aos arquivos e comportamentos atuais.
- [ ] Recursos planejados estão identificados como futuros.
- [ ] Os exemplos utilizam dados fictícios e estão consistentes entre documentos.
- [ ] Mudanças de interface incluem as evidências e verificações relevantes de responsividade, erros e acessibilidade.

</details>

## Revisão e conclusão

<!--
Bloco para o revisor ou mantenedor.
O autor não deve marcar a revisão em nome de outra pessoa.
-->

- [ ] Revisei o diff e as evidências dos critérios de aceite.
- [ ] Os pedidos de alteração foram resolvidos.
- [ ] As dependências necessárias para integração foram atendidas.
- [ ] Os checks exigidos passaram e não há conflito pendente.
- [ ] A revisão corresponde à versão atual do PR.

**Após o merge — responsável e ação:**
<!--
Indique quem atualizará a Issue e o Project.

Para entrega de tarefa:
- Registrar o PR integrado na Issue.
- Atualizar os critérios efetivamente concluídos.
- Mover a Issue para o status correspondente.

Para release:
- Registrar a versão/tag quando aplicável.
- Vincular as Issues realmente entregues.

Não concluir uma Issue apenas porque um PR parcial foi integrado.
Distinguir integração em develop de disponibilidade em uma release.
-->
