import axios from '@/app/axios';

interface FilmsResponse {
    results: Film[];
}

export const getFilms = async (): Promise<FilmsResponse> => {
    const response = await axios.get<FilmsResponse>('/films/');

    return response.data;
};

export const getFilmById = async (id: number | string): Promise<Film> => {
    const response = await axios.get<Film>(`/films/${id}`);

    return response.data;
};
