import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api/';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 7000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
