<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppButton from '@/shared/ui/button/ui/index.vue';
import AppDetails from '@/shared/ui/details/ui/index.vue';
import { getId, getCharacterDetails } from '@/app/helpers';
import { useRoute, useRouter } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getFilmById } from '@/shared/api/films';
import { getCharacterById } from '@/shared/api/characters';

let film: Film = {} as Film;
const isLoading = ref(true);
const router = useRouter();
let characterDetails: Detail[] = []
let planetsDetails: Detail[] = []
let starshipsDetails: Detail[] = []
let vehiclesDetails: Detail[] = []
// const planets = ref([]);
// const starships = ref([]);
// const vehicles = ref([]);

onBeforeMount(async () => {
    const route = useRoute();
    const { id } = route.params;

    film = await getFilmById(id);
    const characters: Character[] = await Promise.all(film.characters.map(getId).map(getCharacterById));
    characterDetails = getCharacterDetails(characters);

    isLoading.value = false;
});

const goBackToFilms = () => {
    return router.push({
        name: routeNames.films,
    });
};
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

                    <app-header
                        level="4"
                        class="my-8 text-white text-2xl"
                    >Characters</app-header>

                    <app-details :details="characterDetails" />

                    <app-header
                        level="4"
                        class="my-8 text-white text-2xl"
                    >Planets</app-header>

                    <!-- <app-details :details="planets" /> -->

                    <app-header
                        level="4"
                        class="my-8 text-white text-2xl"
                    >Starships</app-header>

                    <!-- <app-details :details="starships" /> -->

                    <app-header
                        level="4"
                        class="my-8 text-white text-2xl"
                    >Vehicles</app-header>

                    <!-- <app-details :details="vehicles" /> -->

                    <p>
                        <app-button
                            @click="goBackToFilms"
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