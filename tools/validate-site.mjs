import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE = path.join(ROOT, "_site");
const failures = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function fail(file, message) {
  failures.push(`${path.relative(ROOT, file)}: ${message}`);
}

function existsPublic(ref) {
  if (!ref || ref.startsWith("http") || ref.startsWith("mailto:") || ref.startsWith("tel:") || ref.startsWith("#")) return true;
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean) return true;
  const target = clean.startsWith("/") ? path.join(SITE, clean) : null;
  if (!target) return true;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  if (fs.existsSync(path.join(target, "index.html"))) return true;
  return false;
}

const htmlFiles = walk(SITE).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(file, "missing <title>");
  if (!/<meta name="description" content="[^"]+"/i.test(html)) fail(file, "missing meta description");
  if (!/<link rel="canonical" href="[^"]+"/i.test(html)) fail(file, "missing canonical");

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  for (const tag of imgTags) {
    if (!/\balt="[^"]*"/i.test(tag)) fail(file, `image without alt: ${tag}`);
  }

  const refs = [...html.matchAll(/\b(?:src|href)="([^"]+)"/gi)].map((m) => m[1]);
  for (const ref of refs) {
    if (!existsPublic(ref)) fail(file, `broken local reference ${ref}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      fail(file, `invalid JSON-LD: ${error.message}`);
    }
  }
}

if (!fs.existsSync(path.join(SITE, "sitemap.xml"))) failures.push("_site/sitemap.xml: missing sitemap");
if (!fs.existsSync(path.join(SITE, "robots.txt"))) failures.push("_site/robots.txt: missing robots.txt");

if (failures.length) {
  console.error("Validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} HTML files checked.`);
