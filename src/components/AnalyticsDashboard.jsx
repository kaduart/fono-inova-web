// src/components/AnalyticsDashboard.jsx
// Dashboard de Analytics integrado com GA4 Data API

import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/ga4DataApi';
import { retryFailedLeads } from '../services/crmAnalyticsApi';
import { 
  Users, 
  MousePointer, 
  TrendingUp, 
  Calendar,
  Smartphone,
  Globe,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Activity,
  Target,
  BarChart3,
  Eye,
  MousePointerClick,
  Percent,
  FileText
} from 'lucide-react';
import { getLandingPagesMetrics } from '../services/landingPageAnalytics';

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // overview, pages, events, conversions, landingpages
    
    // Landing Pages metrics
    const [lpMetrics, setLpMetrics] = useState(null);
    const [lpLoading, setLpLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [dashboardData, landingPagesData] = await Promise.all([
                getDashboardData(),
                getLandingPagesMetrics()
            ]);
            setData(dashboardData);
            setLpMetrics(landingPagesData);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Erro ao buscar dados:', err);
            setError('Não foi possível carregar os dados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        retryFailedLeads();
        
        // Atualizar a cada 5 minutos
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Formatar duração (segundos → min:seg)
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}m ${secs}s`;
    };

    // Calcular taxa de conversão
    const calculateConversionRate = (conversions, sessions) => {
        if (!sessions) return 0;
        return ((conversions / sessions) * 100).toFixed(2);
    };

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando dados do GA4...</p>
                </div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchData}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    const m = data?.metrics || {};
    const realtime = data?.realtime || {};

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            SiteAnalyticsDashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Dados do Google Analytics 4 - Clínica Fono Inova
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Indicador de usuários em tempo real */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium">
                                {realtime.activeUsers || 0} usuários online
                            </span>
                        </div>
                        
                        {lastUpdated && (
                            <span className="text-sm text-gray-500">
                                Atualizado: {lastUpdated.toLocaleTimeString()}
                            </span>
                        )}
                        <button 
                            onClick={fetchData}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Atualizar
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto mb-6">
                <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 inline-flex">
                    {[
                        { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                        { id: 'pages', label: 'Páginas', icon: Eye },
                        { id: 'landingpages', label: 'Landing Pages', icon: FileText },
                        { id: 'events', label: 'Eventos', icon: MousePointerClick },
                        { id: 'conversions', label: 'Conversões', icon: Target }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === tab.id 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* VISÃO GERAL */}
            {activeTab === 'overview' && (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Cards Principais - Métricas GA4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Sessões */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Sessões</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {m.sessions?.toLocaleString() || 0}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Últimos 30 dias</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Activity className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Usuários Ativos */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {m.activeUsers?.toLocaleString() || 0}
                                    </p>
                                    <p className="text-xs text-green-600 mt-1 flex items-center">
                                        <ArrowUpRight className="w-3 h-3 mr-1" />
                                        {m.newUsers?.toLocaleString() || 0} novos
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Page Views */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Page Views</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {m.pageViews?.toLocaleString() || 0}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Média: {m.sessions ? Math.round(m.pageViews / m.sessions) : 0} por sessão
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <Eye className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        {/* Taxa de Conversão */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {calculateConversionRate(m.conversions, m.sessions)}%
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {m.conversions || 0} conversões
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <Target className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Métricas Secundárias */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tempo Médio */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Tempo Médio na Página</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {formatDuration(m.avgSessionDuration)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bounce Rate */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Percent className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Taxa de Rejeição</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {m.bounceRate?.toFixed(1) || 0}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-red-500 h-2 rounded-full" 
                                    style={{ width: `${Math.min(m.bounceRate || 0, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Total de Eventos */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <MousePointer className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total de Eventos</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {m.eventCount?.toLocaleString() || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Fontes de Tráfego */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Fontes de Tráfego</h2>
                                <p className="text-sm text-gray-500">Sessions por origem (últimos 30 dias)</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Origem</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Médium</th>
                                            <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Sessões</th>
                                            <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Usuários</th>
                                            <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Conv.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {data?.sources?.slice(0, 10).map((source, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-3 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm font-medium text-gray-900 capitalize">
                                                            {source.source}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                        {source.medium}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-right text-sm text-gray-900">
                                                    {source.sessions?.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-6 text-right text-sm text-gray-600">
                                                    {source.users?.toLocaleString()}
                                                </td>
                                                <td className="py-3 px-6 text-right">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                        {source.conversions}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Resumo em Tempo Real */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
                                <h3 className="text-lg font-semibold mb-4">Em Tempo Real</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-100">Usuários Ativos</span>
                                        <span className="text-2xl font-bold">{realtime.activeUsers || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-100">Page Views (30min)</span>
                                        <span className="text-xl font-semibold">{realtime.pageViews || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-100">Eventos (30min)</span>
                                        <span className="text-xl font-semibold">{realtime.events || 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dica */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <h4 className="font-medium text-blue-900 mb-2">💡 Dica</h4>
                                <p className="text-sm text-blue-700">
                                    Acompanhe as conversões em tempo real na aba "Conversões". 
                                    Cada lead preenchido no site aparece automaticamente aqui.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PÁGINAS */}
            {activeTab === 'pages' && (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Performance por Página</h2>
                            <p className="text-sm text-gray-500">Últimos 30 dias</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Página</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Views</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Usuários</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Tempo Médio</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Bounce Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data?.pages?.map((page, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="py-3 px-6">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{page.title}</p>
                                                    <p className="text-xs text-gray-500">{page.path}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-right text-sm text-gray-900">
                                                {page.views?.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-6 text-right text-sm text-gray-600">
                                                {page.users?.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-6 text-right text-sm text-gray-600">
                                                {formatDuration(page.avgEngagementTime)}
                                            </td>
                                            <td className="py-3 px-6 text-right">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    page.bounceRate > 50 
                                                        ? 'bg-red-100 text-red-700' 
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {page.bounceRate?.toFixed(1)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* LANDING PAGES */}
            {activeTab === 'landingpages' && (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Cards de Métricas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total de Views</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {lpMetrics?.totalViews?.toLocaleString() || 0}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Eye className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total de Leads</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {lpMetrics?.totalLeads?.toLocaleString() || 0}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <Target className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {lpMetrics?.averageConversion || 0}%
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <Percent className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabela de LPs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Performance por Landing Page</h2>
                            <p className="text-sm text-gray-500">Dados do CRM-CLINICA</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Landing Page</th>
                                        <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-6">Categoria</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Views</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Leads</th>
                                        <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-6">Conversão</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {lpMetrics?.byLandingPage?.map((lp, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="py-3 px-6">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{lp.title}</p>
                                                    <p className="text-xs text-gray-500">/{lp.slug}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                                    {lp.category}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 text-right text-sm text-gray-900">
                                                {lp.views?.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-6 text-right text-sm text-gray-900">
                                                {lp.leads?.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-6 text-right">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    lp.conversionRate > 5 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {lp.conversionRate?.toFixed(2)}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* EVENTOS */}
            {activeTab === 'events' && (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Eventos Mais Comuns</h2>
                            <p className="text-sm text-gray-500">Últimos 7 dias</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {data?.events?.map((event, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-32 text-sm font-medium text-gray-600">
                                            {event.name}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                                    <div 
                                                        className="bg-blue-500 h-full rounded-full transition-all"
                                                        style={{ 
                                                            width: `${Math.min((event.count / (data.events[0]?.count || 1)) * 100, 100)}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 w-16 text-right">
                                                    {event.count?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CONVERSÕES */}
            {activeTab === 'conversions' && (
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Lista de Conversões */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Eventos de Conversão</h2>
                                <p className="text-sm text-gray-500">Últimos 30 dias</p>
                            </div>
                            <div className="p-6 space-y-4">
                                {data?.conversions?.map((conv, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{conv.eventName}</p>
                                            <p className="text-sm text-gray-500">
                                                Taxa: {calculateConversionRate(conv.conversions, m.sessions)}%
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-green-600">
                                                {conv.conversions}
                                            </p>
                                            <p className="text-xs text-gray-500">conversões</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Funnel de Conversão */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Funil de Conversão</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {/* Sessões */}
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Sessões</span>
                                            <span className="text-sm font-medium">{m.sessions?.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-blue-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>

                                    {/* Page Views */}
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Page Views</span>
                                            <span className="text-sm font-medium">{m.pageViews?.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-blue-400 h-3 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 text-xs text-gray-400">▼</div>
                                    </div>

                                    {/* Eventos */}
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Eventos</span>
                                            <span className="text-sm font-medium">{m.eventCount?.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-purple-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 text-xs text-gray-400">▼</div>
                                    </div>

                                    {/* Conversões */}
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Conversões</span>
                                            <span className="text-sm font-medium text-green-600">{m.conversions?.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${calculateConversionRate(m.conversions, m.sessions)}%` }}></div>
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 text-xs text-gray-400">▼</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Info */}
            <div className="max-w-7xl mx-auto mt-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-blue-900">Integração GA4 ↔ CRM-CLINICA</h4>
                            <p className="text-sm text-blue-700 mt-1">
                                Este dashboard é alimentado pelo Google Analytics 4. Quando um usuário converte 
                                (preenche o formulário), o lead é enviado para o CRM com o contexto completo 
                                (UTMs, página de origem, etc.) e aparece automaticamente nas estatísticas de conversão.
                            </p>
                            <p className="text-xs text-blue-600 mt-2">
                                Property ID: {GA4_PROPERTY_ID || 'Não configurado (usando dados de exemplo)'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
