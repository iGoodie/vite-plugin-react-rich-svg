import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import richSvg from "vite-plugin-react-rich-svg";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
      tailwindcss(),
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
