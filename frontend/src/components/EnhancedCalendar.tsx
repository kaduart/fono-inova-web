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
import { patientService } from '../services/patientService';
import { professionalService } from '../services/professionalService';
import ScheduleModal from './ScheduleModal';
import AppointmentDetailModal from './appointmentDetailModal';


interface EnhancedCalendarProps {
    onDateClick: (arg: DateClickArg) => void;
    appointments: Appointment[];
}

interface Appointment {
    professional: string;
    dateTime: string;
    sessionType: string;
    status: string;
    notes: string;
}

const EnhancedCalendar: React.FC<EnhancedCalendarProps> = ({
    onDateClick,
    appointments,
}) => {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('all');
    const [selectedPatient, setSelectedPatient] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isAppointmentDetailModalOpen, setIsAppointmentDetailModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedEvent, setSelectedEvent] = useState(null);
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

    /*  useEffect(() => {
         const token = localStorage.getItem('token');
         if (!token) return;
 
         const fetchPatients = async () => {
             try {
                 const response = await fetch(`${BASE_URL}/patients`, {
                     headers: {
                         'Authorization': `Bearer ${token}`,
                     },
                 });
 
                 const data = await response.json();
                 if (Array.isArray(data)) {
                     setPatients(data);
                 } else {
                     console.error('Resposta inesperada da API:', data);
                 }
             } catch (error) {
                 console.error('Erro ao buscar pacientes:', error);
             }
         };
 
         fetchPatients();
         // fetchAppointment();
     }, []); */

    useEffect(() => {
        patientService
            .fetchAll()
            .then(setPatients)
            .catch(err => console.error('Erro pacientes:', err));
        professionalService
            .fetchAll()
            .then(setDoctors)
            .catch(err => console.error('Erro médicos:', err));
    }, []);
    /* 
        useEffect(() => {
            const fetchDoctors = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        navigate('/login');
                        return;
                    }
                    const response = await fetch(`${BASE_URL}/doctor/all`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setDoctors(data);
                    } else {
                        console.error('Failed to fetch doctors');
                    }
                } catch (error) {
                    console.error('Error fetching doctors:', error);
                }
            };
    
            fetchDoctors();
        }, []); */

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

    /*     // Manipuladores de eventos
        const handleDateSelect = (selectInfo) => {
            const selectedDate = selectInfo.startStr.split('T')[0];
            setSelectedDate(selectedDate);
            setFormData({
                ...formData,
                date: selectedDate,
                time: ''
            });
            setModalMode('create');
            setIsModalOpen(true);
        }; */

    const handleEventClick = (info: any) => {
        const { event } = info;

        const start = event.start
            ? new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(event.start))
            : "";

        setSelectedEvent({
            doctor: event.extendedProps?.doctorName || "Profissional não informado",
            patient: event.extendedProps?.patientName || "Paciente não informado",
            reason: event.extendedProps?.reason || "Motivo não informado",
            status: event.extendedProps?.status || "Status não informado",
            start,
        });
        setIsAppointmentDetailModalOpen(true);
    };

    const handleSubmit = async (appointment: Appointment): Promise<void> => {
        const { patientId, doctorId, date, time, reason } = appointment;

        if (!patientId || !doctorId || !date || !time || !reason) {
            toast.error('Todos os campos são obrigatórios');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            let response;
            if (modalMode === 'edit' && selectedEvent?._id) {
                response = await axios.put(`${BASE_URL}/appointments/${selectedEvent._id}`, appointment, config);
            } else {
                response = await axios.post(`${BASE_URL}/appointments/`, appointment, config);
            }
            // Verifique a resposta e feche o modal se a operação for bem-sucedida
            if (response.status === 200 || response.status === 201) {
                setIsModalOpen(false);  // Fechar o modal apenas em sucesso
                toast.success('Agendamento salvo com sucesso!');
                // fetchAppointment();
            }
        } catch (error: any) {
            setIsModalOpen(true);  // Fechar o modal apenas em sucesso
            // Tratar erro com base no status e exibir mensagem adequada via toast
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error(error.response.data.message); // Conflito
                } else if (error.response.status === 401) {
                    toast.error('Você precisa estar autenticado.'); // Não autorizado
                } else if (error.response.status === 400) {
                    toast.error('Erro nos dados enviados.'); // Dados malformados
                } else {
                    toast.error('Erro ao salvar agendamento.'); // Para outros erros genéricos
                }
            } else {
                // Caso não tenha resposta da API (erro de rede, por exemplo)
                toast.error('Erro ao conectar com o servidor.');
            }

            // Log para depuração
            console.error('Erro ao salvar agendamento:', error);
        }
    };

    const [openSchedule, setOpenSchedule] = useState(false);
    const [appointmentData, setAppointmentData] = useState(DEFAULT_APPOINTMENT);
    const [mode, setMode] = useState<'create' | 'edit'>('create');

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
                        Novo Agendamento
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
                    <div className="p-4 border rounded-lg shadow-md bg-white">
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
                        />
                    </div>
                )}

            </Paper>
            <ScheduleModal
                open={openSchedule}
                onClose={() => setOpenSchedule(false)}
                onSave={async (data) => {
                    await handleSubmit(data); // Atualiza a lista
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