import axios from '@/app/axios';
import { getId } from '@/app/helpers';

export const getPlanetById = async (id: string | number): Promise<Planet> => {
    try {
        const response = await axios.get(`/planets/${id}`);

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/planets');
        const { results } = dummyResponse.default;
        const planet = results.find((planet: Planet) => {
            const currentId = getId(planet.url);

            return currentId === id.toString();
        });

        return planet;
    }
};