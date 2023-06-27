import Home from '@/pages/home/ui/index.vue';

export const routes = {
    home: {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    films: {
        path: '/films',
        name: 'films',
        component: () => import('@/pages/films/ui/index.vue'),
        meta: {
            title: 'Films',
        },
    },
    people: {
        path: '/people',
        name: 'people',
        component: () => import('@/pages/people/ui/index.vue'),
        meta: {
            title: 'People',
        },
    },
    planets: {
        path: '/planets',
        name: 'planets',
        component: () => import('@/pages/planets/ui/index.vue'),
        meta: {
            title: 'Planets',
        },
    },
    species: {
        path: '/species',
        name: 'species',
        component: () => import('@/pages/species/ui/index.vue'),
        meta: {
            title: 'Species',
        },
    },
    starships: {
        path: '/starships',
        name: 'starships',
        component: () => import('@/pages/starships/ui/index.vue'),
        meta: {
            title: 'Starships',
        },
    },
    vehicles: {
        path: '/vehicles',
        name: 'vehicles',
        component: () => import('@/pages/vehicles/ui/index.vue'),
        meta: {
            title: 'Vehicles',
        },
    },
};