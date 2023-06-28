export const getId = (url: string) => {
    return url.split('/').filter(e => !!e).pop()!;
};
