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
        // onRoutesGenerated(routes) {
        //   console.log('Generated routes:', JSON.stringify(routes, null, 2))
        // },
        // extendRoute(route) {
        //   if (route.path === '/') {
        //     return {
        //       ...route,
        //       redirect: '/home'
        //     }
        //   }
        //   return route
        // }
      }),
      ClientSideLayout({
        layoutDir: "src/layouts",
        defaultLayout: "BasicLayout",
        importMode: "sync",
      }),
      // eslint({
      //   cache: false,
      //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      //   failOnError: false,   // ❌ 不会因 error 阻断 dev
      //   failOnWarning: false, // ⚠️ warning 也不阻断 dev
      // })
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
