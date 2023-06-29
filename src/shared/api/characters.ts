import axios from '@/app/axios';

interface CharactersResponse {
    results: Character[];
}

export const getCharacters = async (): Promise<CharactersResponse> => {
    const response = await axios.get<CharactersResponse>('/people/');

    return response.data;
};

export const getCharacterById = async (id: string | number): Promise<Character> => {
    const response = await axios.get<Character>(`/people/${id}`);

    return response.data;
};
