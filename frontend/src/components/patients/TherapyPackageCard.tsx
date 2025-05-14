import { CheckCircle, Clock, PlusCircle, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IDoctors, ISession, ITherapyPackage, PatientData, THERAPY_TYPES, TherapyType } from '../../utils/types';

type Props = {
  pack?: ITherapyPackage;
  patient: PatientData;
  doctors: IDoctors[];
  onUseSession: (id: string, session: ISession) => void;
  // onAddSession: (id: string, session: ISession) => void;
  onCardClick?: (pack: ITherapyPackage) => void;
};

export default function TherapyPackageCard({
  pack,
  patient,
  doctors,
  onUseSession,
  //onAddSession,
  onCardClick = () => { },
}: Props) {
  if (!pack) return null;

  // Estados e cálculos
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState(false);
  const [isUseSessionModalOpen, setIsUseSessionModalOpen] = useState(false);
  const [sessionData, setSessionData] = useState<ISession>({
    date: new Date().toISOString(),
    professional: '',
    sessionType: 'fonoaudiologia',
    paymentAmount: 0,
    paymentMethod: null
  });
  console.log("pacote:", pack);

  const [loading, setLoading] = useState(false);
  // Estilos mantidos com ajuste de status
  const statusStyle = pack.status === 'ativo'
    ? 'bg-green-100 text-green-800'
    : 'bg-amber-100 text-amber-800';

  const handleUseSession = async () => {
    if (!sessionData.professional) {
      toast.error("Selecione um profissional!");
      return;
    }

    setLoading(true);
    try {
      // Se sessionData._id existe: atualiza sessão existente
      // Se não existe: cria nova sessão
      await onUseSession(pack._id, {
        ...sessionData,
        isPaid: sessionData.paymentMethod !== null,
      });

      // Fechar modal e resetar dados
      setIsUseSessionModalOpen(false);
      setSessionData({
        _id: '',
        date: new Date().toISOString(),
        professional: '',
        sessionType: 'fonoaudiologia',
        notes: '',
        isPaid: false,
        paymentMethod: null,
      });

      toast.success(sessionData._id ? "Sessão atualizada!" : "Sessão criada!");
    } catch (err) {
      console.error("Erro:", err);
      toast.error("Erro ao salvar sessão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition-all duration-300">
      <div
        onClick={() => onCardClick(pack)}
        className="cursor-pointer bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        {/* Cabeçalho mantido com novo campo de status */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="font-semibold text-gray-800">{patient.fullName}</span>
          </div>
          <div className={`px-2 py-1 text-xs rounded-full ${statusStyle}`}>
            {pack.status.toUpperCase()}
          </div>
        </div>

        {/* Título e métricas principais */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{pack.sessionType}</h3>

        {/* Grid de métricas mantido */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div>
            <span className="font-medium">{pack.sessionsDone}</span> de{' '}
            <span className="font-medium">{pack.totalSessions}</span> sessões
          </div>
          <div>
            Restam <span className="font-medium">{pack.remaining}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Última: 0000</span>
          </div>
          <div>
            Pacote: <span className="font-medium">R$ {pack.totalValue ? pack.totalValue.toFixed(2) : '-'}</span>
          </div>
        </div>

        {/* Tabela de detalhes financeiros */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700 font-medium">Valor por Sessão</td>
                <td className="px-4 py-2 text-sm text-gray-900">R$ {pack.sessionValue.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700 font-medium">Total Pago</td>
                <td className="px-4 py-2 text-sm text-green-500">R$ {pack.totalPaid.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700 font-medium">Saldo Restante</td>
                <td className="px-4 py-2 text-sm text-red-500">R$ {pack.balance ? pack.balance.toFixed(2) : '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Listagem de sessões e pagamentos (estilo mantido) */}
      <details className="mt-4">
        <summary className="cursor-pointer text-blue-600 hover:underline font-medium">
          Ver sessões ({pack.sessions.length})
        </summary>
        <ul className="mt-2 text-sm text-gray-600 space-y-2">
          {pack.sessions.map((session) => (
            <li
              key={session._id}
              onClick={() => {
                // Preenche o modal com dados da sessão selecionada
                setSessionData({
                  ...session,
                  isPaid: session.paymentMethod !== null
                });
                setIsUseSessionModalOpen(true);
              }}
              className={`flex justify-between items-center p-2 rounded cursor-pointer 
               ${session.status === 'pending' ? 'bg-yellow-50 hover:bg-yellow-100' : 'bg-green-50'}`}
            >
              <div>
                <strong>{new Date(session.date).toLocaleDateString()}</strong>
                <span className="ml-2 text-gray-500">{session._id}</span>
              </div>
              {session.status === 'pending' ? (
                <span className="text-sm text-yellow-600">Pendente</span>
              ) : (
                <CheckCircle className="text-green-600 shrink-0" />
              )}
            </li>

          ))}
        </ul>
      </details>

      {/* Botões de ação com estilo original */}
      <div className="flex gap-3 mt-6">
        {/*  <button
          onClick={(e) => {
            e.stopPropagation();
            setIsUseSessionModalOpen(true);
          }}
          disabled={pack?.remaining <= 0}
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> Registrar Sessão
        </button> */}
      </div>

      {/* Modais com estilo consistente */}
      {isUseSessionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Registrar Sessão</h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  value={sessionData.date.split('T')[0]}
                  onChange={(e) => setSessionData(prev => ({
                    ...prev,
                    date: new Date(e.target.value).toISOString()
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissional</label>
                <select
                  value={sessionData.professional}
                  onChange={(e) => setSessionData(prev => ({
                    ...prev,
                    professional: e.target.value
                  }))}
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
                  onChange={(e) => setSessionData(prev => ({
                    ...prev,
                    sessionType: e.target.value as TherapyType
                  }))}
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
                <input
                  type="number"
                  value={sessionData.paymentAmount || ''}
                  onChange={(e) => setSessionData(prev => ({
                    ...prev,
                    paymentAmount: Number(e.target.value)
                  }))}
                  className="w-full p-2 border rounded-lg"
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
                  onChange={(e) => setSessionData(prev => ({
                    ...prev,
                    paymentMethod: e.target.value as typeof sessionData.paymentMethod
                  }))}
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
                  value={sessionData.notes}
                  onChange={(e) => setSessionData(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsUseSessionModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUseSession}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin">🌀</span>
                ) : (
                  <PlusCircle className="w-5 h-5" />
                )}
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}