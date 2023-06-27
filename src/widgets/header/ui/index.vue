<script setup lang="ts">
import AppNav from '@/features/nav/ui/index.vue';
import AppContainer from '@/shared/container/ui/index.vue';
</script>

<script lang="ts">
export default {
    name: 'AppHeader',
};
</script>

<template>
    <header class="border-b border-b-gray-800 py-8">
        <app-container class="flex flex-col items-center">
            <div class="text-yellow-500 font-bold text-2xl">StarWars Discowery</div>
            <app-nav class="mt-4" />
        </app-container>
    </header>
</template>