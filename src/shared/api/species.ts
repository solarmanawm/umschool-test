import axios from '@/app/axios';
import { getId } from '@/app/helpers';

export const getSpeciesById = async (id: string | number): Promise<Species> => {
    try {
        const response = await axios.get(`/species/${id}`);

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/species');
        const { results } = dummyResponse.default;
        const species = results.find((species: Species) => {
            const currentId = getId(species.url);

            return currentId === id.toString();
        });

        return species;
    }
};