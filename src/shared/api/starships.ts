import axios from '@/app/axios';

export const getStarshipById = async (id: string | number): Promise<Starship> => {
    const response = await axios.get<Starship>(`/starships/${id}`);

    return response.data;
};
