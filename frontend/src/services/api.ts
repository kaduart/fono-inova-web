import axios from 'axios';
import { getAuthToken } from './authService';

export const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: BASE_URL,
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
