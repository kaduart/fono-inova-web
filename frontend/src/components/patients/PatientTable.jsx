import React, { useState } from 'react';

const PatientTable = ({ onViewDetails }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Dados fictícios para teste
    const patients = [
        {
            _id: '1',
            name: 'João Silva',
            phone: '11999999999',
            cpf: '12345678900',
            lastAppointment: { date: '2025-04-01' },
            nextAppointment: { date: '2025-05-01' },
        },
        {
            _id: '2',
            name: 'Maria Oliveira',
            phone: '11988888888',
            cpf: '98765432100',
            lastAppointment: { date: '2025-03-15' },
            nextAppointment: { date: '2025-04-15' },
        },
        {
            _id: '3',
            name: 'Carlos Souza',
            phone: '11977777777',
            cpf: '11122233344',
            lastAppointment: { date: '2025-02-20' },
            nextAppointment: { date: '2025-03-20' },
        },
    ];

    const filteredPatients = patients.filter((patient) => {
        const term = searchTerm.toLowerCase();
        return (
            (patient.name && patient.name.toLowerCase().includes(term)) ||
            (patient.phone && patient.phone.toLowerCase().includes(term)) ||
            (patient.cpf && patient.cpf.toLowerCase().includes(term))
        );
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nome, telefone ou CPF"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Última Consulta</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Próxima Consulta</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPatients.map((patient) => (
                            <tr key={patient._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium">{patient.name}</div>
                                    <div className="text-sm text-gray-500">{patient.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {patient.lastAppointment?.date || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {patient.nextAppointment?.date || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded"
                                        onClick={() => onViewDetails(patient)}
                                    >
                                        Ver Detalhes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientTable;
