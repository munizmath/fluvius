# Fluvius Architecture Improvements Plan

Status: DRAFT
Date: 2026-06-14
Scope: site institucional estatico em HTML/CSS/JS
Branch model: trunk-based em `main`, com commits pequenos e escopo explicito

## Status de Implementacao - 2026-06-14

| Fatia | Status | Evidencia |
| --- | --- | --- |
| PR 1 | DONE | `docs/audit/architecture-baseline.md`, `docs/audit/content-contracts.md` |
| PR 2 | DONE | Eleventy em `.eleventy.js`, `src/_includes/`, `package.json` |
| PR 3 | DONE | Head compartilhado, JSON-LD, breadcrumbs, `src/sitemap.njk` |
| PR 4 | DONE | `src/_data/services.json`, `src/_data/sectors.json` |
| PR 5 | PARTIAL | `src/_data/projects.json`; paginas individuais de case bloqueadas por conteudo insuficiente |
| PR 6 | DONE | Estilos inline removidos das fontes Eleventy; classes utilitarias/componentes adicionadas em `assets/fluvius.css` |
| PR 7 | PARTIAL | `docs/audit/image-registry.md`; WebP gerado no build; novas imagens setoriais seguem `BLOCKED_ASSET_SOURCE` |
| PR 8 | DONE | `assets/site.js` com foco, Escape, `aria-expanded`, fallback e reduced motion |
| PR 9 | DONE | Rotas limpas adotadas; URLs `.html` antigas mantidas como redirecionadores estaticos para GitHub Pages |
| PR 10 | PARTIAL | contato WhatsApp/e-mail-first; formulario real segue `BLOCKED_PROVIDER` |
| PR 11 | DONE | `npm run validate`, `tools/validate-site.mjs` |
| PR 12 | DONE | README atualizado, changelog e docs operacionais |
| PR 13 | DONE | contratos editoriais e dados estruturados |
| PR 14 | DONE | taxonomia, jornadas e breadcrumbs |
| PR 15 | PARTIAL | paginas profundas de servico e setor geradas; cases/landings seguem bloqueados por conteudo/fonte de trafego |
| PR 16 | DONE | `src/_data/site.js` com `SITE_ENV`, `SITE_BASE_URL`, `CONTACT_FORM_ENDPOINT` |
| PR 17 | PARTIAL | minificacao CSS/JS no build; redirects/cache dependem do host |
| PR 18 | PARTIAL | fallback tipografico existe; hospedagem local de fontes depende dos arquivos/licenca |
| PR 19 | DONE | `src/internal-design-system.njk` |
| PR 20 | PARTIAL | formulario condicional, consentimento e honeypot previstos quando houver endpoint; envio real bloqueado |
| PR 21 | DONE | `docs/audit/releases/README.md` |

## Status de Implementacao - Complemento 2026-06-14

- Adicionados blocos de "Como contratar", FAQ, ROI, depoimentos, equipe, campos de case, prazo desejado e tempo de resposta pendente.
- Adicionado `docs/audit/owner-inputs-checklist.md` para controlar fotos, imagens, textos, cases, métricas e credenciais aguardadas dos donos.
- Adicionados filtros reais por setor no portfolio.
- Adicionado botão flutuante de WhatsApp em todas as páginas.
- Adicionada estrutura de artigos em Insights.
- Adicionado suporte condicional a GA4/Search Console sem IDs fictícios.
- Domínio real preparado como override futuro via `SITE_BASE_URL`, mas preview atual permanece em `https://munizmath.github.io/fluvius/` sem `CNAME`.

## Objetivo

Executar as 20 melhorias arquiteturais apontadas para o site institucional Fluvius sem transformar o projeto em uma aplicacao complexa. O alvo e aumentar manutencao, consistencia, SEO, acessibilidade, performance e confiabilidade de publicacao mantendo deploy estatico.

## Principios LOC.IA Aplicados

