<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppControlPane from '@/widgets/controlPane/ui/index.vue';
import AppLayout from '@/shared/ui/layout/ui/index.vue';
import AppPreloader from '@/shared/ui/preloader/ui/index.vue';
import AppContainer from '@/shared/ui/container/ui/index.vue';
import AppCard from '@/shared/ui/card/ui/index.vue';
import AppHeader from '@/shared/ui/h/ui/index.vue';
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { useRoute } from 'vue-router';
import { routeNames } from '@/app/routes';
import { getCharacters } from '@/shared/api/characters';
import { useSorting } from '@/features/sorting/model';
import { useFiltering } from '@/features/filtering/model';

type CharacterWithId = Character & { id: string }

const route = useRoute();
const filtering = useFiltering();
const sorting = useSorting();
const isLoading = ref(true);
const hasError = ref(false);
const originalItems = ref<CharacterWithId[]>([]);
const sortedItems = ref<CharacterWithId[]>([]);

sorting.init((sorting: string, order: SortingOrder) => {
    if (!sorting) {
        return;
    }

    sortedItems.value = originalItems.value.sort((prev, next) => {
        if (order === 'ASC') {
            return prev[sorting as keyof Character]!.toString().localeCompare(next[sorting as keyof Character]!.toString());
        } else {
            return next[sorting as keyof Character]!.toString().localeCompare(prev[sorting as keyof Character]!.toString());
        }
    });
});

filtering.init((field: string, value: string) => {
    sortedItems.value = originalItems.value.filter((item) => {
        return item[field as keyof Character] === value;
    });
});

const fetch = async () => {
    try {
        isLoading.value = true;
        hasError.value = false;

        const { results } = await getCharacters();
        originalItems.value = results.map((character: Character) => {
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
};

onBeforeMount(async () => {
    await fetch();
    sortedItems.value = originalItems.value;
});
</script>

<template>
    <app-layout>
        <template #title v-if="route.meta.title">{{ route.meta.title }}</template>
        <template #content>
            <app-control-pane class="mb-12" />
            <app-preloader
                :isLoading="isLoading"
                :hasError="hasError"
                @refresh="fetch"
            >
                <app-container>
                        <app-card v-for="character of sortedItems" class="w-full flex justify-between mb-4">
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
