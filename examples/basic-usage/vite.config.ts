import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import richSvg from "vite-plugin-react-rich-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), richSvg()],
  base: "/vite-plugin-react-rich-svg/", // <- Here, so we can deploy this example to Github Pages
});
