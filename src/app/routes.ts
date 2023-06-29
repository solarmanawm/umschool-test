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
        path: '/films/:id',
        name: routeNames.film,
        component: () => import('@/pages/films/single/ui/index.vue'),
    },
    people: {
        path: '/people',
        name: routeNames.people,
        component: () => import('@/pages/people/ui/index.vue'),
        meta: {
            title: 'People',
        },
    },
    person: {
        path: '/people/:id',
        name: routeNames.person,
        component: () => import('@/pages/people/single/ui/index.vue'),
    },
    planets: {
        path: '/planets',
        name: routeNames.planets,
        component: () => import('@/pages/planets/ui/index.vue'),
        meta: {
            title: 'Planets',
        },
    },
    planet: {
        path: '/planets/:id',
        name: routeNames.planet,
        component: () => import('@/pages/planets/single/ui/index.vue'),
    },
    species: {
        path: '/species',
        name: routeNames.species,
        component: () => import('@/pages/species/ui/index.vue'),
        meta: {
            title: 'Species',
        },
    },
    specie: {
        path: '/species/:id',
        name: routeNames.specie,
        component: () => import('@/pages/species/single/ui/index.vue'),
    },
    starships: {
        path: '/starships',
        name: routeNames.starships,
        component: () => import('@/pages/starships/ui/index.vue'),
        meta: {
            title: 'Starships',
        },
    },
    starship: {
        path: '/starships/:id',
        name: routeNames.starship,
        component: () => import('@/pages/starships/single/ui/index.vue'),
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