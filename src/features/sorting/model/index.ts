import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

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

    const init = (handler: Handler) => {
        const route = useRoute();

        sortingHandler = handler;
        options.value = route.meta.sorting as Option[] || [];
    };

    return {
        init,
        updateValue,
        updateOrder,
        options: computed(() => options.value),
    };
});
