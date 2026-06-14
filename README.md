# Fluvius Engenharia

Site institucional estático da Fluvius Engenharia, empresa focada em Recursos Hídricos, Geotecnia, Meio Ambiente e gestão técnica de projetos complexos. O projeto é composto por páginas HTML, CSS compartilhado, JavaScript leve e imagens locais.

## Principais Páginas

- `index.html`: página inicial com proposta de valor, serviços, setores, metodologia, plataforma digital, projetos e chamada de contato.
- `servicos.html`: detalhamento das frentes de Hidrologia & Hidráulica, Geotecnia, Ensaios Laboratoriais, Engenharia Estrutural e Topografia.
- `portfolio.html`: vitrine de projetos e setores atendidos.
- `metodologia.html`: método de trabalho e etapas técnicas.
- `plataforma.html`: módulos digitais para gestão operacional e compliance.
- `insights.html`: conteúdos técnicos e chamadas para guias/checklists.
- `sobre.html`: posicionamento institucional.
- `contato.html`: canais comerciais e WhatsApp.

## Stack

- **HTML5** para estrutura das páginas.
- **CSS3** em `assets/fluvius.css` para layout, tokens visuais e responsividade.
- **JavaScript vanilla** em `assets/site.js` para menu mobile, animações de entrada, tema visual e ano dinâmico no rodapé.
- **Assets locais** em `assets/` para logotipo e imagens.

Não há etapa de build, dependências Node, backend ou banco de dados.

## Estrutura

```text
.
├── assets/
│   ├── favicon.svg
│   ├── fluvius.css
│   ├── site.js
│   ├── hero-dam.jpg
│   ├── logo-lockup.jpg
│   ├── logo-lockup.png
│   └── river-accent.jpg
├── 404.html
├── contato.html
├── index.html
├── insights.html
├── metodologia.html
├── obrigado.html
├── plataforma.html
├── portfolio.html
├── privacidade.html
├── robots.txt
├── servicos.html
├── sitemap.xml
└── sobre.html
```

## Como Executar Localmente

Como o site é estático, abrir `index.html` no navegador já funciona:

```bash
xdg-open index.html
```

Também é possível subir um servidor local simples para testar caminhos e comportamento de navegador de forma mais próxima de produção:

```bash
python3 -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Deploy

O projeto pode ser publicado em qualquer hospedagem de site estático.

### GitHub Pages

1. Envie o repositório para o GitHub.
2. No repositório remoto, abra `Settings > Pages`.
3. Selecione a branch `main` e a pasta `/root`.
4. Salve e aguarde a publicação.

URL prevista para este repositório:

```text
https://munizmath.github.io/fluvius/
```

### Netlify

Use as seguintes configurações:

| Campo | Valor |
| --- | --- |
| Build command | vazio |
| Publish directory | `.` |

O formulário de `contato.html` já está preparado para Netlify Forms. Após o primeiro deploy, confirme no painel da Netlify se o formulário `contato` foi detectado.

### Vercel

Use as seguintes configurações:

| Campo | Valor |
| --- | --- |
| Framework Preset | Other |
| Build Command | vazio |
| Output Directory | `.` |

## Manutenção

- Mantenha imagens usadas pelo site dentro de `assets/`.
- Evite duplicar imagens na raiz do projeto.
- Não versionar `.env`, chaves privadas, certificados ou arquivos locais do sistema operacional.
- Ao alterar navegação, conferir todos os menus e rodapés, pois as páginas HTML repetem esses blocos.
- Ao alterar contato, revisar todas as ocorrências de e-mail e WhatsApp.
- Ao trocar o domínio final, atualizar `canonical`, Open Graph, `sitemap.xml`, `robots.txt` e `site.webmanifest`.

## Checklist Antes de Publicar

```bash
# Verificar arquivos sensíveis por padrões comuns
rg -n -i "(api[_-]?key|secret|token|password|credential|private[_-]?key|bearer)" .

# Verificar referências locais de imagens, scripts e estilos
rg -n "(src=|href=)" *.html

# Iniciar servidor local
python3 -m http.server 8080
```

Depois, navegue pelas páginas principais em `http://localhost:8080`.

## Git Remoto

Se o repositório remoto ainda estiver vazio:

```bash
git init -b main
git add .
git commit -m "Initial static site"
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

Se o repositório remoto já tiver commits, primeiro busque o histórico remoto:

```bash
git init -b main
git remote add origin <URL_DO_REPOSITORIO>
git fetch origin
```

Depois compare o histórico antes de publicar.
