<script setup lang="ts">
import AppSpinner from '@/shared/ui/spinner/ui/index.vue';
interface Props {
    isLoading: boolean;
}

const props = defineProps<Props>();
</script>

<script lang="ts">
export default {
    name: 'AppPreloader',
};
</script>

<template>
    <template v-if="isLoading">
        <div class="w-full h-60 flex items-center justify-center">
            <app-spinner class="animate-spin" />
        </div>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>