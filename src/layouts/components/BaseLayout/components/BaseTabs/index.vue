<template>
  <div class="base-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.path"
      class="base-tabs-item"
      :class="{ 'is-active': tab.path === activeMenu?.path }"
      @click="onTabClick(tab)"
    >
      <span class="base-tabs-item__text">{{ tab.name }}</span>
      <span
        v-if="tabs.length > 1"
        class="base-tabs-item__close"
        @click.stop="onTabClose(tab)"
      >
        ×
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Menu } from '@/typing/index';

  defineProps<{
    tabs: Menu[];
    activeMenu?: Menu;
  }>();

  const emit = defineEmits<{
    (e: 'close', tab: Menu): void;
    (e: 'click', tab: Menu): void;
  }>();

  const onTabClick = (tab: Menu) => {
    emit('click', tab);
  };

  const onTabClose = (tab: Menu) => {
    emit('close', tab);
  };
</script>

<style scoped lang="scss">
  .base-tabs {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px;

    &-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
      border-radius: 4px 4px 0 0;
      transition: all 0.2s;
      color: #999;
      background: #fafafa;

      &:hover {
        color: var(--theme-text-color);
      }

      &.is-active {
        color: var(--theme-text-color);
        background: var(--theme-bg);
      }

      &__text {
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &__close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        font-size: 12px;
        line-height: 1;
        border-radius: 50%;
        transition: all 0.2s;

        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }

      &.is-active &__close:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
</style>
