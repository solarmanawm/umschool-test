<script setup lang="ts">
import AppLogin from '@/features/login/ui/index.vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import { useRoute } from 'vue-router';
import { useLoginStore } from '@/features/login/model';

const loginStore = useLoginStore();
const route = useRoute();
</script>

<template>
    <app-layout>
        <template #title>{{ route.meta.title }}</template>
        <template #content>
            <app-login v-if="!loginStore.isLogin" />
            <p
                v-else
                class="text-yellow-500 font-bold"
            >Welcome, dear user!</p>
        </template>
    </app-layout>
</template>