import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import packageService, { CreatePackageParams } from '../../services/packageService';
import { IDoctor, ITherapyPackage, PatientData, PAYMENT_TYPES, THERAPY_TYPES } from '../../utils/types';
import Input from '../ui/Input';
import InputCurrency from '../ui/InputCurrency';
import { Select } from '../ui/Select';

type Props = {
    initialData: ITherapyPackage | null;
    patient: PatientData;
    doctors: IDoctor[];
    onClose: () => void;
    onSubmit: () => void;
};

export default function TherapyPackageFormModal({ initialData, patient, doctors, onClose, onSubmit }: Props) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<ITherapyPackage & { paymentMethod?: string }>>({
        sessionType: 'fonoaudiologia',
        paymentType: 'partial', // Tipo de pagamento do pacote (ex: se o pacote é pago integralmente, por sessão, etc.)
        totalSessions: 1,
        sessionValue: 0,
        amountPaid: 0,
        professionalId: '',    // Valor pago no momento da criação
        paymentMethod: 'dinheiro', // Método de pagamento para o valor inicial
    });

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };


    const calculateTotalValue = () => {
        return (formData.totalSessions ?? 0) * (formData.sessionValue ?? 0);
    };

    const calculateRemainingBalance = () => {
        return calculateTotalValue() - (formData.amountPaid || 0);
    };

    const handleSave = async () => {
        console.log('Formulário de dados para salvar:', formData);
        if (!formData.sessionType || !formData.paymentType || !formData.professionalId) { // Adicionado professionalId
            toast.error('Preencha todos os campos obrigatórios (profissional, tipo de sessão, tipo de pagamento do pacote).');
            return;
        }

        // Validação adicional se um valor foi pago
        if ((formData.amountPaid || 0) > 0 && !formData.paymentMethod) {
            toast.error('Se um valor foi pago, selecione o método de pagamento.');
            return;
        }

        setLoading(true);

        try {
            const packageData = {
                patientId: patient._id,
                professional: formData.professionalId, // Corrigido para professional
                sessionType: formData.sessionType,
                totalSessions: formData.totalSessions || 0,
                sessionValue: formData.sessionValue || 0,
                paymentType: formData.paymentType, // Tipo de pagamento do pacote
                amountPaid: formData.amountPaid || 0, // Enviar valor pago
                paymentMethod: formData.paymentMethod, // Enviar método de pagamento
            };

            await packageService.createPackage(packageData as CreatePackageParams);

            toast.success('Pacote salvo com sucesso!');
            onSubmit();
            onClose();
        } catch (err) {
            console.error('Erro ao salvar pacote:', err);
            toast.error('Erro ao salvar pacote.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-md space-y-4">
                <h2 className="text-xl font-semibold">{initialData ? 'Editar Pacote' : 'Novo Pacote'}</h2>

                {/* Profissional */}
                <div>
                    <label className="block text-sm font-medium">Profissional</label>
                    <Select name="professionalId" value={formData.professionalId} onChange={handleChange}>
                        <option value="">Escolha um profissional</option>
                        {doctors.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                                {doc.fullName}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Tipo de Sessão</label>
                    <Select name="sessionType" value={formData.sessionType} onChange={handleChange}>
                        <option value="">Escolha um tipo de terapia</option>
                        {THERAPY_TYPES.map((option) => (

                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Total de Sessões */}
                <div>
                    <label className="block text-sm font-medium">Total de Sessões</label>
                    <Input
                        name="totalSessions"
                        value={formData.totalSessions}
                        onChange={handleChange}
                        min="1"
                    />
                </div>

                {/* Valor da Sessão */}
                <div>
                    <label className="block text-sm font-medium">Valor por Sessão (R$)</label>
                    <InputCurrency
                        name="sessionValue"
                        value={formData.sessionValue}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Tipo de Pagamento */}
                <div>
                    <label className="block text-sm font-medium">Tipo de Pagamento</label>
                    <Select name="paymentType" value={formData.paymentType} onChange={handleChange}>
                        {PAYMENT_TYPES.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </div>

                {
                    (formData.amountPaid && formData.amountPaid > 0) && (
                        <div>
                            <label className="block text-sm font-medium">Método de Pagamento (Valor Inicial)</label>
                            <Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="">Escolha um método</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="pix">PIX</option>
                                <option value="cartão">Cartão</option>
                            </Select>
                        </div>
                    )
                }
                {/* Valor Pago */}
                <div>
                    <label className="block text-sm font-medium">Valor Pago (R$)</label>
                    <InputCurrency
                        name="amountPaid"
                        value={formData.amountPaid}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Saldo Restante */}
                <div>
                    <label className="block text-sm font-medium">Saldo Restante (R$)</label>
                    <InputCurrency
                        value={calculateRemainingBalance().toFixed(2)}
                        disabled
                        className="bg-gray-100"
                    />
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
