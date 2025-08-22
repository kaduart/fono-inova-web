import {
    CheckCircle,
    People,
    Schedule,
    TrendingUp,
    Warning,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

const PsicoPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [analytics, setAnalytics] = useState({
        totalClicks: 126,
        uniqueVisitors: 92,
        averageTime: 4.1,
        conversionRate: 14.3
    });

    const symptoms = [
        "Dificuldade em prestar atenção a detalhes e errar por descuido",
        "Parece não ouvir quando chamado",
        "Facilmente distraído por estímulos externos",
        "Dificuldade em seguir instruções e organizar tarefas",
        "Agitação constante, como se estivesse 'com um motorzinho'",
        "Dificuldade em ficar sentado por muito tempo",
        "Corre ou escala móveis em situações inadequadas",
        "Dá respostas antes das perguntas serem completadas"
    ];

    const trackClick = (elementName) => {
        console.log(`Click registrado em: ${elementName}`);
        // Em uma aplicação real, você enviaria isso para seu serviço de analytics
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Cabeçalho */}
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mb: 4,
                    background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                    color: 'white',
                    borderRadius: 3
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    TDAH em Crianças: Entenda os Sintomas e Quando Buscar Ajuda
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Um guia completo para identificar e compreender o Transtorno de Déficit de Atenção e Hiperatividade
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* Conteúdo Principal */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            TDAH Não é Frescura ou Má Criação
                        </Typography>
                        <Typography paragraph>
                            É importante desmistificar: o TDAH é um transtorno neurobiológico, com bases genéticas,
                            que afeta o funcionamento de partes do cérebro. Não está relacionado à educação dada pelos pais.
                        </Typography>

                        <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 2, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Importante
                            </Typography>
                            <Typography variant="body2">
                                Cada criança é única e pode apresentar diferentes combinações de sintomas.
                                Somente um profissional qualificado pode fazer um diagnóstico preciso.
                            </Typography>
                        </Box>

                        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                            Sintomas do TDAH em Crianças
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {symptoms.map((symptom, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            borderTop: 4,
                                            borderColor: 'success.main',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 3
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom color="success.main">
                                                {index + 1}. {symptom}
                                            </Typography>
                                            <Typography variant="body2">
                                                Este é um dos sinais que podem indicar TDAH e merece atenção especial.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="h5" gutterBottom color="primary">
                            Quando Buscar Ajuda de um Psicólogo Infantil?
                        </Typography>
                        <Typography paragraph>
                            A hora de procurar ajuda é quando esses sintomas estão presentes em mais de um ambiente
                            (em casa e na escola), persistem por mais de seis meses e causam prejuízo real no desempenho
                            escolar e nos relacionamentos.
                        </Typography>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => trackClick('Agendamento Psicologia')}
                                sx={{ mr: 2, mb: isMobile ? 2 : 0 }}
                                color="success"
                            >
                                Agende uma Avaliação
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => trackClick('Saiba Mais Psicologia')}
                                color="success"
                            >
                                Conheça Nossa Equipe
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
                                    <Box sx={{ color: 'success.main', fontSize: 40, mb: 1 }}>
                                        <i className="fas fa-mouse-pointer"></i>
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.totalClicks}
                                    </Typography>
                                    <Typography variant="body2">Total de Cliques</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <Box sx={{ color: 'success.main', fontSize: 40, mb: 1 }}>
                                        <People />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.uniqueVisitors}
                                    </Typography>
                                    <Typography variant="body2">Visitantes Únicos</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <Box sx={{ color: 'success.main', fontSize: 40, mb: 1 }}>
                                        <Schedule />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.averageTime}m
                                    </Typography>
                                    <Typography variant="body2">Tempo Médio</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <Box sx={{ color: 'success.main', fontSize: 40, mb: 1 }}>
                                        <CheckCircle />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {analytics.conversionRate}%
                                    </Typography>
                                    <Typography variant="body2">Taxa de Conversão</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Conteúdos Relacionados
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <i className="fas fa-chevron-right" style={{ marginRight: '8px', color: '#4CAF50' }}></i>
                                Teste Online para Identificar Sinais de TDAH
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <i className="fas fa-chevron-right" style={{ marginRight: '8px', color: '#4CAF50' }}></i>
                                Estratégias para Melhorar a Concentração
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <i className="fas fa-chevron-right" style={{ marginRight: '8px', color: '#4CAF50' }}></i>
                                Como Apoiar Crianças com TDAH na Escola
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PsicoPage;