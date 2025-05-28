import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import packageService, { CreatePackageParams } from '../../services/packageService';
import { DURATION_OPTIONS, FREQUENCY_OPTIONS, IDoctor, ITherapyPackage, PatientData, PAYMENT_TYPES, THERAPY_TYPES } from '../../utils/types';
import InputCurrency from '../ui/InputCurrency';
import { Select } from '../ui/Select';

type Props = {
    initialData: ITherapyPackage | null;
    patient: PatientData;
    doctors: IDoctor[];
    onClose: () => void;
    onSubmit: () => void;
};


const initialFormState = {
    professionalId: '',
    sessionType: '',
    totalSessions: 1,
    sessionValue: 0,
    paymentType: 'full',
    totalPaid: 0,
    paymentMethod: '',
    durationMonths: 0,
    sessionsPerWeek: 0,
};

export default function TherapyPackageFormModal({ initialData, patient, doctors, onClose, onSubmit }: Props) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [remainingBalance, setRemainingBalance] = useState(0);
    const [totalValuePackage, setTotalValuePackage] = useState(0);
    const [errors, setErrors] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };


    useEffect(() => {
        const newBalance = Math.max(
            (formData.sessionValue * formData.totalSessions) - formData.totalPaid
        );
        setRemainingBalance(newBalance)
        console.log('remainingBalance', remainingBalance)
    }, [formData.sessionValue, formData.totalPaid, formData.totalSessions]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log('Formulário de dados para salvar:', formData);
        if (!formData.sessionType || !formData.paymentType || !formData.professionalId) { // Adicionado professionalId
            toast.error('Preencha todos os campos obrigatórios (profissional, tipo de sessão, tipo de pagamento do pacote).');
            return;
        }

        // Validação adicional se um valor foi pago
        if ((formData.totalPaid || 0) > 0 && !formData.paymentMethod) {
            toast.error('Se um valor foi pago, selecione o método de pagamento.');
            return;
        }

        setLoading(true);
        try {
            const packageData = {
                patientId: patient._id,
                professional: formData.professionalId, // Corrigido para professional
                sessionType: formData.sessionType,
                /* sessionValue: formData.sessionValue || 0,
                totalSessions: formData.totalSessions || 0, */
                paymentType: formData.paymentType, // Tipo de pagamento do pacote
                amountPaid: formData.totalPaid || 0, // Enviar valor pago
                paymentMethod: formData.paymentMethod, // Enviar método de pagamento
                sessionsPerWeek: +formData.sessionsPerWeek, // Enviar método de pagamento
                durationMonths: formData.durationMonths, // Enviar método de pagamento
                date: null,
            };

            await packageService.createPackage(packageData as CreatePackageParams);

            onSubmit();
            onClose();
        } catch (err) {
            console.error('Erro ao salvar pacote:', err);
            toast.error('Erro ao salvar pacote.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('formData.durationMonths:', formData.durationMonths);
        console.log('formData.sessionsPerWeek:', formData.sessionsPerWeek);
        const sessionValue = formData.durationMonths > 3 ? 180 : 200;
        let totalSessions = 0;

        if (formData.durationMonths && formData.sessionsPerWeek) {
            totalSessions = formData.durationMonths * 4 * formData.sessionsPerWeek;
        }

        setFormData(prev => ({
            ...prev,
            sessionValue: sessionValue,
            totalSessions: totalSessions,
            totalPaid: formData.totalPaid || 0,
        }));
        setTotalValuePackage(totalSessions * sessionValue)

        /*   return {
           totalSessions,
           sessionValue
       }; */

    }, [formData.durationMonths, formData.sessionsPerWeek]);

    const validate = () => {
        const newErrors = {};
        if (formData.durationMonths < 1 || formData.durationMonths > 12) {
            newErrors.durationMonths = 'Duração inválida';
        }
        if (formData.sessionsPerWeek < 1 || formData.sessionsPerWeek > 5) {
            newErrors.sessionsPerWeek = 'Frequência inválida';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl space-y-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold border-b pb-2">
                    {initialData ? 'Editar Pacote' : 'Novo Pacote'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Coluna 1 */}
                    <div className="space-y-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium mb-1">Duração do Pacote</label>
                            <Select
                                name="durationMonths"
                                value={formData.durationMonths}
                                onChange={(e) => setFormData({ ...formData, durationMonths: Number(e.target.value) })}
                                className="w-full"
                            >
                                <option value="">Escolha duração do pacote</option>

                                {DURATION_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt} {opt > 1 ? 'meses' : 'mês'}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium mb-1">Sessões por Semana</label>
                            <Select
                                name="sessionsPerWeek"
                                value={+formData.sessionsPerWeek}
                                onChange={handleChange}
                                className="w-full"
                            >
                                <option value="">Escolha quantidade de vez na semana</option>

                                {FREQUENCY_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt} {opt > 1 ? 'vezes' : 'vez'} por semana
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium mb-1">Profissional</label>
                            <Select
                                name="professionalId"
                                value={formData.professionalId}
                                onChange={handleChange}
                                className="w-full"
                            >
                                <option value="">Escolha um profissional</option>
                                {doctors.map((doc) => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.fullName}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium mb-1">Tipo de Sessão</label>
                            <Select
                                name="sessionType"
                                value={formData.sessionType}
                                onChange={handleChange}
                                className="w-full"
                            >
                                <option value="">Escolha um tipo de terapia</option>
                                {THERAPY_TYPES.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* Coluna 2 */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                            {/* <div className="form-group">
                                <label className="block text-sm font-medium mb-1">Total de Sessões</label>
                                <Input
                                    name="totalSessions"
                                    value={formData.totalSessions}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full"
                                />
                            </div> */}

                            <div className="form-group">
                                <label className="block text-sm font-medium mb-1">Tipo de Pagamento</label>
                                <Select
                                    name="paymentType"
                                    value={formData.paymentType}
                                    onChange={handleChange}
                                    className="w-full"
                                >
                                    {PAYMENT_TYPES.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium mb-1">Valor por Sessão (R$)</label>
                                <InputCurrency disabled
                                    name="sessionValue"
                                    value={formData.sessionValue}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full"
                                />
                            </div>


                            <div className="form-group">
                                <label className="block text-sm font-medium mb-1">Valor Pago (R$)</label>
                                <InputCurrency
                                    name="totalPaid"
                                    value={formData.totalPaid}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full"
                                />
                            </div>

                            {(formData.totalPaid && formData.totalPaid > 0) && (
                                <div className="form-group">
                                    <label className="block text-sm font-medium mb-1">Método de Pagamento</label>
                                    <Select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full"
                                    >
                                        <option value="">Escolha um método</option>
                                        <option value="dinheiro">Dinheiro</option>
                                        <option value="pix">PIX</option>
                                        <option value="cartão">Cartão</option>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview e Saldo */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold mb-2">Pré-visualização</h3>
                        <div className="space-y-1">
                            <p className="text-sm">Valor por sessão: R$ {formData.sessionValue}</p>
                            <p className="text-sm">Total de sessões: {formData.totalSessions}</p>
                            <p className="text-sm font-semibold">Valor total: R$ {totalValuePackage}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium mb-1">Saldo Restante </label>
                        <p className="bg-red-100">
                            <b>
                                {remainingBalance}
                            </b>

                        </p>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        disabled={remainingBalance < 0}
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
