import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import richSvg from "vite-plugin-react-rich-svg";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: ["@mightymeld/runtime/babel-plugin-mightymeld"],
      },
    }),
    richSvg({
      componentLoaderOptions: {
        svgrConfig: {
          svgo: true,
          prettier: true,
        },
      },
      rawLoaderOptions: {
        svgoEnabled: true,
        svgoConfig: {},
      },
      base64LoaderOptions: {
        svgoEnabled: true,
      },
      urlLoaderOptions: {
        svgoEnabled: true,
      },
    }),
  ],
  base: mode === "development" ? "/" : "/vite-plugin-react-rich-svg/", // <- Here, so we can deploy this example to Github Pages
}));
