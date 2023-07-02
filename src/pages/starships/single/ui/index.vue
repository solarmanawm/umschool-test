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
import { getStarshipById } from '@/shared/api/starships';
import { useDetails } from '@/shared/use/details';
import { useDetailsSource } from '@/shared/use/detailsSource';
import { useGoTo } from '@/shared/use/goTo';

const goTo = useGoTo();
const isLoading = ref(true);
const hasError = ref(false);

let starship: Starship = {} as Starship;
let filmsDetails: Detail[] = [];
let charactersDetails: Detail[] = [];

const fetch = async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        isLoading.value = true;
        hasError.value = false;

        try {
            starship = await getStarshipById(id as string);
        } catch (error) {
            hasError.value = true;

            throw error;
        }

        const films: Film[] = await useDetailsSource(starship.films).fetch<Film>();
        filmsDetails = useDetails<Film>(films, 'films');

        const characters: Character[] = await useDetailsSource(starship.pilots).fetch<Character>();
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
            <template #title v-if="starship.name">{{ starship.name }}</template>
            <template #content>
                <app-container>
                    <p class="text-gray-600">Classification: <span class="text-white capitalize">{{ starship.manufacturer }}</span></p>

                    <app-card class="flex justify-between mt-8">
                        <app-info
                            :value="starship.MGLT"
                            title="MGLT"
                            col
                        />
                        <app-info
                            :value="starship.cargo_capacity"
                            title="Cargo Capacity"
                            col
                        />
                        <app-info
                            :value="starship.consumables"
                            title="Consumables"
                            col
                        />
                        <app-info
                            :value="starship.crew"
                            title="Crew"
                            col
                        />
                        <app-info
                            :value="starship.hyperdrive_rating"
                            title="Hyperdrive Rating"
                            col
                        />
                        <app-info
                            :value="starship.length"
                            title="Length"
                            col
                        />
                        <app-info
                            :value="starship.max_atmosphering_speed"
                            title="Max Atmosphering Speed"
                            col
                        />
                        <app-info
                            :value="starship.model"
                            title="Model"
                            col
                        />
                        <app-info
                            :value="starship.passengers"
                            title="Passengers"
                            col
                        />
                        <app-info
                            :value="starship.starship_class"
                            title="Starship Class"
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
                            @click="goTo({ name: routeNames.starships })"
                            variant="white"
                            outline
                            class="mt-12"
                        >Go back to all starships</app-button>
                    </p>
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>
