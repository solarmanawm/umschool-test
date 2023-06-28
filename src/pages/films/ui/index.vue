<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppColumn from '@/shared/ui/column/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppRow from '@/shared/ui/row/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { useRoute } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getFilms } from '@/shared/api/films';

const route = useRoute();

const isLoading = ref(true);
const hasError = ref(false);
let films: (Film & { id: string })[] = [];

onBeforeMount(async () => {
    try {
        const { results } = await getFilms();
        films = results.map((film: Film) => {
            const id = film.url.split('/').filter(e => !!e).pop()!;

            return {
                ...film,
                id,
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
                    <app-row class="-mt-4">
                        <app-column
                            v-for="film of films"
                            sm="12"
                            md="4"
                            lg="4"
                            xl="4"
                            class="mt-4 flex"
                        >
                            <app-card class="flex flex-col justify-between">
                                <div class="mb-4">
                                    <p class="uppercase text-xs tracking-[3px] text-yellow-500">Episode #{{ film.episode_id }}</p>
                                    <app-header
                                        level="3"
                                        class="text-white text-xl"
                                    >{{ film.title }}</app-header>
                                    <p class="mt-8 text-sm">{{ film.opening_crawl }}</p>
                                </div>
                                <p><app-anchor class="text-sm uppercase font-bold text-yellow-500" :to="{ name: routeNames.film, params: { id: film.id }}">Details</app-anchor></p>
                            </app-card>
                        </app-column>
                    </app-row>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>