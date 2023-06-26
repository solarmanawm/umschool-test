<script setup lang="ts">
import { routes } from '@/app/routes';

const navLinks = [
    { title: 'Home', to: routes.home.path },
    { title: 'Films', to: routes.films.path },
    { title: 'People', to: routes.people.path },
    { title: 'Planets', to: routes.planets.path },
    { title: 'Species', to: routes.species.path },
    { title: 'Starships', to: routes.starships.path },
    { title: 'Vehicles', to: routes.vehicles.path },
];
</script>

<script lang="ts">
export default {
    name: 'AppNav',
};
</script>

<template>
    <nav>
        <router-link v-for="link of navLinks" :to="link.to">{{ link.title }}</router-link>
    </nav>
</template>