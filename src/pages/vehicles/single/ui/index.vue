<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppButton from '@/shared/ui/button/ui/index.vue';
import AppDetails from '@/shared/ui/details/ui/index.vue';
import { useRoute } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getVehicleById } from '@/shared/api/vehicles';
import { useDetails } from '@/shared/use/details';
import { useDetailsSource } from '@/shared/use/detailsSource';
import { useGoTo } from '@/shared/use/goTo';

const goTo = useGoTo();
const isLoading = ref(true);
const hasError = ref(false);

let vehicle: Vehicle = {} as Vehicle;
let filmsDetails: Detail[] = [];
let charactersDetails: Detail[] = [];

const fetch = async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        isLoading.value = true;
        hasError.value = false;

        try {
            vehicle = await getVehicleById(id as string);
        } catch (error) {
            hasError.value = true;

            throw error;
        }

        const films: Film[] = await useDetailsSource(vehicle.films).fetch<Film>();
        filmsDetails = useDetails<Film>(films, 'films');

        const characters: Character[] = await useDetailsSource(vehicle.pilots).fetch<Character>();
        charactersDetails = useDetails<Character>(characters, 'people');
    } finally {
        isLoading.value = false;
    }
};

onBeforeMount(async () => {
    await fetch();
});
</script>

<template>
    <app-preloader
        :isLoading="isLoading"
        :hasError="hasError"
        @refresh="fetch"
    >
        <app-layout>
            <template #title v-if="vehicle.name">{{ vehicle.name }}</template>
            <template #content>
                <app-container>
                    <p class="text-gray-600">Classification: <span class="text-white capitalize">{{ vehicle.manufacturer }}</span></p>

                    <app-card class="flex justify-between mt-8">
                        <p>Cargo Capacity: <span class="text-yellow-500 capitalize">{{ vehicle.cargo_capacity }}</span></p>
                        <p>Consumables: <span class="text-yellow-500 capitalize">{{ vehicle.consumables }}</span></p>
                        <p>Cost In Credits: <span class="text-yellow-500 capitalize">{{ vehicle.cost_in_credits }}</span></p>
                        <p>Crew: <span class="text-yellow-500 capitalize">{{ vehicle.crew }}</span></p>
                        <p>Length: <span class="text-yellow-500 capitalize">{{ vehicle.length }}</span></p>
                        <p>Max Atmosphering Speed: <span class="text-yellow-500 capitalize">{{ vehicle.max_atmosphering_speed }}</span></p>
                        <p>Model: <span class="text-yellow-500 capitalize">{{ vehicle.model }}</span></p>
                        <p>Passengers: <span class="text-yellow-500 capitalize">{{ vehicle.passengers }}</span></p>
                        <p>Vehicle Class: <span class="text-yellow-500 capitalize">{{ vehicle.vehicle_class }}</span></p>
                    </app-card>

                    <template v-if="filmsDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Films</app-header>

                        <app-details :details="filmsDetails" />
                    </template>

                    <template v-if="charactersDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Characters</app-header>

                        <app-details :details="charactersDetails" />
                    </template>

                    <p>
                        <app-button
                            @click="goTo({ name: routeNames.vehicles })"
                            variant="white"
                            outline
                            class="mt-12"
                        >Go back to all vehicles</app-button>
                    </p>
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>
