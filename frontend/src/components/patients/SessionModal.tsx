// Crie um novo componente SessionModal.tsx
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { IDoctor, ISession, THERAPY_TYPES, TherapyType } from '../../utils/types';
import InputCurrency from '../ui/InputCurrency';


interface SessionModalProps {
    action: 'edit' | 'use';
    sessionData: ISession;
    doctors: IDoctor[];
    loading: boolean;
    onSubmit: () => void;
    onClose: () => void;
    onSessionDataChange: (data: ISession) => void;
}

export const SessionModal = ({
    action,
    sessionData,
    doctors,
    loading,
    onSubmit,
    onClose,
    onSessionDataChange
}: SessionModalProps) => {
    const title = action === 'edit' ? 'Editar Sessão' : 'Registrar Uso';
    const submitText = action === 'edit' ? 'Salvar Alterações' : 'Registrar Uso';
    console.log('sessionData:', sessionData);

    const validateForm = () => {
        if (!sessionData.date) {
            toast.error("Data é obrigatória!");
            return false;
        }
        if (!sessionData.professional) {
            toast.error("Profissional é obrigatório!");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        onSubmit();
    };

    const toLocalDateTimeString = (dateUTC) => {
        const date = new Date(dateUTC);
        const offset = date.getTimezoneOffset() * 60000; // Offset em milissegundos
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, 16);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                    {title}
                </h4>
               
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                        <input
                            type="datetime-local"
                            value={sessionData.date ? toLocalDateTimeString(sessionData.date) : ''}
                            onChange={(e) => onSessionDataChange({
                                ...sessionData,
                                date: new Date(e.target.value).toISOString() // Salva em UTC
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profissional</label>
                        <select
                            value={sessionData.professional}
                            onChange={(e) => onSessionDataChange({
                                ...sessionData,
                                professional: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecione um profissional</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Sessão</label>
                        <select
                            value={sessionData.sessionType}
                            onChange={(e) => onSessionDataChange({
                                ...sessionData,
                                sessionType: e.target.value as TherapyType
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            {THERAPY_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Valor Pago (R$)
                        </label>

                        <InputCurrency
                            value={sessionData.paymentAmount || 0}
                            onChange={(e) => onSessionDataChange({
                                ...sessionData,
                                paymentAmount: Number(e.target.value)
                            })}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Método de Pagamento
                            <span className="text-gray-500 ml-1">(opcional)</span>
                        </label>
                        <select
                            value={sessionData.paymentMethod || ''}
                            onChange={(e) => onSessionDataChange({
                                ...sessionData,
                                paymentMethod: e.target.value as typeof sessionData.paymentMethod
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Não registrado</option>
                            <option value="dinheiro">Dinheiro</option>
                            <option value="pix">PIX</option>
                            <option value="cartão">Cartão</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Observações
                            <span className="text-gray-500 ml-1">(opcional)</span>
                        </label>
                        <textarea
                            value={sessionData.notes || ''}
                            onChange={(e) => onSessionDataChange({
                                ...sessionData,
                                notes: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <span className="animate-spin">🌀</span>
                        ) : (
                            <PlusCircle className="w-5 h-5" />
                        )}
                        {submitText}
                    </button>
                </div>
            </div>
        </div>
    );
};