# Changelog

## 2026-06-14

- Introduzido build Eleventy com fontes em `src/` e saída em `_site/`.
- Centralizados layout, header, footer, navegação, contato, metadados e dados editoriais.
- Migradas páginas existentes para `src/pages/*.njk`.
- Adicionadas páginas profundas geradas para serviços e setores.
- Adicionados contratos de conteúdo, baseline arquitetural, registro de imagens e template de auditoria de publicação.
- Adicionado `npm run validate` com build, minificação de saída e validação de HTML/metadados/assets.
- Mantido formulário real como `BLOCKED_PROVIDER` até definição do provedor de deploy/formulário.
- Definido domínio `fluviusengenharia.com.br`, rotas limpas e redirecionadores estáticos para URLs `.html` antigas.
- Adicionados blocos de contratação, FAQ, ROI, depoimentos pendentes, equipe pendente, filtros de portfólio, WhatsApp flutuante e templates de artigo.
- Adicionado suporte condicional a GA4/Search Console por variáveis de ambiente.
- Removidos estilos inline das fontes Eleventy e geradas versões WebP dos assets principais.
