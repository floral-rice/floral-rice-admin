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
  import { ref, reactive } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { setToken } from '@/utils';

  const formRef = ref<FormInstance>();
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
    // 处理数组情况
    if (Array.isArray(redirect)) {
      path = decodeURIComponent(redirect[0] || '');
    }

    // 处理字符串情况
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

  console.log(route);
  const onLogin = async () => {
    await formRef.value?.validate();
    run(formData.value);
  };
</script>

<template>
  <div class="login-container">
    <div class="login-header" />
    <div class="login-box">
      <div class="login-box-inner">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
        >
          <el-form-item
            label="账号"
            prop="account"
          >
            <el-input
              v-model="formData.account"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="formData.password"
              placeholder="请输入账号"
              type="password"
              show-password
            />
          </el-form-item>
        </el-form>
        <div class="login-box-login">
          <el-button
            v-loading="loading"
            type="primary"
            round
            class="btn"
            size="large"
            @click="onLogin"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
    <div class="login-footer" />
  </div>
</template>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: url('../../assets/imgs/login-background.png') no-repeat;
    background-size: 100% 100%;
  }

  .login-box {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    &-inner {
      background: #fff;
      padding: 36px 24px;
      border-radius: 8px;
    }

    &-login {
      width: 100%;
      text-align: center;

      .btn {
        width: 100%;
      }
    }
  }

  .login-footer {
    margin: 12px 0;
    text-align: center;
  }
</style>
