<script setup lang="ts">
import { computed } from 'vue';
import { useSorting } from '@/features/sorting/model';
import { useFiltering } from '@/features/filtering/model';
import AppSorting from '@/features/sorting/ui/index.vue';
import AppFiltering from '@/features/filtering/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';

const sorting = useSorting();
const filtering = useFiltering();
const isSortingVisible = computed(() => sorting.options.length > 0);
const isFilteringVisible = computed(() => filtering.options.length > 0);
const isWidgetVisible = computed(() => isSortingVisible.value || isFilteringVisible.value);
</script>

<template>
    <app-container
        v-if="isWidgetVisible"
        class="flex items-center justify-between"
    >
        <app-sorting v-if="isSortingVisible" />
        <app-filtering v-if="isFilteringVisible" />
    </app-container>
</template>