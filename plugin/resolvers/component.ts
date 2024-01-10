import type { Config as SvgrConfig } from "@svgr/core";
import { transform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";
import { readFile } from "fs/promises";
import { EsbuildTransformOptions, transformWithEsbuild } from "vite";

export async function resolveReactComponent(
  id: string,
  path: string,
  svgrConfig?: SvgrConfig,
  esbuildConfig?: EsbuildTransformOptions
) {
  const svg = await readFile(path, "utf-8");

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
