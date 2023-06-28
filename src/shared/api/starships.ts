import axios from '@/app/axios';
import { getId } from '@/app/helpers';

export const getStarshipById = async (id: string | number): Promise<Starship> => {
    try {
        const response = await axios.get(`/starships/${id}`);

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/starships');
        const { results } = dummyResponse.default;
        const starship = results.find((starship: Starship) => {
            const currentId = getId(starship.url);

            return currentId === id.toString();
        });

        return starship;
    }
};