# Painel administrativo PHP MVC

O painel consome endpoints HTTPS da API Java. **Não crie conexão PDO/MySQL neste módulo.** O fluxo de upload envia o áudio e metadados à API; a API valida e decide onde armazenar.

Instalação local: `composer install`, configure `STREAMING_API_BASE_URL` e `STREAMING_ADMIN_API_TOKEN` no ambiente. O token real não deve ser armazenado em `config/api.php` nem commitado. A pasta `vendor/` é criada pelo Composer e fica fora do Git.

O front controller é `public/index.php`; configure o servidor web para usar `public/` como document root, não a raiz completa do módulo.
