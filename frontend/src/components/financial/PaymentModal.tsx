import { Check, ChevronDown, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FinancialRecord } from '../../services/paymentService';
import { EspecialidadesDisponiveis, IDoctor, IPatient, PaymentMethods, ServiceTypes } from '../../utils/types/types';
import InputCurrency from '../ui/InputCurrency';

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    patient?: IPatient;
    patients?: IPatient[];
    doctors: IDoctor[];
    payment?: FinancialRecord;
    onPaymentSuccess: (data: any) => void

}

export const PaymentModal = ({
    open,
    onClose,
    patient,
    patients,
    doctors,
    payment,
    onPaymentSuccess
}: PaymentModalProps) => {
    console.log('patient', patient)
    const [isLoading, setIsLoading] = useState(false);
    const [paymentData, setPaymentData] = useState<any>(() => {
        if (payment) {
            return {
                ...payment,
                patientId: payment.patient?._id || '',
                doctorId: payment.doctor?._id || '',
                amount: payment.amount,
                status: 'paid',
                paymentMethod: payment.paymentMethod,
                notes: payment.notes
            };
        }

        return {
            serviceType: patient?.serviceType || 'individual_session',
            doctorId: doctors[0]?._id || '',
            amount: patient?.amount || 0,
            paymentMethod: patient?.paymentMethod || 'cartão',
            notes: patient?.notes || '',
            patientId: patient?._id || '',
            status: 'paid'
        };
    });


    useEffect(() => {
        if (open) {
            setPaymentData(prev => ({
                ...prev,
                serviceType: patient?.serviceType || 'individual_session',
                doctorId: doctors[0]?._id || '',
                amount: patient?.amount || 0,
                paymentMethod: patient?.paymentMethod || 'cartão',
                notes: patient?.notes || '',
                patientId: patient?._id || '',

            }));
        }
    }, [open, patient]);

    const handleSubmit = async () => {
        console.log('paymentData', paymentData)
        if (!paymentData.patient._id) {
            toast.error('Selecione um paciente');
            return;
        }

        if (!paymentData.doctorId) {
            toast.error('Selecione um profissional');
            return;
        }

        const amount = parseFloat(paymentData.amount.toString());
        if (isNaN(amount) || amount <= 0) {
            toast.error('Valor inválido');
            return;
        }

        try {
            setIsLoading(true);

            onPaymentSuccess(paymentData); // Chama a função de sucesso
            onClose();

            // Reset inteligente mantendo paciente e profissional
            setPaymentData(prev => ({
                ...prev,
                serviceType: 'evaluation',
                amount: 0,
                paymentMethod: 'cartao',
                notes: ''
            }));

        } catch (error: any) {
            console.error('Erro ao registrar pagamento:', error);
            toast.error(error.message || 'Erro ao registrar pagamento');
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;


    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${open ? 'block' : 'hidden'}`}>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={isLoading ? undefined : onClose}
                aria-hidden="true"
            />

            <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto overflow-hidden transform transition-all">
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                        {payment
                            ? `Editar Pagamento - ${payment.patient?.fullName || ''}`
                            : patient
                                ? `Registrar Pagamento - ${patient.fullName}`
                                : 'Registrar Pagamento'}
                    </h3>
                    <button
                        type="button"
                        className="text-white hover:text-blue-200 focus:outline-none disabled:opacity-50"
                        onClick={isLoading ? undefined : onClose}
                        disabled={isLoading}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Corpo */}
                <div className="p-6">
                    <div className="space-y-6">
                        {/* Linha 1: Paciente e Tipo de Serviço */}
                        <div className="flex flex-wrap gap-4">
                            {patients && patients.length > 0 && (
                                <div className="flex-1 min-w-[250px]">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paciente *
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={paymentData.patientId}
                                            onChange={(e) => setPaymentData({
                                                ...paymentData, patientId: e.target.value
                                            })}
                                            disabled={isLoading}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 appearance-none"
                                        >
                                            <option value="">Selecione um paciente</option>
                                            {patients?.map(patient => (
                                                <option key={patient._id} value={patient._id}>
                                                    {patient.fullName}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de Serviço *
                                </label>
                                <div className="relative">
                                    <select
                                        value={paymentData.serviceType}
                                        onChange={(e) => setPaymentData({
                                            ...paymentData,
                                            serviceType: e.target.value
                                        })}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 appearance-none"
                                    >
                                        {ServiceTypes.map(service => (
                                            <option key={service.value} value={service.value}>
                                                {service.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Linha 2: Médico e Especialidade */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Médico/Doutor *
                                </label>
                                <div className="relative">
                                    <select
                                        value={paymentData.doctorId}
                                        onChange={(e) => setPaymentData({
                                            ...paymentData,
                                            doctorId: e.target.value
                                        })}
                                        disabled={isLoading || doctors.length === 0}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 appearance-none"
                                    >
                                        {doctors && doctors.map(doctor => (
                                            <option key={doctor._id} value={doctor._id}>
                                                {doctor.fullName}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Especialidade *
                                </label>
                                <div className="relative">
                                    <select
                                        value={paymentData.specialty}
                                        onChange={(e) => setPaymentData({
                                            ...paymentData,
                                            specialty: e.target.value
                                        })}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 appearance-none"
                                    >
                                        {EspecialidadesDisponiveis.map(service => (
                                            <option key={service.value} value={service.value}>
                                                {service.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Linha 3: Valor e Forma de Pagamento */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Valor (R$) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                                    <InputCurrency
                                        name='amount'
                                        value={paymentData.amount}
                                        onChange={(e) => setPaymentData({
                                            ...paymentData,
                                            amount: e.target.value
                                        })}
                                        disabled={isLoading}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Forma de Pagamento *
                                </label>
                                <div className="relative">
                                    <select
                                        value={paymentData.paymentMethod}
                                        onChange={(e) => setPaymentData({
                                            ...paymentData,
                                            paymentMethod: e.target.value
                                        })}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 appearance-none"
                                    >
                                        {PaymentMethods.map(method => (
                                            <option key={method.value} value={method.value}>
                                                {method.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Observações (full width) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Observações
                            </label>
                            <textarea
                                value={paymentData.notes}
                                onChange={(e) => setPaymentData({
                                    ...paymentData,
                                    notes: e.target.value
                                })}
                                disabled={isLoading}
                                placeholder="Opcional"
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-5 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-opacity flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                Registrando...
                            </>
                        ) : (
                            <>
                                <Check className="h-5 w-5 mr-2" />
                                Confirmar Pagamento
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};