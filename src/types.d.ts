interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    url: string;
}

interface Species {
    average_height: string;
    average_lifespan: string;
    classification: string;
    designation: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: string;
    language: string;
    name: string;
    people: string[];
    films: string[];
    skin_colors: string;
    url: string;
}

interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    url: string;
}

interface Detail {
    title: string;
    link: string;
}

interface Vehicle {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: string[];
    films: string[];
    url: string;
    vehicle_class: string;
}

interface Starship {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    films: string[];
    pilots: string[];
    starship_class: string;
    url: string;
}

interface Planet {
    climate: string;
    diameter: string;
    films: string[];
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    residents: string[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
}
