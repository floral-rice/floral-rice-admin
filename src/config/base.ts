import { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { ClientSideLayout } from "vite-plugin-vue-layouts";
// import eslint from 'vite-plugin-eslint'

interface RouteRecord {
  path: string;
  component?: unknown;
  children?: RouteRecord[];
  meta?: Record<string, unknown>;
}

/** 将 _layout.vue 路由转为嵌套路由包裹 */
function wrapLayoutRoutes(routes: RouteRecord[]): RouteRecord[] {
  return routes.map((route) => {
    if (route.children?.length) {
      // 先递归处理子路由
      route.children = wrapLayoutRoutes(route.children);

      // 查找 _layout 子路由
      const layoutIndex = route.children.findIndex(
        (c) => c.path === '_layout'
      );

      if (layoutIndex !== -1) {
        const layoutRoute = route.children[layoutIndex];
        // 移除 _layout 自身
        route.children.splice(layoutIndex, 1);

        // _layout 成为父路由，其他子路由保持原样
        layoutRoute.path = route.path;
        layoutRoute.children = route.children;
        layoutRoute.meta = { ...layoutRoute.meta, isLayout: true };

        return layoutRoute;
      }
    }
    return route;
  });
}

export function getBaseConfig(): UserConfig {
  return {
    base: "/",
    plugins: [
      vue(),
      Pages({
        dirs: "src/pages",
        extensions: ["vue"],
        exclude: ["**/components/*.vue"],
        onRoutesGenerated(routes) {
          return wrapLayoutRoutes(routes as RouteRecord[]);
        },
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
