<script lang="ts"></script>

<template>
  <div class="blank-layout">
    <slot />
  </div>
</template>

<style scoped>
.blank-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
