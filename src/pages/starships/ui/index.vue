<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppControlPane from '@/widgets/controlPane/ui/index.vue';
import AppInfo from '@/shared/ui/info/ui/index.vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { useRoute } from 'vue-router';
import { useId } from '@/shared/use/id';
import { routeNames } from '@/app/routes';
import { getStarships } from '@/shared/api/starships';
import { useSorting } from '@/features/sorting/model';

type StarshipWithId = Starship & { id: string }

const route = useRoute();
const sorting = useSorting();
const isLoading = ref(true);
const hasError = ref(false);
const getId = useId();
const originalItems = ref<StarshipWithId[]>([]);
const sortedItems = ref<StarshipWithId[]>([]);

sorting.init((sortingValue: string, order: SortingOrder) => {
    if (!sorting) {
        return;
    }

    sortedItems.value = sorting.sort<StarshipWithId>(originalItems.value, sortingValue, order);
});

const fetch = async () => {
    try {
        isLoading.value = true;
        hasError.value = true;

        const { results } = await getStarships();
        originalItems.value = results.map((starship: Starship) => {
            return {
                ...starship,
                id: getId(starship.url),
            };
        });
    } catch (error) {
        hasError.value = true;
    } finally {
        isLoading.value = false;
    }
};

onBeforeMount(async () => {
    await fetch();
    sortedItems.value = originalItems.value;
});
</script>

<template>
    <app-layout>
        <template #title v-if="route.meta.title">{{ route.meta.title }}</template>
        <template #content>
            <app-control-pane class="mb-12" />
            <app-preloader
                :isLoading="isLoading"
                :hasError="hasError"
                @refresh="fetch"
            >
                <app-container>
                    <app-card v-for="starship of sortedItems" class="w-full flex justify-between mb-4">
                        <div class="flex items-center">
                            <app-header
                                level="3"
                                class="text-white text-xl mr-8"
                            >{{ starship.name }}</app-header>
                            <app-info
                                :value="starship.manufacturer"
                                title="Manufacturer"
                            />
                        </div>
                        <p><app-anchor class="text-sm uppercase font-bold text-yellow-500" :to="{ name: routeNames.starship, params: { id: starship.id }}">Details</app-anchor></p>
                    </app-card>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>
