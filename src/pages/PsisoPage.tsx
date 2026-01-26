import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Award,
    Baby,
    Brain,
    CheckCircle,
    ChevronDown,
    Clock,
    Focus,
    Lightbulb,
    MessageCircle,
    Phone,
    Quote,
    Shield,
    Speech,
    Star,
    Target,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import ButtonAgendamento from '../components/ui/ButtonAgendamento';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { useServiceViewTime } from '../hooks/useAnalytics';

const PsicoPage = () => {
    useServiceViewTime('Psicologia');
    const [openAccordion, setOpenAccordion] = useState(null);

    // Sintomas de TDAH - Conteúdo enriquecido
    const symptoms = [
        {
            title: "Dificuldade em Prestar Atenção a Detalhes",
            description: "Erros por descuido em atividades escolares, trabalhos ou outras atividades.",
            details: "A criança frequentemente não presta atenção suficiente a detalhes ou comete erros por descuido nas tarefas escolares, no trabalho ou em outras atividades.",
            icon: <Focus className="w-8 h-8" />
        },
        {
            title: "Parece Não Ouvir Quando Chamado",
            description: "Dificuldade em manter a atenção em conversas ou instruções.",
            details: "Com frequência, parece não escutar quando lhe dirigem a palavra, mesmo na ausência de qualquer distração óbvia.",
            icon: <Speech className="w-8 h-8" />
        },
        {
            title: "Facilmente Distraído por Estímulos Externos",
            description: "Perde o foco com facilidade com coisas ao redor.",
            details: "Frequentemente é facilmente distraído por estímulos alheios à tarefa (para adolescentes mais velhos e adultos, pode incluir pensamentos não relacionados).",
            icon: <Activity className="w-8 h-8" />
        },
        {
            title: "Dificuldade em Organizar Tarefas",
            description: "Problemas para seguir instruções e organizar atividades.",
            details: "Com frequência tem dificuldade em organizar tarefas e atividades (dificuldade em sequentializar tarefas complexas; manter materiais e pertences em ordem).",
            icon: <Target className="w-8 h-8" />
        },
        {
            title: "Agitação Constante",
            description: "Sensação de estar 'com um motorzinho' ligado.",
            details: "Frequentemente agita as mãos ou os pés ou se remexe na cadeira; levanta da cadeira em situações em que se espera que permaneça sentado.",
            icon: <TrendingUp className="w-8 h-8" />
        },
        {
            title: "Dificuldade em Permanecer Sentado",
            description: "Levanta-se em situações onde deveria permanecer sentado.",
            details: "Frequentemente abandona sua cadeira em sala de aula ou em outras situações nas quais se espera que permaneça sentado.",
            icon: <Activity className="w-8 h-8" />
        },
        {
            title: "Corre ou Scale em Situações Inadequadas",
            description: "Comportamento excessivamente agitado em contextos inadequados.",
            details: "Frequentemente corre ou escala móveis em situações nas quais isso é inapropriado (em adolescentes ou adultos, pode limitar-se a sensações de inquietação).",
            icon: <Baby className="w-8 h-8" />
        },
        {
            title: "Respostas Precipitadas",
            description: "Responde antes das perguntas serem completadas.",
            details: "Frequentemente dá respostas precipitadas antes de as perguntas terem sido completadas (completa sentenças de outros; não consegue aguardar a vez na conversação).",
            icon: <Lightbulb className="w-8 h-8" />
        }
    ];

    // Estatísticas baseadas em pesquisas
    const statistics = [
        { value: "5-7%", label: "das crianças em idade escolar têm TDAH" },
        { value: "75%", label: "dos casos persistem na adolescência" },
        { value: "3:1", label: "razão meninos:meninas com diagnóstico" },
        { value: "80%", label: "de melhora com tratamento adequado" }
    ];

    // Tipos de TDAH
    const adhdTypes = [
        {
            type: "TDAH Tipo Desatento",
            description: "Predomínio de sintomas de desatenção",
            characteristics: ["Dificuldade de concentração", "Distração fácil", "Esquecimento frequente", "Organização deficiente"]
        },
        {
            type: "TDAH Tipo Hiperativo/Impulsivo",
            description: "Predomínio de sintomas de hiperatividade e impulsividade",
            characteristics: ["Agitação constante", "Dificuldade em ficar parado", "Impulsividade", "Fala excessiva"]
        },
        {
            type: "TDAH Tipo Combinado",
            description: "Combinação de sintomas de desatenção e hiperatividade",
            characteristics: ["Sintomas mistos", "Mais comum em meninos", "Maior prejuízo funcional", "Diagnóstico mais evidente"]
        }
    ];

    // Depoimentos
    const testimonials = [
        {
            name: "Ana Paula Rodrigues",
            role: "Mãe do Lucas, 8 anos",
            content: "O diagnóstico do TDAH do Lucas foi um divisor de águas. Com a terapia, ele aprendeu estratégias para lidar com a atenção e hoje vai muito melhor na escola. A equipe foi incrível!",
            rating: 5
        },
        {
            name: "Carlos Eduardo",
            role: "Pai da Sofia, 10 anos",
            content: "A Sofia sempre teve dificuldade em se concentrar e era muito impulsiva. Depois de 6 meses de acompanhamento psicológico, a mudança é nítida. Ela está mais confiante e feliz.",
            rating: 5
        },
        {
            name: "Mariana Costa",
            role: "Mãe do Pedro, 7 anos",
            content: "O tratamento multidisciplinar fez toda a diferença. O Pedro tem TDAH e a terapia comportamental mudou nossa dinâmica familiar para melhor. Aprendemos a lidar com os desafios.",
            rating: 5
        }
    ];

    // FAQs
    const faqs = [
        {
            question: "TDAH é uma doença?",
            answer: "Não, TDAH é um transtorno do neurodesenvolvimento com bases genéticas. Não é uma doença, mas uma condição que afeta o funcionamento cerebral em áreas específicas."
        },
        {
            question: "O tratamento do TDAH é apenas com medicamentos?",
            answer: "Não. O tratamento ideal é multimodal, incluindo terapia comportamental, orientação familiar, adaptações escolares e, quando necessário, medicação. A abordagem é individualizada."
        },
        {
            question: "Com que idade pode ser diagnosticado o TDAH?",
            answer: "O diagnóstico geralmente é feito a partir dos 6-7 anos, quando as demandas escolares aumentam. No entanto, sinais podem ser observados desde a primeira infância."
        },
        {
            question: "O TDAH desaparece na idade adulta?",
            answer: "Em cerca de 60% dos casos, os sintomas persistem na vida adulta, mas se manifestam de forma diferente. Adultos com TDAH podem desenvolver estratégias de compensação."
        }
    ];

    // Abordagens terapêuticas
    const therapies = [
        {
            title: "Terapia Cognitivo-Comportamental",
            description: "Foca em modificar padrões de pensamento e comportamento",
            techniques: ["Treino de habilidades sociais", "Técnicas de organização", "Controle de impulsividade", "Estratégias de atenção"]
        },
        {
            title: "Orientação Parental",
            description: "Capacita os pais para lidar com os desafios do TDAH",
            techniques: ["Comunicação eficaz", "Estabelecimento de rotinas", "Sistema de recompensas", "Limites consistentes"]
        },
        {
            title: "Treino de Habilidades Sociais",
            description: "Desenvolve competências para relacionamentos interpessoais",
            techniques: ["Reconhecimento de emoções", "Resolução de conflitos", "Empatia", "Comunicação assertiva"]
        }
    ];

    return (
        <Layout>
            <SEO
                title="Psicologia Infantil em Anápolis | Clínica Fono Inova"
                description="Atendimento psicológico infantil para desenvolvimento emocional, comportamento, ansiedade, TDAH e autismo."
                keywords="psicologia infantil, terapia infantil, ansiedade infantil, TDAH, autismo, psicólogo infantil, Anápolis"
                image="/images/servicos/psicologia.jpg"
                url="https://www.clinicafonoinova.com.br/psicologia"
                type="article"
            />

            {/* Hero Section Elegante */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-green-50 to-teal-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-200/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                                <Award className="w-4 h-4 mr-2" />
                                Especialidade em Neurodesenvolvimento
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                TDAH em Crianças: <span className="text-green-600">Entenda</span> os Sintomas e Quando Buscar Ajuda
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Um guia completo baseado em evidências científicas para identificar e compreender
                                o Transtorno de Déficit de Atenção e Hiperatividade na infância.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonAgendamento className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl">
                                    Agendar Avaliação
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </ButtonAgendamento>
                                <ButtonWhatsApp className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300">
                                    Falar com Especialista
                                </ButtonWhatsApp>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl">
                                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl overflow-hidden">

                                    <OptimizedImage
                                        src="/images/psicologia/psico2.jpg"
                                        alt="Criança em acompanhamento psicológico"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-3 rounded-full mr-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">400+</div>
                                            <div className="text-sm text-gray-600">Crianças Atendidas</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estatísticas Importantes */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {statistics.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-green-50 rounded-2xl">
                                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-700">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TDAH Não é Frescura */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                TDAH <span className="text-green-600">Não é Frescura</span> ou Má Criação
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">
                                É importante desmistificar: o TDAH é um transtorno neurobiológico, com bases genéticas,
                                que afeta o funcionamento de partes do cérebro. Não está relacionado à educação dada pelos pais.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Estudos de neuroimagem mostram diferenças na estrutura e funcionamento cerebral de pessoas com TDAH,
                                particularmente em regiões relacionadas ao controle inibitório, atenção e funções executivas.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-2xl">
                                <div className="flex items-start">
                                    <AlertTriangle className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Cada Criança é Única</h3>
                                        <p className="text-blue-700">
                                            Cada criança apresenta diferentes combinações de sintomas e graus de intensidade.
                                            Somente um profissional qualificado pode fazer um diagnóstico preciso através de avaliação abrangente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <img
                                    src="/api/placeholder/500/350"
                                    alt="Neurociência do TDAH"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sintomas do TDAH */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Sintomas do <span className="text-green-600">TDAH</span> em Crianças
                        </h2>
                        <p className="text-xl text-gray-700">
                            Os sintomas devem estar presentes em múltiplos contextos (casa, escola, social) e causar prejuízo significativo no funcionamento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {symptoms.map((symptom, index) => (
                            <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start mb-6">
                                    <div className="bg-green-600 p-3 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300">
                                        {symptom.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600 mb-2">{index + 1}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{symptom.title}</h3>
                                        <p className="text-gray-700 mb-3">{symptom.description}</p>
                                        <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">{symptom.details}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tipos de TDAH */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Tipos de <span className="text-green-600">TDAH</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            O TDAH se manifesta de diferentes formas, sendo classificado em três subtipos principais.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {adhdTypes.map((type, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Brain className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.type}</h3>
                                <p className="text-gray-600 mb-4">{type.description}</p>
                                <ul className="text-left space-y-2">
                                    {type.characteristics.map((char, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            {char}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Abordagens Terapêuticas */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Abordagens <span className="text-green-600">Terapêuticas</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Nossa abordagem multimodal combina diferentes estratégias para maximizar os resultados.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {therapies.map((therapy, index) => (
                            <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{therapy.title}</h3>
                                <p className="text-gray-600 mb-4">{therapy.description}</p>
                                <ul className="space-y-2">
                                    {therapy.techniques.map((tech, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quando Buscar Ajuda */}
            <section className="py-20 bg-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Quando Buscar <span className="text-green-600">Ajuda</span>?
                    </h2>
                    <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                        A hora de procurar ajuda é quando os sintomas estão presentes em mais de um ambiente,
                        persistem por mais de seis meses e causam prejuízo real no desempenho escolar e nos relacionamentos.
                    </p>

                    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <div>
                                <h3 className="text-lg font-semibold text-green-600 mb-3">Sinais de Alerta</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">• Dificuldade acadêmica persistente</li>
                                    <li className="flex items-center">• Conflitos frequentes com colegas</li>
                                    <li className="flex items-center">• Baixa autoestima e frustração</li>
                                    <li className="flex items-center">• Estresse familiar relacionado ao comportamento</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-green-600 mb-3">Benefícios da Intervenção</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">• Melhora no desempenho escolar</li>
                                    <li className="flex items-center">• Melhores relações sociais</li>
                                    <li className="flex items-center">• Desenvolvimento de estratégias de coping</li>
                                    <li className="flex items-center">• Melhor autoestima e autoconceito</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Histórias de <span className="text-green-600">Transformação</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Depoimentos de famílias que vivenciaram a jornada do TDAH com apoio especializado.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-300 text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-green-200 mb-4" />
                                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Perguntas <span className="text-green-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                >
                                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openAccordion === index ? 'transform rotate-180' : ''
                                        }`} />
                                </button>
                                {openAccordion === index && (
                                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final Otimizado */}
            {/* CTA Final – Verde Fono Inova */}
            <section
                className="
    relative isolate z-10
    py-20
    bg-gradient-to-br from-[#26977B] via-[#22a086] to-[#1c8a74]
    text-white
    overflow-hidden
  "
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Urgência */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="font-semibold">Apenas 5 vagas disponíveis esta semana</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Pronto para Transformar a Vida do Seu Filho?
                        </h2>

                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Não espere mais! Agende agora sua avaliação e dê o primeiro passo para o desenvolvimento pleno do seu filho.
                        </p>

                        {/* Benefícios Rápidos */}
                        <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Avaliação Detalhada</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Plano Personalizado</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Resultados Reais</p>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <ButtonWhatsApp
                                className="bg-white hover:bg-gray-100 text-[#26977B] px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Olá! Vi a página de Psicologia e gostaria de agendar uma avaliação."
                            >
                                <MessageCircle className="w-6 h-6" />
                                Agendar Avaliação Agora
                            </ButtonWhatsApp>

                            <a
                                href="tel:6237063924"
                                className="border-2 border-white text-white hover:bg-white hover:text-[#26977B] px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3"
                            >
                                <Phone className="w-6 h-6" />
                                Ligar Agora
                            </a>
                        </div>

                        {/* Garantias */}
                        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-white" />
                                <span>Ambiente Seguro</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-white" />
                                <span>Equipe Certificada</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-white fill-white" />
                                <span>4.9/5 Avaliação</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
};

export default PsicoPage;