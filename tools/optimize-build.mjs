import fs from "node:fs";
import path from "node:path";
import CleanCSS from "clean-css";
import sharp from "sharp";

const ROOT = process.cwd();
const SITE = path.join(ROOT, "_site");
const cssPath = path.join(SITE, "assets", "fluvius.css");
const jsPath = path.join(SITE, "assets", "site.js");

if (fs.existsSync(cssPath)) {
  const source = fs.readFileSync(cssPath, "utf8");
  const output = new CleanCSS({ level: 1 }).minify(source);
  if (output.errors.length) {
    console.error(output.errors.join("\n"));
    process.exit(1);
  }
  fs.writeFileSync(cssPath, output.styles);
  console.log(`optimized ${path.relative(ROOT, cssPath)} ${source.length} -> ${output.styles.length} bytes`);
}

if (fs.existsSync(jsPath)) {
  const source = fs.readFileSync(jsPath, "utf8");
  const output = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\n)\s*\/\/[^\n]*/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,:=<>+\-])\s*/g, "$1")
    .trim();
  fs.writeFileSync(jsPath, output);
  console.log(`optimized ${path.relative(ROOT, jsPath)} ${source.length} -> ${output.length} bytes`);
}

const assetsDir = path.join(SITE, "assets");
if (fs.existsSync(assetsDir)) {
  const images = fs.readdirSync(assetsDir).filter((file) => /\.(jpe?g|png)$/i.test(file));
  for (const image of images) {
    const input = path.join(assetsDir, image);
    const output = path.join(assetsDir, image.replace(/\.(jpe?g|png)$/i, ".webp"));
    await sharp(input).webp({ quality: 82 }).toFile(output);
    console.log(`generated ${path.relative(ROOT, output)}`);
  }
}
