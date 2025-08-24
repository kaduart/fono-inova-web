// components/AccessibilityWizard.jsx
import {
    Accessibility,
    CheckCircle,
    Hearing,
    Psychology,
    Visibility
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Step,
    StepLabel,
    Stepper,
    Switch,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

const steps = ['Visual', 'Auditivo', 'Motor', 'Cognitivo', 'Resumo'];

const questions = {
    visual: [
        {
            id: 'vision_impairment',
            question: "Você possui alguma deficiência visual?",
            options: [
                { value: 'none', label: 'Nenhuma' },
                { value: 'low_vision', label: 'Baixa visão' },
                { value: 'color_blind', label: 'Daltonismo' },
                { value: 'blind', label: 'Cegueira' }
            ]
        },
        {
            id: 'text_size',
            question: "Qual tamanho de texto você prefere?",
            options: [
                { value: 'normal', label: 'Normal' },
                { value: 'large', label: 'Grande' },
                { value: 'x_large', label: 'Muito grande' }
            ]
        },
        {
            id: 'contrast',
            question: "Qual nível de contraste você prefere?",
            options: [
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'Alto contraste' },
                { value: 'inverted', label: 'Cores invertidas' }
            ]
        }
    ],
    auditory: [
        {
            id: 'hearing_impairment',
            question: "Você possui alguma deficiência auditiva?",
            options: [
                { value: 'none', label: 'Nenhuma' },
                { value: 'partial', label: 'Audição parcial' },
                { value: 'deaf', label: 'Surdez' }
            ]
        },
        {
            id: 'captions',
            question: "Você precisa de legendas em conteúdos de vídeo?",
            options: [
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'Não' },
                { value: 'sometimes', label: 'Às vezes' }
            ]
        }
    ],
    motor: [
        {
            id: 'mobility_impairment',
            question: "Você possui alguma dificuldade motora?",
            options: [
                { value: 'none', label: 'Nenhuma' },
                { value: 'tremor', label: 'Tremores ou precisão' },
                { value: 'limited_mobility', label: 'Mobilidade limitada' },
                { value: 'no_mouse', label: 'Uso apenas teclado' }
            ]
        },
        {
            id: 'interaction_speed',
            question: "Qual velocidade de interação você prefere?",
            options: [
                { value: 'normal', label: 'Normal' },
                { value: 'slow', label: 'Mais lenta' },
                { value: 'very_slow', label: 'Muito lenta' }
            ]
        }
    ],
    cognitive: [
        {
            id: 'cognitive_impairment',
            question: "Você possui alguma dificuldade cognitiva?",
            options: [
                { value: 'none', label: 'Nenhuma' },
                { value: 'attention', label: 'Déficit de atenção' },
                { value: 'memory', label: 'Problemas de memória' },
                { value: 'learning', label: 'Dificuldade de aprendizado' }
            ]
        },
        {
            id: 'content_simplification',
            question: "Você prefere conteúdo simplificado?",
            options: [
                { value: 'no', label: 'Não' },
                { value: 'simplified', label: 'Simplificado' },
                { value: 'very_simplified', label: 'Muito simplificado' }
            ]
        }
    ]
};

const AccessibilityWizard = ({ open, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [enableAccessibility, setEnableAccessibility] = useState(false);
    const { updateSettings } = useAccessibility();

    const handleFinish = () => {
        updateSettings({
            ...answers,
            enableAccessibility
        });
        onClose();
    };
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleAnswer = (category, questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [questionId]: value
            }
        }));
    };

    const applyAccessibilitySettings = (settings) => {
        const body = document.body;

        // Reset todas as classes de acessibilidade
        body.classList.remove(
            'accessibility-mode',
            'text-large',
            'text-x-large',
            'high-contrast',
            'inverted-colors',
            'simplified-ui'
        );

        // Aplicar configurações visuais
        if (settings.visual) {
            if (settings.visual.text_size === 'large') {
                body.classList.add('text-large');
            } else if (settings.visual.text_size === 'x_large') {
                body.classList.add('text-x-large');
            }

            if (settings.visual.contrast === 'high') {
                body.classList.add('high-contrast');
            } else if (settings.visual.contrast === 'inverted') {
                body.classList.add('inverted-colors');
            }
        }

        // Aplicar modo de acessibilidade completo
        if (enableAccessibility) {
            body.classList.add('accessibility-mode', 'simplified-ui');
        }
    };

    const getCurrentQuestions = () => {
        const stepKey = steps[activeStep].toLowerCase();
        return questions[stepKey] || [];
    };

    const getStepIcon = (stepIndex) => {
        switch (stepIndex) {
            case 0: return <Visibility />;
            case 1: return <Hearing />;
            case 2: return <Accessibility />;
            case 3: return <Psychology />;
            case 4: return <CheckCircle />;
            default: return <div>{stepIndex + 1}</div>;
        }
    };

    const renderQuestionStep = () => {
        const currentCategory = steps[activeStep].toLowerCase();
        const currentQuestions = getCurrentQuestions();

        return (
            <Box>
                <Typography variant="h6" gutterBottom>
                    Preferências {steps[activeStep]}
                </Typography>
                {currentQuestions.map((q, index) => (
                    <FormControl key={q.id} component="fieldset" sx={{ mt: 2, width: '100%' }}>
                        <FormLabel component="legend">{q.question}</FormLabel>
                        <RadioGroup
                            value={answers[currentCategory]?.[q.id] || ''}
                            onChange={(e) => handleAnswer(currentCategory, q.id, e.target.value)}
                        >
                            {q.options.map(option => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                ))}
            </Box>
        );
    };

    const renderSummaryStep = () => {
        return (
            <Box>
                <Typography variant="h6" gutterBottom>
                    Resumo das suas preferências
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={enableAccessibility}
                                onChange={(e) => setEnableAccessibility(e.target.checked)}
                            />
                        }
                        label="Ativar modo de acessibilidade completo"
                    />
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Com base nas suas respostas, aplicaremos configurações para melhorar sua experiência de navegação.
                </Typography>
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Accessibility sx={{ mr: 1 }} />
                    Configurações de Acessibilidade
                </Box>
            </DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={() => getStepIcon(index)}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep < steps.length - 1 ? renderQuestionStep() : renderSummaryStep()}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        Voltar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                    >
                        {activeStep === steps.length - 1 ? 'Aplicar Configurações' : 'Próximo'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AccessibilityWizard;