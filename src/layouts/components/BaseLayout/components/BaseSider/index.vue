<template>
  <div class="base-layout-sider">
    <div class="base-layout-sider-menu">
      <template
        v-for="(menu, index) in menus"
        :key="index"
      >
        <el-popover
          v-if="menu.children && menu.children.length"
          placement="right-start"
          :width="588"
          trigger="hover"
          popper-class="menu-popover"
          :show-arrow="false"
          :teleported="false"
          :offset="4"
        >
          <template #reference>
            <div
              class="menu-item menu-item-popover"
              :class="{ 'is-active': isMenuActive(menu) }"
            >
              <span>{{ menu.name }}</span>
            </div>
          </template>
          <div>
            <div class="menu-popup-title">
              {{ menu.name }}
            </div>
            <base-menu-item
              :menus="menu.children"
              :active-menu="activeMenu"
              @navigate="onNavigate"
            />
          </div>
        </el-popover>
        <div
          v-else
          class="menu-item"
          :class="{ 'is-active': menu.path === activeMenu?.path }"
          @click="onNavigate(menu)"
        >
          <span>{{ menu.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Menu } from '@/typing/index';
  import BaseMenuItem from '../BaseMenuItem/index.vue';

  const props = defineProps<{
    menus: Menu[];
    activeMenu?: Menu;
  }>();

  const emit = defineEmits<{
    (e: 'navigate', item: Menu): void;
  }>();

  const isMenuActive = (menu: Menu): boolean => {
    if (!props.activeMenu) return false;
    return isMenuContainsPath(menu, props.activeMenu.path);
  };

  const isMenuContainsPath = (menu: Menu, path?: string): boolean => {
    if (!path) return false;
    if (menu.path === path) return true;
    if (menu.children) {
      return menu.children.some((child) => isMenuContainsPath(child, path));
    }
    return false;
  };

  const onNavigate = (menu: Menu) => {
    emit('navigate', menu);
  };
</script>

<style scoped lang="scss">
  .base-layout-sider {
    overflow-y: auto;
    width: 172px;
    // background: var(--theme-bg);
  }

  .base-layout-sider-menu {
    padding: 8px 12px 0;
  }

  :deep(.menu-popover) {
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: var(--theme-text);
    font-size: 14px;
    transition: background 0.2s;
    height: 40px;

    &:hover {
      background: var(--theme-text-bg-hover);
    }

    &.is-active {
      color: var(--theme-text-active);
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .menu-popup-title {
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #ccc;
  }
</style>
