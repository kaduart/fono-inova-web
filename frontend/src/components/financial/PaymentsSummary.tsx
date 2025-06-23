
interface PaymentPageProps {
    totalPayments: number;
    totalPending: number;
    paidCount: number;
    canceledCount: number;
}

export function PaymentsSummary({ totalPayments, totalPending, paidCount, unpaidCount }: PaymentPageProps) {

    return (
        <div className="flex gap-8 mb-4">
            <div className="bg-green-100 p-3 rounded">
                <p className="text-sm">Total Recebido</p>
                <p className="font-bold text-green-800">R$ {totalPayments}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded">
                <p className="text-sm">Total Pendente</p>
                <p className="font-bold text-yellow-800">R$ {totalPending}</p>
            </div>
        </div>
    );
}
