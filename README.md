# Fluvius Engenharia

Site institucional estático da Fluvius Engenharia, focado em Recursos Hídricos, Geotecnia, Meio Ambiente e gestão técnica de projetos complexos.

O projeto agora usa **Eleventy** para gerar HTML estático a partir de templates, dados e páginas fonte. O resultado continua sendo um site simples de publicar em hospedagens estáticas.

## Stack

- **Eleventy** para build estático.
- **Nunjucks** para layouts e páginas.
- **CSS** em `assets/fluvius.css`.
- **JavaScript vanilla** em `assets/site.js`.
- **Dados estruturados** em `src/_data/`.
- **Assets locais** em `assets/`.

## Estrutura Principal

```text
.
├── assets/                 # CSS, JS, imagens, favicon
├── docs/
│   ├── audit/              # baseline, contratos, imagens e releases
│   └── plan/               # plano de melhorias arquiteturais
├── src/
│   ├── _data/              # site, navegação, serviços, setores, projetos
│   ├── _includes/          # layout, head, header, footer, breadcrumbs
│   └── pages/              # páginas públicas
├── tools/                  # migração e validação
├── .eleventy.js
├── package.json
└── package-lock.json
```

## Como Rodar

Instale as dependências:

```bash
npm install
```

Rode em modo desenvolvimento:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:8080
```

Gerar build estático:

```bash
npm run build
```

Validar antes de publicar:

```bash
npm run validate
```

O build final sai em:

```text
_site/
```

## Páginas

- `src/pages/index.njk`: página inicial.
- `src/pages/servicos.njk`: serviços técnicos.
- `src/pages/portfolio.njk`: projetos/cases.
- `src/pages/metodologia.njk`: método de trabalho.
- `src/pages/plataforma.njk`: plataforma digital.
- `src/pages/insights.njk`: conteúdos técnicos.
- `src/pages/sobre.njk`: posicionamento institucional.
- `src/pages/contato.njk`: canais comerciais.
- `src/pages/privacidade.njk`: política de privacidade.
- `src/pages/obrigado.njk`: confirmação futura de envio.
- `src/pages/404.njk`: página não encontrada.

## Dados Centralizados

- `src/_data/site.js`: nome, domínio, contato, imagem social e ambiente.
- `src/_data/navigation.json`: menu principal.
- `src/_data/services.json`: serviços.
- `src/_data/sectors.json`: setores.
- `src/_data/projects.json`: projetos/cases.
- `src/_data/taxonomy.json`: jornadas, disciplinas e CTAs.

## Contato e Formulário

O formulário real fica marcado como `BLOCKED_PROVIDER` em `src/_data/site.js` enquanto `CONTACT_FORM_ENDPOINT` não estiver definido.

Enquanto o provedor de deploy/formulário não for definido, a página de contato usa WhatsApp e e-mail como canais reais. Quando o provedor for escolhido:

- Netlify: usar Netlify Forms.
- Vercel: usar Serverless Function.
- Outro host estático: usar Formspree ou provedor equivalente aprovado.

Não coloque tokens, chaves ou segredos no HTML, JS ou dados versionados.

## Deploy

### GitHub Pages

Configuração recomendada:

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `_site` |

O projeto está preparado para GitHub Pages com domínio próprio:

```text
fluviusengenharia.com.br
```

O arquivo `CNAME` é copiado para `_site/` no build.

As páginas principais usam rotas limpas, como:

```text
/servicos/
/portfolio/
/metodologia/
/contato/
```

As URLs antigas `.html` continuam existindo como redirecionadores estáticos para compatibilidade.

## Analytics e Search Console

GA4 e Search Console ficam prontos por variável de ambiente, sem ID falso no código:

```bash
GA_MEASUREMENT_ID=G-XXXXXXXXXX GOOGLE_SITE_VERIFICATION=xxxxx npm run build
```

Enquanto esses valores não forem fornecidos, o status é `BLOCKED_ANALYTICS_ID`.

### Netlify

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `_site` |

### Vercel

| Campo | Valor |
| --- | --- |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `_site` |

## Checklist Antes de Publicar

```bash
npm run validate
rg -n -i "(api[_-]?key|secret|token|password|credential|private[_-]?key|bearer)" .
```

Também conferir manualmente:

- Home, serviços, projetos, metodologia, insights, sobre, plataforma e contato.
- Menu desktop e mobile.
- Console do navegador sem erro.
- CTAs chegando em contato, WhatsApp ou e-mail.

## Auditoria de Release

Use `docs/audit/releases/YYYY-MM-DD.md` para registrar:

- commit/versão;
- URL publicada;
- comandos executados;
- resultado do `npm run validate`;
- pendências como `BLOCKED_PROVIDER` e `BLOCKED_ASSET_SOURCE`;
- caminho de rollback.
