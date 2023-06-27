<script setup lang="ts">
import AppHeader from '@/widgets/header/ui/index.vue';
import AppFooter from '@/widgets/footer/ui/index.vue';
</script>

<template>
    <div class="w-full flex flex-col text-center min-h-screen bg-gray-900">
        <app-header/>
        <main class="flex-1">
            <router-view></router-view>
        </main>
        <app-footer />
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
