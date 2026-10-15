# Fluxo de trabalho da equipe

Este documento define como distribuir tarefas, trabalhar com Git, revisar alterações e acompanhar a entrega do projeto.

## Distribuição planejada

| Frente | Pessoas | Responsabilidade |
| --- | ---: | --- |
| Java e web | 4 | API, regras de negócio, segurança, banco, e-mail, cliente Thymeleaf e testes |
| Mobile | 2 | Aplicativo, integração com a API e recursos de reprodução nas etapas correspondentes |
| PHP | 2 | Painel administrativo, sessão e consumo autenticado da API |
| Infraestrutura | 1 | Ambiente local, automação de verificações e preparação futura dos servidores |

Cada tarefa deve ter uma pessoa responsável por conduzir o trabalho. Outros integrantes podem contribuir e revisar.

A squad informa quem participa, mas não substitui a definição de um responsável principal.

## Fonte das tarefas

As Issues registram o objetivo, o escopo, os critérios de aceite, as dependências e a validação esperada.

Antes de começar:

1. Conferir se a tarefa já existe.
2. Ler seus critérios e documentos relacionados.
3. Confirmar o responsável e os apoios.
4. Verificar se as dependências permitem iniciar.
5. Associar a Issue à Milestone e ao Project.

I01–I16 são identificadores do roteiro. No GitHub, utilizar os números reais, como #6, #7 e #8.

## Organização do Project

| Status | Significado |
| --- | --- |
| Backlog | Tarefa registrada, aguardando definição ou dependências |
| Ready | Escopo e responsável definidos; pode começar |
| In progress | Trabalho em andamento |
| In review | Entrega disponível e aguardando revisão |
| Done | Critérios atendidos, revisão concluída e alterações integradas |

O quadro principal acompanha Issues. Os PRs permanecem vinculados às tarefas e podem ser consultados na aba Pull requests do repositório.

Usar o filtro `is:issue` na visão principal evita misturar tarefas e PRs na contagem do quadro.

## Branches

| Branch | Uso |
| --- | --- |
| `main` | Histórico principal de entregas aprovadas |
| `develop` | Integração do trabalho das equipes |
| `docs/<numero>-<assunto>` | Documentação |
| `feat/<numero>-<assunto>` | Funcionalidade |
| `fix/<numero>-<assunto>` | Correção |

Exemplos:

- `docs/6-ajustes-documentacao`
- `feat/15-catalogo-paginado`
- `fix/15-validacao-paginacao`

Uma Issue pode ter mais de um PR quando a entrega precisar ser dividida.

## Início de uma tarefa

Com o diretório de trabalho sem alterações pendentes:

```sh
git status
git switch develop
git pull --ff-only origin develop
git switch -c feat/15-catalogo-paginado
```

Se houver alterações locais, resolva sua situação antes de trocar de tarefa. Não descarte trabalho para atualizar a branch.

## Durante o desenvolvimento

- Trabalhar somente no escopo combinado.
- Separar commits por mudanças compreensíveis.
- Conferir `git diff` antes de adicionar arquivos.
- Adicionar explicitamente os arquivos da tarefa.
- Atualizar a documentação quando alterar rotas, campos, regras ou configuração.
- Combinar previamente alterações em arquivos compartilhados, como SecurityConfig e migrations.

Exemplo de commit:

```sh
git add caminho/do/arquivo
git commit -m "feat(catalogo): adiciona consulta paginada de faixas"
git push -u origin feat/15-catalogo-paginado
```

Usar tipos como `feat`, `fix`, `docs`, `test`, `refactor`, `ci` e `chore` conforme a alteração.

Não usar force-push em branch compartilhada sem alinhamento.

## Pull requests

O PR da tarefa deve ter `develop` como destino e conter:

- Objetivo e resultado da alteração.
- Referência à Issue real.
- Principais mudanças e limites do escopo.
- Critérios relevantes e suas evidências.
- Passos de validação e resultados observados.
- Dependências e impactos em outras equipes.

Preencher o template conforme a alteração e remover blocos técnicos que não se aplicam.

Enquanto houver trabalho necessário para o aceite, manter o PR como Draft. Quando estiver pronto, solicitar revisão e mover a Issue para In review.

Não registrar como realizado um teste que não foi executado.

## Revisão

Outra pessoa confere o diff e as evidências relevantes antes do merge.

Quando a alteração modificar a comunicação entre módulos, os consumidores afetados também precisam conferir os formatos e efeitos.

Na documentação inicial da API, registrar a concordância de representantes de PHP e mobile.

O CODEOWNERS auxilia a solicitar revisões por área. Ele não substitui os critérios específicos de revisão da Issue.

Os integrantes não devem marcar aprovação em nome de outra pessoa.

## Aceite e fechamento

Marcar cada critério somente após verificar sua condição completa.

Documentação pronta não comprova endpoint funcionando. Teste unitário não comprova integração com banco ou cliente.

Depois da revisão e do merge em develop:

1. Conferir os critérios restantes.
2. Registrar o link do PR e o resultado da validação na Issue.
3. Fechar a tarefa quando seu escopo estiver concluído.
4. Atualizar o status do Project.

Como main é a branch padrão, não depender de `Closes #numero` em PR para develop para fechar automaticamente a Issue. O fechamento pode ser feito manualmente após o aceite.

Um PR parcial não encerra a tarefa inteira.

## Milestones e versões

A Milestone agrupa tarefas de uma entrega. Commits e PRs registram a evolução dos arquivos.

Não criar uma versão numerada para cada Issue.

Na v0.1.0, a fundação será considerada pronta após a validação integrada prevista na Issue #21.

Depois do aceite:

- Integrar a entrega aprovada em main.
- Identificar o commit com a tag v0.1.0.
- Publicar notas do que funciona e das limitações.

Atualizar documentação em main antes disso não significa que a versão funcional esteja concluída.

## Validação mínima

| Alteração | Conferência esperada |
| --- | --- |
| Documentação | Conteúdo, exemplos, caminhos e apresentação |
| Regra Java | Casos de sucesso e falha relevantes |
| API | Entrada, resposta, erro e permissão |
| Banco | Migration e restrições em base de teste |
| PHP/mobile/web | Fluxo afetado e tratamento de falhas |
| Infraestrutura | Comandos e configuração reproduzíveis |

Enquanto não houver CI, registrar as verificações locais. Quando os checks forem configurados, mantê-los alinhados aos testes que realmente existem.

## Configuração e dados

Não versionar senhas, tokens, dados pessoais, backups ou dependências instaladas.

Usar dados fictícios e bases separadas para testes que alteram registros.

O painel PHP acessa a API, sem conexão direta ao MySQL. Alterações do banco entram em novas migrations.

## Documentos relacionados

- [Escopo do projeto](ESCOPO_DO_PROJETO.md)
- [Documentação da API](api/api-contratos.md)
- [Decisões da equipe](api/DECISOES_DA_EQUIPE.md)
- [CODEOWNERS](../.github/CODEOWNERS)
- [GitHub e servidor](GITHUB-VS-SERVIDOR.md)
