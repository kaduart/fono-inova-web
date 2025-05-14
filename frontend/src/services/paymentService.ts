import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // se você armazenar o token no localStorage:
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
});
export interface FinancialRecord {
    id: string;
    description: string;
    amount: number;
    paid: boolean;
    createdAt: string;   // ou Date, conforme seu backend
}

export interface Summary {
    total: number;       // soma de todos os valores
    paidCount: number;   // quantidade de registros pagos
    unpaidCount: number; // quantidade de registros não pagos
}


// CRUD básicos
export const getPayments = (filters: Record<string, any> = {}) =>
    API.get<FinancialRecord[]>('/payments', { params: filters });

export const getPayment = (id: string) =>
    API.get<FinancialRecord>(`/payments/${id}`);

export const createPayment = (data: Partial<FinancialRecord>) =>
    API.post<FinancialRecord>('/payments', data);

export const updatePayment = (id: string, data: Partial<FinancialRecord>) =>
    API.put<FinancialRecord>(`/payments/${id}`, data);

export const deletePayment = (id: string) =>
    API.delete<void>(`/payments/${id}`);

// Marca como pago
export const markAsPaid = (id: string) =>
    API.patch<FinancialRecord>(`/payments/${id}/status`);

export const getReport = (params) => API.get('/payments/report', { params });

// Resumo
export const getPaymentSummary = () =>
    API.get<Summary>('/payments/report/summary');

// Export CSV
export const exportCSV = (filters: Record<string, any> = {}) => {
    return API.get<Blob>('/payments/export/csv', {
        params: filters,
        responseType: 'blob',
    });
};

// Export PDF
export const exportPDF = (filters: Record<string, any> = {}) => {
    return API.get<Blob>('/payments/export/pdf', {
        params: filters,
        responseType: 'blob',
    });
};
