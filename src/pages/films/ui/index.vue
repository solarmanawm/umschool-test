<script setup lang="ts">
import AppLayout from '@/shared/layout/ui/index.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <app-layout>
        <template #title v-if="route.meta.title">{{ route.meta.title }}</template>
        <template #content>
            <p>content</p>
        </template>
    </app-layout>
</template>