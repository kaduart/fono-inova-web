import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
    createPayment,
    exportCSV,
    exportPDF,
    FinancialRecord,
    getPayments,
    getPaymentSummary,
    Summary,
    updatePayment,
    updatePaymentStatus
} from '../../services/paymentService';
import { IDoctor, PatientData } from '../../utils/types';
import { EditPaymentModal } from './EditPaymentModal';
import { PaymentActionIcons } from './PaymentAction';
import { PaymentModal } from './PaymentModal';
import { PaymentsFilters } from './PaymentsFilters';
import { PaymentsSummary } from './PaymentsSummary';

interface PaymentPageProps {
    patients?: PatientData[];
    doctors?: IDoctor[];
}

interface Filters {
    doctorId?: string;
    patientId?: string;
    status?: string;
    from?: string;
    to?: string;
}

const PaymentPage = ({ patients, doctors }: PaymentPageProps) => {
    const [allPayments, setAllPayments] = useState<FinancialRecord[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [summary, setSummary] = useState<Summary>({ total: 0, paidCount: 0, unpaidCount: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const userRole = localStorage.getItem('userRole');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [paymentToEdit, setPaymentToEdit] = useState<FinancialRecord | undefined>(undefined);

    // Filtra os pagamentos localmente
    const filteredPayments = useMemo(() => {
        return allPayments.filter(payment => {
            // Filtro por profissional
            if (filters.doctorId && payment.doctor?._id !== filters.doctorId) {
                return false;
            }

            // Filtro por paciente (busca por ID ou nome)
            if (filters.patientId &&
                !payment.patient?._id.includes(filters.patientId) &&
                !payment.patient?.fullName.toLowerCase().includes(filters.patientId.toLowerCase())) {
                return false;
            }

            // Filtro por status (paid/pending)
            if (filters.status) {
                if (filters.status === 'paid' && !payment.paid) return false;
                if (filters.status === 'pending' && payment.paid) return false;
            }

            // Filtro por data
            const paymentDate = new Date(payment.date || payment.createdAt).toISOString().split('T')[0];
            if (filters.from && paymentDate < filters.from) {
                return false;
            }
            if (filters.to && paymentDate > filters.to) {
                return false;
            }

            return true;
        });
    }, [allPayments, filters]);

    // Calcula o resumo localmente
    const localSummary = useMemo(() => {
        return filteredPayments.reduce((acc, payment) => {
            // Calcula o total geral (todos os pagamentos)
            acc.grandTotal += payment.amount;

            // Verifica o status real do pagamento
            if (payment.status === 'paid') {
                acc.totalReceived += payment.amount;
                acc.paidCount += 1;
            }
            else if (payment.status === 'pending') {
                acc.totalPending += payment.amount;
                acc.pendingCount += 1;
            }
            else if (payment.status === 'canceled') {
                acc.canceledCount += 1;
                // Cancelados não entram no cálculo de totais
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

    const loadPayments = async () => {
        setLoading(true);
        try {
            const res = await getPayments(); // Remove os filtros da chamada API
            setAllPayments(res.data.data);
        } catch (error) {
            console.error('Erro ao carregar pagamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSummary = async () => {
        try {
            const res = await getPaymentSummary();
            setSummary(res.data);
        } catch (error) {
            console.error('Erro ao carregar resumo:', error);
        }
    };

    useEffect(() => {
        loadPayments();
        loadSummary();
    }, []);

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const handleCreate = async (data: Partial<FinancialRecord>) => {
        try {
            await createPayment(data);
            await loadPayments(); // Recarrega todos os pagamentos
            await loadSummary();
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
        }
    };

    const handleMarkAsPaid = async (paymentId: string) => {
        try {
            await updatePaymentStatus(paymentId, {
                status: 'paid',
                amount: allPayments.find(p => p._id === paymentId)?.amount
            });
            loadPayments();
            toast.success('Pagamento marcado como pago com sucesso!');
        } catch (error) {
            toast.error('Erro ao marcar pagamento como pago');
        }
    };

    const handleCancelPayment = async (paymentId: string) => {
        try {
            await updatePaymentStatus(paymentId, {
                status: 'canceled'
            });
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
            // Exporta com os filtros aplicados
            const res = await exportCSV(filters);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pagamentos.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
        }
    };

    const handleExportPDF = async () => {
        try {
            // Exporta com os filtros aplicados
            const res = await exportPDF(filters);
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio_pagamentos.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
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
            await loadSummary();
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
                onFilter={handleApplyFilters}
            />

            <PaymentsSummary
                totalPayments={localSummary.totalReceived}
                totalPending={localSummary.totalPending}
                paidCount={localSummary.paidCount}
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
                                        {payment?.patient?.fullName}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment?.doctor?.fullName}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(payment.date || payment.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getServiceTypeLabel(payment.serviceType)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        R$ {payment.amount.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
  ${payment.status === 'paid'
                                                ? 'bg-green-100 text-green-800'
                                                : payment.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {
                                                payment.status === 'paid'
                                                    ? 'PAGO'
                                                    : payment.status === 'pending'
                                                        ? 'PENDENTE'
                                                        : 'CANCELADO'
                                            }
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        {userRole && ['admin', 'secretary'].includes(userRole) && !payment.paid && (
                                            <PaymentActionIcons
                                                payment={payment}
                                                onMarkAsPaid={handleMarkAsPaid}
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
                    onPaymentSuccess={() => {
                        loadPayments();
                        loadSummary();
                        setShowForm(false);
                    }}
                />
            )}
            {isEditModalOpen && paymentToEdit && (
                <EditPaymentModal
                    payment={paymentToEdit!}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSavePayment}
                />
            )
            }
        </div>
    );
};

export default PaymentPage;