# API Java / Spring Boot

A API será a fonte única de verdade e também servirá o cliente web com Thymeleaf. O painel PHP nunca deve acessar MySQL diretamente.

- Java 17+, Maven e MySQL 8.x.
- `mvn spring-boot:run` para iniciar localmente, após configurar as variáveis de banco.
- Flyway versiona a estrutura de banco em `src/main/resources/db/migration/`.
- O filtro JWT e os endpoints ainda são placeholders. A configuração de segurança bloqueia todas as rotas não-health por padrão. Não a afrouxe para `permitAll()` como solução temporária.
- Antes de desenvolver uma funcionalidade, atualize entidades, DTOs, serviços, testes e contrato de API. Nunca exponha entidades JPA diretamente no JSON.
