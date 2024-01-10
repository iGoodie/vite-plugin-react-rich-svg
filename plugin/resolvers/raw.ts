import { readFile } from "fs/promises";

export async function resolveRaw(path: string) {
  const svg = await readFile(path, "utf-8");
  const escaped = svg
    .replace(/\r?\n/g, "`\\r\\n")
    .replaceAll('"', '\\"')
    .trim();
  return `const svg="${escaped}";export default svg;`;
}
