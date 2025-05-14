// src/components/financial/RegisterPaymentForm.tsx
import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import { createPayment } from '../../services/paymentService';
import { Professional, professionalService } from '../../services/professionalService';
import { PatientData } from '../../utils/types';

export function RegisterPaymentForm() {
    const [loadingPatients, setLoadingPatients] = useState(true);
    const [loadingProfessionals, setLoadingProfessionals] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [patients, setPatients] = useState<PatientData[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);

    const [formData, setFormData] = useState({
        sessionDate: '',
        patientId: '',
        professionalId: '',
        sessionType: '',
        value: '',
        status: 'pending',
        paymentMethod: 'Dinheiro',
        notes: '',
    });

    useEffect(() => {
        patientService
            .fetchAll()
            .then(data => setPatients(data))
            .catch(err => {
                console.error('Erro ao buscar pacientes:', err);
                setError(err.message);
            })
            .finally(() => setLoadingPatients(false));

        professionalService
            .fetchAll()
            .then(data => setProfessionals(data))
            .catch(err => {
                console.error('Erro ao buscar profissionais:', err);
                setError(err.message);
            })
            .finally(() => setLoadingProfessionals(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPayment({
                sessionDate: formData.sessionDate,
                patientId: formData.patientId,
                professionalId: formData.professionalId,
                sessionType: formData.sessionType,
                value: parseFloat(formData.value),
                status: formData.status,
                paymentMethod: formData.paymentMethod,
                notes: formData.notes,
            });
            alert('Pagamento registrado com sucesso!');
            setFormData({
                sessionDate: '',
                patientId: '',
                professionalId: '',
                sessionType: '',
                value: '',
                status: 'pending',
                paymentMethod: 'Dinheiro',
                notes: '',
            });
        } catch (err) {
            console.error(err);
            alert('Falha ao registrar pagamento.');
        }
    };

    if (error) {
        return <div className="text-red-600">Erro: {error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
            {/* Data da Sessão */}
            <div>
                <label className="block text-sm font-medium">Data da Sessão</label>
                <input
                    type="date"
                    name="sessionDate"
                    value={formData.sessionDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>

            {/* Paciente */}
            <div>
                <label className="block text-sm font-medium">Paciente</label>
                {loadingPatients ? (
                    <p>Carregando pacientes...</p>
                ) : (
                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded p-2"
                    >
                        <option value="">Selecione...</option>
                        {patients?.map(p => (
                            <option key={p._id} value={p._id}>
                                {p.fullName}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Profissional */}
            <div>
                <label className="block text-sm font-medium">Profissional</label>
                {loadingProfessionals ? (
                    <p>Carregando profissionais...</p>
                ) : (
                    <select
                        name="professionalId"
                        value={formData.professionalId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded p-2"
                    >
                        <option value="">Selecione...</option>
                        {professionals?.map(pr => (
                            <option key={pr._id} value={pr._id}>
                                {pr.fullName}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Tipo de Sessão */}
            <div>
                <label className="block text-sm font-medium">Tipo de Sessão</label>
                <input
                    type="text"
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Avaliação, Terapia"
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>

            {/* Valor */}
            <div>
                <label className="block text-sm font-medium">Valor (R$)</label>
                <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>

            {/* Status e Método */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                    >
                        <option value="pending">Pendente</option>
                        <option value="paid">Pago</option>
                        <option value="canceled">Cancelado</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium">Método</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                    >
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartão">Cartão</option>
                        <option value="Pix">Pix</option>
                    </select>
                </div>
            </div>

            {/* Observações */}
            <div>
                <label className="block text-sm font-medium">Observações</label>
                <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Ex: Pagamento dividido, desconto..."
                    className="mt-1 block w-full border rounded p-2"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Registrar Pagamento
            </button>
        </form>
    );
}
