import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // ou outra lib de roteamento
import Input from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { BASE_URL } from '../../constants/constants';

interface PatientData {
    fullName: string;
    dateOfBirth: string;
    appointments: string[];
    // … demais campos que você precisa
}

const PatientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();    // pega /patients/:id
    const [patientData, setPatientData] = useState<PatientData>({
        fullName: '',
        dateOfBirth: '',
    });
    const [appointments, setAppointments] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_URL}/patients/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Falha ao carregar dados');
                return res.json();
            })
            .then((data: PatientData) => {
                setPatientData({
                    fullName: data.fullName,
                    dateOfBirth: data.dateOfBirth.slice(0, 10), // formata YYYY-MM-DD
                    // copie também os outros campos que quiser exibir
                });

                if (data.appointments && data.appointments.length > 0) {
                    Promise.all(
                        data.appointments.map((id: string) =>
                            fetch(`${BASE_URL}/appointments/${id}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                },
                            }).then((res) => res.json())
                        )
                    )
                        .then(setAppointments)
                        .catch((err) => console.error('Erro ao buscar agendamentos', err));
                }

            })
            .catch((err) => {
                console.error(err);
                // opcional: exibir toast de erro
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="nomeCompleto">Nome Completo</Label>
                <Input
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={patientData.fullName}
                    disabled
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={patientData.dateOfBirth}
                    disabled
                />
            </div>
            <div className="col-span-2 mt-6">
                <h2 className="text-xl font-semibold mb-2">Agendamentos</h2>
                {appointments.length > 0 ? (
                    <ul className="space-y-2">
                        {appointments.map((appt, idx) => (
                            <li key={idx} className="border p-3 rounded shadow-sm">
                                <p><strong>Data:</strong> {new Date(appt.date).toLocaleString()}</p>
                                <p><strong>Tipo:</strong> {appt.type}</p>
                                <p><strong>Status:</strong> {appt.status}</p>
                                <p><strong>Observações:</strong> {appt.notes || '—'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum agendamento encontrado.</p>
                )}
            </div>

        </div>

    );

};

export default PatientDetails;
