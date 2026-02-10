<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const zIndex = ref(1000);
const locale = zhCn;
</script>

<template>
  <el-config-provider
    :z-index="zIndex"
    size="small"
    :locale="locale"
  >
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
