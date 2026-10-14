# Escopo Do Projeto



**Issue:** I01. **Revisão do escopo:** proposta de 13/10/2026, para a equipe confirmar.

## v0.1.0 — Fundação

Entregar contas, confirmação de e-mail, login, renovação/saída, recuperação de senha, permissões USER/ADMIN, metadados do catálogo e administração inicial de artistas/álbuns. Disponibilizar a base web, PHP e Android integrada e reproduzível localmente.

A primeira versão é uma demonstração da fundação. Ela não toca áudio. Player/streaming, upload de faixas, playlists, download, offline e publicação na VPS pertencem às versões seguintes.

## Simplificações solicitadas

* Sem planos pagos, pagamento, assinatura comercial ou papel PREMIUM nos fluxos do app escolar.
* Sem contrato comercial, documentação jurídica de licenciamento, DRM ou licença de reprodução offline com prazo/revalidação.
* Sem Spring Cloud Contract ou ferramenta de testes de contrato como exigência do projeto.
* Sem implantação em VPS para provar a v0.1.0: o teste local integrado é suficiente.
* A documentação da API continua: nomes de campos, rotas, JSON, códigos HTTP e permissões permitem que as três squads se comuniquem corretamente.

## O que continua necessário

Login, senha protegida, autorização e tokens temporários de conta continuam necessários. A expiração do **access token de login** trata da sessão autenticada; não é uma licença de música. O token de recuperação de senha também não é licença.

Para um offline escolar posterior, a proposta é baixar o áudio disponibilizado para a demonstração, guardar os metadados locais e reproduzir sem internet. Não será exigida conexão para renovar licença. Ainda será preciso definir onde guardar/remover os arquivos e como mostrar falhas de download. Use faixas próprias ou disponibilizadas para uso na demonstração.

## Ajustes no material antigo e no banco

A V1 existente contém o papel `PREMIUM` e a coluna obrigatória `downloads.license\\\_valid\\\_until`. Isso não torna a funcionalidade implementada. Na aplicação escolar, utilizem somente USER/ADMIN. Não é preciso destruir registros existentes para iniciar a fundação.

Quando a Issue de download/offline entrar no escopo, a squad Java deverá criar uma **nova migration** para adaptar a tabela e retirar a dependência de licença; a squad mobile deverá retirar da especificação os bloqueios por validade de licença. Não editem `V1\\\_\\\_create\\\_tables.sql` já compartilhada/aplicada para simular essa alteração. A limpeza de PREMIUM deve avaliar referências antes de remover o papel.

Nos requisitos antigos, substituam “licença offline por 7 dias e revalidação” por “reprodução dos arquivos baixados sem exigência de licença temporal”. Removam metas de cobrança e plano PREMIUM. Atualizem o README para apresentar esse escopo escolar.

## Se o prazo não comportar todos os fluxos

I07/refresh e três clientes simultâneos aumentam a carga. Se necessário, a equipe pode negociar uma versão menor com login que pede nova autenticação ao expirar e somente um cliente integrado inicialmente. Registre essa decisão e altere as Issues/Milestone antes de declarar a versão pronta; não marque como concluído um refresh que não foi implementado. Este pacote preserva as 16 tarefas combinadas e documenta o fluxo completo proposto.

