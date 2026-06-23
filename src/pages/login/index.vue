<route lang="yaml">
name: login
meta:
  title: 登录
  layout: BlankLayout
</route>

<script setup lang="ts">
  import { useRequest } from '@/hooks/useRequest';
  import { login } from '@/services/login';
  import { Login } from '@/typing/login';
  import { FormInstance, FormRules } from 'element-plus';
  import { User, Lock } from '@element-plus/icons-vue';
  import { ref, reactive } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { setToken } from '@/utils';
  import logo from '@/assets/imgs/logo.png';

  const formRef = ref<FormInstance>();
  const rememberMe = ref(false);
  const formData = ref<Login>({
    account: '',
    password: '',
  });
  const router = useRouter();
  const route = useRoute();

  const rules = reactive<FormRules<Login>>({
    account: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  });

  const goTo = () => {
    const redirect = route.query.redirect;
    let path = '/';
    if (Array.isArray(redirect)) {
      path = decodeURIComponent(redirect[0] || '');
    }
    if (typeof redirect === 'string') {
      path = decodeURIComponent(redirect);
    }
    void router.replace(path);
  };

  const { run, loading } = useRequest(login, {
    onSuccess: res => {
      if (res.data.token) {
        setToken(res.data.token);
      }
      goTo();
    },
  });

  const onLogin = async () => {
    await formRef.value?.validate();
    run(formData.value);
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      void onLogin();
    }
  };
</script>

<template>
  <div class="login-container">
    <!-- 左侧品牌区域 -->
    <div class="login-brand">
      <div class="brand-circle brand-circle--1" />
      <div class="brand-circle brand-circle--2" />
      <div class="brand-circle brand-circle--3" />

      <div class="login-brand-content">
        <div class="login-brand-logo-wrap">
          <img
            :src="logo"
            alt="Logo"
            class="login-brand-logo"
          >
        </div>
        <h1 class="login-brand-title">
          Floral Rice
        </h1>
        <p class="login-brand-desc">
          后台管理系统
        </p>
        <div class="login-brand-divider" />
        <p class="login-brand-slogan">
          高效 · 安全 · 专业
        </p>
      </div>

      <div class="login-brand-footer">
        <span>© 2026 Floral Rice Admin</span>
      </div>
    </div>

    <!-- 右侧登录区域 -->
    <div class="login-main">
      <div class="main-decor main-decor--1" />
      <div class="main-decor main-decor--2" />

      <div class="login-card">
        <div class="login-card-header">
          <h2 class="login-card-title">
            欢迎回来
          </h2>
          <p class="login-card-subtitle">
            请登录您的管理员账号
          </p>
        </div>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          class="login-form"
          size="large"
        >
          <el-form-item prop="account">
            <el-input
              v-model="formData.account"
              placeholder="请输入账号"
              @keyup="handleKeyup"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              type="password"
              show-password
              @keyup="handleKeyup"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <div class="login-options">
            <el-checkbox v-model="rememberMe">
              记住密码
            </el-checkbox>
          </div>

          <el-form-item>
            <el-button
              v-loading="loading"
              type="primary"
              class="login-btn"
              size="large"
              @click="onLogin"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-card-footer">
          <span>Floral Rice Admin v1.0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login-container {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  // ========== 左侧品牌 ==========
  .login-brand {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%);
    color: #fff;
    position: relative;
    padding: 40px;
    overflow: hidden;

    .brand-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);

      &--1 {
        width: 400px;
        height: 400px;
        top: -100px;
        left: -100px;
        animation: float 8s ease-in-out infinite;
      }

      &--2 {
        width: 250px;
        height: 250px;
        bottom: -60px;
        right: -60px;
        animation: float 6s ease-in-out infinite reverse;
      }

      &--3 {
        width: 150px;
        height: 150px;
        top: 50%;
        right: 10%;
        background: rgba(255, 255, 255, 0.03);
        animation: float 10s ease-in-out infinite;
      }
    }

    &-content {
      text-align: center;
      z-index: 1;
    }

    &-logo-wrap {
      display: inline-block;
      padding: 6px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      margin-bottom: 28px;
    }

    &-logo {
      width: 72px;
      height: 72px;
      border-radius: 14px;
      display: block;
    }

    &-title {
      font-size: 34px;
      font-weight: 700;
      margin: 0 0 10px;
      letter-spacing: 3px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    &-desc {
      font-size: 16px;
      opacity: 0.8;
      margin: 0;
      letter-spacing: 6px;
    }

    &-divider {
      width: 40px;
      height: 2px;
      background: rgba(255, 255, 255, 0.3);
      margin: 20px auto;
      border-radius: 1px;
    }

    &-slogan {
      font-size: 14px;
      opacity: 0.55;
      margin: 0;
      letter-spacing: 8px;
    }

    &-footer {
      position: absolute;
      bottom: 24px;
      font-size: 12px;
      opacity: 0.35;
      z-index: 1;
    }
  }

  // ========== 右侧登录区 ==========
  .login-main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f7fa;
    padding: 40px;
    position: relative;
    overflow: hidden;

    .main-decor {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(44, 83, 100, 0.06) 0%, rgba(44, 83, 100, 0.02) 100%);

      &--1 {
        width: 300px;
        height: 300px;
        top: -80px;
        right: -80px;
      }

      &--2 {
        width: 200px;
        height: 200px;
        bottom: -40px;
        left: -40px;
      }
    }
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    background: #fff;
    border-radius: 16px;
    padding: 48px 40px 36px;
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.05),
      0 1px 2px rgba(0, 0, 0, 0.03);
    position: relative;
    z-index: 1;

    &-header {
      margin-bottom: 32px;
    }

    &-title {
      font-size: 26px;
      font-weight: 700;
      color: #1a2332;
      margin: 0 0 8px;
    }

    &-subtitle {
      font-size: 14px;
      color: #a0a8b4;
      margin: 0;
    }

    &-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #f0f2f5;

      span {
        font-size: 12px;
        color: #c0c4cc;
      }
    }
  }

  .login-form {
    :deep(.el-input__wrapper) {
      padding: 4px 14px;
      border-radius: 10px;
      box-shadow: 0 0 0 1px #e4e7ed inset;
      transition: box-shadow 0.2s;

      &:hover {
        box-shadow: 0 0 0 1px #c0c4cc inset;
      }

      &.is-focus {
        box-shadow: 0 0 0 1px #2c5364 inset;
      }
    }

    :deep(.el-input__prefix) {
      color: #c0c4cc;
      font-size: 16px;
    }
  }

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .login-btn {
    width: 100%;
    height: 46px;
    font-size: 16px;
    border-radius: 10px;
    letter-spacing: 6px;
    background: linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%);
    border: none;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      background: linear-gradient(135deg, #1a3a47 0%, #2d4f5c 40%, #3a6a7e 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(44, 83, 100, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // ========== 动画 ==========
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  // ========== 响应式 ==========
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }

    .login-brand {
      padding: 32px 24px;

      .brand-circle {
        display: none;
      }

      &-logo-wrap {
        margin-bottom: 16px;
      }

      &-logo {
        width: 52px;
        height: 52px;
      }

      &-title {
        font-size: 24px;
      }

      &-desc {
        font-size: 14px;
        letter-spacing: 4px;
      }

      &-divider {
        margin: 14px auto;
      }

      &-slogan {
        font-size: 12px;
      }

      &-footer {
        position: static;
        margin-top: 20px;
      }
    }

    .login-main {
      padding: 24px;

      .main-decor {
        display: none;
      }
    }

    .login-card {
      padding: 32px 24px 24px;
      border-radius: 12px;
    }
  }
</style>
