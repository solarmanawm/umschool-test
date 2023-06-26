import Home from '@/pages/home/ui/index.vue';

export const routes = {
    home: {
        path: '/',
        name: 'home',
        component: Home,
    },
    films: {
        path: '/films',
        name: 'films',
    },
    people: {
        path: '/people',
        name: 'people',
    },
    planets: {
        path: '/planets',
        name: 'planets',
    },
    species: {
        path: '/species',
        name: 'species',
    },
    starships: {
        path: '/starships',
        name: 'starships',
    },
    vehicles: {
        path: '/vehicles',
        name: 'vehicles',
    },
};