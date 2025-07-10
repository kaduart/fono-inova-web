import { PlusCircle, Save, UserX, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { IDoctor, ISession, THERAPY_TYPES, TherapyType } from '../../utils/types/types';
import { Button } from '../ui/Button';
import Input from '../ui/Input';
import InputCurrency from '../ui/InputCurrency';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/TextArea';

interface SessionModalProps {
    action: 'edit' | 'use';
    sessionData: ISession;
    doctors: IDoctor[];
    loading: boolean;
    onSubmit: () => void;
    onClose: () => void;
    onSessionDataChange: (data: ISession) => void;
}

// Mapeamento de status para português
const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pendente' },
    { value: 'completed', label: 'Concluída' },
    { value: 'canceled', label: 'Cancelada' },
    { value: 'scheduled', label: 'Agendada' }
];

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

    const validateForm = () => {
        if (!sessionData.date) {
            toast.error("Data é obrigatória!");
            return false;
        }
        if (!sessionData.doctorId) {
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
        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, 16);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 animate-fade-in">
                {/* Cabeçalho com gradiente e ícone */}
                <div className={`bg-gradient-to-r p-5 flex items-center ${action === 'edit' ? 'from-blue-600 to-indigo-600' : 'from-green-600 to-teal-600'}`}>
                    <div className="bg-white/20 p-2 rounded-full">
                        {action === 'edit' ? (
                            <Save className="w-6 h-6 text-white" />
                        ) : (
                            <PlusCircle className="w-6 h-6 text-white" />
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-white ml-3">
                        {title}
                    </h2>
                </div>

                {/* Corpo do formulário */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-5">
                        {/* Data */}
                        <div className="relative">
                            <Label className="block mb-2 font-medium text-gray-700 flex items-center">
                                <span className="text-red-500 mr-1">*</span>
                                Data
                            </Label>
                            <div className="relative">
                                <Input
                                    type="datetime-local"
                                    value={sessionData.date ? toLocalDateTimeString(sessionData.date) : ''}
                                    onChange={(e) => onSessionDataChange({ ...sessionData, date: e.target.value })}
                                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10 transition-all"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    📅
                                </span>
                            </div>
                        </div>

                        {/* Profissional */}
                        <div className="relative">
                            <Label className="block mb-2 font-medium text-gray-700 flex items-center">
                                <span className="text-red-500 mr-1">*</span>
                                Profissional
                            </Label>
                            <div className="relative">
                                <Select
                                    value={sessionData.doctorId || ''}
                                    onChange={(e) => onSessionDataChange({ ...sessionData, doctorId: e.target.value })}
                                    className="w-full h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10 appearance-none transition-all"
                                >
                                    <option value="">Selecione um profissional</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor._id} value={doctor._id}>
                                            {doctor.fullName}
                                        </option>
                                    ))}
                                </Select>
                                <span className="absolute left-3 top-3 text-gray-400">
                                    👨‍⚕️
                                </span>
                            </div>
                        </div>

                        {/* Tipo de Sessão e Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <Label className="block mb-2 font-medium text-gray-700">Tipo de Sessão</Label>
                                <div className="relative">
                                    <Select
                                        disabled={true}
                                        value={sessionData.sessionType || ''}
                                        onChange={(e) => onSessionDataChange({ ...sessionData, sessionType: e.target.value as TherapyType })}
                                        className="w-full h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10 transition-all"
                                    >
                                        <option value="">Selecione</option>
                                        {THERAPY_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </Select>
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        🧠
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <Label className="block mb-2 font-medium text-gray-700">Status</Label>
                                <div className="relative">
                                    <Select
                                        value={sessionData.status || 'pending'}
                                        onChange={(e) => onSessionDataChange({ ...sessionData, status: e.target.value })}
                                        className="w-full h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10 transition-all"
                                    >
                                        {STATUS_OPTIONS.map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </Select>
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        📊
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Valor e Pagamento */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <Label className="block mb-2 font-medium text-gray-700">Valor Pago (R$)</Label>
                                <div className="relative">
                                    <InputCurrency
                                        value={sessionData.paymentAmount || 0}
                                        onChange={(e) => onSessionDataChange({ ...sessionData, paymentAmount: Number(e.target.value) })}
                                        min="0"
                                        step="0.01"
                                        className="w-full h-12 border border-gray-300 rounded-lg pl-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    />
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        💰
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <Label className="block mb-2 font-medium text-gray-700">
                                    Método de Pagamento
                                </Label>
                                <div className="relative">
                                    <Select
                                        value={sessionData.paymentMethod || ''}
                                        onChange={(e) => onSessionDataChange({ ...sessionData, paymentMethod: e.target.value as typeof sessionData.paymentMethod })}
                                        className="w-full h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10 transition-all"
                                    >
                                        <option value="">Não registrado</option>
                                        <option value="dinheiro">Dinheiro</option>
                                        <option value="pix">PIX</option>
                                        <option value="cartão">Cartão</option>
                                    </Select>
                                    <span className="absolute left-3 top-3 text-gray-400">
                                        💳
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Falta Confirmada - Novo campo */}
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-2 transition-all">
                                <Label className="block mb-2 font-medium text-gray-700 flex items-center">
                                    <UserX className="w-5 h-5 text-red-600 mr-2" />
                                    Falta Confirmada
                                </Label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="confirmedAbsence"
                                            checked={sessionData.confirmedAbsence === true}
                                            onChange={() => onSessionDataChange({ 
                                                ...sessionData, 
                                                confirmedAbsence: true 
                                            })}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="ml-2 text-gray-700 flex items-center">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 mr-1" />
                                            Sim
                                        </span>
                                    </label>
                                    
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="confirmedAbsence"
                                            checked={sessionData.confirmedAbsence === false}
                                            onChange={() => onSessionDataChange({ 
                                                ...sessionData, 
                                                confirmedAbsence: false 
                                            })}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500"
                                        />
                                        <span className="ml-2 text-gray-700 flex items-center">
                                            <XCircle className="w-4 h-4 text-red-600 mr-1" />
                                            Não
                                        </span>
                                    </label>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Marque como "Sim" quando o paciente confirmou que não comparecerá à sessão
                                </p>
                            </div>

                        {/* Observações */}
                        <div className="relative mt-3">
                            <Label className="block mb-2 font-medium text-gray-700">
                                Observações
                            </Label>
                            <div className="relative">
                                <Textarea
                                    value={sessionData.notes || ''}
                                    onChange={(e) => onSessionDataChange({ ...sessionData, notes: e.target.value })}
                                    className="w-full min-h-[120px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10 pt-3 transition-all"
                                    placeholder="Detalhes relevantes sobre a sessão..."
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    📝
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rodapé com botões */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-200">
                    <Button
                        onClick={onClose}
                        className="px-5 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-5 py-3 text-white rounded-xl disabled:opacity-70 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto
                            ${action === 'edit' 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                                : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'}`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Processando...
                            </div>
                        ) : (
                            <>
                                {action === 'edit' ? <Save className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                                {submitText}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};