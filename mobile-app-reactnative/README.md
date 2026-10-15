# Aplicativo mobile — Streaming de Música

Aplicativo desenvolvido em React Native para consumir a API Java do projeto e disponibilizar os recursos de música no dispositivo.

## Estado atual

Esta pasta contém uma estrutura inicial de código. Os fluxos ainda possuem implementações pendentes e o aplicativo não está funcional de ponta a ponta.

Os projetos nativos completos de Android e iOS ainda não estão incluídos. A presença dos arquivos em `src/` não significa que o aplicativo já possa ser compilado ou instalado.

## Escopo da v0.1.0

A primeira versão concentra o trabalho mobile em:

- Preparar o projeto executável para Android.
- Configurar o endereço da API por ambiente.
- Implementar o login.
- Armazenar e utilizar os tokens conforme as decisões da equipe.
- Consultar e apresentar o catálogo.
- Tratar carregamento, ausência de dados e falhas da API.
- Documentar a execução e as verificações realizadas.

Player, download de músicas e reprodução offline serão desenvolvidos em etapas posteriores.

## Organização do código

A estrutura inicial de `src/` separa responsabilidades como:

- Comunicação HTTP com a API.
- Persistência local.
- Estado da aplicação.
- Serviços e regras do cliente.
- Hooks.
- Telas.

As telas devem utilizar os serviços do aplicativo para acessar dados. Regras de negócio e autorização continuam sendo responsabilidade da API Java.

O aplicativo não acessa o MySQL diretamente.

## Preparação do projeto

1. Definir e registrar a versão de React Native adotada pela equipe.
2. Gerar o projeto base e os arquivos nativos necessários.
3. Integrar a estrutura existente de `src/` ao projeto gerado.
4. Configurar o ambiente Android e a comunicação com a API.
5. Registrar neste README os comandos reais de instalação, execução e build.
6. Validar a execução em emulador ou dispositivo e registrar a evidência na Issue correspondente.

Os comandos devem ser documentados depois da definição do projeto base e do gerenciador de pacotes utilizado.

## Comunicação com a API

A base REST utiliza o prefixo `/api/v1`.

Configure uma URL que o emulador ou dispositivo consiga alcançar. No celular, `localhost` aponta para o próprio celular, e não para o computador que executa o backend.

Em testes pela rede local, utilize o endereço do computador que hospeda a API e confirme que o dispositivo consegue acessá-lo.

Referências:

- [Comunicação da API](../docs/api/COMUNICACAO_API_v0.1.0.md)
- [Decisões da equipe](../docs/api/DECISOES_DA_EQUIPE.md)

## Autenticação

- O access token tem validade de 10 minutos.
- O campo `expiresIn` informa essa validade em segundos: `600`.
- O refresh token tem validade de 24 horas.
- Uma renovação bem-sucedida substitui os dois tokens.
- O access token fica em memória.
- O refresh token deve utilizar armazenamento seguro do sistema.
- A senha do usuário não deve ser armazenada.
- Senhas e tokens não devem aparecer em logs ou evidências.

A biblioteca de armazenamento seguro deve ser escolhida e validada durante a implementação.

## Reprodução offline — etapa futura

O modo offline deverá permitir:

- Baixar músicas disponibilizadas pela API.
- Armazenar os arquivos no espaço do aplicativo.
- Reproduzir arquivos já baixados sem conexão.
- Identificar downloads concluídos, incompletos ou indisponíveis.
- Tratar interrupções de download e falta de espaço.
- Sincronizar informações com o servidor quando aplicável.

No escopo escolar definido, não haverá licença temporal de reprodução nem revalidação periódica obrigatória para ouvir arquivos já baixados.

A expiração dos tokens continua sendo aplicada às chamadas autenticadas à API. Ela não representa uma licença de reprodução offline.

## Versionamento

Versionar:

- Código-fonte.
- Arquivos de configuração sem segredos.
- Manifesto de dependências e arquivo de lock adotado.
- Projetos nativos gerados, quando fizerem parte da estrutura escolhida.
- Instruções necessárias para reproduzir o ambiente.

Não versionar:

- `node_modules/`.
- Caches e arquivos temporários.
- Dependências instaladas, como `Pods/`.
- Diretórios e arquivos gerados pelo build.
- Chaves de assinatura.
- Senhas e tokens.
- APKs e AABs no histórico do código-fonte.

## Validação

Cada PR deve registrar somente verificações realmente realizadas.

Conforme o fluxo alterado, conferir:

- Login válido e inválido.
- Conta sem confirmação de e-mail.
- Carregamento e listagem do catálogo.
- Ausência de dados.
- Falha de conexão.
- Expiração e renovação de tokens.
- Encerramento da sessão.

Os testes de player, download e reprodução offline serão exigidos quando esses recursos entrarem no escopo de implementação.

## Fluxo de contribuição

Utilizar a Issue correspondente, criar a branch a partir de `develop` atualizada e abrir o PR para `develop`.

Consulte o [fluxo de equipe](../docs/FLUXO-DE-EQUIPE.md) para organização, revisão e integração das alterações.
