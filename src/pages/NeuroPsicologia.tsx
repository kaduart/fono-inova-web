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
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { useServiceViewTime } from '../hooks/useAnalytics';

const NeuropsicologicaPage = () => {
    useServiceViewTime('Avaliação Neuropsicológica');
    const [openAccordion, setOpenAccordion] = useState(null);

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
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-200/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-cyan-200/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 rounded-full text-sm font-medium mb-6 shadow-sm">
                                <Award className="w-4 h-4 mr-2" />
                                Especialistas em Neuropsicologia
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Avaliação Neuropsicológica: <span className="text-teal-600">8 Sinais</span> de Que Você Precisa
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Entenda quando buscar uma avaliação neuropsicológica e como ela pode transformar o desempenho acadêmico e a qualidade de vida.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-2xl shadow-md">
                                    Agendar Avaliação
                                </button>
                                <button className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-sm">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Falar com Neuropsicólogo
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                                    <OptimizedImage
                                        src="/images/neuropsicologia/neuro-2.jpeg"
                                        alt="Criança em terapia fonoaudiológica"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                                <div className="flex items-center">
                                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-full mr-4 shadow-inner">
                                        <CheckCircle className="w-7 h-7 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">400+</div>
                                        <div className="text-sm text-gray-600 font-medium">Avaliações Realizadas</div>
                                    </div>
                                </div>
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

export default NeuropsicologicaPage;