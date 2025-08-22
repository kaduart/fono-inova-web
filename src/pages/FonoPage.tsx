import {
    CheckCircle,
    People,
    Schedule,
    TrendingUp,
    Warning
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    ClickAwayListener,
    Container,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useCallback, useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

// Registrar componentes do ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Tipos TypeScript
interface ClickData {
    element: string;
    count: number;
    timestamp: number;
}

interface AnalyticsData {
    totalClicks: number;
    uniqueVisitors: number;
    averageTime: number;
    clickData: ClickData[];
}

interface FonoPageProps {
    // Adicione props específicas se necessário
}

const FonoPage: React.FC<FonoPageProps> = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [analytics, setAnalytics] = useState < AnalyticsData > ({
        totalClicks: 0,
        uniqueVisitors: 0,
        averageTime: 0,
        clickData: []
    });

    // Simular dados de analytics (em uma aplicação real, isso viria de uma API)
    useEffect(() => {
        const loadAnalyticsData = () => {
            // Dados simulados
            const mockData: AnalyticsData = {
                totalClicks: 142,
                uniqueVisitors: 87,
                averageTime: 3.2,
                clickData: [
                    { element: 'Agendamento', count: 42, timestamp: Date.now() },
                    { element: 'Saiba Mais', count: 38, timestamp: Date.now() },
                    { element: 'FAQ', count: 27, timestamp: Date.now() },
                    { element: 'Depoimentos', count: 21, timestamp: Date.now() },
                    { element: 'Artigos Relacionados', count: 14, timestamp: Date.now() }
                ]
            };
            setAnalytics(mockData);
        };

        loadAnalyticsData();
    }, []);

    // Função para registrar cliques
    const trackClick = useCallback((elementName: string) => {
        console.log(`Click registrado em: ${elementName}`);
        // Em uma aplicação real, você enviaria isso para seu serviço de analytics
        setAnalytics(prev => ({
            ...prev,
            totalClicks: prev.totalClicks + 1,
            clickData: prev.clickData.map(item =>
                item.element === elementName
                    ? { ...item, count: item.count + 1, timestamp: Date.now() }
                    : item
            )
        }));
    }, []);

    // Dados para o gráfico de cliques
    const clickChartData = {
        labels: analytics.clickData.map(item => item.element),
        datasets: [
            {
                label: 'Cliques por Elemento',
                data: analytics.clickData.map(item => item.count),
                backgroundColor: [
                    'rgba(33, 150, 243, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 152, 0, 0.7)',
                    'rgba(156, 39, 176, 0.7)',
                    'rgba(244, 67, 54, 0.7)'
                ],
                borderColor: [
                    'rgb(33, 150, 243)',
                    'rgb(76, 175, 80)',
                    'rgb(255, 152, 0)',
                    'rgb(156, 39, 176)',
                    'rgb(244, 67, 54)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Dados para o gráfico de engajamento
    const engagementChartData = {
        labels: ['Leitura', 'Interação', 'Compartilhamento', 'Retorno'],
        datasets: [
            {
                label: 'Nível de Engajamento',
                data: [75, 60, 40, 35],
                backgroundColor: [
                    'rgba(33, 150, 243, 0.5)',
                    'rgba(76, 175, 80, 0.5)',
                    'rgba(255, 152, 0, 0.5)',
                    'rgba(156, 39, 176, 0.5)'
                ],
                borderColor: [
                    'rgb(33, 150, 243)',
                    'rgb(76, 175, 80)',
                    'rgb(255, 152, 0)',
                    'rgb(156, 39, 176)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Cabeçalho */}
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mb: 4,
                    background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                    color: 'white',
                    borderRadius: 3
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Atraso na Fala: 8 Sinais que os Pais Não Devem Ignorar
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Um guia completo para entender o desenvolvimento da linguagem infantil
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* Conteúdo Principal */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Por que a Intervenção Precoce é Fundamental?
                        </Typography>
                        <Typography paragraph>
                            Os primeiros anos de vida representam uma janela de oportunidade única para o desenvolvimento cerebral.
                            É quando o cérebro apresenta maior plasticidade, ou seja, maior capacidade de formar novas conexões e se adaptar.
                        </Typography>

                        <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 2, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Importante
                            </Typography>
                            <Typography variant="body2">
                                Este conteúdo tem caráter informativo e não substitui uma avaliação profissional.
                                Cada criança tem seu próprio ritmo de desenvolvimento, mas conhecer os sinais de alerta
                                pode fazer toda a diferença para intervir no momento certo.
                            </Typography>
                        </Box>

                        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                            Os 8 Sinais de Alerta para o Atraso na Fala
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {[
                                "Pouca ou Nenhuma Fala aos 2 Anos",
                                "Dificuldade de Compreensão",
                                "Uso Preferencial de Gestos",
                                "Dificuldade em Imitar Sons",
                                "Fala Muito Ininteligível",
                                "Regressão ou Perda de Habilidades",
                                "Dificuldade com a Alimentação",
                                "Frustração ao Tentar se Comunicar"
                            ].map((sign, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            borderTop: 4,
                                            borderColor: 'primary.main',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 3
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom color="primary">
                                                {index + 1}. {sign}
                                            </Typography>
                                            <Typography variant="body2">
                                                Descrição detalhada do sinal e o que observar no desenvolvimento da criança.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => trackClick('Agendamento')}
                                sx={{ mr: 2, mb: isMobile ? 2 : 0 }}
                            >
                                Agende uma Avaliação
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => trackClick('Saiba Mais')}
                            >
                                Saiba Mais
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Painel de Analytics */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <TrendingUp sx={{ mr: 1 }} /> Estatísticas de Engajamento
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <ClickAwayListener color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.totalClicks}
                                    </Typography>
                                    <Typography variant="body2">Total de Cliques</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <People color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.uniqueVisitors}
                                    </Typography>
                                    <Typography variant="body2">Visitantes Únicos</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <Schedule color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.averageTime}m
                                    </Typography>
                                    <Typography variant="body2">Tempo Médio</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <CheckCircle color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h5" fontWeight="bold">
                                        68%
                                    </Typography>
                                    <Typography variant="body2">Taxa de Conversão</Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Typography variant="subtitle1" gutterBottom>
                            Distribuição de Cliques
                        </Typography>
                        <Box sx={{ height: 200 }}>
                            <Doughnut
                                data={clickChartData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'bottom'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Paper>

                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Nível de Engajamento
                        </Typography>
                        <Box sx={{ height: 200 }}>
                            <Bar
                                data={engagementChartData}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            max: 100
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FonoPage;