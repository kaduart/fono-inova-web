import { useState } from 'react';

interface AppointmentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
    onCancelAppointment?: (id: string, reason: string) => void;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
    isOpen,
    onClose,
    event,
    onCancelAppointment
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'cancel'>('details');
    const [cancelReason, setCancelReason] = useState('');
    const [isCancelling, setIsCancelling] = useState(false);

    if (!isOpen || !event) return null;

    function getStatusClass(status: string) {
        switch (status) {
            case 'agendado':
                return 'bg-yellow-100 text-yellow-800';
            case 'concluído':
                return 'bg-green-100 text-green-800';
            case 'cancelado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }

    console.log('Canceling appointment with reason:', isCancelling);
    const handleCancel = async () => {
        if (!cancelReason.trim()) {
            alert('Por favor, informe o motivo do cancelamento');
            return;
        }
        console.log('Canceling appointment with reason:', event, cancelReason);

        setIsCancelling(true);
        onCancelAppointment && await onCancelAppointment(event.id, cancelReason);
        setIsCancelling(false);
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex min-h-[500px]">
                {/* Abas verticais */}
                <div className="w-1/5 bg-gray-50 rounded-l-2xl p-2">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`w-full text-left p-3 rounded-lg mb-2 ${activeTab === 'details' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        Detalhes
                    </button>
                    {event.status !== 'cancelado' && (
                        <button
                            onClick={() => setActiveTab('cancel')}
                            className={`w-full text-left p-3 rounded-lg ${activeTab === 'cancel' ? 'bg-red-100 text-red-600 font-medium' : 'hover:bg-gray-100'}`}
                        >
                            Cancelamento
                        </button>
                    )}
                </div>

                {/* Conteúdo */}
                <div className="w-4/5 p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-blue-600">
                            {activeTab === 'details' ? 'Detalhes do Agendamento' : 'Cancelar Agendamento'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {activeTab === 'details' ? 'Informações completas da consulta' : 'Preencha os dados para cancelamento'}
                        </p>
                    </div>

                    {activeTab === 'details' ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Paciente</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={event.patient}
                                        className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Doutor</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={event.doctor}
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
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
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
                    )}

                    <div className="mt-6 flex justify-between">
                        {activeTab === 'details' ? (
                            <button
                                className="text-sm text-blue-600 hover:underline"
                            // onClick={() => router.push(`/appointments/${event.id}`)}
                            >
                                Ver mais detalhes
                            </button>
                        ) : (
                            <button
                                onClick={() => setActiveTab('details')}
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Voltar para detalhes
                            </button>
                        )}

                        <div className="space-x-2">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetailModal;