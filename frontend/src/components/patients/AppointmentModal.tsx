import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import { Select } from '../ui/Select';

type Appointment = {
    profissional: string;
    data: string;
    hora: string;
    tipoSessao: string;
    status: string;
    motivo: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (appointment: Appointment) => void;
    initialData?: Appointment;
};

const defaultForm: Appointment = {
    profissional: '',
    data: '',
    hora: '',
    tipoSessao: '',
    status: 'agendado',
    motivo: '',
};

const AppointmentModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const [form, setForm] = useState<Appointment>(defaultForm);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
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
            className="p-6 bg-white rounded-md max-w-md mx-auto mt-20 shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h3 className="text-xl font-semibold mb-4">Novo Agendamento</h3>
            <div className="space-y-3">
                <Input name="profissional" placeholder="Profissional" value={form.profissional} onChange={handleChange} />
                <Input type="date" name="data" value={form.data} onChange={handleChange} />
                <Input type="time" name="hora" value={form.hora} onChange={handleChange} />
                <Select name="tipoSessao" value={form.tipoSessao} onChange={handleChange}>
                    <option value="">Tipo de Sessão</option>
                    <option value="fonoaudiologia">Fonoaudiologia</option>
                    <option value="psicologia">Psicologia</option>
                    <option value="terapia_ocupacional">Terapia Ocupacional</option>
                    <option value="fisioterapia">Fisioterapia</option>
                </Select>
                <Select name="status" value={form.status} onChange={handleChange}>
                    <option value="agendado">Agendado</option>
                    <option value="concluído">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                </Select>
                <textarea
                    name="motivo"
                    placeholder="Motivo/Anotações"
                    value={form.motivo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
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

export default AppointmentModal;
