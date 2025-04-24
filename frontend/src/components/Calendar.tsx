import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Calendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/appointments')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

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
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEventClick = async (clickInfo) => {
        if (window.confirm(`Deseja remover "${clickInfo.event.title}"?`)) {
            try {
                await axios.delete(`/api/appointments/${clickInfo.event.id}`);
                clickInfo.event.remove();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
        />
    );
};

export default Calendar;
