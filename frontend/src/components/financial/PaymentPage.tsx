import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
    createPayment,
    exportCSV,
    exportPDF,
    FinancialRecord,
    getPayments,
    updatePayment
} from '../../services/paymentService';
import { IDoctor } from '../../utils/types';
import { EditPaymentModal } from './EditPaymentModal';
import { PaymentActionIcons } from './PaymentAction';
import { PaymentModal } from './PaymentModal';
import { PaymentsFilters } from './PaymentsFilters';
import { PaymentsSummary } from './PaymentsSummary';

interface PaymentPageProps {
    patients?: IPatient[];
    doctors?: IDoctor[];
}

interface LocalSummary {
    grandTotal: number;
    totalReceived: number;
    totalPending: number;
    paidCount: number;
    pendingCount: number;
    canceledCount: number;
}

const PaymentPage = ({ patients, doctors }: PaymentPageProps) => {
    const [allPayments, setAllPayments] = useState<FinancialRecord[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<FinancialRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const userRole = localStorage.getItem('userRole');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [paymentToEdit, setPaymentToEdit] = useState<FinancialRecord | undefined>(undefined);

    // Carrega os pagamentos
    const loadPayments = async () => {
        setLoading(true);
        try {
            const res = await getPayments();
            setAllPayments(res.data.data);
            setFilteredPayments(res.data.data); // Inicializa com todos os pagamentos
        } catch (error) {
            console.error('Erro ao carregar pagamentos:', error);
            toast.error('Erro ao carregar pagamentos');
        } finally {
            setLoading(false);
        }
    };

    // Calcula o resumo localmente
    const localSummary = useMemo<LocalSummary>(() => {
        return filteredPayments.reduce((acc, payment) => {
            acc.grandTotal += payment.amount;

            switch (payment.status) {
                case 'paid':
                    acc.totalReceived += payment.amount;
                    acc.paidCount += 1;
                    break;
                case 'pending':
                    acc.totalPending += payment.amount;
                    acc.pendingCount += 1;
                    break;
                case 'canceled':
                    acc.canceledCount += 1;
                    break;
            }

            return acc;
        }, {
            grandTotal: 0,
            totalReceived: 0,
            totalPending: 0,
            paidCount: 0,
            pendingCount: 0,
            canceledCount: 0
        });
    }, [filteredPayments]);

    useEffect(() => {
        loadPayments();
    }, []);

    const handleCreate = async (data: Partial<FinancialRecord>) => {
        try {
            await createPayment(data);
            await loadPayments();
            toast.success('Pagamento criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
            toast.error('Erro ao criar pagamento');
        }
    };

    const handleMarkAsPaid = async (paymentId: string) => {
        try {
            await updatePayment(paymentId, { status: 'paid' });
            loadPayments();
            toast.success('Pagamento marcado como pago com sucesso!');
        } catch (error) {
            toast.error('Erro ao marcar pagamento como pago');
        }
    };

    const handleCancelPayment = async (paymentId: string) => {
        try {
            await updatePayment(paymentId, { status: 'canceled' });
            loadPayments();
            toast.success('Pagamento cancelado com sucesso!');
        } catch (error) {
            toast.error('Erro ao cancelar pagamento');
        }
    };

    const handleEditAmount = (paymentId: string) => {
        const payment = allPayments.find(p => p._id === paymentId);
        setPaymentToEdit(payment);
        setIsEditModalOpen(true);
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
            case 'session': return 'Sessão Avulsa';
            case 'package': return 'Pacote';
            default: return type;
        }
    };

    const handleSavePayment = async (data: {
        _id: string;
        amount: number;
        date: string;
        paymentMethod: string;
        serviceType: string;
    }) => {
        try {
            await updatePayment(data._id, {
                amount: data.amount,
                date: data.date,
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
            <PaymentsFilters
                doctors={doctors || []}
                payments={allPayments}
                onFilter={setFilteredPayments}
            />

            <PaymentsSummary
                totalPayments={localSummary.totalReceived}
                totalPending={localSummary.totalPending}
                paidCount={localSummary.paidCount}
                pendingCount={localSummary.pendingCount}
                canceledCount={localSummary.canceledCount}
            />

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Carregando...' : 'Adicionar Pagamento'}
                </button>
                <button
                    onClick={handleExportCSV}
                    disabled={loading}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    Exportar CSV
                </button>
                <button
                    onClick={handleExportPDF}
                    disabled={loading}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                    Exportar PDF
                </button>
            </div>

            {loading ? (
                <div>Carregando...</div>
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
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {payment.patient?.fullName}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.doctor?.fullName}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(payment.date || payment.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getServiceTypeLabel(payment.serviceType)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                            ${payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {payment.status === 'paid' ? 'PAGO' :
                                                payment.status === 'pending' ? 'PENDENTE' : 'CANCELADO'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        {userRole && ['admin', 'secretary'].includes(userRole) && payment.status !== 'canceled' && (
                                            <PaymentActionIcons
                                                payment={payment}
                                                onMarkAsPaid={payment.status === 'pending' ? handleMarkAsPaid : undefined}
                                                onCancelPayment={handleCancelPayment}
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

            {showForm && (
                <PaymentModal
                    open={showForm}
                    doctors={doctors || []}
                    patients={patients || []}
                    onClose={() => setShowForm(false)}
                    onPaymentSuccess={handleCreate}
                />
            )}

            {isEditModalOpen && paymentToEdit && (
                <EditPaymentModal
                    payment={paymentToEdit}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSavePayment}
                />
            )}
        </div>
    );
};

export default PaymentPage;