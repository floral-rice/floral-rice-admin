<template>
  <div class="basic-layout">
    <base-header />
    <div class="basic-layout-content">
      <base-sider
        :menus="filteredMenus"
        :active-menu="activeMenu"
        @navigate="onNavigate"
      />
      <div class="basic-layout-content-view">
        <div>tabs</div>
        <div class="basic-layout-content-view-body">
          <keep-alive v-if="route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Menu } from '@/typing/index';
  import BaseHeader from './components/BaseHeader/index.vue';
  import BaseSider from './components/BaseSider/index.vue';
  import { computed, ref, watch } from 'vue';
  import { router } from '@/router';
  import { filterMenusByAuthority } from '@/utils/menus';
  import { useRoute } from 'vue-router';

  const props = withDefaults(
    defineProps<{
      menus: Menu[];
      authorities: string[];
    }>(),
    {}
  );

  const filteredMenus = computed<Menu[]>(() => filterMenusByAuthority(props.menus, props.authorities));

  const normalizePath = (path: string) => path.replace(/\/+$/, '') || '';

  const collectLeaves = (menus: Menu[], result: Menu[] = []): Menu[] => {
    for (const menu of menus) {
      if (menu.children?.length) {
        collectLeaves(menu.children, result);
      } else if (menu.path) {
        result.push(menu);
      }
    }
    return result;
  };

  /** 通过 route.matched 查找菜单（支持 _layout 嵌套路由） */
  const findActiveMenu = (menus: Menu[]): Menu | undefined => {
    const leaves = collectLeaves(menus);
    const currentPath = normalizePath(route.path);

    // 1. 精确匹配
    const exact = leaves.find(m => normalizePath(m.path!) === currentPath);
    if (exact) return exact;

    // 2. 通过 route.matched 匹配（_layout 嵌套路由场景）
    for (let i = route.matched.length - 1; i >= 0; i--) {
      const matched = route.matched[i];
      const menu = leaves.find(m => normalizePath(m.path!) === normalizePath(matched.path));
      if (menu) return menu;
    }

    // 3. 前缀匹配兜底
    return leaves
      .filter(m => currentPath.startsWith(normalizePath(m.path!) + '/'))
      .sort((a, b) => (b.path?.length ?? 0) - (a.path?.length ?? 0))[0];
  };

  const activeMenu = ref<Menu | undefined>();
  const tabs = ref<Menu[]>([]);
  const route = useRoute();

  const syncActiveMenu = () => {
    const menu = findActiveMenu(filteredMenus.value);
    if (menu) {
      activeMenu.value = menu;
      const hasOpen = tabs.value.some(item => item.path === menu.path);
      if (!hasOpen) {
        tabs.value.push(menu);
      }
    }
  };

  // 监听路由变化
  watch(
    () => route.path,
    () => syncActiveMenu(),
    { immediate: true }
  );

  // 监听 filteredMenus 变化（权限加载后触发）
  watch(filteredMenus, () => syncActiveMenu());

  const onNavigate = (menu: Menu) => {
    if (!menu.path) return;
    const resolved = router.resolve(menu.path);
    if (resolved.matched.length > 0) {
      void router.push(menu.path);
    } else {
      console.warn(`路由 ${menu.path} 不存在`);
    }
  };
</script>

<style scoped lang="scss">
  .basic-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .basic-layout-content {
    display: flex;
    flex: 1;
    overflow: hidden;

    &-view {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;

      &-body {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        overflow: auto;
      }
    }
  }
</style>
