<template>
  <template
    v-for="(item, index) in menus"
    :key="index"
  >
    <div
      class="base-menu-item"
      :class="{
        'base-menu-item-column': item.children && item.children.length,
        'is-active': item.path === activeMenu?.path
      }"
    >
      <div
        v-if="item.children && item.children.length"
        class="menu-group"
      >
        <div class="menu-group-title">
          {{ item.name }}
        </div>
        <base-menu-item
          :menus="item.children"
          :active-menu="activeMenu"
          @navigate="onNavigate"
        />
      </div>
      <div
        v-else
        class="menu-item-leaf"
        @click="onNavigate(item)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { Menu } from '@/typing/index';

  defineOptions({
    name: 'BaseMenuItem',
  });

  const emit = defineEmits<{
    (e: 'navigate', item: Menu): void;
  }>();

  const onNavigate = (item: Menu) => {
    emit('navigate', item);
  };

  defineProps<{
    menus: Menu[];
    activeMenu?: Menu;
  }>();
</script>

<style scoped lang="scss">
  .base-menu-item {
    display: flex;

    &-column {
      flex-direction: column;
    }

    // 仅叶子节点添加分隔符
    &:not(&-column)::after {
      content: '|';
      margin: 0 8px;
      color: rgba(0, 0, 0, 0.35);
    }

    // 最后一个子项不显示
    &:last-child::after {
      content: none;
    }
  }

  .menu-group {
    display: flex;

    .menu-group-title {
      color: rgba(0, 0, 0, 0.5);
      flex: 0 0 84px;
      white-space: nowrap;
      font-size: 14px;
    }
  }

  .menu-item-leaf {
    position: relative;
    margin-bottom: 12px;
    padding: 2px 8px;
    cursor: pointer;
    color: var(--theme-text);
    transition: background 0.2s;
    border-radius: 4px;

    &:hover {
      background: var(--theme-text-bg-hover);
      color: var(--theme-text-hover);
    }
  }

  .is-active > .menu-item-leaf {
    color: var(--theme-text-active);
  }
</style>
