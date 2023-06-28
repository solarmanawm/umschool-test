import { getId } from '@/app/helpers';

export function useDetails<T extends DetailSource>(source: T[], prefix: string): Detail[] {
    return source.filter(e => !!e).map((species) => {
        const { name, title, url } = species;
        const detailTitle = name ? name : title;
        const detail: Detail = {
            title: detailTitle!,
            link: `/${prefix}/${getId(url)}`,
        };

        return detail;
    });
};