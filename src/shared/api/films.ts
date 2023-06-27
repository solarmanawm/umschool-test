import axios from '@/app/axios';

export const getFilms = async () => {
    try {
        const response = await axios.get('/films/');

        return response.data;
    } catch (error: any) {
        return {
            results: [],
        };
    }
};