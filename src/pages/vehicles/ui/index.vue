<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
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

const route = useRoute();

const isLoading = ref(true);
const hasError = ref(false);
const getId = useId();
let vehicles: (Vehicle & { id: string })[] = [];

onBeforeMount(async () => {
    try {
        const { results } = await getVehicles();
        vehicles = results.map((vehicle: Vehicle) => {
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
});
</script>

<template>
    <app-layout>
        <template #title v-if="route.meta.title">{{ route.meta.title }}</template>
        <template #content>
            <app-preloader
                :isLoading="isLoading"
                :hasError="hasError"
            >
                <app-container>
                    <app-card v-for="vehicle of vehicles" class="w-full flex justify-between mb-4">
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
