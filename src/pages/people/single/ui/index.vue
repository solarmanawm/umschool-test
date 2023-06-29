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
import { getCharacterById } from '@/shared/api/characters';
import { useDetails } from '@/shared/use/details';
import { useDetailsSource } from '@/shared/use/detailsSource';
import { useGoTo } from '@/shared/use/goTo';

const goTo = useGoTo();
const isLoading = ref(true);
const hasError = ref(false);

let character: Character = {} as Character;
let filmsDetails: Detail[] = []
let planetsDetails: Detail[] = []
let starshipsDetails: Detail[] = []
let vehiclesDetails: Detail[] = []
let speciesDetails: Detail[] = []

onBeforeMount(async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        try {
            character = await getCharacterById(id as string);
        } catch (error) {
            hasError.value = true;

            throw error;
        }

        const films: Film[] = await useDetailsSource(character.films).fetch<Film>();
        filmsDetails = useDetails<Film>(films, 'films');

        const planets: Planet[] = await useDetailsSource([character.homeworld]).fetch<Planet>();
        planetsDetails = useDetails<Planet>(planets, 'planets');

        const starships: Starship[] = await useDetailsSource(character.starships).fetch<Starship>();
        starshipsDetails = useDetails<Starship>(starships, 'starships');

        const vehicles: Vehicle[] = await useDetailsSource(character.vehicles).fetch<Vehicle>();
        vehiclesDetails = useDetails<Vehicle>(vehicles, 'vehicles');

        const species: Species[] = await useDetailsSource(character.species).fetch<Species>();
        speciesDetails = useDetails<Species>(species, 'speciess');
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <app-preloader
        :isLoading="isLoading"
        :hasError="hasError"
    >
        <app-layout>
            <template #title v-if="character.name">{{ character.name }}</template>
            <template #content>
                <app-container>
                    <p class="text-gray-600">Gender: <span class="text-white capitalize">{{ character.gender }}</span></p>

                    <app-card class="flex justify-between mt-8">
                        <p>Height: <span class="text-yellow-500 capitalize">{{ character.height }}</span></p>
                        <p>Mass: <span class="text-yellow-500 capitalize">{{ character.mass }}</span></p>
                        <p>Hair Color: <span class="text-yellow-500 capitalize">{{ character.hair_color }}</span></p>
                        <p>Skin Color: <span class="text-yellow-500 capitalize">{{ character.skin_color }}</span></p>
                        <p>Eye Color: <span class="text-yellow-500 capitalize">{{ character.eye_color }}</span></p>
                        <p>Birth Year: <span class="text-yellow-500 capitalize">{{ character.birth_year }}</span></p>
                    </app-card>

                    <template v-if="filmsDetails.length">
                        <app-header
                            level="4"
                            class="my-8 text-white text-2xl"
                        >Films</app-header>

                        <app-details :details="filmsDetails" />
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
                            @click="goTo({ name: routeNames.people })"
                            variant="white"
                            outline
                            class="mt-12"
                        >Go back to all characters</app-button>
                    </p>
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>
