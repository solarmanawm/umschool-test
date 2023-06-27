<script setup lang="ts">
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';

interface Props {
    title: string;
    link: string;
}

const props = defineProps<Props>();
</script>

<script lang="ts">
export default {
    name: 'AppDetail',
};
</script>

<template>
    <div class="flex items-center justify-between border-b border-b-gray-700 p-4 text-gray-400 hover:bg-gray-800">
        <span>{{ title }}</span>
        <app-anchor class="text-white" :to="link">Details</app-anchor>
    </div>
</template>