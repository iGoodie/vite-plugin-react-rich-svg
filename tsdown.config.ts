import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["plugin/index.ts"],
  format: ["es"],
  platform: "node",
  dts: true,
  clean: true,
});
