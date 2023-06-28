export const getId = (url: string) => {
    return url.split('/').filter(e => !!e).pop();
};

export const getCharacterDetails = (characters: Character[]) => {
    return characters.filter(e => !!e).map((character) => {
        const { name: title, url } = character;
        const detail: Detail = {
            title,
            link: `/people/${getId(url)}`,
        };

        return detail;
    });
}

export const getPlanetDetails = (planets: Planet[]) => {
    return planets.filter(e => !!e).map((planet) => {
        const { name: title, url } = planet;
        const detail: Detail = {
            title,
            link: `/planets/${getId(url)}`,
        };

        return detail;
    });
}

export const getStarshipDetails = (starships: Starship[]) => {
    return starships.filter(e => !!e).map((starship) => {
        const { name: title, url } = starship;
        const detail: Detail = {
            title,
            link: `/planets/${getId(url)}`,
        };

        return detail;
    });
}

export const getVehicleDetails = (vehicles: Vehicle[]) => {
    return vehicles.filter(e => !!e).map((vehicle) => {
        const { name: title, url } = vehicle;
        const detail: Detail = {
            title,
            link: `/vehicles/${getId(url)}`,
        };

        return detail;
    });
}

export const getSpeciesDetails = (species: Species[]) => {
    return species.filter(e => !!e).map((species) => {
        const { name: title, url } = species;
        const detail: Detail = {
            title,
            link: `/species/${getId(url)}`,
        };

        return detail;
    });
}
