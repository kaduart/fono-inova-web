interface AppointmentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) return null;

    function getStatusClass(status: string) {
        switch (status) {
            case 'agendado':
                return 'bg-yellow-100 text-yellow-800';
            case 'concluído':
                return 'bg-green-100 text-green-800';
            case 'cancelado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }



    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold text-blue-600">Detalhes do Agendamento</h2>
                    <p className="text-sm text-gray-500">Informações completas da consulta</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Paciente</label>
                            <input
                                type="text"
                                disabled
                                value={event.patient}
                                className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                            />

                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Doutor</label>
                            <input
                                type="text"
                                disabled
                                value={event.doctor}
                                className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                            />

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
                            <input
                                type="text"
                                disabled
                                value={event.start}
                                className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 cursor-not-allowed"
                            />
                        </div>

                        <div className="text-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <div
                                className={`inline-block px-3 py-2 rounded-md text-sm font-semibold ${getStatusClass(event.status)}`}
                            >
                                {event.status}
                            </div>
                        </div>

                    </div>

                    <hr className="my-2 border-gray-200" />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Motivo</label>
                        <textarea
                            disabled
                            value={event.reason}
                            rows={3}
                            className="w-full bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 resize-none cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        className="text-sm text-blue-600 hover:underline"
                    // futuro: onClick={() => router.push(`/appointments/${event.id}`)}
                    >
                        Ver mais detalhes
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>


    );
};

export default AppointmentDetailModal;
