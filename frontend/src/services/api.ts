import axios from 'axios';
import { getAuthToken } from './authService';

// usa o BASE_URL do .env
export const BASE_URL =
    //  cloud 
    /*  process.env.NODE_ENV === 'development'
         ? 'http://167.234.249.6:5000/api'
         : '/api'; */

    // local
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/api'
        : '/api';

const API = axios.create({
    baseURL: BASE_URL,
    // não colocar Authorization aqui, vamos no interceptor
});

// interceptor de request — adiciona token automaticamente
API.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default API;
