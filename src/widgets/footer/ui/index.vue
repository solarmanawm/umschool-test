<script setup lang="ts">
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
</script>

<script lang="ts">
export default {
    name: 'AppFooter',
};
</script>

<template>
    <footer class="border-t border-t-gray-800 py-8 text-gray-400 text-xs">
        <app-container class="flex justify-between">
            <p>Copyright © 2023 <app-anchor class="text-white" href="https://github.com/solarmanawm">solarmanawm</app-anchor>.</p>
            <p>Powered by <app-anchor class="text-white" href="https://feature-sliced.design/">Feature-Sliced Design</app-anchor> and <app-anchor class="text-white" href="https://swapi.dev/">SWAPI</app-anchor></p>
        </app-container>
    </footer>
</template>