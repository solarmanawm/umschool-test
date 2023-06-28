import axios from '@/app/axios';

export const getCharacterById = async (id: string | number): Promise<Character> => {
    const response = await axios.get<Character>(`/people/${id}`);

    return response.data;
};
