import { useEffect, useState } from "react";
import { getReport } from "../../services/paymentService";

export function PaymentsSummary({ filters }) {
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        getReport(filters).then(res => setSummary(res.data));
    }, [filters]);

    const totalByStatus = (status: string) =>
        summary.find(s => s._id === status)?.total.toFixed(2) || '0.00';

    return (
        <div className="flex gap-8 mb-4">
            <div className="bg-green-100 p-3 rounded">
                <p className="text-sm">Total Recebido</p>
                <p className="font-bold text-green-800">R$ {totalByStatus('paid')}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded">
                <p className="text-sm">Total Pendente</p>
                <p className="font-bold text-yellow-800">R$ {totalByStatus('pending')}</p>
            </div>
        </div>
    );
}
