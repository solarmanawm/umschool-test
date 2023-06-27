<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import { useRoute } from 'vue-router';
import { getFilms } from '@/shared/api/films';

const route = useRoute();

const isLoading = ref(true);
const films = ref([])

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
                <pre>{{ films }}</pre>
            </app-preloader>
        </template>
    </app-layout>
</template>