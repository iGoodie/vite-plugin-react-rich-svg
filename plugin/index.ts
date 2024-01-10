import { EsbuildTransformOptions, Plugin } from "vite";
import type { Config as SvgrConfig } from "@svgr/core";

import { resolveDataURI } from "./resolvers/dataURI";
import { resolveRaw } from "./resolvers/raw";
import { resolveReactComponent } from "plugin/resolvers/component";

export default function (options?: {
  /**
   * If "include" predicate is present, only passing paths will be processed
   * @param path E.g "C:/path/to/my-svg.svg"
   * @returns Whether given path should be processed by the plugin or not
   */
  include?: (path: string) => boolean;
  /**
   * If "exclude" predicate is present, every path excluding passing paths will be processed
   * @param path E.g "C:/path/to/my-svg.svg"
   * @returns Whether given path should be discarded or processed by the plugin
   */
  exclude?: (path: string) => boolean;
  componentLoaderOptions?: {
    /**
     * Options used while running SVGR on the original svg code/asset
     */
    svgrConfig?: SvgrConfig;
    /**
     * Options used to generate import code with given SVGR output
     */
    esbuildConfig?: EsbuildTransformOptions;
  };
}): Plugin {
  function shouldProcessPath(path: string) {
    if (!path.endsWith(".svg")) {
      return false;
    }

    const { include, exclude } = options ?? {};

    if (include && !include(path)) {
      return false;
    }

    if (exclude && exclude(path)) {
      return false;
    }

    return true;
  }

  return {
    name: "vite-plugin-react-rich-svg",
    enforce: "pre",

    async load(id) {
      const [path, query] = id.split("?", 2);

      if (!shouldProcessPath(path)) {
        return;
      }

      switch (query) {
        case "raw":
          return resolveRaw(path);
        case "url":
          return resolveDataURI(path);
      }
    },

    async transform(code, id) {
      const [path, query] = id.split("?", 2);

      if (!shouldProcessPath(path)) {
        return;
      }

      switch (query) {
        case "component": {
          const { componentLoaderOptions } = options ?? {};
          return resolveReactComponent(
            id,
            path,
            componentLoaderOptions?.svgrConfig,
            componentLoaderOptions?.esbuildConfig
          );
        }
      }
    },
  };
}
