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
        component: () => import('@/pages/films/ui/index.vue'),
    },
    people: {
        path: '/people',
        name: 'people',
        component: () => import('@/pages/people/ui/index.vue'),
    },
    planets: {
        path: '/planets',
        name: 'planets',
        component: () => import('@/pages/planets/ui/index.vue'),
    },
    species: {
        path: '/species',
        name: 'species',
        component: () => import('@/pages/species/ui/index.vue'),
    },
    starships: {
        path: '/starships',
        name: 'starships',
        component: () => import('@/pages/starships/ui/index.vue'),
    },
    vehicles: {
        path: '/vehicles',
        name: 'vehicles',
        component: () => import('@/vehicles/ui/index.vue'),
    },
};