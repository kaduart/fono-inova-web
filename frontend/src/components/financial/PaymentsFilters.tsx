import { useEffect, useMemo, useState } from "react";
import { IDoctor } from "../../utils/types";

interface Filters {
    doctorId?: string;
    patientId?: string;
    status?: string;
    from?: string;
    to?: string;
}

interface PaymentsFiltersProps {
    doctors?: IDoctor[];
    payments: any[];
    onFilter: (filteredPayments: any[]) => void;
    initialFilters?: Filters;
}

export function PaymentsFilters({ doctors, payments, onFilter, initialFilters = {} }: PaymentsFiltersProps) {
    const [filters, setFilters] = useState<Filters>(initialFilters);

    // Aplica os filtros sempre que eles ou a lista de pagamentos mudar
    const filteredPayments = useMemo(() => {
        return payments.filter(payment => {
            // Filtro por profissional
            if (filters.doctorId && payment.doctor?._id !== filters.doctorId) {
                return false;
            }

            // Filtro por paciente (busca por ID ou nome)
            if (filters.patientId &&
                !payment.patient?._id.includes(filters.patientId) &&
                !payment.patient?.fullName.toLowerCase().includes(filters.patientId.toLowerCase())) {
                return false;
            }

            // Filtro por status
            if (filters.status) {
                // Verifica se o pagamento tem a propriedade 'paid' (booleano)
                if (payment.paid !== undefined) {
                    if (filters.status === 'paid' && !payment.paid) return false;
                    if (filters.status === 'pending' && payment.paid) return false;
                }
                // Caso tenha a propriedade 'status' (string)
                else if (payment.status !== filters.status) {
                    return false;
                }
            }

            // Filtro por data
            const paymentDate = new Date(payment.date || payment.createdAt).toISOString().split('T')[0];
            if (filters.from && paymentDate < filters.from) {
                return false;
            }
            if (filters.to && paymentDate > filters.to) {
                return false;
            }

            return true;
        });
    }, [payments, filters]);

    // Notifica o componente pai quando os filtros mudam
    useEffect(() => {
        onFilter(filteredPayments);
    }, [filteredPayments]);

    const handleFilterChange = (key: keyof Filters, value: string | undefined) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === "" ? undefined : value
        }));
    };

    const clearFilters = () => {
        setFilters({});
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            {/* Filtro por Profissional */}
            <div className="flex flex-col min-w-[200px]">
                <label className="text-sm font-medium text-gray-700 mb-1">Profissional</label>
                <select
                    className="p-2 border rounded"
                    value={filters.doctorId || ""}
                    onChange={(e) => handleFilterChange('doctorId', e.target.value)}
                >
                    <option value="">Todos Profissionais</option>
                    {doctors?.map(doctor => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.fullName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro por Paciente */}
            <div className="flex flex-col min-w-[200px]">
                <label className="text-sm font-medium text-gray-700 mb-1">Paciente</label>
                <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Nome ou ID"
                    value={filters.patientId || ""}
                    onChange={(e) => handleFilterChange('patientId', e.target.value)}
                />
            </div>

            {/* Filtro por Status */}
            <div className="flex flex-col min-w-[200px]">
                <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    className="p-2 border rounded"
                    value={filters.status || ""}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                    <option value="">Todos Status</option>
                    <option value="paid">Pago</option>
                    <option value="pending">Pendente</option>
                    <option value="canceled">Cancelado</option>
                </select>
            </div>

            {/* Filtro por Data */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Período</label>
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="p-2 border rounded"
                        value={filters.from || ""}
                        onChange={(e) => handleFilterChange('from', e.target.value)}
                    />
                    <span className="self-center">até</span>
                    <input
                        type="date"
                        className="p-2 border rounded"
                        value={filters.to || ""}
                        onChange={(e) => handleFilterChange('to', e.target.value)}
                    />
                </div>
            </div>

            {/* Contador de resultados */}
            <div className="flex items-center text-sm text-gray-600">
                {filteredPayments.length} de {payments.length} resultados
            </div>

            {/* Botão para limpar filtros */}
            <div className="flex items-end">
                <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    disabled={Object.keys(filters).length === 0}
                >
                    Limpar Filtros
                </button>
            </div>
        </div>
    );
}