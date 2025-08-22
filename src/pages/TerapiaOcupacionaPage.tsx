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

const TerapiaOcupacionalPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [analytics, setAnalytics] = useState({
        totalClicks: 98,
        uniqueVisitors: 73,
        averageTime: 3.8,
        conversionRate: 11.2
    });

    const benefits = [
        "Integração Sensorial: Melhora o processamento de estímulos sensoriais",
        "Atividades de Vida Diária: Desenvolve autonomia para vestir, alimentar e higiene",
        "Coordenação Motora: Fortalece habilidades motoras finas e grossas",
        "Desenvolvimento Cognitivo: Estimula atenção, memória e resolução de problemas",
        "Habilidades Sociais: Promove interação e comunicação com outras crianças",
        "Regulação Emocional: Ajuda no controle de impulsos e manejo de frustrações",
        "Preparação para Escrita: Desenvolve pré-requisitos para a escrita",
        "Brincar Terapêutico: Usa brincadeiras para alcançar objetivos terapêuticos"
    ];

    const signs = [
        "Dificuldade com texturas de alimentos ou roupas",
        "Problemas de coordenação e equilíbrio",
        "Dificuldade para segurar lápis ou usar tesoura",
        "Hiperatividade ou letargia excessiva",
        "Dificuldade em aprender tarefas simples do dia a dia",
        "Problemas de atenção e concentração",
        "Frustração frequente com atividades motoras",
        "Atraso no desenvolvimento de habilidades esperadas para a idade"
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
                    background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
                    color: 'white',
                    borderRadius: 3
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Terapia Ocupacional Infantil: Como Ajuda no Desenvolvimento
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Entenda como a TO pode transformar o desenvolvimento do seu filho através de atividades lúdicas e estratégias especializadas
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* Conteúdo Principal */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            O que é Terapia Ocupacional Infantil?
                        </Typography>
                        <Typography paragraph>
                            A Terapia Ocupacional Infantil ajuda crianças a desenvolver as habilidades necessárias para
                            realizar suas "ocupações" - brincar, aprender e realizar atividades diárias. Através de
                            intervenções especializadas, a TO promove o desenvolvimento de forma lúdica e significativa.
                        </Typography>

                        <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 2, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Para quem é indicada?
                            </Typography>
                            <Typography variant="body2">
                                A TO é recomendada para crianças com atrasos no desenvolvimento, TEA, TDAH,
                                dificuldades motoras, sensoriais ou qualquer condição que afete sua capacidade
                                de participar plenamente das atividades diárias.
                            </Typography>
                        </Box>

                        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                            Benefícios da Terapia Ocupacional
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {benefits.map((benefit, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            borderTop: 4,
                                            borderColor: 'warning.main',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 3
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom color="warning.dark">
                                                <Box component="span" sx={{ color: 'warning.main', mr: 1 }}>
                                                    {index + 1}.
                                                </Box>
                                                {benefit}
                                            </Typography>
                                            <Typography variant="body2">
                                                Desenvolvimento de habilidades específicas através de atividades direcionadas.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="h5" gutterBottom color="primary">
                            Sinais de que seu filho pode se beneficiar da TO
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            {signs.map((sign, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                        <Box sx={{ color: 'warning.main', mr: 1, mt: 0.5 }}>
                                            •
                                        </Box>
                                        <Typography variant="body1">
                                            {sign}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => trackClick('Agendamento TO')}
                                sx={{ mr: 2, mb: isMobile ? 2 : 0 }}
                                color="warning"
                            >
                                Agende uma Avaliação
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => trackClick('Saiba Mais TO')}
                                color="warning"
                            >
                                Conheça Nossa Terapeuta
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
                                    <Box sx={{ color: 'warning.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'warning.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'warning.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'warning.main', fontSize: 40, mb: 1 }}>
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
                            Materiais Educativos
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <i className="fas fa-download" style={{ marginRight: '8px', color: '#FF9800' }}></i>
                                Guia de Atividades Sensoriais para Casa
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <i className="fas fa-download" style={{ marginRight: '8px', color: '#FF9800' }}></i>
                                Checklist de Marcos do Desenvolvimento
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <i className="fas fa-download" style={{ marginRight: '8px', color: '#FF9800' }}></i>
                                Estratégias para Melhorar a Coordenação Motora
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() => trackClick('Download Materiais')}
                            color="warning"
                        >
                            Baixar Todos os Materiais
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TerapiaOcupacionalPage;