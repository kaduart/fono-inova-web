import {
    AccessibilityNew,
    CheckCircle,
    ChildCare,
    DirectionsRun,
    Healing,
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
    Chip,
    Container,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

const FisioPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [analytics, setAnalytics] = useState({
        totalClicks: 115,
        uniqueVisitors: 84,
        averageTime: 4.3,
        conversionRate: 13.7
    });

    const conditions = [
        {
            title: "Atraso do Desenvolvimento Motor",
            description: "Quando a criança não atinge os marcos motores esperados para sua idade",
            icon: <ChildCare />
        },
        {
            title: "Torcicolo Congênito",
            description: "Encurtamento do músculo esternocleidomastóideo que limita os movimentos do pescoço",
            icon: <AccessibilityNew />
        },
        {
            title: "Paralisia Cerebral",
            description: "Condição que afeta o movimento, tônus muscular e coordenação",
            icon: <DirectionsRun />
        },
        {
            title: "Lesões Ortopédicas",
            description: "Fraturas, luxações e outras condições que necessitam de reabilitação",
            icon: <Healing />
        }
    ];

    const milestones = [
        { age: "3 meses", skills: "Sustenta a cabeça, abre as mãos, leva as mãos à boca" },
        { age: "6 meses", skills: "Rola, senta com apoio, transfere objetos entre as mãos" },
        { age: "9 meses", skills: "Senta sem apoio, engatinha, fica em pé com apoio" },
        { age: "12 meses", skills: "Fica em pé sozinho, dá os primeiros passos" },
        { age: "18 meses", skills: "Anda bem, sobe escadas com ajuda, empurra brinquedos" }
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
                    background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
                    color: 'white',
                    borderRadius: 3
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Fisioterapia Pediátrica: Para Que Serve e Seu Filho Precisa?
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Entenda como a fisioterapia especializada pode ajudar no desenvolvimento motor do seu filho
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* Conteúdo Principal */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            O que é Fisioterapia Pediátrica?
                        </Typography>
                        <Typography paragraph>
                            A Fisioterapia Pediátrica é uma especialidade que previne, avalia e trata condições que
                            afetam o desenvolvimento motor infantil desde o nascimento até a adolescência.
                            Através de técnicas especializadas e atividades lúdicas, ajudamos crianças a alcançarem
                            seu máximo potencial de desenvolvimento.
                        </Typography>

                        <Box sx={{ bgcolor: 'purple.50', p: 2, borderRadius: 2, mb: 3, borderLeft: 4, borderColor: 'purple.main' }}>
                            <Typography variant="h6" gutterBottom>
                                <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Diferencial da Fisioterapia Pediátrica
                            </Typography>
                            <Typography variant="body2">
                                Diferente da fisioterapia para adultos, a abordagem pediátrica utiliza brincadeiras,
                                jogos e atividades lúdicas para alcançar os objetivos terapêuticos, tornando o
                                tratamento prazeroso e motivador para a criança.
                            </Typography>
                        </Box>

                        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                            Principais Condições Tratadas
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {conditions.map((condition, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 3
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Box sx={{ color: 'purple.main', fontSize: 40, mb: 2 }}>
                                                {condition.icon}
                                            </Box>
                                            <Typography variant="h6" gutterBottom color="purple.main">
                                                {condition.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                {condition.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="h5" gutterBottom color="primary">
                            Marcos do Desenvolvimento Motor
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            {milestones.map((milestone, index) => (
                                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: index % 2 === 0 ? 'grey.50' : 'transparent', borderRadius: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Chip
                                            label={milestone.age}
                                            color="secondary"
                                            sx={{ mr: 2, fontWeight: 'bold' }}
                                        />
                                        <Typography variant="body1" fontWeight="medium">
                                            {milestone.skills}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 2, mb: 3 }}>
                            <Typography variant="body2">
                                <strong>Lembre-se:</strong> Cada criança tem seu próprio ritmo de desenvolvimento.
                                Os marcos são apenas referências. Consulte um profissional se houver preocupações.
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => trackClick('Agendamento Fisioterapia')}
                                sx={{ mr: 2, mb: isMobile ? 2 : 0 }}
                                color="secondary"
                            >
                                Agende uma Avaliação
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => trackClick('Saiba Mais Fisio')}
                                color="secondary"
                            >
                                Conheça Nossa Estrutura
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Painel de Analytics e Informações */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <TrendingUp sx={{ mr: 1 }} /> Estatísticas de Engajamento
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={6}>
                                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                    <Box sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }}>
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

                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Perguntas Frequentes
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                                <strong>Com que idade devo me preocupar com atraso motor?</strong><br />
                                Se seu filho não está atingindo os marcos motores com diferença de 2-3 meses do esperado, procure avaliação.
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                                <strong>As sessões são dolorosas para a criança?</strong><br />
                                Não, utilizamos técnicas suaves e atividades lúdicas adaptadas para cada idade.
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Quanto tempo dura o tratamento?</strong><br />
                                Varia conforme a condição e resposta da criança. Em média, de 3 meses a 1 ano.
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Materiais de Apoio
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={() => trackClick('Download Guia Motor')}
                            color="secondary"
                        >
                            📋 Guia de Exercícios para Casa
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={() => trackClick('Download Marcos')}
                            color="secondary"
                        >
                            📊 Tabela de Marcos do Desenvolvimento
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => trackClick('Download Estimulacao')}
                            color="secondary"
                        >
                            🧸 Guia de Estimulação Motora
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FisioPage;