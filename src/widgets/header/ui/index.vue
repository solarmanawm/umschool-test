<script setup lang="ts">
import AppNav from '@/features/nav/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import { useLoginStore } from '@/features/login/model';

const loginStore = useLoginStore();
</script>

<script lang="ts">
export default {
    name: 'AppHeader',
};
</script>

<template>
    <header class="border-b border-b-gray-800 py-8">
        <app-container class="flex flex-col items-center">
            <div class="text-yellow-500 font-bold text-2xl">StarWars Discovery</div>
            <app-nav class="mt-4" :is-login="loginStore.isLogin" />
        </app-container>
    </header>
</template>