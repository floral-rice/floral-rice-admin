import { TOKEN } from '@/constant';
import { UserInfo } from '@/typing/user';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as UserInfo['user'],
      login_in: dayjs().valueOf(),
      expires_in: 0,
    };
  },
  actions: {
    setUser(userInfo: UserInfo) {
      this.user = userInfo.user || {};
      const currentTime = dayjs().valueOf();
      this.expires_in = currentTime + (userInfo.expires_in || 0);
      this.login_in = currentTime;
      if (userInfo.token) {
        localStorage.setItem(TOKEN, userInfo.token);
      }
    },
  },
});
