import { CheckCircle, ClipboardCheck, XCircle } from 'lucide-react';
import { useState } from 'react';
import { SelectedEvent } from '../utils/types';

interface AppointmentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: SelectedEvent;
    onCancelAppointment?: (id: string, reason: string) => void;
    handleCompleteAppointment?: (id: string) => void;
    handleConfirmAppointment?: (id: string) => void;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
    isOpen,
    onClose,
    event,
    onCancelAppointment,
    handleCompleteAppointment,
    handleConfirmAppointment
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'confirm' | 'cancel'>('details');
    const [cancelReason, setCancelReason] = useState('');
    const [isCancelling, setIsCancelling] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    if (!isOpen || !event) return null;

    function getStatusClass(status: string) {
        switch (status) {
            case 'agendado':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmado':
                return 'bg-blue-100 text-blue-800';
            case 'concluído':
                return 'bg-green-100 text-green-800';
            case 'cancelado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }

    const handleCancel = async () => {
        if (!cancelReason.trim()) {
            alert('Por favor, informe o motivo do cancelamento');
            return;
        }

        setIsCancelling(true);
        onCancelAppointment && await onCancelAppointment(event.id, cancelReason);
        setIsCancelling(false);
    }

    const handleConfirm = async () => {
        setIsConfirming(true);
        handleConfirmAppointment && await handleConfirmAppointment(event.id);
        setIsConfirming(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex min-h-[500px]">
                {/* Abas verticais - SEMPRE mostrando todas as três opções */}
                <div className="w-1/5 bg-gray-50 rounded-l-2xl p-2">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`w-full text-left p-3 rounded-lg mb-2 ${activeTab === 'details' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        Detalhes
                    </button>

                    <button
                        onClick={() => setActiveTab('confirm')}
                        className={`w-full text-left p-3 rounded-lg mb-2 ${activeTab === 'confirm' ? 'bg-green-100 text-green-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        Confirmar
                    </button>

                    <button
                        onClick={() => setActiveTab('cancel')}
                        className={`w-full text-left p-3 rounded-lg ${activeTab === 'cancel' ? 'bg-red-100 text-red-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        Cancelar
                    </button>
                </div>

                {/* Conteúdo principal */}
                <div className="w-4/5 p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-blue-600">
                            {activeTab === 'details' && 'Detalhes do Agendamento'}
                            {activeTab === 'confirm' && 'Confirmar Agendamento'}
                            {activeTab === 'cancel' && 'Cancelar Agendamento'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {activeTab === 'details' && 'Informações completas da consulta'}
                            {activeTab === 'confirm' && 'Confirme os detalhes do agendamento'}
                            {activeTab === 'cancel' && 'Preencha os dados para cancelamento'}
                        </p>
                    </div>

                    {/* Conteúdo da aba Detalhes */}
                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Paciente</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={event.patient.name}
                                            className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Doutor</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={event.doctor.name}
                                            className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={event.start}
                                            className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <div
                                            className={`inline-block px-3 py-2 rounded-md text-sm font-semibold ${getStatusClass(event.status)}`}
                                        >
                                            {event.status}
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-2 border-gray-200" />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Motivo</label>
                                    <textarea
                                        disabled
                                        value={event.reason}
                                        rows={3}
                                        className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 resize-none cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da aba Confirmar */}
                    {activeTab === 'confirm' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            Confirme os detalhes deste agendamento.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Mostrar os mesmos detalhes do agendamento para confirmação */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Paciente</label>
                                    <div className="mt-1 bg-gray-50 p-2 rounded border border-gray-200">
                                        {event.patient.name}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
                                    <div className="mt-1 bg-gray-50 p-2 rounded border border-gray-200">
                                        {event.start}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Motivo</label>
                                    <div className="mt-1 bg-gray-50 p-2 rounded border border-gray-200">
                                        {event.reason}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conteúdo da aba Cancelar */}
                    {activeTab === 'cancel' && (
                        <div className="space-y-6">
                            <div className="space-y-6">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XCircle className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                Ao cancelar este agendamento, o paciente será notificado automaticamente.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Motivo do cancelamento *</label>
                                    <textarea
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        rows={4}
                                        className="w-full p-2 rounded-md border border-gray-300 resize-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Descreva o motivo do cancelamento..."
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="notify-patient"
                                        name="notify-patient"
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="notify-patient" className="ml-2 block text-sm text-gray-700">
                                        Notificar paciente por e-mail
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Rodapé com ações */}
                    <div className="mt-6 flex justify-between">
                        <div>
                            {activeTab !== 'details' && (
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    Voltar para detalhes
                                </button>
                            )}
                        </div>

                        <div className="space-x-2">
                            {activeTab === 'confirm' && (
                                <button
                                    onClick={handleConfirm}
                                    disabled={isConfirming}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:bg-green-400"
                                >
                                    {isConfirming ? 'Confirmando...' : 'Confirmar Agendamento'}
                                </button>
                            )}

                            {activeTab === 'cancel' && (
                                <button
                                    onClick={handleCancel}
                                    disabled={isCancelling}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:bg-red-400"
                                >
                                    {isCancelling ? 'Cancelando...' : 'Confirmar Cancelamento'}
                                </button>
                            )}

                            <button
                                onClick={onClose}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                            >
                                Fechar
                            </button>

                            {/* Botão de Concluir (sempre visível exceto na aba de cancelar) */}
                            {activeTab !== 'cancel' && handleCompleteAppointment && (
                                <button
                                    onClick={() => handleCompleteAppointment(event.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    disabled={event.status === 'concluído'}
                                >
                                    {event.status === 'concluído' ? (
                                        <>
                                            <CheckCircle className="inline mr-2" />
                                            Concluído
                                        </>
                                    ) : (
                                        <>
                                            <ClipboardCheck className="inline mr-2" />
                                            Marcar como Concluído
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetailModal;