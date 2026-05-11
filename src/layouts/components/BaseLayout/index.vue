<template>
  <div class="basic-layout">
    <base-header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from './components/BaseHeader/index.vue';
</script>

<style scoped lang="scss"></style>