- Plano antes de implementacao quando a mudanca altera arquitetura.
- Fatias curtas, revisaveis e com validacao objetiva.
- Sem mock, stub ou implementacao generica.
- Quando uma decisao depender de provedor, asset real ou ambiente externo, registrar `BLOCKED_DECISION`, `BLOCKED_ASSET_SOURCE` ou `BLOCKED_PROVIDER` em vez de deixar a entrega aberta.
- Evidencia local sempre que houver mudanca funcional, SEO, acessibilidade ou build.
- Rollback simples por commit.
- Escopo fechado: nao reescrever conteudo institucional sem necessidade.
- Nao fazer commit/push automaticamente.
- Em workspace sujo, staging explicito por arquivo.

## Estado Atual Observado

- Stack atual: HTML estatico, `assets/fluvius.css`, `assets/site.js` e imagens locais.
- Nao ha `package.json`, build step, backend ou banco.
- Header, footer, navegacao, metatags, contatos e CTAs estao duplicados em varias paginas.
- CSS centraliza tokens, base, componentes e estilos especificos em um unico arquivo.
- Formulario de contato usa `mailto:`.
- Existem referencias a assets auxiliares como `site.webmanifest` e `favicon.svg`.
- Workspace atual contem alteracoes pre-existentes; qualquer execucao deve preservar essas mudancas.

## Fora de Escopo Inicial

- Backend proprio.
- CMS completo.
- Rebranding visual.
- Migracao para SPA.
- Captura de leads com dados sensiveis sem politica de privacidade e consentimento claros.
- Alteracao do dominio/canonical sem decisao explicita.

## Gates Globais

Executar ao final de cada PR/slice aplicavel:

```bash
python3 -m http.server 8080
```

Validacoes manuais minimas:

- Abrir `http://localhost:8080`.
- Navegar por `index`, `servicos`, `portfolio`, `metodologia`, `insights`, `sobre`, `plataforma`, `contato`.
- Conferir menu desktop e mobile.
- Conferir console do navegador sem erro JS.
- Conferir que todos os CTAs principais chegam em `contato` ou WhatsApp.

Validacoes por comando, conforme forem adicionadas:

```bash
rg -n -i "(api[_-]?key|secret|token|password|credential|private[_-]?key|bearer)" .
rg -n "(src=|href=)" *.html assets
```

## Auditoria de Propostas Genericas

Resultado da revisao do plano em 2026-06-14. Os itens abaixo eram os pontos com maior risco de execucao generica e foram ajustados nas fatias correspondentes.

| Item | Risco generico encontrado | Ajuste aplicado |
| --- | --- | --- |
| 2 | "Eleventy ou Astro" deixava a escolha aberta | Default definido: Eleventy para template estatico sem SPA; Astro somente com decisao registrada |
| 3, 18, 24 | Breadcrumbs "quando fizer sentido" | Escopo definido para paginas internas publicas, exceto home e paginas transacionais |
| 7, 13, 14 | Politica de imagens e assets sem regra operacional | Registro de imagens, breakpoints, fallback e bloqueio `BLOCKED_ASSET_SOURCE` |
| 9, 35 | Rotas limpas e redirects sem criterio | Manter `.html` por default em GitHub Pages; rotas limpas exigem suporte real de redirect |
| 19, 45-49 | Formulario dependia de "provedor aprovado" | Default: endpoint escolhido por deploy target; sem target aprovado, manter WhatsApp e marcar `BLOCKED_PROVIDER` |
| 20 | Validacao automatizada dependia de existencia futura de `package.json` | A partir da adocao do Eleventy, `package.json` e `npm run validate` viram contrato obrigatorio |
| 23 | "frontmatter ou equivalente" era amplo | Padrao definido: Markdown com frontmatter YAML para paginas editoriais |
| 26-28, 31 | Paginas profundas podiam virar conteudo raso | Criados criterios minimos de elegibilidade antes de gerar pagina |
| 34 | Ambientes estavam abstratos | `SITE_BASE_URL`, `SITE_ENV` e `CONTACT_FORM_ENDPOINT` viram contrato de configuracao |
| 36-39 | Cache, minificacao, splitting e CSS critico podiam ser otimizacao prematura | Minificacao e cache entram como default; splitting/CSS critico somente com evidencia de peso ou LCP |
| 40 | Fontes locais ou Google Fonts era decisao aberta | Default definido: hospedar fontes localmente se licenca/arquivos estiverem disponiveis; caso contrario, manter Google Fonts com `font-display: swap` |
| 43-44 | Design system interno poderia virar vitrine ficticia | Usar apenas componentes reais extraidos do site |
| 50 | Auditoria de publicacao sem formato | Criar template fixo de release com comandos, resultado, URL e pendencias |

