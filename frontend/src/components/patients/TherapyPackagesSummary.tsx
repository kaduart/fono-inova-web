import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import packagesService from '../../services/packageService';
import { IDoctors, ISession, ITherapyPackage, PatientData } from '../../utils/types';
import TherapyPackageCard from './TherapyPackageCard';
import TherapyPackageDetails from './TherapyPackageDetails';
import TherapyPackageDetailsModal from './TherapyPackageDetailsModal';
import TherapyPackageManager from './TherapyPackageManager';

type TherapyPackagesSummaryProps = {
    patient: PatientData;
    doctors: IDoctors[];
};

export default function TherapyPackagesSummary({ patient, doctors }: TherapyPackagesSummaryProps) {
    const [packages, setPackages] = useState<ITherapyPackage[]>([]);
    const [showManager, setShowManager] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<ITherapyPackage | null>(null);
    const [editing, setEditing] = useState(false);

    // Carregar os pacotes na inicialização do componente
    useEffect(() => {
        fetchBasicPackages();
    }, []);

    // Função para buscar pacotes atualizados
    const fetchBasicPackages = async () => {
        try {
            // 1. Parâmetros padrão para evitar chamadas sem parâmetros obrigatórios
            const params = {
                page: 1,
                limit: 10,
                status: "active" // Exemplo: filtro padrão
            };

            // 2. Chamada à API com tratamento de erro implícito
            const res = await packagesService.listPackages(params);

            // 3. Debug detalhado para inspecionar a resposta
            console.log('Resposta completa da API:', res);
            console.log('Dados brutos da resposta:', res?.data);

            // 4. Extração de dados com destructuring e fallback
            const responseData = res?.data || {};
            const packageData = (
                Array.isArray(responseData)
                    ? responseData
                    : responseData.data || []
            ).filter(pkg => pkg); // Filtra entradas null/undefined

            // 5. Atualização otimizada do estado
            setPackages(packageData);

            // 6. Feedback condicional baseado nos dados
            packageData.length
                ? toast.success(`${packageData.length} pacotes carregados.`)
                : toast.warning('Nenhum pacote encontrado com esses filtros.');

        } catch (error) {
            // 7. Tratamento de erro detalhado
            console.error('Erro na requisição:', {
                error,
                message: error.response?.data?.message || 'Erro desconhecido'
            });

            toast.error(error.response?.data?.message || 'Falha na conexão');
            setPackages([]); // Estado claro em caso de falha
        }
    };

    // Atualiza o pacote com a nova sessão
    const updatePackageSession = (id: string, session: ISession) => {
        setPackages(prevPackages =>
            prevPackages.map(pkg =>
                pkg._id === id
                    ? {
                        ...pkg,
                        sessions: [...pkg.sessions, session],
                        sessionsDone: pkg.sessions.length + 1,
                    }
                    : pkg
            )
        );
    };

    // Função para adicionar uma nova sessão ao pacote
    /*   const handleAddSession = async (id: string, session: ISession) => {
          try {
              await packagesService.createSession(id, session);
              updatePackageSession(id, session);
              toast.success('Sessão adicionada com sucessooo!');
          } catch (err) {
              console.error('Erro ao adicionar sessão:', err);
              toast.error('Erro ao adicionar sessão.');
          }
      }; */

    // Função para registrar o uso de uma sessão
    const handleUseSession = async (id: string, sessionData: ISession) => {
        try {
            // Extrair campos específicos do sessionData
            const { _id, paymentAmount, paymentMethod, ...sessionParams } = sessionData;

            // Construir payload correto
            const payload = {
                sessionId: _id, // Envia _id como sessionId quando for atualização
                paymentAmount: Number(paymentAmount) || 0,
                paymentMethod: paymentMethod || null,
                ...sessionParams
            };

            // Chamada ao serviço
            const updatedSession = await packagesService.useSession(id, payload);

            // Atualização otimizada do estado
            setPackages(prev => prev.map(pkg => {
                if (pkg._id !== id) return pkg;

                return {
                    ...pkg,
                    sessions: _id
                        ? pkg.sessions.map(s => s._id === _id ? updatedSession : s) // Atualiza
                        : [...pkg.sessions, updatedSession], // Adiciona nova
                    sessionsDone: updatedSession.isPaid
                        ? pkg.sessionsDone + 1
                        : pkg.sessionsDone
                };
            }));

            toast.success(_id ? "Sessão atualizada!" : "Sessão criada!");
            fetchBasicPackages();

        } catch (err) {
            console.error('Erro:', err);
            toast.error(`Falha ao ${sessionData._id ? 'atualizar' : 'criar'} sessão`);
        }
    };

    // Função para registrar pagamento de pacote
    const handleRegisterPayment = (id: string) => {
        setSelectedPackage(prev =>
            prev && prev._id === id
                ? {
                    ...prev,
                    payments: [
                        ...prev.payments,
                        {
                            amount: 0,
                            date: new Date().toISOString(),
                            coveredSessions: [null],
                            paymentMethod: 'dinheiro',
                            notes: '',
                            _id: `payment-${Date.now()}`
                        },
                    ],
                }
                : prev
        );
    };

    // Função para adicionar um novo pacote
    const handleAddPackage = () => {
        fetchBasicPackages();
        setShowManager(false);
    };

    // Função para atualizar um pacote após edição
    const handleUpdatePackage = (updated: ITherapyPackage) => {
        setSelectedPackage(updated);
        fetchBasicPackages();
    };

    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages.map(pkg => (
                    <TherapyPackageCard
                        key={pkg._id}
                        pack={pkg}
                        patient={patient}
                        doctors={doctors}
                        onUseSession={handleUseSession}
                        // onAddSession={handleAddSession}
                        onRegisterPayment={handleRegisterPayment}
                        onCardClick={() => setSelectedPackage(pkg)}
                    />
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => setShowManager(true)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Adiconar Pacote
                </button>

                {selectedPackage && !editing && (
                    <TherapyPackageDetails
                        pack={selectedPackage}
                        onClose={() => setSelectedPackage(null)}
                        onEdit={() => setEditing(true)}
                    />
                )}
            </div>

            {showManager && (
                <TherapyPackageManager
                    onClose={() => setShowManager(false)}
                    onSave={handleAddPackage}
                    packages={packages}
                    onRefresh={fetchBasicPackages}
                    doctors={doctors}
                    patient={patient}
                />
            )}

            {selectedPackage && editing && (
                <TherapyPackageDetailsModal
                    pack={selectedPackage}
                    onClose={() => setEditing(false)}
                    onUpdate={(updated) => {
                        handleUpdatePackage(updated);
                        setEditing(false);
                        setSelectedPackage(null);
                    }}
                />
            )}
        </div>
    );
}
