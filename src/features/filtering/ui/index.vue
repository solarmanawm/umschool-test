<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppSelect from '@/shared/ui/select/ui/index.vue';
import { useFiltering } from '@/features/filtering/model';

const route = useRoute();

if (!route.name) {
    throw new Error('No route name found!');
}

const filtering = useFiltering();
const filteringValue = ref('');
const filteringOptions = filtering.options.map((option: string) => ({ title: option, value: option }));

watch(filteringValue, (value: string) => {
    filtering.updateValue(value);
});
</script>

<script lang="ts">
export default {
    name: 'AppFiltering',
};
</script>

<template>
    <div class="flex">
        <div class="flex flex-col items-start">
            <div class="text-xs text-white uppercase mb-2">Filtering: {{ filteringValue }}</div>
            <app-select
                v-model="filteringValue"
                :options="filteringOptions"
            />
        </div>
    </div>
</template>
