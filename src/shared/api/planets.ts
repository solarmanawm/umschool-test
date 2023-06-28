import axios from '@/app/axios';

export const getPlanetById = async (id: string | number): Promise<Planet> => {
    const response = await axios.get<Planet>(`/planets/${id}`);

    return response.data;
};
