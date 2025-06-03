// services/paymentService.js
export const handleSessionPayment = ({ pkg, amount, paymentMethod }) => {
    if (!['fonoaudiologia', 'terapeuta ocupacional', 'psicologia', 'fisioterapia'].includes(pkg.type)) {
        throw new Error('Tipo de terapia inválido para pagamento');
    }
    
    const totalPaid = pkg.payments.reduce((sum, p) => sum + p.amount, 0);
    const packageValue = pkg.totalSessions * amount;
    const isFullyPaid = totalPaid >= packageValue;

    // Se for per-session ou partial, ou se for full mas ainda não pago totalmente
    if (pkg.paymentType !== 'full' || !isFullyPaid) {
        const newPayment = {
            amount,
            date: new Date(),
            paymentMethod,
            status: pkg.paymentType === 'per-session' ? 'pago' : 'pendente',
        };
        pkg.payments.push(newPayment);
    }

    return pkg;
};
