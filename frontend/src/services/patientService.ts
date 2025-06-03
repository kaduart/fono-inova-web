// src/services/patientService.ts
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { PatientData } from "../utils/types";
import { getAuthToken } from "./authService";

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


export const patientService = {
    fetchAll: (): Promise<PatientData[]> =>
        API.get<PatientData[]>('/patients')
            .then(res => res.data),

    fetchById: (id: string): Promise<PatientData> =>
        API.get<PatientData>(`/patients/${id}`)
            .then(res => res.data),

    create: (data: Partial<PatientData>): Promise<PatientData> =>
        API.post<PatientData>('/patients', data)
            .then(res => res.data),

    update: (id: string, data: Partial<PatientData>): Promise<PatientData> =>
        API.put<PatientData>(`/patients/${id}`, data)
            .then(res => res.data),

    remove: (id: string): Promise<void> =>
        API.delete<void>(`/patients/${id}`)
            .then(() => { }),
};