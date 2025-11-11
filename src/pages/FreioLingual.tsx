import {
    Activity,
    AlertTriangle,
    Award,
    Baby,
    BookOpen,
    Brain,
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
    Heart,
    MessageCircle,
    Phone,
    Quote,
    Scissors,
    Shield,
    Star,
    Target,
    Users
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { useServiceViewTime } from '../hooks/useAnalytics';

const FreioLingualPage = () => {
    useServiceViewTime('Freio Lingual');
    const [openAccordion, setOpenAccordion] = useState(null);

    // Serviços relacionados ao freio lingual
    const services = [
        {
            icon: <FileText className="w-10 h-10" />,
            title: "Avaliação do Freio Lingual",
            description: "Avaliação detalhada utilizando protocolos padronizados para identificar alterações no freio lingual e seu impacto funcional.",
            features: ["Protocolo de Bristol", "Teste da linguinha", "Análise funcional completa", "Relatório detalhado com recomendações"]
        },
        {
            icon: <Scissors className="w-10 h-10" />,
            title: "Encaminhamento Cirúrgico",
            description: "Orientação e encaminhamento para procedimento de frenotomia ou frenectomia quando necessário.",
            features: ["Avaliação pré-cirúrgica", "Indicação precisa", "Rede de profissionais parceiros", "Acompanhamento pós-operatório"]
        },
        {
            icon: <Activity className="w-10 h-10" />,
            title: "Terapia Miofuncional",
            description: "Exercícios especializados para reabilitação da musculatura orofacial antes e após a liberação do freio.",
            features: ["Exercícios de mobilidade lingual", "Fortalecimento muscular", "Treino de funções orofaciais", "Protocolo individualizado"]
        },
        {
            icon: <Baby className="w-10 h-10" />,
            title: "Orientação para Amamentação",
            description: "Suporte especializado para mães com bebês que apresentam dificuldades na amamentação devido ao freio lingual.",
            features: ["Avaliação da pega", "Técnicas de posicionamento", "Orientação sobre extração de leite", "Acompanhamento contínuo"]
        }
    ];

    // 8 Sinais de freio lingual alterado
    const warningSigns = [
        {
            title: "Dificuldade na Amamentação",
            description: "Bebê que não consegue manter a pega adequada, causando dor, fissuras nos mamilos e baixo ganho de peso.",
            details: "A língua presa impede a movimentação adequada para sugar eficientemente, levando a mamadas longas, cansativas e pouco produtivas.",
            icon: <Baby className="w-8 h-8" />
        },
        {
            title: "Língua em Formato de Coração",
            description: "Ao tentar projetar a língua para fora, ela forma um formato de coração devido à tração do freio curto.",
            details: "Este sinal visual é um dos mais característicos e facilmente identificáveis de freio lingual alterado.",
            icon: <Heart className="w-8 h-8" />
        },
        {
            title: "Dificuldade em Movimentar a Língua",
            description: "Limitação para tocar o céu da boca, movimentar lateralmente ou projetar a língua para fora da boca.",
            details: "A restrição de mobilidade pode impactar funções como mastigação, deglutição e articulação da fala.",
            icon: <Activity className="w-8 h-8" />
        },
        {
            title: "Problemas de Fala",
            description: "Dificuldade para pronunciar sons como R, L, S, Z, T, D, N que exigem elevação e mobilidade da língua.",
            details: "A articulação comprometida pode resultar em fala infantilizada ou distorções fonéticas persistentes.",
            icon: <MessageCircle className="w-8 h-8" />
        },
        {
            title: "Dificuldade para Mastigar",
            description: "Problema ao mastigar alimentos sólidos, preferência por alimentos pastosos ou líquidos.",
            details: "A língua presa dificulta a manipulação do alimento na boca, comprometendo a mastigação eficiente.",
            icon: <Users className="w-8 h-8" />
        },
        {
            title: "Problemas Dentários",
            description: "Diastema (espaço entre os dentes inferiores), mordida aberta anterior ou recuo mandibular.",
            details: "A postura inadequada da língua pode interferir no crescimento e desenvolvimento craniofacial.",
            icon: <Target className="w-8 h-8" />
        },
        {
            title: "Respiração Oral",
            description: "Tendência a respirar pela boca devido à postura inadequada da língua que não sela o palato.",
            details: "A respiração oral crônica pode levar a diversos problemas de saúde, incluindo alterações faciais.",
            icon: <Brain className="w-8 h-8" />
        },
        {
            title: "Dificuldades Sociais",
            description: "Constrangimento ao comer em público, evitar certos alimentos ou autoconsciência com a fala.",
            details: "O impacto emocional e social do freio alterado pode afetar a autoestima e qualidade de vida.",
            icon: <AlertTriangle className="w-8 h-8" />
        }
    ];

    // Sinais por faixa etária
    const warningSignsByAge = [
        { age: "0-6 meses", signs: ["Dificuldade na pega", "Mamadas demoradas", "Baixo ganho de peso", "Dor na amamentação"] },
        { age: "6-12 meses", signs: ["Dificuldade com introdução alimentar", "Engasgos frequentes", "Recusa de texturas", "Língua em formato de coração"] },
        { age: "1-3 anos", signs: ["Atraso na fala", "Dificuldade com palavras", "Preferência por líquidos", "Baba excessiva"] },
        { age: "3+ anos", signs: ["Distúrbio articulatório", "Mordida alterada", "Diastema inferior", "Dificuldade com higiene oral"] }
    ];

    // Processo de avaliação e tratamento
    const processSteps = [
        { step: 1, title: "Triagem Inicial", description: "Identificação de sinais clínicos e histórico", icon: <MessageCircle className="w-8 h-8" /> },
        { step: 2, title: "Avaliação Detalhada", description: "Protocolos específicos e exame clínico completo", icon: <FileText className="w-8 h-8" /> },
        { step: 3, title: "Diagnóstico", description: "Classificação do tipo e grau de alteração", icon: <Target className="w-8 h-8" /> },
        { step: 4, title: "Plano de Tratamento", description: "Terapia, cirurgia ou abordagem combinada", icon: <BookOpen className="w-8 h-8" /> },
        { step: 5, title: "Acompanhamento", description: "Reavaliações e ajustes conforme necessário", icon: <CheckCircle className="w-8 h-8" /> }
    ];

    // Depoimentos
    const testimonials = [
        {
            name: "Juliana Costa",
            role: "Mãe do Pedro, 3 meses",
            content: "Após a liberação do freio, a amamentação finalmente funcionou! Pedro ganhou peso, eu não sinto mais dor e nossa conexão melhorou muito. A avaliação foi essencial.",
            rating: 5
        },
        {
            name: "Marcos Silva",
            role: "Pai da Laura, 5 anos",
            content: "A Laura fazia fono há meses sem progressos na fala. Descobrimos o freio curto, fizemos a cirurgia e em semanas vimos mudanças incríveis na pronúncia!",
            rating: 5
        },
        {
            name: "Amanda Ferreira",
            role: "Mãe do Gabriel, 7 anos",
            content: "Gabriel tinha vergonha de sorrir por causa do espaço entre os dentes. Após avaliar o freio e fazer terapia, a mordida melhorou e ele está mais confiante!",
            rating: 5
        }
    ];

    // FAQs
    const faqs = [
        {
            question: "Qual a diferença entre frenotomia e frenectomia?",
            answer: "Frenotomia é um corte simples do freio, geralmente feito em bebês. Frenectomia é a remoção completa do freio, mais comum em crianças maiores e adultos. Ambos são procedimentos rápidos e seguros."
        },
        {
            question: "Quando deve ser feita a cirurgia do freio lingual?",
            answer: "Idealmente, quanto antes melhor. Em bebês com dificuldade de amamentação, pode ser feita nas primeiras semanas. Em crianças maiores, quando há impacto na fala, alimentação ou desenvolvimento orofacial."
        },
        {
            question: "A cirurgia do freio lingual dói?",
            answer: "É feita com anestesia local, causando mínimo desconforto. Em bebês, muitas vezes nem precisa anestesia. A recuperação é rápida, geralmente de 3-7 dias com cuidados simples."
        },
        {
            question: "É necessário fazer fonoterapia após a cirurgia?",
            answer: "Sim, especialmente em crianças maiores. A terapia ajuda a reeducar os movimentos, fortalecer a musculatura e corrigir padrões compensatórios desenvolvidos antes da liberação."
        }
    ];

    // Estatísticas
    const statistics = [
        { value: "4-11%", label: "dos recém-nascidos têm freio lingual alterado" },
        { value: "95%", label: "de sucesso na melhora da amamentação após liberação" },
        { value: "72h", label: "média de recuperação em bebês" },
        { value: "85%", label: "melhoram significativamente a articulação com tratamento" }
    ];

    return (
        <Layout>
            <SEO
                title="Freio Lingual - Avaliação e Tratamento da Língua Presa"
                description="Especialistas em freio lingual: avaliação completa, frenotomia e tratamento para língua presa em bebês, crianças e adultos."
                keywords="freio lingual, língua presa, frenotomia, amamentação, fala, avaliação freio lingual"
                image="/images/servicos/freio-lingual.jpg"
                url="https://www.clinicafonoinova.com.br/freio-lingual"
            />
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-200/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-pink-200/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium mb-6 shadow-sm">
                                <Award className="w-4 h-4 mr-2" />
                                Especialistas em Freio Lingual
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Freio Lingual: <span className="text-purple-600">8 Sinais</span> que Você Precisa Conhecer
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Guia completo sobre língua presa: da identificação precoce ao tratamento adequado para cada idade.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-2xl shadow-md">
                                    Agendar Avaliação
                                </button>
                                <button className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-sm">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Falar com Especialista
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                    <OptimizedImage
                                        src="/images/freio-lingual/mae-bb.jpeg"
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
                                        <div className="text-2xl font-bold text-gray-900">300+</div>
                                        <div className="text-sm text-gray-600 font-medium">Casos Atendidos</div>
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
                            <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="text-3xl font-bold text-purple-600 mb-2 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-inner">
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
                            Os <span className="text-purple-600">8 Sinais</span> de Freio Lingual Alterado
                        </h2>
                        <p className="text-xl text-gray-700">
                            Reconhecer estes sinais precocemente pode prevenir problemas futuros na alimentação, fala e desenvolvimento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {warningSigns.map((sign, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-purple-100">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl text-purple-600 mr-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                                        {sign.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600 mb-2 bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{sign.title}</h3>
                                        <p className="text-gray-700 mb-3 leading-relaxed">{sign.description}</p>
                                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
                                            <p className="text-sm text-purple-800">{sign.details}</p>
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
                            Sinais de <span className="text-purple-600">Alerta</span> por Faixa Etária
                        </h2>
                        <p className="text-xl text-gray-700">
                            O freio lingual alterado pode se manifestar de formas diferentes em cada fase do desenvolvimento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {warningSignsByAge.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300">
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                                        <span className="text-xl font-bold text-purple-700">{item.age}</span>
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
                                    O "teste da linguinha" é obrigatório em maternidades brasileiras desde 2014. Se não foi realizado ou há dúvidas, procure avaliação especializada o quanto antes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Serviços */}
            <section className="py-20 bg-gradient-to-br from-purple-50/70 to-pink-50/70">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nossos <span className="text-purple-600">Serviços</span> Especializados
                        </h2>
                        <p className="text-xl text-gray-700">
                            Da avaliação ao tratamento completo, oferecemos cuidado integral para todas as idades.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-purple-100">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{service.title}</h3>
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
                            Nosso <span className="text-purple-600">Processo</span> de Atendimento
                        </h2>
                        <p className="text-xl text-gray-700">
                            Do diagnóstico preciso ao acompanhamento pós-tratamento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-6 relative">
                        <div className="absolute top-16 left-10 right-10 h-1 bg-gradient-to-r from-purple-200 to-pink-200 hidden md:block" />
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center relative group">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-purple-100 transition-all duration-300">
                                    <div className="text-2xl font-bold text-purple-600 mb-2">{step.step}</div>
                                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Histórias de <span className="text-purple-600">Transformação</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Veja como a avaliação e tratamento corretos mudaram vidas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-purple-200 mb-4" />
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
                            Perguntas <span className="text-purple-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-200 transition-colors duration-300">
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-purple-50 transition-colors duration-300"
                                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                >
                                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openAccordion === index ? 'transform rotate-180' : ''}`} />
                                </button>
                                {openAccordion === index && (
                                    <div className="p-6 bg-purple-50 border-t border-purple-100">
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="relative isolate z-10 py-20 bg-gradient-to-br from-purple-600 via-pink-700 to-red-800 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="font-semibold">Avaliação prioritária para bebês</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Não Deixe o Freio Lingual Prejudicar o Desenvolvimento
                        </h2>

                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Quanto mais cedo identificar e tratar, melhores os resultados! Agende agora sua avaliação.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Avaliação Completa</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Protocolo Padronizado</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Tratamento Personalizado</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="bg-white hover:bg-gray-100 text-purple-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3">
                                <MessageCircle className="w-6 h-6" />
                                Agendar Avaliação Agora
                            </button>

                            <a
                                href="tel:6237063924"
                                className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3"
                            >
                                <Phone className="w-6 h-6" />
                                Ligar Agora
                            </a>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-white" />
                                <span>Ambiente Seguro</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-white" />
                                <span>Equipe Especializada</span>
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

export default FreioLingualPage;