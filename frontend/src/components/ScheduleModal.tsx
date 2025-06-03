import { TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_APPOINTMENT } from '../hooks/useTempAppointments';

type ScheduleModalProps = {
    initialData: Appointment | typeof DEFAULT_APPOINTMENT;
    patients: any[];
    doctors: any[];
    mode: 'create' | 'edit';
    onSave: (data: Appointment | Omit<Appointment, 'id'>) => void;
    onClose: () => void;
    open: boolean;
};

type Appointment = {
    patientId: string;
    doctorId: string;
    date: string;
    time: string;
    reason: string;
    status: 'agendado' | 'concluído' | 'cancelado';
};

const InputField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder?: string;
}> = ({ label, name, value, onChange, type, placeholder }) => (
    <div className="col-span-12 md:col-span-6">
        <label htmlFor={name} className="mb-1 font-medium">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full"
        />
    </div>
);

const SelectField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}> = ({ label, name, value, onChange, options }) => (
    <div className="col-span-12 md:col-span-6">
        <label htmlFor={name} className="mb-1 font-medium">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none w-full"
        >
            <option value="">Selecione uma opção</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const ScheduleModal: React.FC<ScheduleModalProps> = ({
    initialData,
    patients,
    doctors,
    mode,
    onSave,
    onClose,
    open,
}) => {
    const [formState, setFormState] = useState<Appointment>(initialData);

    useEffect(() => {
        setFormState(initialData);
    }, [initialData]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        []
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.patientId || !formState.doctorId || !formState.date || !formState.time || !formState.reason) {
            console.log('Todos os campos são obrigatórios');
            return;
        }
        onSave(formState);
        onClose();
    };

    if (!open) return null;

    const patientOptions = patients.map((patient) => ({ value: patient._id, label: patient.fullName }));
    const doctorOptions = doctors.map((doctor) => ({ value: doctor._id, label: doctor.fullName }));
    const statusOptions = [
        { value: 'agendado', label: 'Agendado' },
        { value: 'concluído', label: 'Concluído' },
        { value: 'cancelado', label: 'Cancelado' },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-[999]">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl min-w-[400px] z-[1000]">
                <h2 className="text-2xl font-bold mb-4">{mode === 'edit' ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="border p-4 rounded-md">
                        <legend className="px-2 font-medium text-gray-700">Dados Pessoais</legend>

                        <div className="grid grid-cols-12 gap-4">
                            <SelectField class="text-gray-900"
                                label="Selecione o paciente:"
                                name="patientId"
                                value={formState.patientId}
                                onChange={handleChange}
                                options={patientOptions}
                            />
                            <SelectField
                                label="Médico:"
                                name="doctorId"
                                value={formState.doctorId}
                                onChange={handleChange}
                                options={doctorOptions}
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-4">
                            <InputField
                                className="text-gray-900"
                                label="Data:"
                                name="date"
                                value={formState.date}
                                onChange={handleChange}
                                type="date"
                            />
                            <InputField
                                label="Hora:"
                                name="time"
                                value={formState.time}
                                onChange={handleChange}
                                type="time"
                            />
                        </div>

                        <SelectField
                            label="Status:"
                            name="status"
                            value={formState.status}
                            onChange={handleChange}
                            options={statusOptions}
                        />

                        <TextField
                            label="Motivo:"
                            name="reason"
                            value={formState.reason}
                            onChange={handleChange}
                            type="text"
                        />
                    </fieldset>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Fechar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleModal;
