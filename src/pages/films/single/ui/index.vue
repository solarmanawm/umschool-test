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
import { getFilmById } from '@/shared/api/films';
import { useDetails } from '@/shared/use/details';
import { useGoTo } from '@/shared/use/goTo';
import { useDetailsSource } from '@/shared/use/detailsSource';

const goTo = useGoTo();
const isLoading = ref(true);
const hasError = ref(false);

let film: Film = {} as Film;
let characterDetails: Detail[] = []
let planetsDetails: Detail[] = []
let starshipsDetails: Detail[] = []
let vehiclesDetails: Detail[] = []
let speciesDetails: Detail[] = []

const fetch = async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        isLoading.value = true;
        hasError.value = false;

        try {
            film = await getFilmById(id as string);
        } catch (error) {
            hasError.value = true;

            throw error;
        }

        const characters: Character[] = await useDetailsSource(film.characters).fetch<Character>();
        characterDetails = useDetails<Character>(characters, 'people');

        const planets: Planet[] = await useDetailsSource(film.planets).fetch<Planet>();
        planetsDetails = useDetails<Planet>(planets, 'planets');

        const starships: Starship[] = await useDetailsSource(film.starships).fetch<Starship>();
        starshipsDetails = useDetails<Starship>(starships, 'starships');

        const vehicles: Vehicle[] = await useDetailsSource(film.vehicles).fetch<Vehicle>();
        vehiclesDetails = useDetails<Vehicle>(vehicles, 'vehicles');

        const species: Species[] = await useDetailsSource(film.species).fetch<Species>();
        speciesDetails = useDetails<Species>(species, 'species');
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
            <template #title v-if="film.title">{{ film.title }}</template>
            <template #content>
                <app-container>
                    <p class="text-gray-600">Director: <span class="text-white">{{ film.director }}</span></p>
                    <p class="text-gray-600">Producer: <span class="text-white">{{ film.producer }}</span></p>
                    <p class="text-gray-600">Release date: <span class="text-white">{{ new Date(film.release_date).toLocaleDateString('ru-RU') }}</span></p>

                    <app-card class="flex flex-col justify-between mt-8">
                        <p class="italic">{{ film.opening_crawl }}</p>
                    </app-card>

                    <template v-if="characterDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Characters</app-header>

                        <app-details :details="characterDetails" />
                    </template>

                    <template v-if="planetsDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Planets</app-header>

                        <app-details :details="planetsDetails" />
                    </template>

                    <template v-if="starshipsDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Starships</app-header>

                        <app-details :details="starshipsDetails" />
                    </template>

                    <template v-if="vehiclesDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Vehicles</app-header>

                        <app-details :details="vehiclesDetails" />
                    </template>

                    <template v-if="speciesDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Species</app-header>

                        <app-details :details="speciesDetails" />
                    </template>

                    <p>
                        <app-button
                            @click="goTo({ name: routeNames.films })"
                            variant="white"
                            outline
                            class="mt-12"
                        >Go back to all films</app-button>
                    </p>
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>