<script setup lang="ts">
import AppAnchor from '@/shared/ui/anchor/ui/index.vue';
import { routes } from '@/app/routes';

interface Props {
    isLogin: boolean;
}

const navLinks = [
    { title: 'Home', to: routes.home.path },
    { title: 'Films', to: routes.films.path },
    { title: 'People', to: routes.people.path },
    { title: 'Planets', to: routes.planets.path },
    { title: 'Species', to: routes.species.path },
    { title: 'Starships', to: routes.starships.path },
    { title: 'Vehicles', to: routes.vehicles.path },
];
withDefaults(defineProps<Props>(), {
    isLogin: false,
});
</script>

<script lang="ts">
export default {
    name: 'AppNav',
};
</script>

<template>
    <nav
        v-if="isLogin"
        class="flex justify-between max-w-xl w-full"
    >
        <app-anchor
            v-for="link of navLinks"
            :to="link.to"
            class="text-white text-sm uppercase hover:text-yellow-500"
        >{{ link.title }}</app-anchor>
    </nav>
</template>