## Plano por Fatias

### PR 1 - Inventario, Contratos e Baseline

Melhorias cobertas: base para as 20 melhorias.

Entregas:

- Criar checklist de paginas, componentes compartilhados, assets, metatags e links internos.
- Registrar baseline de arquitetura em `docs/audit/architecture-baseline.md`.
- Definir matriz de paginas com titulo, description, canonical, imagem social e CTA principal.
- Definir convencao para rotas, assets, componentes e validacao.

Validacao:

- `rg -n "(src=|href=)" *.html`
- Revisao manual do inventario contra arquivos reais.

Rollback:

- Remover apenas os documentos criados nesta fatia.

### PR 2 - Estrutura de Template Estatico

Melhorias cobertas: 1, 2, 3, 15.

Entregas:

- Introduzir Eleventy como gerador estatico padrao, com fontes em `src/` e output em `_site/`.
- Usar Astro somente se uma decisao documentada provar necessidade de ilhas/componentes que Eleventy nao cobre.
- Criar layout base com head, header, footer e scripts compartilhados.
- Migrar `is-active` da navegacao para dado de pagina ou rota atual.
- Manter output final estatico compatível com GitHub Pages, Netlify e Vercel.
- Criar `package.json` com scripts `dev`, `build`, `preview` e `validate`.

Validacao:

- Build gera HTML final navegavel.
- Todas as paginas atuais continuam existindo.
- Header/footer aparecem iguais entre paginas.
- Canonical e OG por pagina permanecem corretos.
- `npm run build` gera `_site/` sem erro.

Rollback:

- Reverter commit da introducao do gerador; paginas HTML atuais continuam como fonte anterior.

### PR 3 - Metadados como Dados

Melhorias cobertas: 3, 10, 11, 18.

Entregas:

- Criar fonte unica para metadados de paginas.
- Gerar `sitemap.xml`.
- Gerar ou manter `robots.txt`.
- Adicionar JSON-LD para `Organization`, `WebSite` e paginas principais.
- Implementar breadcrumbs para paginas internas publicas: `servicos`, `portfolio`, `metodologia`, `insights`, `sobre` e `plataforma`; home e paginas transacionais ficam fora.

Validacao:

- Cada pagina tem um unico `title`, `description`, `canonical`, `og:url` e `og:image`.
- `sitemap.xml` lista todas as rotas publicas.
- JSON-LD valida sintaticamente como JSON.

Rollback:

- Reverter arquivos de metadata/schema e templates de head.

### PR 4 - Conteudo Estruturado de Servicos e Setores

Melhorias cobertas: 4, 8.

Entregas:

- Extrair servicos, disciplinas, setores, softwares e normas para dados estruturados.
- Renderizar cards e listas a partir desses dados.
- Preservar texto institucional existente, alterando estrutura sem reescrever posicionamento.
- Definir schema local dos dados em `docs/audit/content-contracts.md` antes da migracao.

Validacao:

- Paginas `index.html` e `servicos.html` exibem os mesmos servicos esperados.
- Nenhum card perde CTA, titulo ou lista tecnica.

Rollback:

- Reverter dados estruturados e templates dos servicos.

### PR 5 - Conteudo Estruturado de Projetos

Melhorias cobertas: 5, 14.

Entregas:

- Criar colecao de projetos/cases com setor, disciplina, escopo, entregaveis, imagem e CTA.
- Substituir cards fixos do portfolio por renderizacao da colecao.
- Mapear imagens por projeto, evitando repeticao excessiva de `hero-dam.jpg`.

