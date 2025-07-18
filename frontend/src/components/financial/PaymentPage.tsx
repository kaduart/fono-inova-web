import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    exportCSV,
    exportPDF,
    FinancialRecord,
    getPaymentCountFinancialRecord,
    getPayments,
    updatePayment
} from '../../services/paymentService';
import { IDoctor, IPatient } from '../../utils/types/types';
import { EditPaymentModal } from './EditPaymentModal';
import { PaymentActionIcons } from './PaymentAction';
import { PaymentsFilters } from './PaymentsFilters';
import FinancialSummaryCard from './PaymentsSummary';

interface PaymentPageProps {
    patients?: IPatient[];
    doctors?: IDoctor[];
    initialPayments: any[];
    onMarkAsPaid: (payment: FinancialRecord) => void;
    onCancelPayment: (paymentId: string) => void;
}

interface LocalSummary {
    grandTotal: number;
    totalReceived: number;
    totalPending: number;
    paidCount: number;
    pendingCount: number;
    canceledCount: number;
}

const PaymentPage = ({ patients, doctors, initialPayments, onMarkAsPaid, onCancelPayment }: PaymentPageProps) => {
    const [allPayments, setAllPayments] = useState<FinancialRecord[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<FinancialRecord[]>([]);
    const [financialRecord, setFinancialRecord] = useState<FinancialRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const userRole = localStorage.getItem('userRole');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [paymentToEdit, setPaymentToEdit] = useState<FinancialRecord | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialPayments) {
            setAllPayments(initialPayments);
        }
    }, [initialPayments]);

    const loadPayments = async () => {
        setLoading(true);
        try {
            setError(null);

            const res = await getPayments();
            const financial = await getPaymentCountFinancialRecord();
            setAllPayments(res.data.data);
            setFinancialRecord(financial.data.data);
        } catch (error) {
            console.error('Erro ao carregar pagamentos:', error);
            setError(error instanceof Error ? error.message : 'Erro ao carregar pagamentos');
            toast.error('Erro ao carregar pagamentos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPayments();
    }, []);

    const handleEditAmount = (paymentId: string) => {
        const payment = allPayments.find(p => p._id === paymentId);
        setPaymentToEdit(payment);
        setIsEditModalOpen(true);
    };

    const handleUpdateAmount = async (data: {
        _id: string;
        amount: number;
        date: string;
        specialty: string;
        paymentMethod: string;
        serviceType: string;
    }) => {
        try {
            await updatePayment(data._id, {
                amount: data.amount,
                date: data.date,
                specialty: data.specialty,
                serviceType: data.serviceType,
                paymentMethod: data.paymentMethod
            });

            await loadPayments();
            toast.success('Pagamento atualizado com sucesso!');
        } catch (error) {
            toast.error('Erro ao atualizar pagamento');
            throw error;
        }
    };
    const handleExportCSV = async () => {
        try {
            const res = await exportCSV();
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pagamentos.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
            toast.error('Erro ao exportar CSV');
        }
    };

    const handleExportPDF = async () => {
        try {
            const res = await exportPDF();
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio_pagamentos.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
            toast.error('Erro ao exportar PDF');
        }
    };

    const getServiceTypeLabel = (type: string) => {
        switch (type) {
            case 'evaluation': return 'Avaliação';
            case 'session': return 'Sessão do Pacote';
            case 'individual_session': return 'Sessão Avulsa';
            case 'package': return 'Pacote';
            default: return type;
        }
    };

    const handleUpdatePayment = async (data: {
        _id: string;
        amount: number;
        date: string;
        specialty: string;
        paymentMethod: string;
        serviceType: string;
    }) => {
        try {
            await updatePayment(data._id, {
                amount: data.amount,
                date: data.date,
                specialty: data.specialty,
                serviceType: data.serviceType,
                paymentMethod: data.paymentMethod
            });

            await loadPayments();
            toast.success('Pagamento atualizado com sucesso!');
        } catch (error) {
            toast.error('Erro ao atualizar pagamento');
            throw error;
        }
    };

    return (
        <div className="space-y-6 p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Controle Financeiro</h1>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <FinancialSummaryCard
                    data={financialRecord}
                />

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportCSV}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Exportar CSV
                    </button>

                    <button
                        onClick={handleExportPDF}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Exportar PDF
                    </button>
                </div>
            </div>
            <PaymentsFilters
                doctors={doctors || []}
                payments={allPayments}
                onFilter={setFilteredPayments}
            />

            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
                    <p>{error}</p>
                    <button
                        onClick={loadPayments}
                        className="mt-2 px-4 py-2 bg-red-100 rounded hover:bg-red-200 text-red-700 flex items-center gap-1 mx-auto"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Tentar novamente
                    </button>
                </div>
            ) : loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profissional</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPayments.map(payment => (
                                <tr key={payment._id}>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                                        {payment.patient?.fullName}
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                                        {payment.doctor?.fullName}
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                                        {new Date(payment.date || payment.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                                        {getServiceTypeLabel(payment.serviceType)}
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                                        {payment.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                            ${payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {payment.status === 'paid' ? 'PAGO' :
                                                payment.status === 'pending' ? 'PENDENTE' : 'CANCELADO'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="px-4 py-4  text-left whitespace-nowrap text-sm font-medium">
                                        {userRole && ['admin', 'secretary'].includes(userRole) && payment.status !== 'canceled' && (
                                            <PaymentActionIcons
                                                payment={payment}
                                                onMarkAsPaid={payment.status === 'pending' ? () => onMarkAsPaid(payment) : undefined}
                                                onCancelPayment={onCancelPayment}
                                                onEditAmount={handleEditAmount}
                                            />
                                        )}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isEditModalOpen && paymentToEdit && (
                <EditPaymentModal
                    payment={paymentToEdit}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleUpdateAmount}
                />
            )}
        </div>
    );
};

export default PaymentPage;