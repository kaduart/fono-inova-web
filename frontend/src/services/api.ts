import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { getAuthToken } from './authService';


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
