import { Eye, FileHeart } from "lucide-react";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientTable = ({ patients }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const navigate = useNavigate();

    const filteredPatients = patients.filter((patient) => {
        const term = searchTerm.toLowerCase();
        return (
            (patient.fullName && patient.fullName.toLowerCase().includes(term)) ||
            (patient.phone && patient.phone.toLowerCase().includes(term)) ||
            (patient.cpf && patient.cpf.toLowerCase().includes(term))
        );
    });

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
    };

    // Função para formatar as datas no formato brasileiro (DD/MM/YYYY)
    const formatDateBrazilian = (date) => {
        if (!date) return '-';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('pt-BR', options);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nome, telefone ou CPF"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full text-gray-500"
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
                        {paginatedPatients.map((patient) => (
                            <tr key={patient._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 font-medium">{patient.fullName || '-'}</div>
                                    <div className="text-sm text-gray-500">{patient.phone || '-'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 font-medium">
                                        {formatDateBrazilian(patient.lastAppointment?.date)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {patient.lastAppointment?.doctorId?.fullName ? patient.lastAppointment.doctorId.fullName : '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 font-medium">
                                        {formatDateBrazilian(patient.nextAppointment?.date)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {patient.nextAppointment?.doctorId.fullName ? patient.nextAppointment.doctorId.fullName : '-'}
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap bg-gray-50 text-left text-xs font-medium text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <Link to={`/patient-dashboard/${patient._id}`} title="Ver Detalhes">
                                            <Eye className="text-blue-600 hover:text-blue-800 cursor-pointer text-xl mx-2" />
                                        </Link>
                                        <Link to={`/evolutions/${patient._id}`} title="Ver Evoluções">
                                            <FileHeart className="text-green-600 hover:text-green-800 cursor-pointer text-xl mx-2" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {/* Paginação como linha extra */}
                        <tr>
                            <td colSpan={5} className="px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">Exibir:</span>
                                        <select
                                            value={itemsPerPage}
                                            onChange={handleItemsPerPageChange}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => handlePageChange('prev')}
                                            disabled={currentPage === 1}
                                            className="px-2 py-1 border border-gray-300 rounded text-gray-600 text-sm hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            Anterior
                                        </button>
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const page = index + 1;
                                            const isActive = currentPage === page;
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 rounded border text-sm transition-all duration-150 ${isActive
                                                        ? 'border-blue-500 text-blue-600 font-semibold bg-blue-50'
                                                        : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                        <button
                                            onClick={() => handlePageChange('next')}
                                            disabled={currentPage === totalPages}
                                            className="px-2 py-1 border border-gray-300 rounded text-gray-600 text-sm hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientTable;