import axios from '@/app/axios';

interface FilmsResponse {
    results: Film[];
}

export const getFilms = async (): Promise<FilmsResponse> => {
    try {
        const response = await axios.get('/films/');

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/films');
        const { results } = dummyResponse.default;

        return {
            results,
        };
    }
};
