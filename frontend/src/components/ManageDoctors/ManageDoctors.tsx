import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { IDoctor, PatientData, ScheduleAppointment } from "../../utils/types";
import ScheduleAppointmentModal from '../patients/ScheduleAppointmentModal';
import { Button } from "../ui/Button";
import DoctorAgenda from "./DoctorAgenda";
import DoctorFormModal from "./DoctorFormModal";
import DoctorList from "./DoctorList";
import { DoctorSlotBookingModal } from './DoctorSlotBookingModal';

const initialSchedules = {
    "1": {
        Segunda: ["08:00", "09:00"],
        Terça: ["10:00", "14:00"],
    },
    "2": {
        Segunda: ["08:00"],
        Quarta: ["15:00"],
    },
};

interface ManageDoctorsProps {
    doctors: IDoctor[],
    patients: PatientData[], // Defina o tipo correto para pacientes
    onSubmitDoctor: () => Promise<void>;

};

const ManageDoctors: React.FC<ManageDoctorsProps> = ({
    doctors = [],
    patients = [],
    onSubmitDoctor,
}) => {
    const [doctorSchedules, setDoctorSchedules] = useState(initialSchedules);
    const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [dataUpdateSlots, setdataUpdateSlots] = useState<ScheduleAppointment | undefined>();
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [showAgendaModal, setshowAgendaModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingModalOpen, setBookingModalOpen] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [allDaySlots, setAllDaySlots] = useState<(any)[]>([]);
    const [selectedBookingData, setSelectedBookingData] = useState<{
        time: string,
        isBookingModalOpen: boolean
    } | null>(null);

    const [scheduleAppointmentData, setScheduleAppointmentData] = useState<ScheduleAppointment>({
        doctorId: '',
        patientId: '',
        date: '',
        time: '',
        sessionType: 'fonoaudiologia',
        notes: '',
        paymentAmount: 0,
        paymentMethod: 'dinheiro',
        status: 'agendado',
    });

 
    const handleViewAgenda = (doctor: IDoctor) => {
        console.log('doutor selecionado', doctor)

        setSelectedDoctor(doctor);
        setshowAgendaModal(true);  // ou outro controle para abrir modal/agendamento
    };

    const handleDaySlotsChange = (slots: { date: string; slots: string[] }[]) => {
        setAllDaySlots(slots);
    };

    const handleCloseScheduleModal = () => {
        setShowScheduleModal(false);
        setSelectedBookingData(null);
    };

    const handleAddOrEditDoctor = (doctor: IDoctor | null) => {
        console.log('doutor selecionado', doctor)
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const handleUpdateSchedule = (doctorId: IDoctor, newSchedule: any) => {
        setDoctorSchedules((prev) => ({
            ...prev,
            [doctorId]: newSchedule,
        }));
    };

    const onOpenCloseModals = async (data: any) => {
        console.log('chamou no pai raiz o abir modal', data)
        setScheduleAppointmentData({
            date: scheduleAppointmentData.date,
            time: data.time,
            doctorId: data.professional,
            patientId: data.patient,
            sessionType: 'fonoaudiologia',
            status: 'agendado',
            notes: '',
            paymentAmount: 0,
            paymentMethod: 'dinheiro',

        });
        setBookingModalOpen(data.isBookingModalOpen);
        setSelectedBookingData(data);
    }

    const handleBookingSubmit = async (data: any) => {
        setScheduleAppointmentData({
            ...scheduleAppointmentData,
            date: data.date,
            doctorId: data.professional,
            patientId: data.patient,
        });
        setBookingModalOpen(false);
        setShowScheduleModal(true);
    };

    const handleBooking = async (payload: ScheduleAppointment) => {
        const [hours, minutes] = payload.time.split(':').map(Number);
        const datetime = new Date(scheduleAppointmentData.date);
        datetime.setHours(hours, minutes, 0, 0);
        payload.date = datetime.toISOString();
        console.log('datetime-->>', datetime)
        console.log('PAYYYload-->>', payload)


        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Usuário não autenticado. Por favor, faça login novamente.');
            return;
        }

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
                
            });

            if (!response.ok) throw new Error('Erro ao agendar sessão');

            toast.success('Sessão agendada com sucesso!');

            setdataUpdateSlots(payload);
            setIsModalOpen(false);

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Erro inesperado ao agendar.');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestão de Profissionais</h2>
                <Button onClick={() => handleAddOrEditDoctor(null)}>Adicionar Profissional</Button>

            </div>

            <DoctorList doctors={doctors} onEdit={handleAddOrEditDoctor} onViewAgenda={handleViewAgenda} />

            {showAgendaModal && selectedDoctor && (
                <DoctorAgenda
                    selectedDoctor={selectedDoctor}
                    doctors={doctors}
                    patients={patients}
                    onDaySlotsChange={handleDaySlotsChange}
                    onSubmitSlotBooking={onOpenCloseModals}
                    updateSlots={dataUpdateSlots}
                />
            )}

            {showModal && (
                <DoctorFormModal
                    selectedDoctor={selectedDoctor}
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmitDoctor={onSubmitDoctor}
                    onSubmitSlotBooking={handleBookingSubmit}
                />
            )}

            <DoctorSlotBookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setBookingModalOpen(false)}
                onSubmit={handleBookingSubmit}
                selectedDate={selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''}
                patients={patients}
                availableTimes={allDaySlots}
                selectedDoctorId={selectedDoctor ? selectedDoctor._id : ''}
                selectedBookingData={selectedBookingData}
            />

            {showScheduleModal && (
                <ScheduleAppointmentModal
                    isOpen={showScheduleModal}
                    initialData={scheduleAppointmentData}
                    doctors={doctors}
                    patients={patients}
                    //loading={false}
                    // onSubmit={handleCloseScheduleModal}
                    onClose={() => setShowScheduleModal(false)}
                    onSave={(appointment) => {

                        handleBooking(appointment);
                        setShowScheduleModal(false);
                    }
                    }

                />
            )}

        </div>
    );
};

export default ManageDoctors;
