
interface PaymentPageProps {
    totalPayments: number;
    totalPending: number;
    paidCount: number;
    canceledCount: number;
}

export function PaymentsSummary({ totalPayments, totalPending }: PaymentPageProps) {
    return (
        <div className="flex gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 w-48">
                <p className="text-gray-500 text-sm font-medium">Total Recebido</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">R$ {totalPayments.toFixed(2)}</p>
                <div className="w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-2"></div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 w-48">
                <p className="text-gray-500 text-sm font-medium">Total Pendente</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">R$ {totalPending.toFixed(2)}</p>
                <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-2"></div>
            </div>
        </div>
    );
}
