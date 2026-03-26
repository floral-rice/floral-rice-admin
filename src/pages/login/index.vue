<route lang="yaml">
name: login
meta:
  title: 登录
  layout: blank-layout
</route>

<script setup lang="ts">
// import logo from '@/assets/imgs/logo.png';
</script>

<template>
  <div class="login-container">
    <div>
      <el-image :src="logo" />
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/imgs/login-background.png") no-repeat;
  background-size: 100% 100%;
}
</style>
