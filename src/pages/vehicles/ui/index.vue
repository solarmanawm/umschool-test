<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppControlPane from '@/widgets/controlPane/ui/index.vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { useRoute } from 'vue-router';
import { useId } from '@/shared/use/id';
import { routeNames } from '@/app/routes';
import { getVehicles } from '@/shared/api/vehicles';
import { useSorting } from '@/features/sorting/model';

const route = useRoute();
const sorting = useSorting();
const isLoading = ref(true);
const hasError = ref(false);
const getId = useId();
const originalItems = ref<(Vehicle & { id: string })[]>([]);
const sortedItems = ref<(Vehicle & { id: string })[]>([]);

sorting.init((sorting: string, order: SortingOrder) => {
    sortedItems.value = originalItems.value.sort((prev, next) => {
        if (order === 'ASC') {
            return prev[sorting as keyof Vehicle]!.toString().localeCompare(next[sorting as keyof Vehicle]!.toString());
        } else {
            return next[sorting as keyof Vehicle]!.toString().localeCompare(prev[sorting as keyof Vehicle]!.toString());
        }
    });
});

const fetch = async () => {
    try {
        isLoading.value = true;
        hasError.value = false;

        const { results } = await getVehicles();
        originalItems.value = results.map((vehicle: Vehicle) => {
            return {
                ...vehicle,
                id: getId(vehicle.url),
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
                    <app-card v-for="vehicle of sortedItems" class="w-full flex justify-between mb-4">
                        <div class="flex items-center">
                            <app-header
                                level="3"
                                class="text-white text-xl"
                            >{{ vehicle.name }}</app-header>
                            <p class="capitalize ml-8 text-sm">Classification: <span class="text-white font-bold">{{ vehicle.manufacturer }}</span></p>
                        </div>
                        <p><app-anchor class="text-sm uppercase font-bold text-yellow-500" :to="{ name: routeNames.vehicle, params: { id: vehicle.id }}">Details</app-anchor></p>
                    </app-card>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>
