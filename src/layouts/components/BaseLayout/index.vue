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
        <base-tabs
          :tabs="tabs"
          :active-menu="activeMenu"
          @click="onTabClick"
          @close="onTabClose"
        />
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
  import BaseTabs from './components/BaseTabs/index.vue'
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

  const findMenuByPath = (menus: Menu[], path: string): Menu | undefined => {
    const normalizedPath = normalizePath(path);
    for (const menu of menus) {
      if (menu.children?.length) {
        const found = findMenuByPath(menu.children, path);
        if (found) return found;
      } else if (menu.path && normalizePath(menu.path) === normalizedPath) {
        return menu;
      }
    }
    return undefined;
  };

  const activeMenu = ref<Menu | undefined>();
  const tabs = ref<Menu[]>([]);
  const route = useRoute();

  const syncActiveMenu = () => {
    // 优先使用 meta.parent 关联父菜单
    const parentPath = route.meta.parent as string | undefined;
    const targetPath = parentPath || route.path;
    const menu = findMenuByPath(filteredMenus.value, targetPath);
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
  // watch(filteredMenus, () => syncActiveMenu());

  const onNavigate = (menu: Menu) => {
    if (!menu.path) return;
    const resolved = router.resolve(menu.path);
    if (resolved.matched.length > 0) {
      void router.push(menu.path);
    } else {
      console.warn(`路由 ${menu.path} 不存在`);
    }
  };

  const onTabClick = (tab: Menu) => {
    if (!tab.path) return;
    void router.push(tab.path);
  };

  const onTabClose = (tab: Menu) => {
    const index = tabs.value.findIndex(item => item.path === tab.path);
    if (index === -1) return;

    // 如果关闭的是当前活跃 tab，切换到相邻 tab
    const isActive = tab.path === activeMenu.value?.path;
    tabs.value.splice(index, 1);

    if (isActive && tabs.value.length > 0) {
      const nextTab = tabs.value[index] || tabs.value[index - 1];
      void router.push(nextTab.path!);
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
