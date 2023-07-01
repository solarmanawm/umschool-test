<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppSelect from '@/shared/ui/select/ui/index.vue';
import { useSorting } from '@/features/sorting/model';

const route = useRoute();

if (!route.name) {
    throw new Error('No route name found!');
}

const sorting = useSorting();
const sortingValue = ref('');
const sortingOrder = ref<SortingOrder>('ASC');
const orderOptions = [
    { title: 'ASC', value: 'ASC' },
    { title: 'DESC', value: 'DESC' },
];

watch(sortingValue, (value: string) => {
    sorting.updateValue(value);
});

watch(sortingOrder, (value: SortingOrder) => {
    sorting.updateOrder(value);
});
</script>

<script lang="ts">
export default {
    name: 'AppSorting',
};
</script>

<template>
    <div class="flex">
        <div class="flex flex-col items-start">
            <div class="text-xs text-white uppercase mb-2">Sorting:</div>
            <app-select
                v-model="sortingValue"
                :options="sorting.options"
            />
        </div>
        <div class="flex flex-col items-start ml-4">
            <div class="text-xs text-white uppercase mb-2">Order:</div>
            <app-select
                v-model="sortingOrder"
                :options="orderOptions"
            />
        </div>
    </div>
</template>
