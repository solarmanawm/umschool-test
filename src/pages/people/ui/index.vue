<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppInfo from '@/shared/ui/info/ui/index.vue';
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

sorting.init((sortingValue: string, order: SortingOrder) => {
    if (!sorting) {
        return;
    }

    sortedItems.value = sorting.sort<CharacterWithId>(originalItems.value, sortingValue, order);
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
                                    class="text-white text-xl mr-8"
                                >{{ character.name }}</app-header>
                                <app-info
                                    :value="character.gender"
                                    title="Gender"
                                />
                                <app-info
                                    :value="character.birth_year"
                                    title="Birth year"
                                    class="ml-4"
                                />
                            </div>
                            <p><app-anchor class="text-sm uppercase font-bold text-yellow-500" :to="{ name: routeNames.person, params: { id: character.id }}">Details</app-anchor></p>
                        </app-card>
                </app-container>
            </app-preloader>
        </template>
    </app-layout>
</template>
