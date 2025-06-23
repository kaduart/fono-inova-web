import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IDoctor, IPatient, ScheduleAppointment } from '../../utils/types';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/TextArea';


const defaultForm: ScheduleAppointment = {
    doctorId: '',
    patientId: '',
    date: '',
    time: '',
    sessionType: 'fonoaudiologia',
    notes: '',
    paymentAmount: 0,
    paymentMethod: 'dinheiro',
    status: 'agendado',
};
type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (appointment: ScheduleAppointment) => void;
    doctors?: IDoctor[];
    patients?: IPatient[];
    initialData?: ScheduleAppointment;
};


const ScheduleAppointmentModal = ({ isOpen, onClose, onSave, initialData, doctors, patients }: Props) => {
    const [form, setForm] = useState<ScheduleAppointment>(defaultForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                date: initialData.date.split(' ')[0],
            });
        } else {
            setForm(defaultForm);
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="p-6 bg-white rounded-md max-w-md mx-auto mt-20 shadow-lg w-full outline-none z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center"
        >
            <h3 className="text-xl font-semibold mb-4">Novo Agendamento</h3>
            <div className="space-y-3">
                <Label htmlFor="professional">Doutor</Label>
                <Select name="professional" value={form.doctorId} onChange={handleChange}>
                    <option value="">Escolha o profissional</option>
                    {doctors?.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            Dr. {doctor.fullName} - {doctor.specialty}
                        </option>
                    ))}
                </Select>

                <Label htmlFor="patient">Paciente</Label>
                <Select name="patient" value={form.patientId} onChange={handleChange}>
                    <option value="">Escolha o profissional</option>
                    {patients?.map((patient) => (
                        <option key={patient._id} value={patient._id}>
                            {patient.fullName}
                        </option>
                    ))}
                </Select>


                <Input label="Data" type="date" name="Data" value={form.date} onChange={handleChange} />
                <Input label="Hora" type="time" name="time" value={form.time} onChange={handleChange} />
                <Label htmlFor="patient">Seleciona a Terapia</Label>
                <Select name="sessionType" value={form.sessionType} onChange={handleChange}>
                    <option value="">Tipo de Sessão</option>
                    <option value="fonoaudiologia">Fonoaudiologia</option>
                    <option value="psicologia">Psicologia</option>
                    <option value="terapia_ocupacional">Terapia Ocupacional</option>
                    <option value="fisioterapia">Fisioterapia</option>
                </Select>

                <Label htmlFor="patient">Status</Label>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="agendado">Agendado</option>
                    <option value="concluído">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                </Select>

                <Label htmlFor="patient">Motivo/Anotações</Label>
                <Textarea
                    name="notes"
                    placeholder="Motivo/Anotações"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                />
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Salvar</Button>
            </div>
        </Modal>
    );
};

export default ScheduleAppointmentModal;
