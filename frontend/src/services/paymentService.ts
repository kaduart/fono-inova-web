import API from "./api";

export interface FinancialRecord {
    _id: string;
    date: string; // data do pagamento
    description: string;
    amount: number;
    paid: boolean;
    status: string;
    createdAt: string;
    patientId: string,
    doctorId: string;
    serviceType: string;
    paymentMethod: string;
    notes: string;
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

// paymentService.ts
export const updatePayment = (
    id: string,
    data: {
        amount?: number;
        date?: string | Date; // Aceita Date object ou string
        paymentMethod?: string;
        serviceType?: string;
    }
) => {
    const processedData = {
        ...data,
        date: data.date instanceof Date ? data.date.toISOString() : data.date
    };

    return API.patch<FinancialRecord>(`/payments/${id}`, processedData);
};
export const deletePayment = (id: string) =>
    API.delete<void>(`/payments/${id}`);

// Marca como pago
export const updatePaymentStatus = (
    id: string,
    data: {
        status?: 'pending' | 'paid' | 'canceled';
        amount?: number;
    }
) => {
    return API.patch(`/payments/${id}/status`, data);
};

export const getReport = (params: any) => API.get('/payments/report', { params });

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
