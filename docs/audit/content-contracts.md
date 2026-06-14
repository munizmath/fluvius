# Content Contracts - Fluvius

Date: 2026-06-14
Status: contrato inicial para conteudo estruturado

## Service

Fonte: `src/_data/services.json`

Campos obrigatorios:

- `id`: slug estavel.
- `title`: nome publico.
- `summary`: resumo de uma frase.
- `items`: lista de entregas ou capacidades.
- `sectorTags`: ids existentes em `src/_data/sectors.json`.

## Sector

Fonte: `src/_data/sectors.json`

Campos obrigatorios:

- `id`: slug estavel.
- `title`: nome publico.
- `summary`: descricao curta.

## Case/Project

Fonte: `src/_data/projects.json`

Campos obrigatorios:

- `id`: slug estavel.
- `title`: nome publico.
- `sector`: id existente em setores.
- `discipline`: disciplina principal.
- `scope`: resumo do escopo.
- `deliverables`: lista de entregaveis.
- `image`: caminho publico da imagem.
- `alt`: texto alternativo especifico.
- `status`: `conteudo_parcial`, `pronto` ou `BLOCKED_ASSET_SOURCE`.

Pagina individual de case so pode ser criada quando houver:

- setor;
- problema;
- escopo;
- metodologia;
- entregaveis;
- resultado ou impacto;
- imagem aprovada ou motivo documentado de ausencia.

## Page

Fonte: `src/pages/*.njk`

Campos obrigatorios no frontmatter:

- `layout`;
- `permalink`;
- `title`;
- `description`;
- `navKey`;
- `breadcrumbs`.

## CTA

Fonte: `src/_data/taxonomy.json`

Campos obrigatorios:

- `id`;
- `label`;
- `url`.

CTAs que coletam dados devem apontar para `contato` ou para provedor definido em `src/_data/site.json`.
