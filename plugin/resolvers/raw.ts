import { readFile } from "fs/promises";
import { optimize } from "svgo";
import type { PluginOptions } from "../index";

export async function resolveRaw(
  path: string,
  config?: PluginOptions["rawLoaderOptions"]
) {
  let svg = await readFile(path, "utf-8");

  if (config?.svgoEnabled) {
    const svgoConfig = config.svgoConfig ?? {};
    const result = optimize(svg, { path, ...svgoConfig });
    svg = result.data;
  }

  svg = svg.replace(/\r?\n/g, "\\r\\n").replaceAll('"', '\\"').trim();

  return {
    code: `const svg="${svg}";export default svg;`,
    map: null,
  };
}
