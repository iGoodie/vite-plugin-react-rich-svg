import { readFile } from "fs/promises";

export async function resolveRaw(path: string) {
  const svg = await readFile(path, "utf-8");
  return `export default "${svg.replace(/"/g, '\\"')}"`;
}
