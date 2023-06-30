import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
    const isLogin = ref(false);

    const login = () => {
        isLogin.value = true;
    };

    const logout = () => {
        isLogin.value = false;
    };

    return {
        isLogin: computed(() => isLogin.value),
        login,
        logout,
    };
});