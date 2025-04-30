import { useState } from "react";

export type Appointment = {
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    reason: string;
    status: string;
};

export const DEFAULT_APPOINTMENT = {
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    reason: '',
    status: 'agendado',
};


export const useTempAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const addAppointment = (appt: Appointment) => {
        setAppointments((prev) => [...prev, appt]);
    };

    const removeAppointment = (id: string) => {
        setAppointments((prev) => prev.filter((a) => a.patientId !== id));
    };

    return { appointments, addAppointment, removeAppointment };
};
