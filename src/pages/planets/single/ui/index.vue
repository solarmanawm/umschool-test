<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppInfo from '@/shared/ui/info/ui/index.vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppButton from '@/shared/ui/button/ui/index.vue';
import AppDetails from '@/shared/ui/details/ui/index.vue';
import { useRoute } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getPlanetById } from '@/shared/api/planets';
import { useDetails } from '@/shared/use/details';
import { useDetailsSource } from '@/shared/use/detailsSource';
import { useGoTo } from '@/shared/use/goTo';

const goTo = useGoTo();
const isLoading = ref(true);
const hasError = ref(false);

let planet: Planet = {} as Planet;
let filmsDetails: Detail[] = [];
let charactersDetails: Detail[] = [];

const fetch = async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        isLoading.value = true;
        hasError.value = false;

        try {
            planet = await getPlanetById(id as string);
        } catch (error) {
            hasError.value = true;

            throw error;
        }

        const films: Film[] = await useDetailsSource(planet.films).fetch<Film>();
        filmsDetails = useDetails<Film>(films, 'films');

        const characters: Character[] = await useDetailsSource(planet.residents).fetch<Character>();
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
            <template #title v-if="planet.name">{{ planet.name }}</template>
            <template #content>
                <app-container>
                    <p class="text-gray-600">Population: <span class="text-white capitalize">{{ planet.population }}</span></p>

                    <app-card class="flex justify-between mt-8">
                        <app-info
                            :value="planet.climate"
                            title="Climate"
                            col
                        />
                        <app-info
                            :value="planet.diameter"
                            title="Diameter"
                            col
                        />
                        <app-info
                            :value="planet.gravity"
                            title="Gravity"
                            col
                        />
                        <app-info
                            :value="planet.orbital_period"
                            title="Orbital Period"
                            col
                        />
                        <app-info
                            :value="planet.rotation_period"
                            title="Rotation Period"
                            col
                        />
                        <app-info
                            :value="planet.surface_water"
                            title="Surface Water"
                            col
                        />
                        <app-info
                            :value="planet.terrain"
                            title="Terrain"
                            col
                        />
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
                            @click="goTo({ name: routeNames.planets })"
                            variant="white"
                            outline
                            class="mt-12"
                        >Go back to all planets</app-button>
                    </p>
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>