Validacao:

- `portfolio` e destaques da home mostram projetos com setor, disciplina, escopo e CTA preenchidos.
- Cards renderizam sem campos vazios ou placeholders.
- Imagens possuem `alt` especifico.

Rollback:

- Reverter colecao e templates de portfolio.

### PR 6 - Arquitetura CSS

Melhorias cobertas: 6, 7, 8.

Entregas:

- Quebrar CSS em camadas: `tokens`, `base`, `layout`, `components`, `pages`, `utilities`.
- Remover estilos inline gradualmente.
- Padronizar variantes de `card`, `cta-band`, `page-hero`, `grid`, `proofbar`, `step` e `badge`.

Validacao:

- Comparacao visual manual desktop/mobile das paginas principais.
- `rg -n "style=\"" *.html` deve reduzir a zero ou manter apenas excecoes justificadas.

Rollback:

- Reverter reorganizacao CSS da fatia.

### PR 7 - Assets, Imagens e Performance

Melhorias cobertas: 12, 13, 14.

Entregas:

- Garantir existencia e uso correto de `favicon.svg`, `site.webmanifest`, apple touch icon e imagens sociais.
- Criar registro de imagens com uso, dimensao fonte, alt, paginas consumidoras e status de aprovacao.
- Definir breakpoints de imagem: 480, 768 e 1200 px para imagens editoriais quando houver fonte suficiente.
- Usar `picture`/`srcset` para imagens principais e manter JPEG fallback quando AVIF/WebP forem gerados.
- Remover ou arquivar assets nao utilizados.
- Adicionar imagens distintas para hero, setores e cases somente com material real aprovado; caso contrario registrar `BLOCKED_ASSET_SOURCE` e manter imagem atual sem declarar melhoria concluida.

Validacao:

- Nenhuma referencia quebrada em `src` ou `href`.
- Home carrega imagem principal com prioridade.
- Imagens abaixo da dobra usam lazy loading.
- Registro de imagens nao contem consumidor inexistente.

Rollback:

- Reverter alteracoes em assets e markup de imagens.

### PR 8 - Acessibilidade e Comportamento JS

Melhorias cobertas: 15, 16, 17.

Entregas:

- Atualizar menu mobile para sincronizar `aria-expanded`.
- Fechar menu com Escape.
- Gerenciar foco ao abrir/fechar menu.
- Respeitar `prefers-reduced-motion` nas animacoes `reveal`.
- Garantir fallback quando `IntersectionObserver` nao existir.

Validacao:

- Menu mobile opera por teclado.
- `aria-expanded` muda entre `true` e `false`.
- Com `prefers-reduced-motion`, conteudo permanece visivel sem animacao obrigatoria.

Rollback:

- Reverter somente `assets/site.js` e CSS de motion.

### PR 9 - Rotas, Publicacao e Compatibilidade de Hospedagem

Melhorias cobertas: 9, 10, 11.

Entregas:

- Manter `.html` como default enquanto o alvo principal for GitHub Pages sem regra de redirect.
- Adotar rotas limpas somente quando o deploy target suportar redirects testaveis, como Netlify `_redirects` ou `vercel.json`.
- Se rotas limpas forem adotadas, criar redirects 301 para URLs antigas.
- Ajustar canonical, sitemap e links internos.
- Documentar matriz GitHub Pages/Netlify/Vercel.

Validacao:

- Todos os links internos funcionam localmente.
- URLs antigas importantes nao quebram quando aplicavel.
- Canonical reflete a decisao de rota.

Rollback:

- Reverter alteracao de links/canonical e voltar para `.html`.

### PR 10 - Contato, Conversao e Privacidade

Melhorias cobertas: 19.

Entregas:

- Substituir `mailto:` por endpoint escolhido conforme deploy target: Netlify Forms em Netlify, Serverless Function em Vercel, Formspree quando o host nao oferecer formulario nativo.
- Se o deploy target ainda nao estiver definido, manter WhatsApp como conversao primaria e registrar `BLOCKED_PROVIDER` para formulario real.
- Manter WhatsApp como CTA direto.
- Adicionar estados de envio, erro e sucesso sem expor dados sensiveis.
- Garantir pagina/politica de privacidade coerente com coleta de contato.

