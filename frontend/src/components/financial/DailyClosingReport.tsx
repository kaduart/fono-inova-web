// src/components/DailyClosingReport.tsx
import { format } from 'date-fns';
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import usePayment from '../../hooks/usePayment';

// Tipos TypeScript atualizados
type PaymentMethod = 'dinheiro' | 'pix' | 'cartão';

type ProfessionalSummary = {
    doctorId: string;
    doctorName: string;
    specialty: string;
    scheduled: number;
    scheduledValue: number;
    completed: number;
    completedValue: number;
    absences: number;
    payments: {
        total: number;
        methods: Record<PaymentMethod, number>;
    };
};

type DailyClosingReport = {
    date: string;
    period: {
        start: string;
        end: string;
    };
    totals: {
        scheduled: {
            count: number;
            value: number;
        };
        completed: {
            count: number;
            value: number;
        };
        payments: {
            count: number;
            value: number;
            methods: Record<PaymentMethod, number>;
        };
        absences: {
            count: number;
            estimatedLoss: number;
        };
    };
    byProfessional: ProfessionalSummary[];
};

const DailyClosingReport = () => {
    const {
        dailyClosing: report,
        loading,
        error,
        fetchDailyClosing
    } = usePayment();

    const [detailsType, setDetailsType] = useState<'scheduled' | 'completed' | 'payments' | 'absences' | null>(null);
    const [dateFilter, setDateFilter] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        fetchDailyClosing(dateFilter);
    }, [dateFilter, fetchDailyClosing]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(e.target.value);
    };

    const renderDateSelector = () => (
        <div className="mb-6">
            <label className="block text-sm font-medium text-white-700 mb-1">
                Selecione a data:
            </label>
            <input
                type="date"
                value={dateFilter}
                onChange={handleDateChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    const renderProfessionalSummary = () => {
        if (!report) return null;

        return (
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-700">Resumo por Profissional</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Profissional</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Especialidade</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Agendadas</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Realizadas</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Faltas</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Pagamentos</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {report.byProfessional.map((professional) => (
                                <tr key={professional.doctorId} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-gray-800 font-medium">{professional.doctorName}</td>
                                    <td className="py-3 px-4 text-gray-600">{professional.specialty}</td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium">{professional.scheduled}</div>
                                        <div className="text-xs text-gray-500">{formatCurrency(professional.scheduledValue)}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium">{professional.completed}</div>
                                        <div className="text-xs text-gray-500">{formatCurrency(professional.completedValue)}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${professional.absences > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {professional.absences}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-800">{formatCurrency(professional.payments.total)}</div>
                                        <div className="grid grid-cols-1 gap-1 mt-1">
                                            <div className="flex items-center text-xs">
                                                <span className="w-16 text-gray-500">Dinheiro:</span>
                                                <span className="font-medium">{formatCurrency(professional.payments.methods.dinheiro)}</span>
                                            </div>
                                            <div className="flex items-center text-xs">
                                                <span className="w-16 text-gray-500">PIX:</span>
                                                <span className="font-medium">{formatCurrency(professional.payments.methods.pix)}</span>
                                            </div>
                                            <div className="flex items-center text-xs">
                                                <span className="w-16 text-gray-500">Cartão:</span>
                                                <span className="font-medium">{formatCurrency(professional.payments.methods.cartão)}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderDetailsButtons = () => {
        if (!report) return null;

        const buttonClasses = "py-2 px-4 rounded-lg font-medium transition-all transform hover:scale-105 focus:outline-none shadow-md";

        return (
            <div className="mt-8 flex flex-wrap gap-3">
                <button
                    className={`${buttonClasses} bg-blue-500 text-white hover:bg-blue-600`}
                    onClick={() => setDetailsType('scheduled')}
                >
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Agendamentos</span>
                    </div>
                </button>
                <button
                    className={`${buttonClasses} bg-green-500 text-white hover:bg-green-600`}
                    onClick={() => setDetailsType('completed')}
                >
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4" />
                        <span>Sessões Realizadas</span>
                    </div>
                </button>
                <button
                    className={`${buttonClasses} bg-purple-500 text-white hover:bg-purple-600`}
                    onClick={() => setDetailsType('payments')}
                >
                    <div className="flex items-center gap-2">
                        <BsCurrencyDollar className="h-4 w-4" />
                        <span>Pagamentos</span>
                    </div>
                </button>
                <button
                    className={`${buttonClasses} bg-red-500 text-white hover:bg-red-600`}
                    onClick={() => setDetailsType('absences')}
                >
                    <div className="flex items-center gap-2">
                        <XCircleIcon className="h-4 w-4" />
                        <span>Faltas/Cancelamentos</span>
                    </div>
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-3 text-gray-600">Carregando fechamento diário...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-500 font-medium text-xl mb-2">Erro ao carregar dados</div>
                <p className="text-red-700">{error}</p>
                <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                    onClick={() => window.location.reload()}
                >
                    Tentar novamente
                </button>
            </div>
        );
    }



    if (!report) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <div className="text-yellow-700 font-medium text-lg mb-2">Nenhum dado disponível</div>
                <p className="text-gray-600">Não encontramos informações para esta data.</p>
                <div className="mt-4">
                    {renderDateSelector()}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Fechamento Diário - {report.date}
                            </h2>
                        </div>
                        <div className="mt-4 md:mt-0">
                            {renderDateSelector()}
                        </div>
                    </div>
                </div>

                {/* Totais Gerais */}
                <div className="px-6 py-5">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumo Geral</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-blue-700">Agendadas</h3>
                                    <p className="text-2xl font-bold mt-1 text-gray-800">
                                        {report.totals.scheduled.count}
                                    </p>
                                    <p className="text-blue-600 font-medium">{formatCurrency(report.totals.scheduled.value)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-lg mr-4">
                                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-green-700">Realizadas</h3>
                                    <p className="text-2xl font-bold mt-1 text-gray-800">
                                        {report.totals.completed.count}
                                    </p>
                                    <p className="text-green-600 font-medium">{formatCurrency(report.totals.completed.value)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                    <BsCurrencyDollar className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-purple-700">Pagamentos</h3>
                                    <p className="text-2xl font-bold mt-1 text-gray-800">
                                        {report.totals.payments.count}
                                    </p>
                                    <p className="text-purple-600 font-medium">{formatCurrency(report.totals.payments.value)}</p>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-purple-100">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Dinheiro:</span>
                                    <span className="font-medium">{formatCurrency(report.totals.payments.methods.dinheiro)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mt-1">
                                    <span>PIX:</span>
                                    <span className="font-medium">{formatCurrency(report.totals.payments.methods.pix)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mt-1">
                                    <span>Cartão:</span>
                                    <span className="font-medium">{formatCurrency(report.totals.payments.methods.cartão)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-start">
                                <div className="bg-red-100 p-3 rounded-lg mr-4">
                                    <XCircleIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-red-700">Faltas</h3>
                                    <p className="text-2xl font-bold mt-1 text-gray-800">
                                        {report.totals.absences.count}
                                    </p>
                                    <p className="text-red-600 font-medium">Perda: {formatCurrency(report.totals.absences.estimatedLoss)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div className="px-6 pb-6">
                    {renderProfessionalSummary()}
                    {renderDetailsButtons()}
                    {detailsType && (
                        <DetailsView
                            type={detailsType}
                            date={dateFilter}
                            onClose={() => setDetailsType(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente para visualização detalhada
const DetailsView = ({ type, date, onClose }: {
    type: 'scheduled' | 'completed' | 'payments' | 'absences';
    date: string;
    onClose: () => void;
}) => {
    const {
        dailySessions,
        dailyPayments,
        dailyAbsences,
        fetchDailyScheduledSessions,
        fetchDailyCompletedSessions,
        fetchDailyPayments,
        fetchDailyAbsences,
        loading: detailsLoading,
        error: detailsError
    } = usePayment();

    const [data, setData] = useState<any[]>([]);
    const [localLoading, setLocalLoading] = useState(true);
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLocalLoading(true);
                setLocalError(null);

                switch (type) {
                    case 'scheduled':
                        await fetchDailyScheduledSessions(date);
                        break;
                    case 'completed':
                        await fetchDailyCompletedSessions(date);
                        break;
                    case 'payments':
                        await fetchDailyPayments(date);
                        break;
                    case 'absences':
                        await fetchDailyAbsences(date);
                        break;
                }
            } catch (err) {
                setLocalError('Erro ao carregar detalhes');
                console.error(err);
            } finally {
                setLocalLoading(false);
            }
        };

        fetchDetails();
    }, [type, date]);

    useEffect(() => {
        // Atualizar os dados baseados no tipo
        switch (type) {
            case 'scheduled':
            case 'completed':
                setData(dailySessions);
                break;
            case 'payments':
                setData(dailyPayments);
                break;
            case 'absences':
                setData(dailyAbsences);
                break;
            default:
                setData([]);
        }
    }, [type, dailySessions, dailyPayments, dailyAbsences]);

    const getTitle = () => {
        switch (type) {
            case 'scheduled': return 'Agendamentos Completos';
            case 'completed': return 'Sessões Realizadas';
            case 'payments': return 'Pagamentos Detalhados';
            case 'absences': return 'Faltas e Cancelamentos';
            default: return 'Detalhes';
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string | Date) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    };

    const isLoading = localLoading || detailsLoading;
    const hasError = localError || detailsError;

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{getTitle()}</h3>
                <button
                    className="text-gray-500 hover:text-gray-700 text-lg bg-gray-100 hover:bg-gray-200 rounded-full p-2"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>

            {isLoading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {hasError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600">
                    {localError || detailsError}
                </div>
            )}

            {!isLoading && !hasError && data.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                {type === 'scheduled' ? (
                                    <>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Paciente</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Profissional</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Data/Hora</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Valor</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                    </>
                                ) : type === 'completed' ? (
                                    <>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Paciente</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Profissional</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Data/Hora</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Valor</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Duração</th>
                                    </>
                                ) : type === 'payments' ? (
                                    <>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Paciente</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Profissional</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Valor</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Método</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Data</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Paciente</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Profissional</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Data</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Confirmada</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    {type === 'scheduled' ? (
                                        <>
                                            <td className="py-3 px-4 text-gray-800 font-medium">{item.patient || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.doctor || 'N/A'}</td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{formatDate(item.date)}</div>
                                            </td>
                                            <td className="py-3 px-4 font-medium text-blue-600">{formatCurrency(item.value)}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        item.status === 'canceled' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </>
                                    ) : type === 'completed' ? (
                                        <>
                                            <td className="py-3 px-4 text-gray-800 font-medium">{item.patient || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.doctor || 'N/A'}</td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{formatDate(item.date)}</div>
                                            </td>
                                            <td className="py-3 px-4 font-medium text-green-600">{formatCurrency(item.value)}</td>
                                            <td className="py-3 px-4">{item.duration || 40} min</td>
                                        </>
                                    ) : type === 'payments' ? (
                                        <>
                                            <td className="py-3 px-4 text-gray-800 font-medium">{item.patient || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.doctor || 'N/A'}</td>
                                            <td className="py-3 px-4 font-medium text-purple-600">{formatCurrency(item.amount)}</td>
                                            <td className="py-3 px-4 capitalize">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.paymentMethod === 'dinheiro' ? 'bg-green-100 text-green-800' :
                                                        item.paymentMethod === 'pix' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {item.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{formatDate(item.date)}</div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="py-3 px-4 text-gray-800 font-medium">{item.patient || 'N/A'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.doctor || 'N/A'}</td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{formatDate(item.date)}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.confirmedAbsence ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {item.confirmedAbsence ? 'Sim' : 'Não'}
                                                </span>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!isLoading && !hasError && data.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <div className="text-yellow-700 font-medium">Nenhum registro encontrado</div>
                    <p className="text-gray-600 mt-1">Não há dados disponíveis para este tipo de detalhe.</p>
                </div>
            )}
        </div>
    );
};

export default DailyClosingReport;