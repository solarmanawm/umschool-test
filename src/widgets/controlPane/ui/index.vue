<script setup lang="ts">
import { computed } from 'vue';
import { useSorting } from '@/features/sorting/model';
import AppSorting from '@/features/sorting/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';

const sorting = useSorting();
const isSortingVisible = computed(() => sorting.options.length > 0);
// const isFilteringVisible = computed(() => sortingModel.filteringOptions.length > 0);
const isWidgetVisible = computed(() => isSortingVisible.value);
</script>

<template>
    <app-container
        v-if="isWidgetVisible"
        class="flex items-center justify-between"
    >
        <app-sorting v-if="isSortingVisible" />
    </app-container>
</template>