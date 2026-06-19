<template>
  <div
    v-if="loading"
    v-loading="loading"
    class="loading-container"
  />
  <base-layout
    v-else
    :menus="menus"
    :authorities="authorities"
  />
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue';
  import BaseLayout from './components/BaseLayout/index.vue';
  import { Menu } from '../typing/index';
  import { useRequest } from '@/hooks/useRequest.js';
  import { getUserInfo } from '@/services/user.js';
  import { useUserStore } from '@/store/index.js';

  const userStore = useUserStore();
  const loading = ref<boolean>(false);

  const { run: getUerInfo } = useRequest(getUserInfo, {
    onLoading: state => (loading.value = state),
    onSuccess: res => {
      console.log(res);
      userStore.setUser(res.data);
    },
  });

  onBeforeMount(() => {
    getUerInfo();
  });

  const authorities = computed(() => {
    return (userStore.user.permissions || []).map(i => i.name || '').filter(Boolean);
  });

  const menus = ref<Menu[]>([
    {
      name: '首页',
      path: '/home',
    },
    {
      name: '设置',
      children: [
        {
          name: '用户',
          children: [
            {
              name: '用户管理',
              path: '/user/list',
              authority: '设置-用户-用户管理-查询',
            },
            {
              name: '角色管理',
              path: '/user/role-list',
              authority: '设置-用户-角色管理-查询',
            },
            {
              name: '权限管理',
              path: '/user/auth-list',
              authority: '设置-用户-权限管理-查询',
            },
          ],
        },
      ],
    },
    // {
    //   name: '用户管理2',
    //   children: [
    //     {
    //       name: '用户设置2',
    //       children: [
    //         {
    //           name: '用户列表',
    //           path: '/user/list',
    //           authority: '测试',
    //         },
    //         {
    //           name: '用户列表2',
    //           path: '/user/list',
    //           authority: '测试',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);
</script>

<style scoped lang="scss">
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>
