interface Film extends Pick<DetailSource, 'url'> {
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
}

interface Species extends DetailSource {
    average_height: string;
    average_lifespan: string;
    classification: string;
    designation: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: string;
    language: string;
    people: string[];
    films: string[];
    skin_colors: string;
}

interface Character extends DetailSource {
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
}

interface DetailSource {
    name: string;
    url: string;
}

interface Detail {
    title: string;
    link: string;
}

interface Vehicle extends DetailSource {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    passengers: string;
    pilots: string[];
    films: string[];
    vehicle_class: string;
}

interface Starship extends DetailSource {
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
    passengers: string;
    films: string[];
    pilots: string[];
    starship_class: string;
}

interface Planet extends DetailSource {
    climate: string;
    diameter: string;
    films: string[];
    gravity: string;
    orbital_period: string;
    population: string;
    residents: string[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
}
