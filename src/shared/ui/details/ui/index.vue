<script setup lang="ts">
import AppDetail from '@/shared/ui/detail/ui/index.vue';

interface Props {
    details: Detail[],
}

defineProps<Props>();
</script>

<script lang="ts">
export default {
    name: 'AppDetails',
};
</script>

<template>
    <div class="border-t border-t-gray-700">
        <app-detail
            v-for="detail of details"
            :key="detail.title"
            :title="detail.title"
            :link="detail.link"
        />
    </div>
</template>