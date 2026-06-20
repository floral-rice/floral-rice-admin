<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
  import { provide, ref } from 'vue';

  // 子页面共享数据容器
  const subContext = ref<Record<string, unknown>>({});
  provide('subContext', subContext);
</script>
