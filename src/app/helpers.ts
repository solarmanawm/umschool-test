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