import { copyFile, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = process.argv[2] || "design-preview";
const indexPath = join(outputDirectory, "index.html");
let html = await readFile(indexPath, "utf8");

const scriptMatch = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
if (!scriptMatch) {
  throw new Error("Could not find the generated application script.");
}

const scriptPath = join(outputDirectory, scriptMatch[1].replace(/^\.?\//, ""));
const script = await readFile(scriptPath, "utf8");
const portableScript = script.replace(
  /new URL\(`([^`]+)`,import\.meta\.url\)/g,
  (_match, asset) => `new URL(\`assets/${asset}\`,import.meta.url)`,
);

html = html
  .replace(scriptMatch[0], () => `<script type="module">${portableScript}</script>`)
  .replace(/(?<!\.)\/uploads\//g, "./uploads/")
  .replace(/(?<!\.)\/assets\//g, "./assets/")
  .replace('href="/styles.css"', 'href="./styles.css"');

await writeFile(indexPath, html);
await copyFile(indexPath, join(outputDirectory, "CUELUM-preview.html"));
await unlink(scriptPath);
