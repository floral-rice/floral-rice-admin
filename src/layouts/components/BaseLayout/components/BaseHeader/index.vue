<template>
  <div class="base-layout-header">
    <div class="header-left">
      <img :src="logo">
      <div>花生米后台</div>
    </div>
    <div>header-user</div>
  </div>
</template>

<script setup lang="ts">
  import logo from '@/assets/imgs/logo.png';
</script>

<style scoped lang="scss">
  .base-layout-header {
    display: flex;
    padding: 6px 12px;
    gap: 12px;
    align-items: center;
    background: var(--theme-bg);
    justify-content: space-between;
  }

  .header-left {
    display: flex;
    white-space: nowrap;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 18px;
    color: var(--theme-text);
    line-height: 14px;
  }

  .header-middle {
    flex: 1;
    overflow: hidden;
  }
</style>
