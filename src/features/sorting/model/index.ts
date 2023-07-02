import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type Handler = (sorting: string, order: SortingOrder) => void;

export const useSorting = defineStore('sorting', () => {
    const isActive = ref(false);
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

    const disable = () => {
        isActive.value = false;
    };

    const enable = () => {
        isActive.value = true;
    };

    const sort = function<T>(items: T[], sorting: string, order: SortingOrder): T[] {
        return items.sort((prev, next) => {
            if (order === 'ASC') {
                return prev[sorting as keyof T]!.toString().localeCompare(next[sorting as keyof T]!.toString());
            } else {
                return next[sorting as keyof T]!.toString().localeCompare(prev[sorting as keyof T]!.toString());
            }
        });
    }

    return {
        init,
        disable,
        enable,
        updateValue,
        updateOrder,
        updateOptions,
        sort,
        options: computed(() => options.value),
        isActive: computed(() => isActive.value),
    };
});
