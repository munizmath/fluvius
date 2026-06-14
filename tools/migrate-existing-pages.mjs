import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_PAGES = path.join(ROOT, "src", "pages");

const pages = [
  "index.html",
  "servicos.html",
  "portfolio.html",
  "metodologia.html",
  "insights.html",
  "sobre.html",
  "plataforma.html",
  "contato.html",
  "privacidade.html",
  "obrigado.html",
  "404.html"
];

const navKeys = {
  "index.html": "index",
  "servicos.html": "servicos",
  "portfolio.html": "portfolio",
  "metodologia.html": "metodologia",
  "insights.html": "insights",
  "sobre.html": "sobre",
  "plataforma.html": "plataforma",
  "contato.html": "contato",
  "privacidade.html": "privacidade",
  "obrigado.html": "contato",
  "404.html": "404"
};

const breadcrumbLabels = {
  "servicos.html": "Serviços",
  "portfolio.html": "Projetos",
  "metodologia.html": "Metodologia",
  "insights.html": "Insights",
  "sobre.html": "Quem Somos",
  "plataforma.html": "Plataforma Digital",
  "contato.html": "Contato",
  "privacidade.html": "Privacidade",
  "obrigado.html": "Solicitação Recebida",
  "404.html": "Página Não Encontrada"
};

function match(html, regex) {
  const found = html.match(regex);
  return found ? found[1].trim() : "";
}

function escapeYaml(value) {
  return String(value || "").replace(/"/g, '\\"');
}

function stripSharedChrome(body) {
  let content = body;
  content = content.replace(/<!--\s*=+\s*HEADER\s*=+\s*-->[\s\S]*?<\/header>/i, "");
  content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/i, "");
  content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/i, "");
  content = content.replace(/<script\s+src=["']assets\/site\.js["']><\/script>/gi, "");
  content = content.replace(/<script\s+src=["']\/assets\/site\.js["']><\/script>/gi, "");
  return content.trim();
}

function normalizeAssetPaths(content) {
  return content
    .replace(/(src|href)="assets\//g, '$1="/assets/')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="([^"#]+)\.html/g, 'href="/$1.html')
    .replace(/href="\/contato\.html"/g, 'href="/contato.html"');
}

fs.mkdirSync(SRC_PAGES, { recursive: true });

for (const page of pages) {
  const sourcePath = path.join(ROOT, page);
  if (!fs.existsSync(sourcePath)) continue;

  const html = fs.readFileSync(sourcePath, "utf8");
  const title = match(html, /<title>([\s\S]*?)<\/title>/i) || "Fluvius Engenharia";
  const description = match(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = match(html, /<link rel="canonical" href="([^"]*)"/i);
  const ogImage = match(html, /<meta property="og:image" content="([^"]*)"/i).replace(/^https:\/\/munizmath\.github\.io\/fluvius/, "");
  const body = match(html, /<body[^>]*>([\s\S]*?)<\/body>/i);
  const pageContent = normalizeAssetPaths(stripSharedChrome(body));
  const permalink = page === "index.html" ? "/index.html" : `/${page}`;
  const outputName = page.replace(/\.html$/, ".njk");
  const breadcrumbs = page === "index.html" ? "[]": `[ { "label": "${breadcrumbLabels[page] || title}" } ]`;

  const frontmatter = [
    "---",
    "layout: base.njk",
    `permalink: ${permalink}`,
    `title: "${escapeYaml(title)}"`,
    `description: "${escapeYaml(description)}"`,
    canonical ? `canonical: "${escapeYaml(canonical)}"` : "",
    ogImage ? `ogImage: "${escapeYaml(ogImage)}"` : "",
    `navKey: ${navKeys[page] || ""}`,
    `breadcrumbs: ${breadcrumbs}`,
    page === "404.html" ? "eleventyExcludeFromCollections: true" : "",
    "---",
    ""
  ].filter(Boolean).join("\n");

  fs.writeFileSync(path.join(SRC_PAGES, outputName), `${frontmatter}${pageContent}\n`);
  console.log(`migrated ${page} -> src/pages/${outputName}`);
}
