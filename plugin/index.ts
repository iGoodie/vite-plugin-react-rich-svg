import { EsbuildTransformOptions, Plugin } from "vite";
import type { Config as SvgrConfig } from "@svgr/core";
import type { Config as SvgoConfig } from "svgo";

import { resolveDataURI } from "./resolvers/dataURI";
import { resolveRaw } from "./resolvers/raw";
import { resolveReactComponent } from "plugin/resolvers/component";
import { resolveBase64 } from "plugin/resolvers/base64";

export interface PluginOptions {
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

  /**
   * Options used while resolving as "?raw"
   */
  rawLoaderOptions?: {
    /**
     * Enables SVGO optimizations while loading the SVG asset
     * @default false
     */
    svgoEnabled?: boolean;

    /**
     * Options used while running SVGO optimizations on the original SVG asset
     */
    svgoConfig?: SvgoConfig;
  };

  /**
   * Options used while resolving as "?component"
   */
  componentLoaderOptions?: {
    /**
     * Options used while running SVGR transform on the original svg asset
     */
    svgrConfig?: SvgrConfig;
    /**
     * Options used to generate JSX Component code with given SVGR output
     */
    esbuildConfig?: EsbuildTransformOptions;
  };
}

export default function (options?: PluginOptions): Plugin {
  const { componentLoaderOptions } = options ?? {};

  interface HandlerParams {
    id: string;
    path: string;
  }

  const handlers = {
    raw: ({ path }: HandlerParams) => {
      return resolveRaw(path, options?.rawLoaderOptions);
    },

    url: ({ path }: HandlerParams) => {
      return resolveDataURI(path);
    },

    base64: ({ path }: HandlerParams) => {
      return resolveBase64(path);
    },

    component: ({ id, path }: HandlerParams) => {
      return resolveReactComponent(
        id,
        path,
        componentLoaderOptions?.svgrConfig,
        componentLoaderOptions?.esbuildConfig
      );
    },
  };

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

    async handleHotUpdate({ file, server }) {
      if (file.endsWith(".svg")) {
        const suffices = Object.keys(handlers)
          .map((modifier) => "?" + modifier)
          .concat("");

        for (let suffix of suffices) {
          const moduleId = file + suffix;
          const module = server.moduleGraph.getModuleById(moduleId);

          if (module) {
            server.moduleGraph.invalidateModule(module);
          } else {
            console.error("Unknown module by id", moduleId);
          }
        }

        server.hot.send({
          type: "full-reload",
          path: "*",
        });
      }
    },

    async transform(code, id) {
      const [path, query] = id.split("?", 2);

      if (!shouldProcessPath(path)) {
        return;
      }

      if (query in handlers) {
        const handler = Reflect.get(handlers, query);
        return handler({ id, path });
      }
    },
  };
}
