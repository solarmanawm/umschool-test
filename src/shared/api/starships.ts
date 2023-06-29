import axios from '@/app/axios';

interface StarshipsResponse {
    results: Starship[];
}

export const getStarships = async (): Promise<StarshipsResponse> => {
    const response = await axios.get<StarshipsResponse>('/starships/');

    return response.data;
};

export const getStarshipById = async (id: string | number): Promise<Starship> => {
    const response = await axios.get<Starship>(`/starships/${id}`);

    return response.data;
};
