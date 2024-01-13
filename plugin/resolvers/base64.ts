import { readFile } from "fs/promises";

export async function resolveBase64(path: string) {
  const svg = await readFile(path, "utf-8");
  const encoded = Buffer.from(svg, "utf-8").toString("base64");
  return `export default "${encoded}"`;
}
