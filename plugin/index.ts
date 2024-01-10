import { EsbuildTransformOptions, Plugin } from "vite";
import type { Config as SvgrConfig } from "@svgr/core";

import { resolveDataURI } from "./resolvers/dataURI";
import { resolveRaw } from "./resolvers/raw";
import { resolveReactComponent } from "plugin/resolvers/component";

export default function (options?: {
  svgrConfig?: SvgrConfig;
  esbuildConfig?: EsbuildTransformOptions;
  customLoaders?: [];
}): Plugin[] {
  return [
    {
      name: "vite-plugin-react-rich-svg",
      enforce: "pre",

      async load(id) {
        const [path, query] = id.split("?", 2);

        if (!path.endsWith(".svg")) return;

        switch (query) {
          case "raw":
            return resolveRaw(path);
          case "dataURI":
            return resolveDataURI(path);
        }
      },

      async transform(code, id) {
        const [path, query] = id.split("?", 2);

        if (!path.endsWith(".svg")) return;

        switch (query) {
          case "component":
            return resolveReactComponent(
              id,
              path,
              options?.svgrConfig,
              options?.esbuildConfig
            );
        }
      },
    },
  ];
}
