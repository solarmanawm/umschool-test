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
import { getCharacters } from '@/shared/api/characters';

const route = useRoute();

const isLoading = ref(true);
const hasError = ref(false);
let characters: (Character & { id: string })[] = [];

onBeforeMount(async () => {
    try {
        const { results } = await getCharacters();
        characters = results.map((character: Character) => {
            const id = character.url.split('/').filter(e => !!e).pop()!;

            return {
                ...character,
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
                        <app-card v-for="character of characters" class="w-full flex justify-between mb-4">
                            <div class="flex items-center">
                                <app-header
                                    level="3"
                                    class="text-white text-xl"
                                >{{ character.name }}</app-header>
                                <p class="capitalize ml-8 text-sm">Gender: <span class="text-white font-bold">{{ character.gender }}</span></p>
                                <p class="capitalize ml-4 text-sm">Birth date: <span class="text-white font-bold">{{ character.birth_year }}</span></p>
                            </div>
                            <p><app-anchor class="text-sm uppercase font-bold text-yellow-500" :to="{ name: routeNames.person, params: { id: character.id }}">Details</app-anchor></p>
                        </app-card>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>