Validacao:

- Envio real testado com payload minimo: nome, e-mail, empresa, mensagem e consentimento quando aplicavel.
- Falha de envio mostra erro claro.
- Sem credenciais ou tokens no repositório.

Rollback:

- Voltar formulario para contato direto/WhatsApp ate o endpoint escolhido estabilizar.

### PR 11 - Validacao Automatizada Pre-Publicacao

Melhorias cobertas: 20.

Entregas:

- Adicionar scripts locais para checar links, assets, metatags minimas, imagens sem `alt` e JSON-LD valido.
- Adicionar `npm run validate` como rotina documentada do projeto.
- Manter dependencias minimas e travadas em `package-lock.json` depois da introducao do Eleventy.

Validacao:

- Rodar validacao local limpa.
- Documentar saida esperada em README.
- `npm run validate` falha em link interno quebrado, imagem sem `alt` e JSON-LD invalido.

Rollback:

- Remover scripts e dependencias adicionadas.

### PR 12 - Documentacao Operacional e Checklist Final

Melhorias cobertas: consolidacao das 20.

Entregas:

- Atualizar README com novo fluxo de desenvolvimento, build, preview, validacao e deploy.
- Criar checklist final de publicacao.
- Registrar decisoes arquiteturais leves em `docs/audit/architecture-final.md`.
- Registrar melhorias concluídas e pendentes.

Validacao:

- Um novo operador consegue rodar, validar e publicar o site seguindo o README.
- Checklist final referencia comandos reais do projeto.

Rollback:

- Reverter documentos operacionais se divergirem da implementacao real.

## Mapeamento das 20 Melhorias

| # | Melhoria | Fatia |
| --- | --- | --- |
| 1 | Componentizar header/footer | PR 2 |
| 2 | Adotar gerador estatico | PR 2 |
| 3 | Centralizar metadados | PR 2, PR 3 |
| 4 | Dados para servicos | PR 4 |
| 5 | Dados para projetos | PR 5 |
| 6 | Separar CSS por dominio | PR 6 |
| 7 | Remover estilos inline | PR 6 |
| 8 | Padronizar componentes | PR 4, PR 6 |
| 9 | Rotas limpas | PR 9 |
| 10 | Sitemap | PR 3, PR 9 |
| 11 | Robots.txt | PR 3, PR 9 |
| 12 | Assets declarados | PR 7 |
| 13 | Imagens responsivas | PR 7 |
| 14 | Reduzir reuso de imagem | PR 5, PR 7 |
| 15 | Navegacao ativa por rota | PR 2, PR 8 |
| 16 | Acessibilidade menu mobile | PR 8 |
| 17 | `prefers-reduced-motion` | PR 8 |
| 18 | Schema.org | PR 3 |
| 19 | Formulario real | PR 10 |
| 20 | Validacao automatizada | PR 11 |

## Onda 2 - Melhorias Arquiteturais Complementares

As melhorias 21 a 50 ampliam a primeira onda. Elas devem entrar apenas depois de a base de template, dados, validacao e publicacao estar estabilizada, salvo quando uma melhoria complementar desbloquear uma fatia da Onda 1.

### PR 13 - Modelo Editorial e Conteudo Institucional

Melhorias cobertas: 21, 22, 23.
Vinculos: 3, 4, 5, 8.

Entregas:

- Definir tipos editoriais: `Service`, `Sector`, `Case`, `Insight`, `MethodStep`, `Software`, `Standard` e `CTA`.
- Separar conteudo institucional de templates de apresentacao.
- Adicionar Markdown com frontmatter YAML para paginas editoriais.
- Documentar campos obrigatorios e opcionais por tipo.

Validacao:

- Build/renderizacao falha quando conteudo obrigatorio estiver ausente.
- Paginas migradas renderizam sem perda de titulo, description, CTA ou texto tecnico.

