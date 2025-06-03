// components/patient/PatientMiniCalendar.tsx
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

interface Appointment {
    date: string;
    reason: string;
    status: string;
}

interface PatientMiniCalendarProps {
    appointments: Appointment[];
}

export const PatientMiniCalendar: React.FC<PatientMiniCalendarProps> = ({ appointments }) => {
    const events = appointments.map(appt => ({
        title: appt?.doctorId?.fullName || '-',
        date: appt.date,
        backgroundColor:
            appt.status === 'cancelado'
                ? '#f87171' // vermelho
                : appt.status === 'realizado'
                    ? '#4ade80' // verde
                    : '#60a5fa', // azul
    }));

    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="text-sm font-semibold mb-2">Calendário de Sessões</h3>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto"
                headerToolbar={false}
                dayMaxEvents={1}
                fixedWeekCount={false}
            />
        </div>
    );
};
