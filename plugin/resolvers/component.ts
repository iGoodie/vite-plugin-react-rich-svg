import { transform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";
import { readFile } from "fs/promises";
import { transformWithEsbuild } from "vite";
import type { PluginOptions } from "../index";

export async function resolveReactComponent(
  id: string,
  path: string,
  config?: PluginOptions["componentLoaderOptions"]
) {
  const svg = await readFile(path, "utf-8");

  const svgrConfig = config?.svgrConfig ?? {};
  const esbuildConfig = config?.esbuildConfig ?? {};

  const svgrDefaultPlugins = [];

  if (svgrConfig?.svgo) {
    svgrDefaultPlugins.push((await import("@svgr/plugin-svgo")).default);
  }

  svgrDefaultPlugins.push(jsxPlugin);

  if (svgrConfig?.prettier) {
    svgrDefaultPlugins.push((await import("@svgr/plugin-prettier")).default);
  }

  const svgrCode = await transform(svg, svgrConfig, {
    filePath: id,
    caller: {
      previousExport: null,
      defaultPlugins: svgrDefaultPlugins,
    },
  });

  const res = await transformWithEsbuild(svgrCode, id, {
    loader: "jsx",
    ...esbuildConfig,
  });

  return {
    code: res.code,
    map: null,
  };
}
