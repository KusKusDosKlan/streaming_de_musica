# App React Native

O código de `src/` é a organização inicial por API, banco local, estado, serviços, hooks e telas. Os fluxos estão como TODO; o app ainda não está funcional de ponta a ponta.

Esta pasta ainda não inclui os projetos de plataforma completos `android/` e `ios/`. Gere um projeto base com a versão de React Native aprovada pela equipe e integre os arquivos da estrutura antes de tentar `run-android`/`run-ios`. Os arquivos nativos gerados devem ser versionados; não versionar `node_modules`, caches Gradle, `Pods`, saídas de build, chaves de assinatura nem APK/AAB.

Use uma URL de API que o dispositivo realmente consiga alcançar. `localhost` no celular aponta para o próprio celular, não para a máquina de desenvolvimento.

A camada offline requer desenho de licença, criptografia de armazenamento, revalidação periódica e sincronização idempotente. Não salvar áudio cru como arquivo comum se isso contrariar a regra de licença definida no documento técnico.
