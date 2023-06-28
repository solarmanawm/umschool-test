<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppButton from '@/shared/ui/button/ui/index.vue';
import AppDetails from '@/shared/ui/details/ui/index.vue';
import { getId } from '@/app/helpers';
import { useRoute } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getFilmById } from '@/shared/api/films';
import { getCharacterById } from '@/shared/api/characters';
import { getPlanetById } from '@/shared/api/planets';
import { getStarshipById } from '@/shared/api/starships';
import { getVehicleById } from '@/shared/api/vehicles';
import { getSpeciesById } from '@/shared/api/species';
import { useDetails } from '@/shared/use/details';
import { useGoTo } from '@/shared/use/goTo';

const goTo = useGoTo();
const isLoading = ref(true);

let film: Film = {} as Film;
let characterDetails: Detail[] = []
let planetsDetails: Detail[] = []
let starshipsDetails: Detail[] = []
let vehiclesDetails: Detail[] = []
let speciesDetails: Detail[] = []

onBeforeMount(async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        film = await getFilmById(id as string);

        const characters: Character[] = await Promise.all(film.characters.map(getId).map(getCharacterById));
        characterDetails = useDetails<Character>(characters, 'people');

        const planets: Planet[] = await Promise.all(film.planets.map(getId).map(getPlanetById));
        planetsDetails = useDetails<Planet>(planets, 'planets');

        const starships: Starship[] = await Promise.all(film.starships.map(getId).map(getStarshipById));
        starshipsDetails = useDetails<Starship>(starships, 'starships');

        const vehicles: Vehicle[] = await Promise.all(film.vehicles.map(getId).map(getVehicleById));
        vehiclesDetails = useDetails<Vehicle>(vehicles, 'vehicles');

        const species: Species[] = await Promise.all(film.species.map(getId).map(getSpeciesById));
        speciesDetails = useDetails<Species>(species, 'species');
    } catch (error) {
        ;
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <app-preloader :isLoading="isLoading">
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