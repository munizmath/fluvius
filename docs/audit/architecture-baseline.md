# Architecture Baseline - Fluvius

Date: 2026-06-14
Status: baseline inicial para implementacao das melhorias 1-21

## Stack Atual

- Gerador estatico: Eleventy.
- Fonte principal: `src/`.
- Saida de build: `_site/`.
- Assets publicos: `assets/`.
- Layout compartilhado: `src/_includes/base.njk`.
- Dados globais: `src/_data/`.
- Validacao local: `npm run validate`.

## Paginas Publicas Migradas

| Pagina | Fonte | URL de saida |
| --- | --- | --- |
| Inicio | `src/pages/index.njk` | `/index.html` |
| Servicos | `src/pages/servicos.njk` | `/servicos.html` |
| Projetos | `src/pages/portfolio.njk` | `/portfolio.html` |
| Metodologia | `src/pages/metodologia.njk` | `/metodologia.html` |
| Insights | `src/pages/insights.njk` | `/insights.html` |
| Quem Somos | `src/pages/sobre.njk` | `/sobre.html` |
| Plataforma | `src/pages/plataforma.njk` | `/plataforma.html` |
| Contato | `src/pages/contato.njk` | `/contato.html` |
| Privacidade | `src/pages/privacidade.njk` | `/privacidade.html` |
| Obrigado | `src/pages/obrigado.njk` | `/obrigado.html` |
| 404 | `src/pages/404.njk` | `/404.html` |

## Fontes Unicas

- Navegacao: `src/_data/navigation.json`.
- Dados institucionais e contato: `src/_data/site.json`.
- Servicos: `src/_data/services.json`.
- Setores: `src/_data/sectors.json`.
- Projetos/cases: `src/_data/projects.json`.
- Taxonomia e jornadas: `src/_data/taxonomy.json`.

## Decisoes

- Rotas `.html` foram mantidas para compatibilidade com GitHub Pages sem redirects.
- Formulario real esta bloqueado por provedor: `BLOCKED_PROVIDER`.
- Novas imagens especificas estao bloqueadas ate existir material aprovado: `BLOCKED_ASSET_SOURCE`.
- A pagina interna de design system fica em `/_internal/design-system/index.html` no build, mas nao entra no sitemap.

## Gates

```bash
npm run validate
```

O gate executa build e valida HTML gerado, metadados, referencias locais, `alt` em imagens, JSON-LD, `sitemap.xml` e `robots.txt`.
