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

export const getFilmById = async (id: number) => {
    try {
        const response = await axios.get(`/films/${id}`);

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/films');
        const { results } = dummyResponse.default;
        const film = results.find((film: Film) => {
            const currentId = film.url.split('/').filter(e => !!e).pop();

            return currentId === id.toString();
        });

        return film;
    }
};