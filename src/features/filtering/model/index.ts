import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type Handler = (field: string, value: string) => void;

export const useFiltering = defineStore('filtering', () => {
    const isActive = ref(false);
    const options = ref<string[]>([]);
    const field = ref('');
    const filtering = ref('');
    let sortingHandler: Handler = () => {};

    const updateValue = (value: string) => {
        filtering.value = value;
        sortingHandler(field.value, value);
    };

    const updateOptions = (newOptions: FilteringOptions) => {
        options.value = newOptions.values;
        field.value = newOptions.field;
    };

    const init = (handler: Handler) => {
        sortingHandler = handler;
    };

    const disable = () => {
        isActive.value = false;
    };

    const enable = () => {
        isActive.value = true;
    };

    return {
        init,
        disable,
        enable,
        updateValue,
        updateOptions,
        options: computed(() => options.value),
        field: computed(() => field.value),
        isActive: computed(() => isActive.value),
    };
});
