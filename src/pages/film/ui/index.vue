<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { useRoute } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getFilmById } from '@/shared/api/films';

const film = ref<Film>({} as Film);
const isLoading = ref(true);

onBeforeMount(async () => {
    const route = useRoute();
    const { id } = route.params;

    film.value = await getFilmById(id);
    isLoading.value = false;
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
                </app-container>
            </template>
        </app-layout>
    </app-preloader>
</template>