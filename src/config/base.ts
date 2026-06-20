import { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { ClientSideLayout } from "vite-plugin-vue-layouts";
// import eslint from 'vite-plugin-eslint'

export function getBaseConfig(): UserConfig {
  return {
    base: "/",
    plugins: [
      vue(),
      Pages({
        dirs: "src/pages",
        extensions: ["vue"],
        exclude: ["**/components/*.vue"],
      }),
      ClientSideLayout({
        layoutDir: "src/layouts",
        defaultLayout: "BasicLayout",
        importMode: "sync",
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    optimizeDeps: {
      include: ["lodash-es"],
    },
  };
}
