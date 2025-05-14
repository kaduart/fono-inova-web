import React, { useEffect, useState } from 'react';
import {
    createPayment,
    exportCSV,
    exportPDF,
    FinancialRecord,
    getPayments,
    getPaymentSummary,
    markAsPaid,
    Summary,
} from '../../services/paymentService';
import { PaymentsFilters } from './PaymentsFilters';
import { PaymentsSummary } from './PaymentsSummary';
import { RegisterPaymentForm } from './RegisterPaymentForm';

export const PaymentPage: React.FC = () => {
    const [payments, setPayments] = useState<FinancialRecord[]>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [summary, setSummary] = useState<Summary>({ total: 0, paidCount: 0, unpaidCount: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const userRole = localStorage.getItem('userRole');

    const loadPayments = async (f: Record<string, any> = filters) => {
        setLoading(true);
        try {
            const res = await getPayments(f);
            setPayments(res.data);
        } finally {
            setLoading(false);
        }
    };

    const loadSummary = async () => {
        const res = await getPaymentSummary();
        setSummary(res.data);
    };

    useEffect(() => {
        loadPayments(filters);
        loadSummary();
    }, [filters]);

    const handleApplyFilters = (newFilters: Record<string, any>) => {
        setFilters(newFilters);
    };

    const handleCreate = async (data: Partial<FinancialRecord>) => {
        await createPayment(data);
        setShowForm(false);
        loadPayments(filters);
        loadSummary();
    };

    const handleMarkAsPaid = async (id: string) => {
        await markAsPaid(id);
        loadPayments(filters);
        loadSummary();
    };

    const handleExportCSV = async () => {
        const res = await exportCSV(filters);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'pagamentos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = async () => {
        const res = await exportPDF(filters);
        const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio_pagamentos.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 p-4">
            <PaymentsFilters onChange={handleApplyFilters} />
            <PaymentsSummary summary={summary} />

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Adicionar Pagamento
                </button>
                <button
                    onClick={handleExportCSV}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Exportar CSV
                </button>
                <button
                    onClick={handleExportPDF}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Exportar PDF
                </button>
            </div>

            {showForm && (
                <RegisterPaymentForm
                    onSubmit={handleCreate}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="overflow-x-auto">
                <table className="w-full table-auto border">
                    <thead>
                        <tr>
                            <th className="px-2 py-1">Paciente</th>
                            <th className="px-2 py-1">Profissional</th>
                            <th className="px-2 py-1">Data</th>
                            <th className="px-2 py-1">Valor</th>
                            <th className="px-2 py-1">Status</th>
                            <th className="px-2 py-1">Método</th>
                            <th className="px-2 py-1">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p.id} className="border-t">
                                <td className="px-2 py-1">{(p as any).patientName || p.patientId?.name}</td>
                                <td className="px-2 py-1">{(p as any).professional || p.professionalId?.name}</td>
                                <td className="px-2 py-1">{new Date((p as any).date || p.createdAt).toLocaleDateString()}</td>
                                <td className="px-2 py-1">R$ {p.amount.toFixed(2)}</td>
                                <td className="px-2 py-1">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium
                      ${p.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`
                                        }
                                    >
                                        {p.paid ? 'PAGO' : 'PENDENTE'}
                                    </span>
                                </td>
                                <td className="px-2 py-1">{(p as any).paymentMethod}</td>
                                <td className="px-2 py-1">
                                    {userRole && ['admin', 'secretary'].includes(userRole) && !p.paid && (
                                        <button
                                            onClick={() => handleMarkAsPaid(p.id)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                        >
                                            Marcar como Pago
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
