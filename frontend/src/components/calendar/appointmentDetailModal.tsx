import { CheckCircle, ClipboardCheck, PencilIcon, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IDoctor, SelectedEvent } from '../../utils/types/types';

interface AppointmentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctors: IDoctor[];
    event: SelectedEvent;
    onCancelAppointment: (id: string, reason: string) => Promise<void>;
    onCompleteAppointment: (id: string) => Promise<void>;
    onEditAppointment: (id: string, data: any) => Promise<void>;
    patients?: any[];
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
    isOpen,
    onClose,
    doctors,
    event,
    onCancelAppointment,
    onCompleteAppointment,
    onEditAppointment,
    patients = []
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'confirm' | 'cancel' | 'edit'>('details');
    const [cancelReason, setCancelReason] = useState('');
    const [isCancelling, setIsCancelling] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState({
        doctorId: '',
        date: '',
        time: '',
        reason: '',
        operationalStatus: '',
        clinicalStatus: ''
    });

    useEffect(() => {
        if (event) {
            const eventDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
            const eventTime = event.startTime || '';

            setEditedAppointment({
                doctorId: event.doctor?.id || '',
                date: eventDate,
                time: eventTime,
                reason: event.reason || '',
                operationalStatus: event.operationalStatus || 'agendado',
                clinicalStatus: event.clinicalStatus || 'pendente'
            });
        }
    }, [event]);

    if (!isOpen || !event) return null;

    function getStatusClass(status: string) {
        switch (status) {
            case 'agendado': return 'bg-green-100 text-green-800';
            case 'confirmado': return 'bg-blue-100 text-blue-800';
            case 'cancelado': return 'bg-red-100 text-red-800';
            case 'pago': return 'bg-purple-100 text-purple-800';
            case 'faltou': return 'bg-orange-100 text-orange-800';
            case 'concluído': return 'bg-teal-100 text-teal-800';
            default: return 'bg-gray-100 text-gray-600';
        }
    }

    const handleCancel = async () => {
        if (!cancelReason.trim()) {
            alert('Por favor, informe o motivo do cancelamento');
            return;
        }

        setIsCancelling(true);
        try {
            await onCancelAppointment(event.id, cancelReason);
        } catch (error) {
            console.error("Erro ao cancelar agendamento:", error);
        } finally {
            setIsCancelling(false);
        }
    };

    const handleComplete = async () => {
        setIsCompleting(true);
        try {
            await onCompleteAppointment(event.id);
        } catch (error) {
            console.error("Erro ao concluir agendamento:", error);
        } finally {
            setIsCompleting(false);
        }
    };

    const handleEdit = async () => {
        if (!editedAppointment.date || !editedAppointment.time) {
            alert('Data e hora são obrigatórias');
            return;
        }

        setIsEditing(true);
        try {
            // Formatar dados para envio
            const appointmentData = {
                doctorId: editedAppointment.doctorId,
                date: new Date(`${editedAppointment.date}T${editedAppointment.time}`),
                reason: editedAppointment.reason,
                operationalStatus: editedAppointment.operationalStatus,
                clinicalStatus: editedAppointment.clinicalStatus
            };

            await onEditAppointment(event.id, appointmentData);
        } catch (error) {
            console.error('Erro ao editar agendamento:', error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        setEditedAppointment(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex min-h-[500px]">
                {/* Abas verticais */}
                <div className="w-1/5 bg-gray-50 rounded-l-2xl p-2 flex flex-col">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`w-full text-left p-3 rounded-lg mb-2 flex items-center ${activeTab === 'details' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        <ClipboardCheck size={16} className="mr-2" />
                        Detalhes
                    </button>

                    <button
                        onClick={() => setActiveTab('confirm')}
                        className={`w-full text-left p-3 rounded-lg mb-2 flex items-center ${activeTab === 'confirm' ? 'bg-green-100 text-green-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        <CheckCircle size={16} className="mr-2" />
                        Confirmar
                    </button>

                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`w-full text-left p-3 rounded-lg mb-2 flex items-center ${activeTab === 'edit' ? 'bg-amber-100 text-amber-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        <PencilIcon size={16} className="mr-2" />
                        Editar
                    </button>
                    <button
                        onClick={() => setActiveTab('cancel')}
                        className={`w-full text-left p-3 rounded-lg flex items-center ${activeTab === 'cancel' ? 'bg-red-100 text-red-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                        <XCircle size={16} className="mr-2" />
                        Cancelar
                    </button>
                </div>

                {/* Conteúdo principal */}
                <div className="w-4/5 p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-blue-600">
                            {activeTab === 'details' && 'Detalhes do Agendamento'}
                            {activeTab === 'confirm' && 'Confirmar Agendamento'}
                            {activeTab === 'cancel' && 'Cancelar Agendamento'}
                            {activeTab === 'edit' && 'Editar Agendamento'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {activeTab === 'details' && 'Informações completas da consulta'}
                            {activeTab === 'confirm' && 'Confirme os detalhes do agendamento'}
                            {activeTab === 'cancel' && 'Preencha os dados para cancelamento'}
                            {activeTab === 'edit' && 'Edite os detalhes do agendamento'}
                        </p>
                    </div>

                    <div className="flex-grow overflow-auto">
                        {/* Conteúdo da aba Detalhes */}
                        {activeTab === 'details' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Paciente</h3>
                                        <p className="text-lg font-medium">{event.patient?.fullName || 'Não informado'}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Doutor</h3>
                                        <p className="text-lg font-medium">{event.doctor?.fullName || 'Não informado'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Data e Hora</h3>
                                        <p className="text-lg font-medium">{event.formattedDate}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Status Operacional</h3>
                                        <span className={`inline-block px-3 py-1 rounded-md text-sm font-semibold mt-1 ${getStatusClass(event.operationalStatus)}`}>
                                            {event.operationalStatus}
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Status Clínico</h3>
                                        <span className={`inline-block px-3 py-1 rounded-md text-sm font-semibold mt-1 ${getStatusClass(event.clinicalStatus)}`}>
                                            {event.clinicalStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Motivo da Consulta</h3>
                                    <p className="text-gray-800">{event.reason || 'Não informado'}</p>
                                </div>
                            </div>
                        )}

                        {/* Conteúdo da aba Confirmar */}
                        {activeTab === 'confirm' && (
                            <div className="space-y-6">
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <CheckCircle className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                Confirme os detalhes deste agendamento antes de confirmar.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Paciente</h3>
                                        <p className="text-lg font-medium">{event.patient?.fullName || 'Não informado'}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Data e Hora</h3>
                                        <p className="text-lg font-medium">{event.formattedDate}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Motivo</h3>
                                        <p className="text-gray-800">{event.reason || 'Não informado'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Conteúdo da aba Cancelar */}
                        {activeTab === 'cancel' && (
                            <div className="space-y-6">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
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

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Motivo do cancelamento *</label>
                                    <textarea
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        rows={4}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Descreva o motivo do cancelamento..."
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Este motivo será enviado ao paciente</p>
                                </div>

                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                    <input
                                        id="notify-patient"
                                        name="notify-patient"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={false}
                                    />
                                    <label htmlFor="notify-patient" className="ml-2 block text-sm text-gray-700">
                                        Notificar paciente por WhatsApp
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Conteúdo da aba Editar */}
                        {activeTab === 'edit' && (
                            <div className="space-y-6">
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <PencilIcon className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                Edite os detalhes deste agendamento.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Campo Paciente */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Paciente *
                                        </label>
                                        <select
                                            value={editedAppointment.patientId}
                                            onChange={(e) => handleFieldChange('patientId', e.target.value)}
                                            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Selecione um paciente</option>
                                            {patients.map(patient => (
                                                <option key={patient._id} value={patient._id}>
                                                    {patient.fullName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Campo Doutor */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Doutor *
                                        </label>
                                        <select
                                            value={editedAppointment.doctorId}
                                            onChange={(e) => handleFieldChange('doctorId', e.target.value)}
                                            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Selecione um médico</option>
                                            {doctors.map(doctor => (
                                                <option key={doctor._id} value={doctor._id}>
                                                    {doctor.fullName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Campo Data */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Data *
                                        </label>
                                        <input
                                            type="date"
                                            value={editedAppointment.date}
                                            onChange={(e) => handleFieldChange('date', e.target.value)}
                                            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Campo Hora */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hora *
                                        </label>
                                        <input
                                            type="time"
                                            value={editedAppointment.time}
                                            onChange={(e) => handleFieldChange('time', e.target.value)}
                                            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Motivo da Consulta
                                    </label>
                                    <textarea
                                        value={editedAppointment.reason}
                                        onChange={(e) => handleFieldChange('reason', e.target.value)}
                                        rows={3}
                                        className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Descreva o motivo da consulta..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status Operacional
                                        </label>
                                        <select
                                            value={editedAppointment.operationalStatus}
                                            onChange={(e) => handleFieldChange('operationalStatus', e.target.value)}
                                            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="agendado">Agendado</option>
                                            <option value="confirmado">Confirmado</option>
                                            <option value="cancelado">Cancelado</option>
                                            <option value="pago">Pago</option>
                                            <option value="faltou">Faltou</option>
                                        </select>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status Clínico
                                        </label>
                                        <select
                                            value={editedAppointment.clinicalStatus}
                                            onChange={(e) => handleFieldChange('clinicalStatus', e.target.value)}
                                            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="pendente">Pendente</option>
                                            <option value="em_andamento">Em Andamento</option>
                                            <option value="concluído">Concluído</option>
                                            <option value="faltou">Faltou</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full flex justify-end mt-4 space-x-2">
                        {activeTab === 'confirm' && (
                            <button
                                onClick={handleComplete}
                                disabled={isCompleting}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center disabled:bg-green-400"
                            >
                                {isCompleting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registrando ...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={16} className="mr-2" />
                                        Concluir Agendamento
                                    </>
                                )}
                            </button>
                        )}

                        {activeTab === 'cancel' && (
                            <button
                                onClick={handleCancel}
                                disabled={isCancelling}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center disabled:bg-red-400"
                            >
                                {isCancelling ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cancelando...
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={16} className="mr-2" />
                                        Confirmar Cancelamento
                                    </>
                                )}
                            </button>
                        )}

                        {activeTab === 'edit' && (
                            <button
                                onClick={handleEdit}
                                disabled={isEditing}
                                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition flex items-center disabled:bg-amber-400"
                            >
                                {isEditing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <PencilIcon size={16} className="mr-2" />
                                        Salvar Alterações
                                    </>
                                )}
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition flex items-center"
                        >
                            Fechar
                        </button>
                    </div>

                    <div className="mt-6 flex justify-between pt-4 border-t border-gray-200">
                        <div>
                            {activeTab !== 'details' && (
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Voltar para detalhes
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