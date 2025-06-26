import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    Box,
    Paper,
    Typography
} from '@mui/material';
import axios from 'axios';
import {
    Plus
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import { DEFAULT_APPOINTMENT } from '../hooks/useTempAppointments';
import appointmentService, { AvailableSlotsParams } from '../services/appointmentService';
import { patientService } from '../services/patientService';
import { createPayment } from '../services/paymentService';
import { IAppointment, IDoctor, SelectedEvent } from '../utils/types';
import ScheduleModal from './ScheduleModal';
import AppointmentDetailModal from './appointmentDetailModal';


interface EnhancedCalendarProps {
    onDateClick: (arg: DateClickArg) => void;
    appointments: Appointment[];
    doctors: IDoctor[],
}

interface Appointment {
    professional: string;
    dateTime: string;
    sessionType: string;
    status: string;
    notes: string;
}

const EnhancedCalendar: React.FC<EnhancedCalendarProps> = ({
    doctors,
    onDateClick,
    appointments,
}) => {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('all');
    const [selectedPatient, setSelectedPatient] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openSchedule, setOpenSchedule] = useState(false);
    const [appointmentData, setAppointmentData] = useState(DEFAULT_APPOINTMENT);
    const [mode, setMode] = useState<'create' | 'edit'>('create');

    const [isAppointmentDetailModalOpen, setIsAppointmentDetailModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');


    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        reason: '',
        status: 'agendado'
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [conflictError, setConflictError] = useState(null);
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };

    const navigate = useNavigate();

    useEffect(() => {
        patientService
            .fetchAll()
            .then(setPatients)
            .catch(err => console.error('Erro pacientes:', err));
    }, []);


    useEffect(() => {
        if (!appointments || !Array.isArray(appointments)) return;

        const calendarEvents = appointments.map(appt => ({
            title: appt.professional,
            start: appt.dateTime,
            extendedProps: {
                type: appt.sessionType,
                status: appt.status,
                notes: appt.notes,
            },
        }));
        setEvents(calendarEvents);
    }, [appointments]);

    const handlePayloadToSlots = (data: { doctorId: string; date: string }) => {
        if (data.doctorId && data.date) {
            setFormData(prev => ({
                ...prev,
                doctorId: data.doctorId,
                date: data.date,
            }));
        }
    };

    const fetchAppointment = useCallback(async () => {
        setLoading(true);
        try {
            let url = '/appointments';
            const params = new URLSearchParams();

            if (selectedDoctor !== 'all') {
                params.append('doctorId', selectedDoctor);
            }

            if (selectedPatient !== 'all') {
                params.append('patientId', selectedPatient);
            }

            if (selectedStatus !== 'all') {
                params.append('status', selectedStatus);
            }

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const token = localStorage.getItem('token');

            const response = await axios.get(`${BASE_URL}${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const formattedEvents = Array.isArray(response.data) && response.data.map(appointment => {
                const startDate = new Date(appointment.start);
                const endDate = new Date(appointment.end);

                const formattedEnd = endDate.toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour12: false
                });
                return {
                    id: appointment.id || appointment._id,
                    title: `${appointment.patient.name || 'Consulta'} - Dr. ${appointment.doctor.name || 'Desconhecido'}`,
                    start: startDate,
                    end: formattedEnd,
                    extendedProps: {
                        patientId: appointment.patient.id,
                        doctorId: appointment.doctor.id,
                        reason: appointment.description,
                        status: appointment.status,
                        patientName: appointment.patient.name,
                        doctorName: appointment.doctor.name || 'Desconhecido',
                    },
                    backgroundColor: getStatusColor(appointment.status),
                    borderColor: getStatusColor(appointment.status),
                };
            });
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedDoctor, selectedPatient, selectedStatus]);

    useEffect(() => {
        fetchAppointment();
    }, [fetchAppointment]);

    // Carregar horários disponíveis quando médico e data são selecionados
    useEffect(() => {
        fetchAvailableSlots();
    }, [formData.doctorId, formData.date]);

    const fetchAvailableSlots = async () => {
        if (formData.doctorId && formData.date) {
            try {
                const payload: AvailableSlotsParams = {
                    doctorId: formData.doctorId,
                    date: formData.date
                };

                const response = await appointmentService.getAvailableSlots(payload)

                setAvailableSlots(response.data);
            } catch (error) {
                console.error('Erro ao carregar horários disponíveis:', error);
            }
        } else {
            setAvailableSlots([]);
        }
    };

    // Funções auxiliares
    const getStatusColor = (status: any) => {
        switch (status) {
            case 'agendado': return '#4CAF50'; // Verde
            case 'concluído': return '#2196F3'; // Azul
            case 'cancelado': return '#F44336'; // Vermelho
            default: return '#9E9E9E'; // Cinza
        }
    };

    const handleEventClick = (info: { event: any }) => {
        const { event } = info;

        // Formatação da data/hora
        const formattedDate = event.start
            ? new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(event.start))
            : "";

        // Extrai os dados básicos que temos
        const { patientId, doctorId, status, patientName, doctorName } = event.extendedProps;

        setSelectedEvent({
            id: event.id,
            patient: {
                id: patientId,
                name: patientName || "Paciente não informado"
            },
            doctor: {
                id: doctorId,
                name: doctorName || "Profissional não informado"
            },
            date: event.start ? new Date(event.start) : null,
            startTime: event.start ? new Date(event.start).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            }) : "",
            status: status || "Status não informado",
            formattedDate,
            backgroundColor: event.backgroundColor,
            borderColor: event.borderColor,
            // Mantém o formato antigo para compatibilidade
            start: formattedDate,
        });

        setIsAppointmentDetailModalOpen(true);
    };

    const handleSubmit = async (appointment: IAppointment | Omit<IAppointment, '_id'>): Promise<void> => {
        try {
            if (!appointment.patientId || !appointment.doctorId ||
                !appointment.date || !appointment.time || !appointment.status) {
                toast.error('Todos os campos obrigatórios devem ser preenchidos');
                return;
            }
            // Preparar os dados para o serviço
            const payload = {
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                date: appointment.date,
                time: appointment.time,
                sessionType: appointment.sessionType,
                status: appointment.status || 'agendado',
                notes: appointment.notes,
                paymentAmount: appointment.paymentAmount,
                paymentMethod: appointment.paymentMethod
            };
            console.log('chamouo enchaced', payload)

            if ('_id' in appointment && appointment._id) {
                // Edição
                await appointmentService.update(appointment._id, payload);
                toast.success('Agendamento atualizado com sucesso!');
            } else {
                const newAppointment = await appointmentService.create(payload);

                await createPayment({
                    patientId: appointment.patientId,
                    doctorId: appointment.doctorId,
                    serviceType: 'evaluation', // Valor padrão
                    amount: 200, // Valor padrão (pode buscar da tabela de preços)
                    status: 'pending', // Status padrão
                    paymentMethod: 'dinheiro', // Método não selecionado inicialmente
                    notes: `Pagamento referente à consulta agendada para ${appointment.date} às ${appointment.time}`,
                    // sessionId: newAppointment._id
                });
                toast.success('Agendamento e registro de pagamento criados com sucesso!');
            }

            // Atualizar lista e fechar modal
            fetchAppointment();
            setOpenSchedule(false)
        } catch (error: any) {
            console.error('Erro ao salvar agendamento:', error);

            // Tratamento de erros específico
            if (error.response) {
                switch (error.response.status) {
                    case 409:
                        toast.error('Conflito de horário: ' + error.response.data.message);
                        break;
                    case 400:
                        toast.error('Dados inválidos: ' + error.response.data.message);
                        break;
                    case 401:
                        toast.error('Autenticação necessária');
                        navigate('/login');
                        break;
                    default:
                        toast.error('Erro ao salvar agendamento');
                }
            } else {
                toast.error('Erro de conexão com o servidor');
            }

            // Mantém o modal aberto para correção
            setIsModalOpen(true);
        }
    };

    const handleCancelAppointment = async (appointmentId: string, reason: string): Promise<void> => {
        try {
            if (!reason) {
                toast.error('O motivo do cancelamento é obrigatório');
                return;
            }

            await appointmentService.cancel(appointmentId, {
                reason,
                notifyPatient: true
            });

            toast.success('Agendamento cancelado com sucesso!');
            //fetchAppointments();
            setIsAppointmentDetailModalOpen(false);
            fetchAppointment();
        } catch (error: any) {
            console.error('Erro ao cancelar agendamento:', error);

            if (error.response) {
                toast.error(error.response.data.message || 'Erro ao cancelar agendamento');
            } else {
                toast.error('Erro de conexão ao cancelar agendamento');
            }
        }
    };

    const handleCompleteAppointment = async (appointmentId: string) => {
        try {

            await appointmentService.complete(appointmentId);

            toast.success("Consulta marcada como concluída!");
            fetchAppointment(); // Atualiza a lista
            setIsAppointmentDetailModalOpen(true);

        } catch (error) {
            console.error("Erro ao concluir agendamento:", error);
            toast.error(error.response?.data?.message || "Erro ao concluir consulta");
        }
    };

    const handleOpenSchedule = (data = DEFAULT_APPOINTMENT, modeType = 'create') => {
        setAppointmentData(data);
        setMode(modeType);
        setOpenSchedule(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Calendário de Agendamentos</h1>

                    <button
                        onClick={() => {
                            setFormData({
                                patientId: '',
                                doctorId: '',
                                date: new Date().toISOString().split('T')[0],
                                time: '',
                                reason: '',
                                status: 'agendado'
                            });
                            handleOpenSchedule();
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} />
                        Novo Agendamento
                    </button>
                </div>

                {/* Filtros */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Filtro Médico */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Médico</label>
                                <div className="relative">
                                    <select
                                        value={selectedDoctor}
                                        onChange={(e) => setSelectedDoctor(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    >
                                        <option value="all">Todos os Médicos</option>
                                        {Array.isArray(doctors) && doctors.map((doctor) => (
                                            <option key={doctor._id} value={doctor._id}>
                                                Dr. {doctor.fullName} - {doctor.specialty}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Filtro Paciente */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Paciente</label>
                                <div className="relative">
                                    <select
                                        value={selectedPatient}
                                        onChange={(e) => setSelectedPatient(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    >
                                        <option value="all">Todos os Pacientes</option>
                                        {Array.isArray(patients) && patients.map(patient => (
                                            <option key={patient._id} value={patient._id}>
                                                {patient.fullName}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Filtro Status */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                                <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    >
                                        <option value="all">Todos os Status</option>
                                        <option value="agendado">Agendado</option>
                                        <option value="concluído">Concluído</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chips de filtro */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedDoctor !== 'all' && (
                                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    Médico: {doctors.find(d => d._id === selectedDoctor)?.fullName || ''}
                                    <button
                                        onClick={() => setSelectedDoctor('all')}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            {selectedPatient !== 'all' && (
                                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                    Paciente: {patients.find(p => p._id === selectedPatient)?.fullName || ''}
                                    <button
                                        onClick={() => setSelectedPatient('all')}
                                        className="ml-2 text-green-600 hover:text-green-800"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            {selectedStatus !== 'all' && (
                                <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                    Status: {selectedStatus}
                                    <button
                                        onClick={() => setSelectedStatus('all')}
                                        className="ml-2 text-yellow-600 hover:text-yellow-800"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Calendário */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            locale={ptBrLocale}
                            initialView="dayGridMonth"
                            weekends
                            events={events}
                            dateClick={onDateClick}
                            eventClick={handleEventClick}
                            height="auto"
                            eventDisplay="block"
                            eventTimeFormat={{
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }}
                            eventContent={(arg) => (
                                <div className="flex flex-col p-1">
                                    <span className="text-xs font-medium text-gray-800">
                                        {arg.timeText}
                                    </span>
                                    <span className="text-sm font-semibold truncate">
                                        {arg.event.title}
                                    </span>
                                </div>
                            )}
                            dayHeaderContent={(arg) => (
                                <span className="text-sm font-medium text-gray-600">
                                    {arg.text.substring(0, 3)}
                                </span>
                            )}
                            dayCellContent={(arg) => (
                                <div className="flex justify-end p-1">
                                    <span className={`text-sm ${arg.isToday ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                                        {arg.dayNumberText}
                                    </span>
                                </div>
                            )}
                            eventClassNames="cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <ScheduleModal
                open={openSchedule}
                onClose={() => setOpenSchedule(false)}
                onSave={async (data) => {
                    await handleSubmit(data);
                }}
                patients={patients}
                doctors={doctors}
                initialData={appointmentData}
                payloadToSlots={handlePayloadToSlots}
                availableSlots={availableSlots}
                formError={formError}
                mode={mode}
            />
            <AppointmentDetailModal
                isOpen={isAppointmentDetailModalOpen}
                onClose={() => setIsAppointmentDetailModalOpen(false)}
                onCancelAppointment={(id, data) => handleCancelAppointment(id, data)}
                handleConfirmAppointment={(id) => handleCompleteAppointment(id)}
                event={selectedEvent}
            />

            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Legenda
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 16, height: 16, backgroundColor: '#4CAF50', mr: 1 }} />
                        <Typography variant="body2">Agendado</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 16, height: 16, backgroundColor: '#2196F3', mr: 1 }} />
                        <Typography variant="body2">Concluído</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 16, height: 16, backgroundColor: '#F44336', mr: 1 }} />
                        <Typography variant="body2">Cancelado</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );

};

export default EnhancedCalendar;