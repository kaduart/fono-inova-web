import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

// Função para definir a cor de acordo com o status do agendamento
const getStatusColor = (status) => {
    switch (status) {
        case 'confirmado':
            return '#28a745'; // Verde
        case 'pendente':
            return '#ffc107'; // Amarelo
        case 'cancelado':
            return '#dc3545'; // Vermelho
        default:
            return '#6c757d'; // Cinza
    }
};

// Componente Calendar
const Calendar = ({ selectedDoctor, selectedPatient, selectedStatus }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Função para buscar os agendamentos da API
    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        try {
            let url = '/appointment';
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

            const response = await axios.get(`${process.env.BASE_URL}${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const formattedEvents = Array.isArray(response.data) && response.data.map((appointment) => {
                const startDate = new Date(appointment.start);
                const endDate = new Date(appointment.end);

                return {
                    id: appointment.id || appointment._id,
                    title: `${appointment.description || 'Consulta'} - Dr. ${appointment.doctorName || 'Desconhecido'}`,
                    start: startDate,
                    end: endDate,
                    extendedProps: {
                        patientId: appointment.patientId,
                        doctorId: appointment.doctorId,
                        reason: appointment.description,
                        status: appointment.status,
                        patientName: appointment.patientName,
                        doctorName: appointment.doctorName || 'Desconhecido'
                    },
                    backgroundColor: getStatusColor(appointment.status),
                    borderColor: getStatusColor(appointment.status)
                };
            });

            setEvents(formattedEvents);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedDoctor, selectedPatient, selectedStatus]);

    // Chama a função de buscar agendamentos ao carregar os dados ou ao mudar os filtros
    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // Manipulador de seleção de data
    const handleDateSelect = async (selectInfo) => {
        const title = prompt('Digite o título do agendamento:');
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
            };
            try {
                const res = await axios.post('/api/appointments', newEvent);
                calendarApi.addEvent({ ...res.data });
                fetchAppointments();  // Recarrega os eventos após adicionar um novo
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Manipulador de clique no evento
    const handleEventClick = async (clickInfo) => {
        if (window.confirm(`Deseja remover "${clickInfo.event.title}"?`)) {
            try {
                await axios.delete(`/api/appointments/${clickInfo.event.id}`);
                clickInfo.event.remove();
                fetchAppointments();  // Recarrega os eventos após deletar um
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            {loading && <p>Carregando...</p>}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                editable={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                locale="pt-br"
            />
        </div>
    );
};

export default Calendar;
