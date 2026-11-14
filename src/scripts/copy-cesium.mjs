import { cpSync, mkdirSync, existsSync, rmSync } from "fs";
import { join } from "path";

const src = join("node_modules", "cesium", "Build", "Cesium");
const dest = join("public", "cesium");

if (!existsSync(src)) {
  console.error("Cesium not found. Run: npm install cesium");
  process.exit(1);
}

// Clean old copy so files from older versions don't linger
if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

for (const dir of ["Assets", "ThirdParty", "Widgets", "Workers"]) {
  cpSync(join(src, dir), join(dest, dir), { recursive: true });
  console.log(`Copied ${dir}`);
}

console.log("Cesium assets copied to public/cesium");   