Rollback:

- Reverter modelos editoriais e voltar conteudo para fonte anterior da Onda 1.

### PR 14 - Taxonomia, Breadcrumbs e Arquitetura de Informacao

Melhorias cobertas: 24, 25, 30.
Vinculos: 3, 4, 5, 9, 18, 19, 20.

Entregas:

- Criar taxonomia de disciplinas, setores, tipos de entrega e intencoes de CTA.
- Implementar breadcrumbs para paginas internas.
- Definir mapa de jornada do usuario por perfil: mineracao, saneamento, energia, industria, orgao publico e parceiro tecnico.
- Conectar servicos, cases e insights por tags reais, sem filtros vazios.

Validacao:

- Breadcrumbs aparecem nas paginas internas e geram `BreadcrumbList` quando aplicavel.
- Taxonomias usadas em templates existem em fonte unica.
- Nenhuma pagina fica sem CTA primario definido no frontmatter ou na configuracao da pagina.

Rollback:

- Remover breadcrumbs e taxonomia, preservando paginas existentes.

### PR 15 - Paginas Profundas de Servico, Case e Setor

Melhorias cobertas: 26, 27, 28, 31.
Vinculos: 4, 5, 9, 14, 18, 29.

Entregas:

- Criar paginas individuais para servicos estrategicos.
- Criar paginas individuais para cases/projetos somente quando houver pelo menos: setor, problema, escopo, metodologia, entregaveis, resultado ou impacto, imagem ou motivo documentado de ausencia.
- Criar paginas de setores atendidos.
- Criar arquitetura para landing pages segmentadas sem duplicar layout.
- Nao criar landing page sem oferta, publico, CTA e fonte de trafego definidos.

Validacao:

- Cada pagina nova tem titulo, description, canonical, schema, breadcrumb e CTA contextual.
- Nenhuma pagina nova usa conteudo placeholder.
- Links internos conectam home, servicos, setores, cases e contato.

Rollback:

- Remover paginas profundas e manter paginas agregadoras da Onda 1.

### PR 16 - Configuracao Global e Ambientes

Melhorias cobertas: 32, 33, 34.
Vinculos: 1, 3, 10, 11, 19, 20.

Entregas:

- Criar configuracao global para nome da empresa, dominio, base URL, contatos, redes, imagem social e analytics.
- Centralizar e-mail, WhatsApp, localidade e links externos.
- Definir contrato de ambiente com `SITE_ENV`, `SITE_BASE_URL` e `CONTACT_FORM_ENDPOINT`.
- Usar `SITE_BASE_URL=http://localhost:8080` em local, URL de preview no deploy de preview e dominio canonico somente em production.

Validacao:

- Alterar contato em uma fonte unica reflete em header, footer, contato e CTAs.
- Build local e build de producao usam base URL correta.

Rollback:

- Reverter configuracao global e restaurar valores estaticos conhecidos.

### PR 17 - Redirects, Cache e Build Output

Melhorias cobertas: 35, 36, 37, 38, 39.
Vinculos: 2, 6, 9, 13, 20.

Entregas:

- Criar politica de redirects para URLs antigas e rotas limpas.
- Definir cache default: HTML sem cache agressivo, CSS/JS versionados com cache longo, imagens com cache longo quando nomeadas por conteudo.
- Minificar CSS/JS no build.
- Implementar bundle splitting somente se `site.js` ou CSS final ultrapassarem limite registrado no baseline.
- Definir CSS critico da primeira dobra somente se baseline de LCP ou tamanho CSS apontar ganho mensuravel; caso contrario registrar `NO_ACTION_MEASURED`.

Validacao:

- Redirects funcionam no alvo de hospedagem escolhido.
- Assets versionados ou hashados nao quebram referencias.
- Build final permanece estatico e navegavel.
- Minificacao nao altera comportamento do menu, tema ou reveal.

Rollback:

- Reverter regras de redirect/cache e voltar output sem otimizacao agressiva.

### PR 18 - Fontes e Tokens Semanticos

