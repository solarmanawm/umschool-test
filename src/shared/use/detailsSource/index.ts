import { useId } from '@/shared/use/id';
import { getCharacterById } from '@/shared/api/characters';
import { getPlanetById } from '@/shared/api/planets';
import { getStarshipById } from '@/shared/api/starships';
import { getVehicleById } from '@/shared/api/vehicles';
import { getSpeciesById } from '@/shared/api/species';
import { getFilmById } from '@/shared/api/films';

const isFilm = (arg: any): arg is Film => {
    return arg.includes('films');
}

const isCharacter = (arg: any): arg is Character => {
    return arg.includes('people');
}

const isPlanet = (arg: any): arg is Planet => {
    return arg.includes('planets');
}

const isStarship = (arg: any): arg is Starship => {
    return arg.includes('starships');
}

const isVehicle = (arg: any): arg is Vehicle => {
    return arg.includes('vehicles');
}

const isSpecies = (arg: any): arg is Species => {
    return arg.includes('species');
}

export const useDetailsSource = (source: string[]) => {
    const getId = useId();
    const urlMap = source.map(getId);

    const fetch = async function<T>(): Promise<T[]> {
        let fn;

        if (isFilm(source[0])) {
            fn = getFilmById;
        }

        if (isCharacter(source[0])) {
            fn = getCharacterById;
        }

        if (isPlanet(source[0])) {
            fn = getPlanetById;
        }

        if (isStarship(source[0])) {
            fn = getStarshipById;
        }

        if (isVehicle(source[0])) {
            fn = getVehicleById;
        }

        if (isSpecies(source[0])) {
            fn = getSpeciesById;
        }

        return Promise.all(urlMap.map(fn)) as Promise<T[]>;
    };

    return {
        fetch,
    };
};