import { readFile } from "fs/promises";

function stringToDataURI(header: string, str: string) {
  const encoded = encodeURIComponent(str)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");

  return `data:${header},${encoded}`;
}

export async function resolveDataURI(path: string) {
  const svg = await readFile(path, "utf-8");
  return `export default "${stringToDataURI("image/svg+xml", svg)}"`;
}
