import axios from '@/app/axios';

interface PlanetsResponse {
    results: Planet[];
}

export const getPlanets = async (): Promise<PlanetsResponse> => {
    const response = await axios.get<PlanetsResponse>('/planets/');

    return response.data;
};

export const getPlanetById = async (id: string | number): Promise<Planet> => {
    const response = await axios.get<Planet>(`/planets/${id}`);

    return response.data;
};
