export const useId = () => {
    return (url: string) => url.split('/').filter(e => !!e).pop()!;
};
