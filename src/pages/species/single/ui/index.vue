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
import { getSpeciesById } from '@/shared/api/species';
import { useDetails } from '@/shared/use/details';
import { useDetailsSource } from '@/shared/use/detailsSource';
import { useGoTo } from '@/shared/use/goTo';

const goTo = useGoTo();
const isLoading = ref(true);
const hasError = ref(false);

let species: Species = {} as Species;
let filmsDetails: Detail[] = [];
let charactersDetails: Detail[] = [];

const fetch = async () => {
    const route = useRoute();
    const { id } = route.params;

    try {
        isLoading.value = true;
        hasError.value = false;

        try {
            species = await getSpeciesById(id as string);
        } catch (error) {
            hasError.value = true;

            throw error;
        }

        const films: Film[] = await useDetailsSource(species.films).fetch<Film>();
        filmsDetails = useDetails<Film>(films, 'films');

        const characters: Character[] = await useDetailsSource(species.people).fetch<Character>();
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
            <template #title v-if="species.name">{{ species.name }}</template>
            <template #content>
                <app-container>
                    <p class="text-gray-600">Classification: <span class="text-white capitalize">{{ species.classification }}</span></p>

                    <app-card class="flex justify-between mt-8">
                        <app-info
                            :value="species.average_height"
                            title="Average Height"
                            col
                        />
                        <app-info
                            :value="species.designation"
                            title="Designation"
                            col
                        />
                        <app-info
                            :value="species.average_lifespan"
                            title="Average Lifespan"
                            col
                        />
                        <app-info
                            :value="species.eye_colors"
                            title="Eye Colors"
                            col
                        />
                        <app-info
                            :value="species.hair_colors"
                            title="Hair Colors"
                            col
                        />
                        <app-info
                            :value="species.language"
                            title="Language"
                            col
                        />
                        <app-info
                            :value="species.skin_colors"
                            title="Skin Colors"
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
                            @click="goTo({ name: routeNames.species })"
                            variant="white"
                            outline
                            class="mt-12"
                        >Go back to all species</app-button>
                    </p>
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>
