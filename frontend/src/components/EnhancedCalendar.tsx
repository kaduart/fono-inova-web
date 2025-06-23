import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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
import appointmentService, { IAppointment } from '../services/appointmentService';
import { patientService } from '../services/patientService';
import { IDoctor, SelectedEvent } from '../utils/types';
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


    const fetchAppointment = useCallback(async () => {
        console.log('Fetching appointments with filters:',)
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
                console.log('Formatted End:', formattedEnd);
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
        const fetchAvailableSlots = async () => {
            if (formData.doctorId && formData.date) {
                try {
                    const response = await axios.get('/api/appointments/available-slots', {
                        params: {
                            doctorId: formData.doctorId,
                            date: formData.date
                        }
                    });
                    setAvailableSlots(response.data);
                } catch (error) {
                    console.error('Erro ao carregar horários disponíveis:', error);
                }
            } else {
                setAvailableSlots([]);
            }
        };

        fetchAvailableSlots();
    }, [formData.doctorId, formData.date]);

    // Funções auxiliares
    const getStatusColor = (status) => {
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
            // Validação básica
            if (!appointment.patient?._id || !appointment.doctor?._id ||
                !appointment.date || !appointment.startTime || !appointment.reason) {
                toast.error('Todos os campos obrigatórios devem ser preenchidos');
                return;
            }

            // Preparar os dados para o serviço
            const payload = {
                patientId: appointment.patient._id,
                doctorId: appointment.doctor._id,
                date: new Date(appointment.date),
                startTime: appointment.startTime,
                duration: appointment.duration || 60, // default 60 minutos
                reason: appointment.reason,
                status: appointment.status || 'agendado',
                sessionType: appointment.sessionType,
                paymentMethod: appointment.paymentMethod,
                notes: appointment.notes
            };

            if ('_id' in appointment && appointment._id) {
                // Edição
                await appointmentService.update(appointment._id, payload);
                toast.success('Agendamento atualizado com sucesso!');
            } else {
                // Criação
                await appointmentService.create(payload);
                toast.success('Agendamento criado com sucesso!');
            }

            // Atualizar lista e fechar modal
            fetchAppointments();
            setIsModalOpen(false);

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
        console.log("Concluir agendamento:", appointmentId);
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
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" component="h1">
                        Calendário de Agendamentos
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Plus size={16} />}
                        onClick={() => {
                            setFormData({
                                patientId: '',
                                doctorId: '',
                                date: new Date().toISOString().split('T')[0],
                                time: '',
                                reason: '',
                                status: 'agendado'
                            });
                            handleOpenSchedule()
                        }}
                    >
                        Agendamento
                    </Button>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Médico</InputLabel>
                                <Select
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                    label="Médico"
                                >
                                    <MenuItem value="all">Todos os Médicos</MenuItem>
                                    {Array.isArray(doctors) && doctors.map((doctor) => (
                                        <MenuItem key={doctor._id} value={doctor._id}>
                                            Dr. {doctor.fullName} - {doctor.specialty}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Paciente</InputLabel>
                                <Select
                                    value={selectedPatient}
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                    label="Paciente"
                                >
                                    <MenuItem value="all">Todos os Pacientes</MenuItem>
                                    {Array.isArray(patients) && patients.map(patient => (
                                        <MenuItem key={patient._id} value={patient._id}>
                                            {patient.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="all">Todos os Status</MenuItem>
                                    <MenuItem value="agendado">Agendado</MenuItem>
                                    <MenuItem value="concluído">Concluído</MenuItem>
                                    <MenuItem value="cancelado">Cancelado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}

                {/* Exibir chips de filtro selecionados */}

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {selectedDoctor !== 'all' && (
                        <Chip
                            label={`Médico: ${doctors.find(d => d._id === selectedDoctor)?.fullName || ''}`}
                            onDelete={() => setSelectedDoctor('all')}
                            color="primary"
                            variant="outlined"
                        />
                    )}

                    {selectedPatient !== 'all' && (
                        <Chip
                            label={`Paciente: ${patients.find(p => p._id === selectedPatient)?.fullName || ''}`}
                            onDelete={() => setSelectedPatient('all')}
                            color="primary"
                            variant="outlined"
                        />
                    )}

                    {selectedStatus !== 'all' && (
                        <Chip
                            label={`Status: ${selectedStatus}`}
                            onDelete={() => setSelectedStatus('all')}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
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
                        />
                    </div>
                )}

            </Paper>
            <ScheduleModal
                open={openSchedule}
                onClose={() => setOpenSchedule(false)}
                onSave={async (data) => {
                    await handleSubmit(data);
                }}
                patients={patients}
                doctors={doctors}
                initialData={appointmentData}
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