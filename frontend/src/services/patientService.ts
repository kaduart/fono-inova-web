// src/services/patientService.ts
import { normalizePatientData } from "../utils/normalize";
import { PatientData } from "../utils/types";
import API from "./api";
import { getAuthToken } from "./authService";

// Interceptor para autenticação
API.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratamento global de erros
API.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Lógica para logout ou renovação de token
        }
        return Promise.reject(error);
    }
);

export const patientService = {
    /**
     * Busca todos os pacientes com opção de incluir resumo de consultas
     */
    fetchAll: async (withAppointments = false): Promise<any[]> => {
        const patients = await API.get<PatientData[]>('/patients').then(res => res.data);

        if (!withAppointments) {
            return patients;
        }

        return Promise.all(
            patients.map(async patient => ({
                ...patient,
                ...await patientService.getAppointmentsSummary(patient._id)
            }))
        );
    },

    async create(data: PatientData): Promise<PatientData> {
        // Normaliza os dados antes de enviar
        const normalizedData = normalizePatientData(data);

        try {
            const response = await API.post<PatientData>('/patients/add', normalizedData);
            return response.data;
        } catch (error) {
            // Tratamento específico para erros de duplicidade
            if (error.response?.data?.error?.includes('E11000')) {
                throw new Error('Dados duplicados: CPF, RG ou Email já cadastrado');
            }
            throw error;
        }
    },

    fetchById: (id: string): Promise<PatientData> =>
        API.get<PatientData>(`/patients/${id}`).then(res => res.data),

    update: (id: string, data: Partial<PatientData>): Promise<PatientData> =>
        API.put<PatientData>(`/patients/${id}`, data).then(res => res.data),

    delete: (id: string): Promise<void> =>
        API.delete(`/patients/${id}`),

    getAppointmentsSummary: (id: string): Promise<{
        lastAppointment: any;
        nextAppointment: any;
    }> => API.get(`/patients/${id}/appointments-summary`).then(res => res.data),

    getPatientSessions: (patientId: string): Promise<any[]> =>
        API.get(`/patients/${patientId}/sessions`).then(res => res.data),
};