Melhorias cobertas: 40, 41, 42.
Vinculos: 6, 8, 13, 20.

Entregas:

- Hospedar fontes localmente quando arquivos e licenca estiverem disponiveis no projeto; se nao estiverem, manter Google Fonts com `font-display: swap`, `preconnect` e fallback tipografico.
- Adicionar fallback tipografico explicito.
- Evoluir tokens visuais para tokens semanticos: acao, texto, superficie, borda, espacamento, raio e sombra.
- Manter compatibilidade visual com o design atual.

Validacao:

- Sem layout shift perceptivel por fonte em carregamento normal.
- Componentes principais usam tokens semanticos, nao cores cruas.
- Falha de carregamento da fonte externa preserva hierarquia visual aceitavel.

Rollback:

- Voltar importacao e tokens anteriores.

### PR 19 - Contrato de Componentes e Design System Interno

Melhorias cobertas: 43, 44.
Vinculos: 6, 8, 20.

Entregas:

- Documentar contrato de componentes: variantes permitidas, conteudo obrigatorio e restricoes.
- Criar pagina interna nao publicada de design system em `_internal/design-system/` para revisar botoes, cards, CTAs, grids, forms, badges e estados.
- Incluir exemplos reais do site, nao componentes ficticios.

Validacao:

- A pagina de design system renderiza todos os componentes principais.
- Componentes documentados correspondem as classes reais do CSS.

Rollback:

- Remover pagina interna/documentacao sem afetar site publico.

### PR 20 - Formularios, Privacidade e Anti-Spam

Melhorias cobertas: 45, 46, 47, 48, 49.
Vinculos: 16, 19.

Entregas:

- Padronizar estados do formulario: idle, submitting, success, error e validation error.
- Adicionar validacao client-side acessivel.
- Adicionar consentimento de privacidade obrigatorio quando houver coleta por endpoint real.
- Criar politica de privacidade versionada em pagina publica antes de ativar endpoint.
- Adicionar honeypot como protecao anti-spam minima; captcha ou rate limit entram apenas se o provedor/formulario exigir.

Validacao:

- Campos invalidos anunciam erro de forma acessivel.
- Envio real nao exige segredo no cliente.
- Politica de privacidade esta linkada no formulario.
- Submissao com honeypot preenchido nao gera lead valido.

Rollback:

- Voltar para CTA de contato direto/WhatsApp enquanto endpoint e politica nao estiverem aprovados.

### PR 21 - Auditoria de Publicacao

Melhorias cobertas: 50.
Vinculos: 20.

Entregas:

- Criar trilha de auditoria de publicacao com versao, data, comandos rodados, validacoes e pendencias.
- Definir local `docs/audit/releases/YYYY-MM-DD.md` para evidencias leves de release.
- Registrar estado final de cada publicacao sem incluir dados sensiveis ou logs ruidosos.
- Usar template fixo com commit, URL publicada, comandos, resultado, pendencias e rollback.

Validacao:

- Cada release possui checklist preenchido.
- Evidencia de publicacao referencia comandos reais.
- Auditoria nao inclui payloads de formulario, tokens, cookies ou dados pessoais.

Rollback:

- Remover somente documentos de auditoria da fatia.

### PR 22 - Fechamento da Onda 2

Melhorias cobertas: consolidacao das 50 melhorias.

Entregas:

- Atualizar README com arquitetura final de conteudo, rotas, build, validacao, formularios e deploy.
- Atualizar `docs/audit/architecture-final.md` com decisoes da Onda 2.
- Marcar melhorias concluidas, adiadas e bloqueadas com justificativa objetiva.

Validacao:

- Um operador novo consegue criar conteudo, validar e publicar seguindo a documentacao.
- Nenhuma melhoria fica marcada como concluida sem evidencia minima.

Rollback:

- Reverter documentacao de fechamento se ela divergir da implementacao real.

## Mapeamento das Melhorias 21-50

