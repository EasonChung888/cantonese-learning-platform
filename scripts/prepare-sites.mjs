import { cpSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

// Publish only the application and its local assets.
for (const entry of [
  "index.html", "styles.css", "app.js", "data.js",
  "listening-practice.js", "assets", "audio", "LICENSE",
]) {
  cpSync(path.join(root, entry), path.join(output, entry), {
    recursive: true,
    filter: (source) => path.basename(source) !== ".DS_Store",
  });
}
console.log("Sites static files prepared in dist/.");
