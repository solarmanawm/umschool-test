import Home from '@/pages/home/ui/index.vue';

export const routeNames = {
    home: 'home',
    films: 'films',
    film: 'film',
    people: 'people',
    person: 'person',
    planets: 'planets',
    planet: 'planet',
    species: 'species',
    specie: 'specie',
    starships: 'starships',
    starship: 'starship',
    vehicles: 'vehicles',
    vehicle: 'vehicle',
};

export const routes = {
    home: {
        path: '/',
        name: routeNames.home,
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    films: {
        path: '/films',
        name: routeNames.films,
        component: () => import('@/pages/films/ui/index.vue'),
        meta: {
            title: 'Films',
        },
    },
    film: {
        path: '/film/:id',
        name: routeNames.film,
        component: () => import('@/pages/film/ui/index.vue'),
    },
    people: {
        path: '/people',
        name: routeNames.people,
        component: () => import('@/pages/people/ui/index.vue'),
        meta: {
            title: 'People',
        },
    },
    planets: {
        path: '/planets',
        name: routeNames.planets,
        component: () => import('@/pages/planets/ui/index.vue'),
        meta: {
            title: 'Planets',
        },
    },
    species: {
        path: '/species',
        name: routeNames.species,
        component: () => import('@/pages/species/ui/index.vue'),
        meta: {
            title: 'Species',
        },
    },
    starships: {
        path: '/starships',
        name: routeNames.starships,
        component: () => import('@/pages/starships/ui/index.vue'),
        meta: {
            title: 'Starships',
        },
    },
    vehicles: {
        path: '/vehicles',
        name: routeNames.vehicles,
        component: () => import('@/pages/vehicles/ui/index.vue'),
        meta: {
            title: 'Vehicles',
        },
    },
};