| # | Melhoria | Vinculada a | Fatia |
| --- | --- | --- | --- |
| 21 | Modelo de conteudo institucional reutilizavel | 4, 5, 8 | PR 13 |
| 22 | Separar conteudo de apresentacao | 4, 5, 6 | PR 13 |
| 23 | Frontmatter para paginas editoriais | 3, 18 | PR 13 |
| 24 | Sistema de breadcrumbs | 3, 9, 18 | PR 14 |
| 25 | Taxonomia de disciplinas e setores | 4, 5 | PR 14 |
| 26 | Paginas individuais para servicos estrategicos | 4, 9, 18 | PR 15 |
| 27 | Paginas individuais para cases/projetos | 5, 9, 14 | PR 15 |
| 28 | Paginas de setor atendido | 4, 5, 18 | PR 15 |
| 29 | CTAs por intencao | 8, 19 | PR 14, PR 15 |
| 30 | Mapa de jornada do usuario | 8, 19, 20 | PR 14 |
| 31 | Landing pages segmentadas | 26, 28, 29 | PR 15 |
| 32 | Configuracao global do site | 1, 3, 10, 11 | PR 16 |
| 33 | Centralizar dados de contato | 1, 19 | PR 16 |
| 34 | Estrategia de ambientes | 9, 10, 20 | PR 16 |
| 35 | Arquitetura de redirects | 9 | PR 17 |
| 36 | Politica de cache para assets | 13, 20 | PR 17 |
| 37 | Minificar CSS e JS no build | 2, 6, 20 | PR 17 |
| 38 | Bundle splitting minimo | 2, 6 | PR 17 |
| 39 | CSS critico da primeira dobra | 6, 13, 20 | PR 17 |
| 40 | Hospedar ou otimizar fontes | 13, 20 | PR 18 |
| 41 | Fallback tipografico explicito | 6 | PR 18 |
| 42 | Tokens semanticos | 6, 8 | PR 18 |
| 43 | Contrato de componentes documentado | 8, 20 | PR 19 |
| 44 | Pagina interna de design system | 6, 8, 20 | PR 19 |
| 45 | Estados padronizados de formulario | 19 | PR 20 |
| 46 | Validacao client-side acessivel | 16, 19 | PR 20 |
| 47 | Consentimento de privacidade no contato | 19 | PR 20 |
| 48 | Politica de privacidade versionada | 19, 20 | PR 20 |
| 49 | Protecao anti-spam no formulario | 19 | PR 20 |
| 50 | Trilha de auditoria de publicacao | 20 | PR 21 |

## Ordem Recomendada

1. PR 1 para congelar baseline e evitar regressao silenciosa.
2. PR 2 e PR 3 para reduzir duplicacao estrutural.
3. PR 4 e PR 5 para transformar conteudo repetido em dados.
4. PR 6 a PR 8 para hardening visual, performance e acessibilidade.
5. PR 9 e PR 10 para publicacao e conversao.
6. PR 11 e PR 12 para fechamento operacional.
7. PR 13 e PR 14 para aprofundar modelo editorial, taxonomia e jornada.
8. PR 15 e PR 16 para paginas profundas, landings e configuracao global.
9. PR 17 e PR 18 para build output, cache, fontes e tokens semanticos.
10. PR 19 e PR 20 para design system interno, formulario, privacidade e anti-spam.
11. PR 21 e PR 22 para auditoria de publicacao e fechamento das 50 melhorias.

## Criterio de Conclusao

O plano esta concluido quando:

- Todas as paginas atuais existem no build final.
- Header, footer, metadados e navegacao sao definidos em fonte unica.
- Servicos e projetos sao renderizados a partir de dados estruturados.
- CSS nao depende de estilos inline para componentes principais.
- Assets declarados existem e nao ha referencias quebradas.
- Menu mobile e motion respeitam acessibilidade minima.
- Sitemap, robots e schema estao presentes.
- Formulario usa fluxo aprovado e sem segredo no cliente.
- Existe comando de validacao local documentado.
- README descreve execucao, build, validacao e deploy reais.
- As 50 melhorias estao marcadas como concluidas, adiadas ou bloqueadas com evidencia minima.
