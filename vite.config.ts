import { defineConfig, mergeConfig } from "vite";
import { getBaseConfig } from "./src/config/base";
import { getDevConfig } from "./src/config/dev";
import { getProConfig } from "./src/config/pro";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return mergeConfig(getBaseConfig(), getDevConfig());
  }
  return mergeConfig(getBaseConfig(), getProConfig());
});
