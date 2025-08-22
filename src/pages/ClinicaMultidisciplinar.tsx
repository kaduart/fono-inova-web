import {
    AccessTime,
    CheckCircle,
    ChildCare,
    ExpandMore,
    Group,
    MedicalServices,
    People,
    Psychology,
    Schedule,
    SyncAlt,
    TrendingUp
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useState } from 'react';

const ClinicaMultidisciplinar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [analytics, setAnalytics] = useState({
        totalClicks: 203,
        uniqueVisitors: 142,
        averageTime: 5.2,
        conversionRate: 18.6
    });

    const [expanded, setExpanded] = useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const advantages = [
        {
            title: "Diagnóstico Mais Preciso",
            description: "Visão integrada de vários especialistas para um entendimento completo do caso",
            icon: <Psychology />,
            details: "Nossa equipe multidisciplinar realiza avaliações conjuntas, permitindo um diagnóstico mais abrangente e preciso, considerando todos os aspectos do desenvolvimento infantil."
        },
        {
            title: "Tratamento Coordenado",
            description: "Terapeutas trabalham em conjunto com um plano terapêutico unificado",
            icon: <SyncAlt />,
            details: "Desenvolvemos planos de tratamento integrados onde cada profissional conhece e complementa o trabalho dos outros, evitando abordagens fragmentadas."
        },
        {
            title: "Comodidade e Confiança",
            description: "Tudo em um só lugar, com uma equipe coesa e integrada",
            icon: <AccessTime />,
            details: "Familiares e crianças não precisam se deslocar entre diferentes locais de tratamento. Toda a equipe trabalha de forma coordenada no mesmo ambiente."
        },
        {
            title: "Visão Integral da Criança",
            description: "Não tratamos só a 'doença', mas a criança como um todo",
            icon: <ChildCare />,
            details: "Nossa abordagem considera todos os aspectos do desenvolvimento: físico, cognitivo, emocional, social e comunicacional."
        },
        {
            title: "Melhores Resultados",
            description: "Abordagem integrada proporciona evolução mais rápida e consistente",
            icon: <MedicalServices />,
            details: "Estudos demonstram que abordagens multidisciplinares resultam em melhorias mais significativas e duradouras no desenvolvimento infantil."
        }
    ];

    const team = [
        { specialty: "Fonoaudiólogos", count: 3, color: "primary" },
        { specialty: "Psicólogos", count: 4, color: "success" },
        { specialty: "Terapeutas Ocupacionais", count: 2, color: "warning" },
        { specialty: "Fisioterapeutas", count: 2, color: "secondary" },
        { specialty: "Neuropediatras", count: 1, color: "info" },
        { specialty: "Pedagogos", count: 2, color: "error" }
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
                    background: 'linear-gradient(135deg, #f50057 0%, #ff5983 100%)',
                    color: 'white',
                    borderRadius: 3
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    5 Vantagens de uma Clínica Multidisciplinar para o Desenvolvimento do Seu Filho
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Descubra por que a abordagem integrada oferece os melhores resultados para o desenvolvimento infantil
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* Conteúdo Principal */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom color="primary">
                            Por que Escolher uma Abordagem Multidisciplinar?
                        </Typography>
                        <Typography paragraph>
                            O desenvolvimento infantil é complexo e multifacetado. Dificuldades de aprendizagem,
                            atrasos no desenvolvimento ou transtornos como TEA e TDAH raramente se resolvem com
                            uma única abordagem. É aí que entra a vantagem de uma clínica multidisciplinar.
                        </Typography>

                        <Box sx={{ bgcolor: 'pink.50', p: 3, borderRadius: 2, mb: 4, borderLeft: 4, borderColor: 'pink.main' }}>
                            <Typography variant="h6" gutterBottom color="pink.dark">
                                <Group sx={{ verticalAlign: 'middle', mr: 1 }} />
                                O que é uma Equipe Multidisciplinar?
                            </Typography>
                            <Typography variant="body2">
                                É um grupo de profissionais de diferentes especialidades que trabalham de forma
                                coordenada, compartilhando conhecimentos e experiências para oferecer um tratamento
                                completo e integrado para cada criança.
                            </Typography>
                        </Box>

                        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                            Vantagens da Abordagem Multidisciplinar
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            {advantages.map((advantage, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                    sx={{ mb: 2 }}
                                >
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                            <Box sx={{ color: 'pink.main', mr: 2 }}>
                                                {advantage.icon}
                                            </Box>
                                        </Box>
                                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                            {advantage.title}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" paragraph>
                                            {advantage.description}
                                        </Typography>
                                        <Typography variant="body2">
                                            {advantage.details}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>

                        <Typography variant="h5" gutterBottom color="primary">
                            Nossa Equipe Multidisciplinar
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            {team.map((member, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                                        <Typography variant="h4" color={`${member.color}.main`} fontWeight="bold">
                                            {member.count}
                                        </Typography>
                                        <Typography variant="body2">
                                            {member.specialty}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Como Funciona Nosso Processo
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Box sx={{ color: 'pink.main' }}>1</Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Avaliação inicial com vários especialistas" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Box sx={{ color: 'pink.main' }}>2</Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Reunião de discussão do caso entre a equipe" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Box sx={{ color: 'pink.main' }}>3</Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Elaboração de plano de tratamento integrado" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Box sx={{ color: 'pink.main' }}>4</Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Acompanhamento contínuo e ajustes coordenados" />
                                </ListItem>
                            </List>
                        </Box>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => trackClick('Agendamento Multidisciplinar')}
                                sx={{ mr: 2, mb: isMobile ? 2 : 0 }}
                                style={{ background: '#f50057', color: 'white' }}
                            >
                                Agende uma Avaliação
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => trackClick('Conheca Equipe')}
                                style={{ borderColor: '#f50057', color: '#f50057' }}
                            >
                                Conheça Nossa Equipe
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
                                    <Box sx={{ color: 'pink.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'pink.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'pink.main', fontSize: 40, mb: 1 }}>
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
                                    <Box sx={{ color: 'pink.main', fontSize: 40, mb: 1 }}>
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
                            Depoimentos
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" paragraph sx={{ fontStyle: 'italic' }}>
                                "A abordagem multidisciplinar fez toda a diferença no tratamento do meu filho.
                                Em vez de visões fragmentadas, tivemos um plano coeso e integrado."
                                <Box component="span" display="block" fontWeight="bold" mt={1}>
                                    - Ana, mãe do Miguel (5 anos)
                                </Box>
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                "A comunicação entre os profissionais é impressionante. Todos sabem exatamente
                                o que cada um está trabalhando e como complementar o tratamento."
                                <Box component="span" display="block" fontWeight="bold" mt={1}>
                                    - Carlos, pai da Sofia (7 anos)
                                </Box>
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary">
                            Próximos Passos
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={() => trackClick('Baixar Guia Multidisciplinar')}
                            style={{ borderColor: '#f50057', color: '#f50057' }}
                        >
                            📋 Baixar Guia Completo
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={() => trackClick('Ver Cases Sucesso')}
                            style={{ borderColor: '#f50057', color: '#f50057' }}
                        >
                            📊 Casos de Sucesso
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => trackClick('Agendar Tour Virtual')}
                            style={{ borderColor: '#f50057', color: '#f50057' }}
                        >
                            🏥 Tour Virtual da Clínica
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ClinicaMultidisciplinar;