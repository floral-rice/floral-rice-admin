import { User } from '@/typing/user';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as User,
    };
  },
  actions: {
    setUser(userInfo: User) {
      this.user = userInfo;
    },
  },
});
