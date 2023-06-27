<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppColumn from '@/shared/ui/column/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppRow from '@/shared/ui/row/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import { useRoute } from 'vue-router';
import { getFilms } from '@/shared/api/films';

const route = useRoute();

const isLoading = ref(true);
const films = ref<Film[]>([])

onBeforeMount(async () => {
    const { results } = await getFilms();
    films.value = results;
    isLoading.value = false;
});
</script>

<template>
    <app-layout>
        <template #title v-if="route.meta.title">{{ route.meta.title }}</template>
        <template #content>
            <app-preloader :isLoading="isLoading">
                <app-container>
                    <app-row class="-mt-4">
                        <app-column
                            v-for="film of films"
                            sm="12"
                            md="4"
                            lg="4"
                            xl="4"
                            class="mt-4"
                        >
                            <app-card>
                                <p>{{ film.episode_id }}</p>
                            </app-card>
                        </app-column>
                    </app-row>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>