import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        // setUser(user: Record<string, string>) {
        //     this.user = user;
        // }
    }
})