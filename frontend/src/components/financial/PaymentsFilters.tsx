import { useEffect, useState } from "react";

interface Filters {
    professionalId?: string;
    patientId?: string;
    status?: string;
    from?: string;
    to?: string;
}

export function PaymentsFilters({ onChange }: { onChange: (filters: Filters) => void }) {
    const [filters, setFilters] = useState<Filters>({});

    useEffect(() => {
        onChange(filters);
    }, [filters]);

    return (
        <div className="flex gap-4 mb-4">
            <select onChange={(e) => setFilters(f => ({ ...f, professionalId: e.target.value }))}>
                <option value="">Todos Profissionais</option>
                {/* Mapear lista de profissionais */}
            </select>

            <input type="text" placeholder="Paciente" onChange={(e) => setFilters(f => ({ ...f, patientId: e.target.value }))} />

            <select onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}>
                <option value="">Todos</option>
                <option value="paid">Pago</option>
                <option value="pending">Pendente</option>
                <option value="canceled">Cancelado</option>
            </select>

            <input type="date" onChange={(e) => setFilters(f => ({ ...f, from: e.target.value }))} />
            <input type="date" onChange={(e) => setFilters(f => ({ ...f, to: e.target.value }))} />
        </div>
    );
}
