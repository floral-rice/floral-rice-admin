<route lang="yaml">
name: login
meta:
  title: 登录
  layout: blank-layout
</route>

<script setup lang="ts"></script>

<template>
  <div class="login-container">
    <div class="login-header" />
    <div class="login-box">
      <div class="login-box-inner">
        qw
      </div>
    </div>
    <div class="login-footer" />
  </div>
</template>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url("../../assets/imgs/login-background.png") no-repeat;
  background-size: 100% 100%;
}

.login-box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &-inner {
    background: #fff;
    padding: 12px;
    border-radius: 8px;
  }
}

.login-footer {
  margin: 12px 0;
  text-align: center;
}
</style>
