import axios from '@/app/axios';
import { getId } from '@/app/helpers';

export const getCharacterById = async (id: string | number): Promise<Character> => {
    try {
        const response = await axios.get(`/people/${id}`);

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/people');
        const { results } = dummyResponse.default;
        const character = results.find((character: Character) => {
            const currentId = getId(character.url);

            return currentId === id.toString();
        });

        return character;
    }
};