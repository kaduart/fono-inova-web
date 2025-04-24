import { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import { Select } from '../ui/Select';

const AppointmentModal = ({ patient, isOpen, onClose }) => {
    if (!isOpen) return null;
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Modal isOpen={modalAberto} onRequestClose={() => setModalAberto(false)} className="p-6 bg-white rounded-md max-w-md mx-auto mt-20 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Novo Agendamento</h3>
                    <div className="space-y-3">
                        <Input name="profissional" placeholder="Profissional" value={agendamentoTemp.profissional} onChange={handleInputAgendamento} />
                        <Input type="date" name="data" value={agendamentoTemp.data} onChange={handleInputAgendamento} />
                        <Input type="time" name="hora" value={agendamentoTemp.hora} onChange={handleInputAgendamento} />
                        <Select name="tipoSessao" value={agendamentoTemp.tipoSessao} onChange={handleInputAgendamento}>
                            <option value="">Tipo de Sessão</option>
                            <option value="fonoaudiologia">Fonoaudiologia</option>
                            <option value="psicologia">Psicologia</option>
                            <option value="terapia_ocupacional">Terapia Ocupacional</option>
                            <option value="fisioterapia">Fisioterapia</option>
                        </Select>
                        <Select name="status" value={agendamentoTemp.status} onChange={handleInputAgendamento}>
                            <option value="agendado">Agendado</option>
                            <option value="concluído">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                        </Select>
                        <textarea name="motivo" placeholder="Motivo/Anotações" value={agendamentoTemp.motivo} onChange={handleInputAgendamento} className="w-full p-2 border rounded" rows={3} />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setModalAberto(false)}>Cancelar</Button>
                        <Button onClick={adicionarAgendamento}>Salvar</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AppointmentModal;