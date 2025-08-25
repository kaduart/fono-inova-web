// src/components/AnalyticsDashboard.jsx
import { useEffect, useState } from 'react';
import { getAnalyticsData } from '../services/analyticsApi';

const AnalyticsDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const analyticsData = await getAnalyticsData();
                setData(analyticsData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard de Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total de Eventos</h2>
                    <p className="text-3xl font-bold">{data.totalEvents}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Taxa de Conversão</h2>
                    <p className="text-3xl font-bold">{(data.conversionRate * 100).toFixed(1)}%</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Eventos Hoje</h2>
                    <p className="text-3xl font-bold">{data.todayEvents}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Eventos Recentes</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Data/Hora</th>
                            <th className="text-left">Categoria</th>
                            <th className="text-left">Ação</th>
                            <th className="text-left">Rótulo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recentEvents.map((event, index) => (
                            <tr key={index}>
                                <td>{new Date(event.timestamp).toLocaleString()}</td>
                                <td>{event.category}</td>
                                <td>{event.action}</td>
                                <td>{event.label}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;