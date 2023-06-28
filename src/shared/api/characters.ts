import axios from '@/app/axios';

interface FilmsCharacters {
    results: Character[];
}

export const getCharacters = async (): Promise<FilmsCharacters> => {
    const response = await axios.get<FilmsCharacters>('/people/');

    return response.data;
};

export const getCharacterById = async (id: string | number): Promise<Character> => {
    const response = await axios.get<Character>(`/people/${id}`);

    return response.data;
};
