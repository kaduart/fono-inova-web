import {
    Activity,
    AlertTriangle,
    Award,
    Brain,
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
    Focus,
    GraduationCap,
    Heart,
    MessageCircle,
    Phone,
    Puzzle,
    Quote,
    Shield,
    Star,
    Target,
    TrendingUp,
    Calendar
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { useServiceViewTime } from '../hooks/useAnalytics';
import { schemaNeuropsicologia } from '../schemas/clinicaSchemas';

const NeuropsicologicaPage = () => {
    useServiceViewTime('Avaliação Neuropsicológica');
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    // Serviços de avaliação neuropsicológica
    const services = [
        {
            icon: <Brain className="w-10 h-10" />,
            title: "Avaliação Cognitiva Completa",
            description: "Avaliação abrangente das funções cognitivas através de testes padronizados e validados internacionalmente.",
            features: ["Atenção e concentração", "Memória (curta e longa duração)", "Funções executivas", "Velocidade de processamento"]
        },
        {
            icon: <GraduationCap className="w-10 h-10" />,
            title: "Avaliação de Aprendizagem",
            description: "Investigação detalhada das habilidades acadêmicas e identificação de dificuldades específicas de aprendizagem.",
            features: ["Leitura e escrita", "Raciocínio matemático", "Compreensão verbal", "Processamento fonológico"]
        },
        {
            icon: <Puzzle className="w-10 h-10" />,
            title: "Avaliação para TEA e TDAH",
            description: "Protocolo especializado para investigação de Transtorno do Espectro Autista e Transtorno de Déficit de Atenção.",
            features: ["Escalas comportamentais", "Testes de atenção específicos", "Avaliação social e comunicativa", "Relatório diagnóstico completo"]
        },
        {
            icon: <Target className="w-10 h-10" />,
            title: "Reabilitação Neuropsicológica",
            description: "Programa individualizado de estimulação e reabilitação das funções cognitivas comprometidas.",
            features: ["Exercícios cognitivos personalizados", "Estratégias compensatórias", "Orientação familiar", "Reavaliações periódicas"]
        }
    ];

    // 8 Sinais que indicam necessidade de avaliação
    const warningSigns = [
        {
            title: "Dificuldades Escolares Persistentes",
            description: "Baixo rendimento acadêmico apesar de esforço, tempo de estudo adequado e apoio familiar.",
            details: "Pode indicar dificuldades de aprendizagem específicas, déficits cognitivos ou transtornos como dislexia e discalculia.",
            icon: <GraduationCap className="w-8 h-8" />
        },
        {
            title: "Problemas de Atenção e Concentração",
            description: "Dificuldade em manter o foco, distrai-se facilmente, não completa tarefas, comete erros por desatenção.",
            details: "Estes sinais podem estar relacionados ao TDAH ou outros transtornos de atenção que impactam o desempenho.",
            icon: <Focus className="w-8 h-8" />
        },
        {
            title: "Alterações de Memória",
            description: "Esquecimento frequente de informações recentes, dificuldade para lembrar instruções ou conteúdos aprendidos.",
            details: "Problemas de memória podem afetar significativamente o aprendizado e o funcionamento diário.",
            icon: <Brain className="w-8 h-8" />
        },
        {
            title: "Dificuldade em Planejamento e Organização",
            description: "Problemas para organizar materiais, planejar atividades, gerenciar tempo ou seguir sequências de tarefas.",
            details: "Déficits nas funções executivas podem comprometer a autonomia e o desempenho em múltiplas áreas.",
            icon: <Target className="w-8 h-8" />
        },
        {
            title: "Comportamento Impulsivo",
            description: "Age sem pensar nas consequências, dificuldade em esperar sua vez, interrompe conversas frequentemente.",
            details: "A impulsividade pode estar associada a transtornos neuropsicológicos que requerem avaliação específica.",
            icon: <Activity className="w-8 h-8" />
        },
        {
            title: "Lentidão no Processamento",
            description: "Demora muito mais que os colegas para completar tarefas, processar informações ou responder a estímulos.",
            details: "Velocidade de processamento reduzida pode impactar o rendimento escolar e social.",
            icon: <Clock className="w-8 h-8" />
        },
        {
            title: "Mudanças Após Eventos Neurológicos",
            description: "Alterações cognitivas ou comportamentais após TCE, infecções, cirurgias ou outros eventos neurológicos.",
            details: "Avaliação neuropsicológica é fundamental para identificar sequelas e planejar reabilitação adequada.",
            icon: <AlertTriangle className="w-8 h-8" />
        },
        {
            title: "Dificuldades Sociais e Emocionais",
            description: "Problemas para compreender situações sociais, regular emoções ou interpretar pistas não-verbais.",
            details: "Aspectos cognitivos podem estar subjacentes a dificuldades socioemocionais aparentes.",
            icon: <Heart className="w-8 h-8" />
        }
    ];

    // Quando procurar avaliação por idade
    const warningSignsByAge = [
        { age: "3-5 anos", signs: ["Atraso na fala", "Dificuldade com regras", "Problemas motores", "Pouca interação social"] },
        { age: "6-8 anos", signs: ["Dificuldade na alfabetização", "Desatenção na escola", "Baixo rendimento", "Problemas de comportamento"] },
        { age: "9-12 anos", signs: ["Dificuldades específicas (leitura/matemática)", "Desorganização", "Baixa autoestima", "Isolamento social"] },
        { age: "13+ anos", signs: ["Queda no rendimento", "Dificuldade em provas", "Ansiedade/estresse acadêmico", "Problemas executivos"] }
    ];

    // Processo de avaliação
    const processSteps = [
        { step: 1, title: "Entrevista Inicial", description: "Compreensão da queixa, histórico e objetivos", icon: <MessageCircle className="w-8 h-8" /> },
        { step: 2, title: "Testagem", description: "Aplicação de testes padronizados em 4-6 sessões", icon: <FileText className="w-8 h-8" /> },
        { step: 3, title: "Análise dos Dados", description: "Correção, interpretação e integração dos resultados", icon: <Brain className="w-8 h-8" /> },
        { step: 4, title: "Devolutiva", description: "Apresentação dos resultados e recomendações", icon: <TrendingUp className="w-8 h-8" /> },
        { step: 5, title: "Relatório Completo", description: "Documento técnico com diagnóstico e orientações", icon: <CheckCircle className="w-8 h-8" /> }
    ];

    // Depoimentos
    const testimonials = [
        {
            name: "Renata Almeida",
            role: "Mãe do Thiago, 9 anos",
            content: "A avaliação foi esclarecedora! Descobrimos que Thiago tem dislexia. Com as orientações e intervenções adequadas, ele melhorou muito na escola e recuperou a autoestima.",
            rating: 5
        },
        {
            name: "Carlos Ferreira",
            role: "Pai da Beatriz, 12 anos",
            content: "Depois de anos sem entender as dificuldades da Beatriz, a avaliação neuropsicológica trouxe respostas. O relatório ajudou na escola e no tratamento especializado.",
            rating: 5
        },
        {
            name: "Luciana Santos",
            role: "Mãe do Rafael, 7 anos",
            content: "Suspeitávamos de TDAH. A avaliação confirmou e nos deu um plano claro de ação. Rafael está em tratamento e os resultados são visíveis. Gratidão pela dedicação da equipe!",
            rating: 5
        }
    ];

    // FAQs
    const faqs = [
        {
            question: "O que é avaliação neuropsicológica?",
            answer: "É um processo investigativo que utiliza testes padronizados para avaliar funções cognitivas como memória, atenção, linguagem, raciocínio e funções executivas. Identifica pontos fortes e fracos do funcionamento cerebral."
        },
        {
            question: "Quanto tempo dura uma avaliação neuropsicológica?",
            answer: "Geralmente entre 6 a 10 sessões de 50-90 minutos cada, distribuídas ao longo de 4-8 semanas. O tempo pode variar conforme a complexidade do caso e a idade do paciente."
        },
        {
            question: "A avaliação neuropsicológica diagnostica TDAH e TEA?",
            answer: "Sim, a avaliação neuropsicológica é fundamental no processo diagnóstico do TDAH e TEA. Ela complementa a avaliação clínica, fornecendo dados objetivos sobre o funcionamento cognitivo e comportamental."
        },
        {
            question: "Qual a diferença entre avaliação neuropsicológica e psicológica?",
            answer: "A avaliação neuropsicológica foca especificamente nas funções cognitivas e sua relação com o cérebro, utilizando testes padronizados. A avaliação psicológica é mais ampla, incluindo aspectos emocionais e de personalidade."
        }
    ];

    // Estatísticas
    const statistics = [
        { value: "15-20%", label: "das crianças têm alguma dificuldade de aprendizagem" },
        { value: "5-7%", label: "da população tem TDAH" },
        { value: "85%", label: "de melhora com intervenção baseada em avaliação" },
        { value: "100%", label: "dos casos recebem relatório detalhado" }
    ];

    return (
        <Layout>
            <SEO
                title="Avaliação Neuropsicológica em Anápolis | TDAH, TEA e Dislexia"
                description="Avaliação neuropsicológica completa para diagnóstico de TDAH, TEA, dislexia e dificuldades cognitivas em Anápolis-GO."
                keywords="avaliação neuropsicológica, TDAH, TEA, dislexia, funções cognitivas, neuropsicologia, Anápolis"
                image="/images/servicos/neuropsicologica.jpg"
                url="https://www.clinicafonoinova.com.br/avaliacao-neuropsicologica"
                type="article"
                schema={schemaNeuropsicologia}
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-teal-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="animate-fade-in-up order-2 lg:order-1">
                            <Badge variant="secondary" className="mb-4 bg-teal-50 text-teal-700 border-teal-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Neuropsicologia Clínica
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Avaliação <span className="text-teal-600">Neuropsicológica</span> Completa
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Investigação profunda das funções cognitivas, TDAH e TEA no bairro <strong>Jundiaí</strong>, Anápolis.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Olá! Gostaria de agendar uma avaliação neuropsicológica."
                                    icon={Calendar}
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Agendar Avaliação
                                </ButtonWhatsApp>
                            </div>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-square bg-gradient-to-br from-teal-200 to-teal-400 rounded-3xl overflow-hidden shadow-2xl">
                                <OptimizedImage
                                    src="/images/neuropsicologia/neuro-2.jpeg"
                                    alt="Avaliação neuropsicológica"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-teal-50">
                                <p className="text-4xl font-bold text-teal-600">400+</p>
                                <p className="text-sm text-gray-600">Avaliações Realizadas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estatísticas */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {statistics.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="text-3xl font-bold text-teal-600 mb-2 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-inner">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-700 mt-3 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8 Sinais */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Os <span className="text-teal-600">8 Sinais</span> de Que Você Precisa de Avaliação
                        </h2>
                        <p className="text-xl text-gray-700">
                            Identificar precocemente dificuldades cognitivas é fundamental para intervenções eficazes e melhores resultados.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {warningSigns.map((sign, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-teal-100">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-4 rounded-2xl text-teal-600 mr-6 group-hover:from-teal-200 group-hover:to-teal-300 transition-all duration-300">
                                        {sign.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-teal-600 mb-2 bg-teal-100 rounded-full w-10 h-10 flex items-center justify-center">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">{sign.title}</h3>
                                        <p className="text-gray-700 mb-3 leading-relaxed">{sign.description}</p>
                                        <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-300">
                                            <p className="text-sm text-teal-800">{sign.details}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sinais por Idade */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Quando Procurar <span className="text-teal-600">Avaliação</span> por Idade
                        </h2>
                        <p className="text-xl text-gray-700">
                            Diferentes sinais podem aparecer em cada fase do desenvolvimento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {warningSignsByAge.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300">
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                                        <span className="text-xl font-bold text-teal-700">{item.age}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{item.age}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {item.signs.map((sign, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-700">
                                            <span className="text-red-500 mr-2 mt-1">•</span>
                                            <span>{sign}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-6 rounded-2xl mt-12 shadow-sm">
                        <div className="flex items-start">
                            <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Importante</h3>
                                <p className="text-yellow-700">
                                    A avaliação neuropsicológica não serve apenas para diagnosticar problemas. Ela também identifica potenciais, orienta vocação profissional e ajuda no desenvolvimento de talentos específicos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Serviços */}
            <section className="py-20 bg-gradient-to-br from-teal-50/70 to-cyan-50/70">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nossas <span className="text-teal-600">Especialidades</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Avaliações completas e especializadas com metodologias baseadas em evidências científicas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-teal-100">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-4 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">{service.title}</h3>
                                        <p className="text-gray-700 leading-relaxed">{service.description}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Processo */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nosso <span className="text-teal-600">Processo</span> de Avaliação
                        </h2>
                        <p className="text-xl text-gray-700">
                            Um caminho estruturado e científico para compreender o funcionamento cognitivo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-6 relative">
                        <div className="absolute top-16 left-10 right-10 h-1 bg-gradient-to-r from-teal-200 to-cyan-200 hidden md:block" />
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center relative group">
                                <div className="w-20 h-20 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-teal-100 transition-all duration-300">
                                    <div className="text-2xl font-bold text-teal-600 mb-2">{step.step}</div>
                                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gradient-to-br from-teal-50/50 to-cyan-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Histórias de <span className="text-teal-600">Superação</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Como a avaliação neuropsicológica mudou vidas e abriu novos caminhos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-teal-200 mb-4" />
                                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Perguntas <span className="text-teal-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-teal-200 transition-colors duration-300">
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-teal-50 transition-colors duration-300"
                                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                >
                                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openAccordion === index ? 'transform rotate-180' : ''}`} />
                                </button>
                                {openAccordion === index && (
                                    <div className="p-6 bg-teal-50 border-t border-teal-100">
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="relative isolate z-10 py-20 bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="font-semibold">Vagas limitadas para este mês</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Pronto para Entender o Funcionamento Cognitivo?
                        </h2>

                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Agende agora sua avaliação neuropsicológica e obtenha respostas precisas para suas dúvidas.
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
                                onClick={() => { }}
                                icon={MessageCircle}
                                className="bg-white hover:bg-gray-100 text-[#26977B] px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Olá! Vi a página de Psicologia e gostaria de agendar uma avaliação."
                            >
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

        </Layout >
    );
};

export default NeuropsicologicaPage;