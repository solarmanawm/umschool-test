import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type Handler = (sorting: string, order: SortingOrder) => void;

export const useSorting = defineStore('sorting', () => {
    const options = ref<Option[]>([]);
    const sortingValue = ref('');
    const sortingOrder = ref<SortingOrder>('' as SortingOrder);
    let sortingHandler: Handler = () => {};

    const updateValue = (value: string) => {
        sortingValue.value = value;
        sortingHandler(value, sortingOrder.value);
    };

    const updateOrder = (value: SortingOrder) => {
        sortingOrder.value = value;
        sortingHandler(sortingValue.value, value);
    };

    const updateOptions = (newOptions: Option[]) => {
        options.value = newOptions;
    };

    const init = (handler: Handler) => {
        sortingHandler = handler;
    };

    return {
        init,
        updateValue,
        updateOrder,
        updateOptions,
        options: computed(() => options.value),
    };
});
