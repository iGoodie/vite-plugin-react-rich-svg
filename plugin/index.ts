import { Plugin } from "vite";

import { resolveDataURI } from "./resolvers/dataURI";
import { resolveRaw } from "./resolvers/raw";

export default function (): Plugin {
  return {
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
  };
};
