import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import richSvg from "vite-plugin-react-rich-svg";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    richSvg({
      // include: (path) => /.*\.icon\.svg$/.test(path),
      componentLoaderOptions: {
        svgrConfig: {
          svgo: true,
          prettier: true,
          svgoConfig: {},
        },
        esbuildConfig: {},
      },
    }),
  ],
  base: mode === "development" ? "/" : "/vite-plugin-react-rich-svg/", // <- Here, so we can deploy this example to Github Pages
}));
