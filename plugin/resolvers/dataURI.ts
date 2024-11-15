import { readFile } from "fs/promises";
import { optimize } from "svgo";
import type { PluginOptions } from "../index";

function stringToDataURI(header: string, str: string) {
  const encoded = encodeURIComponent(str)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");

  return `data:${header},${encoded}`;
}

export async function resolveDataURI(
  path: string,
  config?: PluginOptions["urlLoaderOptions"]
) {
  let svg = await readFile(path, "utf-8");

  if (config?.svgoEnabled) {
    const svgoConfig = config.svgoConfig ?? {};
    const result = optimize(svg, { path, ...svgoConfig });
    svg = result.data;
  }

  svg = stringToDataURI("image/svg+xml", svg);

  return {
    code: `const svg="${svg}";export default svg;`,
    map: null,
  };
}
