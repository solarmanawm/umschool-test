import axios from '@/app/axios';

interface SpeciesResponse {
    results: Species[];
}

export const getSpecies = async (): Promise<SpeciesResponse> => {
    const response = await axios.get<SpeciesResponse>('/species/');

    return response.data;
};

export const getSpeciesById = async (id: string | number): Promise<Species> => {
    const response = await axios.get<Species>(`/species/${id}`);

    return response.data;
};
