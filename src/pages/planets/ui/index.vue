<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { useRoute } from 'vue-router';
import { useId } from '@/shared/use/id';
import { routeNames } from '@/app/routes';
import { getPlanets } from '@/shared/api/planets';

const route = useRoute();

const isLoading = ref(true);
const hasError = ref(false);
const getId = useId();
let planets: (Planet & { id: string })[] = [];

onBeforeMount(async () => {
    try {
        const { results } = await getPlanets();
        planets = results.map((planet: Planet) => {
            return {
                ...planet,
                id: getId(planet.url),
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
                        <app-card v-for="planet of planets" class="w-full flex justify-between mb-4">
                            <div class="flex items-center">
                                <app-header
                                    level="3"
                                    class="text-white text-xl"
                                >{{ planet.name }}</app-header>
                                <p class="capitalize ml-8 text-sm">Population: <span class="text-white font-bold">{{ planet.population }}</span></p>
                                <p class="capitalize ml-4 text-sm">Gravity: <span class="text-white font-bold">{{ planet.gravity }}</span></p>
                            </div>
                            <p><app-anchor class="text-sm uppercase font-bold text-yellow-500" :to="{ name: routeNames.planet, params: { id: planet.id }}">Details</app-anchor></p>
                        </app-card>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>
