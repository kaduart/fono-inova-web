import { parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { FinancialRecord } from '../../services/paymentService';
import { dateFormat } from '../../utils/dateFormat';
import { PaymentMethods, ServiceTypes } from '../../utils/types';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import InputCurrency from '../ui/InputCurrency';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';

interface EditPaymentModalProps {
    payment: FinancialRecord;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        id: string;
        amount: number;
        date: string;
        status: string;
        paymentMethod: string;
    }) => Promise<void>;
}

export const EditPaymentModal = ({
    payment,
    isOpen,
    onClose,
    onSave
}: EditPaymentModalProps) => {
    const [formData, setFormData] = useState({
        amount: payment.amount,
        serviceType: payment.serviceType,
        date: payment.date || payment.createdAt,
        paymentMethod: payment.paymentMethod,
        status: '',
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData({
            amount: payment.amount,
            date: payment.date || payment.createdAt,
            paymentMethod: payment.paymentMethod,
            status: payment.status || '',
            serviceType: payment.serviceType || 'evaluation', // Default to 'evaluation' if not set
        });
    }, [payment]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const isoDate = parse(formData.date, 'dd/MM/yyyy', new Date()).toISOString();
            await onSave({
                ...payment,
                amount: formData.amount,
                date: isoDate,
                status: formData.status,
                paymentMethod: formData.paymentMethod,
                serviceType: formData.serviceType,
            });

            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Se for o campo de valor, manter o valor como string
        if (name === 'value') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (payment) {
            const formatted = dateFormat(payment.date || payment.createdAt);
            setFormData({
                amount: payment.amount,
                date: formatted,
                paymentMethod: payment.paymentMethod,
                status: payment.status || '',
                serviceType: payment.serviceType,
            });
        }
    }, []);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Editar Pagamento</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <Label>Tipo de Serviço *</Label>
                        <Select
                            name="serviceType"
                            className="w-full p-2 border rounded"
                            value={formData.serviceType}
                            onChange={handleChange}
                            required
                        >
                            {ServiceTypes.map(service => (
                                <option key={service.value} value={service.value}>
                                    {service.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Campo Valor */}
                    <div className="mb-4">
                        <Label>
                            Valor (R$)
                        </Label>
                        <InputCurrency
                            name="amount"
                            value={formData.amount}
                            onChange={(e) => handleChange(e)}
                            placeholder="R$ 0,00"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Campo Data */}
                    <div className="mb-4">
                        <Label>
                            Data
                        </Label>
                        <Input
                            mask='99/99/9999'
                            name="date"
                            value={formData.date} // Formata a data para YYYY-MM-DD
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Campo Método de Pagamento */}
                    <div className="mb-4">
                        <Label >
                            Método de Pagamento
                        </Label>
                        <Select
                            name="paymentMethod"
                            className="w-full p-2 border rounded"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            {PaymentMethods.map(method => (
                                <option key={method.value} value={method.value}>
                                    {method.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            disabled={isSaving}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
