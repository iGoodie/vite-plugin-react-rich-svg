import fs from "fs";

export async function resolveRaw(path: string) {
  const svg = await fs.promises.readFile(path, "utf-8");
  return `export default "${svg.replace(/"/g, '\\"')}"`;
}
