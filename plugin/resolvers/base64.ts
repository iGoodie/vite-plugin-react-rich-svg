import { readFile } from "fs/promises";
import { optimize } from "svgo";
import type { PluginOptions } from "../index";

export async function resolveBase64(
  path: string,
  config?: PluginOptions["base64LoaderOptions"]
) {
  let svg = await readFile(path, "utf-8");

  if (config?.svgoEnabled) {
    const svgoConfig = config.svgoConfig ?? {};
    const result = optimize(svg, { path, ...svgoConfig });
    svg = result.data;
  }

  svg = Buffer.from(svg, "utf-8").toString("base64");

  return {
    code: `const svg="${svg}";export default svg;`,
    map: null,
  };
}
