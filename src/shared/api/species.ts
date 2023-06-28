import axios from '@/app/axios';

export const getSpeciesById = async (id: string | number): Promise<Species> => {
    const response = await axios.get<Species>(`/species/${id}`);

    return response.data;
};
