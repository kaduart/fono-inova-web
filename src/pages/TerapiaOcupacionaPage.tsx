import {
    Accessibility,
    AlertTriangle,
    ArrowRight,
    Award,
    Brain,
    BrainCircuit,
    CheckCircle,
    ChevronDown,
    Clock,
    HandHeart,
    MessageCircle,
    Phone,
    Quote,
    Shield,
    Sprout,
    Star
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import ButtonAgendamento from '../components/ui/ButtonAgendamento';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { useServiceViewTime } from '../hooks/useAnalytics';
import { schemaFAQTO, schemaTerapiaOcupacional } from '../schemas/clinicaSchemas';

const TerapiaOcupacionalPage = () => {
    useServiceViewTime('Terapia Ocupacional');
    const [openAccordion, setOpenAccordion] = useState(null);

    // Benefícios da Terapia Ocupacional
    const benefits = [
        {
            icon: <BrainCircuit className="w-10 h-10" />,
            title: "Integração Sensorial",
            description: "Melhora o processamento de estímulos sensoriais",
            details: "Técnicas para regular respostas a estímulos táteis, vestibulares, proprioceptivos e outros.",
            features: ["Processamento tátil", "Regulação vestibular", "Consciência corporal", "Modulação sensorial"]
        },
        {
            icon: <Accessibility className="w-10 h-10" />,
            title: "Atividades de Vida Diária",
            description: "Desenvolve autonomia para vestir, alimentar e higiene",
            details: "Treino de habilidades práticas para independência nas atividades cotidianas.",
            features: ["Alimentação independente", "Vestuário autonomia", "Hábitos de higiene", "Organização pessoal"]
        },
        {
            icon: <HandHeart className="w-10 h-10" />,
            title: "Coordenação Motora",
            description: "Fortalece habilidades motoras finas e grossas",
            details: "Desenvolvimento da coordenação óculo-manual, força e destreza manual.",
            features: ["Motricidade fina", "Coordenação bilateral", "Força muscular", "Preensão e manipulação"]
        },
        {
            icon: <Brain className="w-10 h-10" />,
            title: "Desenvolvimento Cognitivo",
            description: "Estimula atenção, memória e resolução de problemas",
            details: "Estratégias para melhorar funções executivas e processamento cognitivo.",
            features: ["Atenção sustentada", "Memória de trabalho", "Planejamento", "Resolução de problemas"]
        }
    ];

    // Sinais de que a criança pode precisar de TO
    const signs = [
        {
            title: "Dificuldade com texturas de alimentos ou roupas",
            description: "Recusa alimentar seletiva ou desconforto com certos tecidos",
            details: "Hipersensibilidade tátil que interfere na alimentação e vestuário."
        },
        {
            title: "Problemas de coordenação e equilíbrio",
            description: "Dificuldade em atividades físicas e esportivas",
            details: "Quedas frequentes, dificuldade em andar de bicicleta ou chutar bola."
        },
        {
            title: "Dificuldade para segurar lápis ou usar tesoura",
            description: "Preensão imatura ou força inadequada",
            details: "Postura inadequada para escrita, cortes imprecisos com tesoura."
        },
        {
            title: "Hiperatividade ou letargia excessiva",
            description: "Padrões atípicos de nível de alerta",
            details: "Inquietação constante ou falta de energia para atividades apropriadas."
        },
        {
            title: "Dificuldade em aprender tarefas simples",
            description: "Problemas com sequenciamento e organização",
            details: "Dificuldade em seguir rotinas ou sequências de atividades."
        },
        {
            title: "Problemas de atenção e concentração",
            description: "Dificuldade em manter o foco em atividades",
            details: "Distração fácil, não termina tarefas, necessita muita supervisão."
        },
        {
            title: "Frustração frequente com atividades motoras",
            description: "Baixa tolerância à frustração em tarefas desafiantes",
            details: "Choro, birras ou evitação de atividades que exigem esforço motor."
        },
        {
            title: "Atraso no desenvolvimento de habilidades",
            description: "Não atinge marcos esperados para a idade",
            details: "Habilidades motoras, de autocuidado ou sociais abaixo do esperado."
        }
    ];

    // Estatísticas baseadas em pesquisas
    const statistics = [
        { value: "1 em 6", label: "crianças tem dificuldades de desenvolvimento" },
        { value: "85%", label: "melhora com intervenção precoce" },
        { value: "94%", label: "dos pais relatam melhoras significativas" },
        { value: "2x", label: "mais chances de sucesso escolar" }
    ];

    // Condições atendidas
    const conditions = [
        {
            name: "Transtorno do Espectro Autista (TEA)",
            description: "Intervenção sensorial e de habilidades sociais"
        },
        {
            name: "Transtorno de Déficit de Atenção (TDAH)",
            description: "Estratégias para organização e regulação"
        },
        {
            name: "Atrasos do Desenvolvimento",
            description: "Estimulação global das habilidades"
        },
        {
            name: "Dificuldades de Aprendizagem",
            description: "Integração sensório-motora para aprendizagem"
        },
        {
            name: "Disfunções de Integração Sensorial",
            description: "Regulação de respostas sensoriais"
        },
        {
            name: "Paralisia Cerebral",
            description: "Adaptações e desenvolvimento funcional"
        }
    ];

    // Depoimentos
    const testimonials = [
        {
            name: "Fernanda Costa",
            role: "Mãe do Miguel, 6 anos (TEA)",
            content: "A terapia ocupacional transformou a vida do Miguel. Ele consegue se vestir sozinho agora e está muito mais regulado sensorialmente. As terapeutas são anjos!",
            rating: 5
        },
        {
            name: "Ricardo Almeida",
            role: "Pai da Sofia, 5 anos",
            content: "Sofia tinha aversão a várias texturas de alimentos. Com a TO, ela experimenta novos alimentos e está muito mais aberta a experiências sensoriais.",
            rating: 5
        },
        {
            name: "Patrícia Santos",
            role: "Mãe do Lucas, 7 anos (TDAH)",
            content: "As estratégias de organização que aprendemos na TO foram revolucionárias. Lucas consegue seguir rotinas e está indo muito melhor na escola.",
            rating: 5
        }
    ];

    // FAQs
    const faqs = [
        {
            question: "Com que idade devo procurar terapia ocupacional?",
            answer: "A partir dos 2-3 anos, quando começam a surgir preocupações com desenvolvimento. Quanto mais cedo a intervenção, melhores os resultados."
        },
        {
            question: "Quanto tempo dura cada sessão de terapia ocupacional?",
            answer: "Geralmente 45-60 minutos, dependendo da idade e necessidades da criança. Sessões são geralmente semanais."
        },
        {
            question: "Os planos de saúde cobrem terapia ocupacional?",
            answer: "Sim, a maioria dos planos cobre sessões de TO. Verifique com sua operadora o número de sessões autorizadas anualmente."
        },
        {
            question: "Preciso participar das sessões com meu filho?",
            answer: "Sim, a participação familiar é essencial. Os pais aprendem estratégias para dar continuidade ao trabalho em casa."
        }
    ];

    // Abordagens terapêuticas
    const approaches = [
        {
            title: "Integração Sensorial",
            description: "Baseada na teoria de Ayres, foca em organizar as sensações do próprio corpo e do ambiente",
            techniques: ["Brincadeiras sensoriais", "Atividades vestibulares", "Estimulação tátil", "Regulação proprioceptiva"]
        },
        {
            title: "Abordagem CO-OP",
            description: "Abordagem cognitiva para desenvolvimento de habilidades motoras",
            techniques: ["Solução de problemas", "Metas orientadas por criança", "Descoberta guiada", "Estratégias cognitivas"]
        },
        {
            title: "Terapia de Mão",
            description: "Foca no desenvolvimento de habilidades manuais e de preensão",
            techniques: ["Fortalecimento muscular", "Coordenação motora fina", "Destreza manual", "Preparação para escrita"]
        }
    ];

    return (
        <Layout>
            <SEO
                title="Terapia Ocupacional Infantil em Anápolis | Jundiaí - Fono Inova"
                description="Terapia ocupacional para integração sensorial e autonomia infantil no bairro Jundiaí, Anápolis. Sessões de integração sensorial e coordenação motora."
                keywords="terapia ocupacional infantil anapolis, integracao sensorial jundiai, autonomia criança anapolis, to infantil"
                image="/images/servicos/terapia-ocupacional.jpg"
                url="https://www.clinicafonoinova.com.br/terapia-ocupacional"
                type="article"
                schema={[schemaTerapiaOcupacional, schemaFAQTO]}
            />

            {/* Hero Section Elegante */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-200/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Se você está em <strong>Anápolis</strong> e seu filho tem dificuldades de coordenação,
                                autonomia ou sensibilidade a texturas, nossa equipe no bairro <strong>Jundiaí</strong>
                                oferece terapia ocupacional especializada para transformar o desenvolvimento infantil.
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Terapia Ocupacional <span className="text-amber-600">Infantil</span>: Como Ajuda no Desenvolvimento
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Entenda como a TO pode transformar o desenvolvimento do seu filho através de
                                atividades lúdicas e estratégias especializadas baseadas em evidências científicas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonAgendamento className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl">
                                    Agendar Avaliação
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </ButtonAgendamento>
                                <ButtonWhatsApp className="border border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300">
                                    Falar com Especialista
                                </ButtonWhatsApp>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl">
                                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                                    <OptimizedImage
                                        src="/images/terapia-ocupacional/to1.jpg"
                                        alt="Criança em sessão de terapia ocupacional"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-3 rounded-full mr-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">350+</div>
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
                            <div key={index} className="text-center p-6 bg-amber-50 rounded-2xl">
                                <div className="text-3xl font-bold text-amber-600 mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-700">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Localização estratégica */}
            <section className="py-8 bg-amber-50 border-y border-amber-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-amber-800 font-medium">
                        📍 Atendimento presencial no bairro Jundiaí, Anápolis/GO |
                        Fácil acesso para Vila Santa e Centro
                    </p>
                </div>
            </section>

            {/* O que é Terapia Ocupacional Infantil */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                O que é <span className="text-amber-600">Terapia Ocupacional Infantil</span>?
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">
                                A Terapia Ocupacional Infantil ajuda crianças a desenvolver as habilidades necessárias para
                                realizar suas "ocupações" - brincar, aprender e realizar atividades diárias.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Através de intervenções especializadas, a TO promove o desenvolvimento de forma lúdica e
                                significativa, sempre considerando o potencial único de cada criança.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-2xl">
                                <div className="flex items-start">
                                    <AlertTriangle className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Para quem é indicada?</h3>
                                        <p className="text-blue-700">
                                            A TO é recomendada para crianças com atrasos no desenvolvimento, TEA, TDAH,
                                            dificuldades motoras, sensoriais ou qualquer condição que afete sua capacidade
                                            de participar plenamente das atividades diárias.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <OptimizedImage
                                    src="/images/terapia-ocupacional/to3.jpg"
                                    alt="Criança em acompanhamento terapia ocupacional"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefícios da Terapia Ocupacional */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Benefícios da <span className="text-amber-600">Terapia Ocupacional</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Desenvolvimento de habilidades essenciais através de intervenções especializadas e baseadas em evidências.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start mb-6">
                                    <div className="bg-amber-600 p-3 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                        <p className="text-gray-700 mb-3">{benefit.description}</p>
                                        <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">{benefit.details}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {benefit.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sinais de que a criança pode precisar de TO */}
            <section className="py-20 bg-amber-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Sinais de que seu filho pode se <span className="text-amber-600">beneficiar da TO</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Observe estes sinais que podem indicar a necessidade de avaliação especializada.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {signs.map((sign, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-start mb-4">
                                    <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{sign.title}</h3>
                                        <p className="text-gray-700 mb-2">{sign.description}</p>
                                        <p className="text-sm text-gray-600">{sign.details}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Condições Atendidas */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Condições <span className="text-amber-600">Atendidas</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Atuamos com diversas condições que afetam o desenvolvimento e participação infantil.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {conditions.map((condition, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sprout className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{condition.name}</h3>
                                <p className="text-sm text-gray-600">{condition.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Abordagens Terapêuticas */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Abordagens <span className="text-amber-600">Terapêuticas</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Utilizamos diversas abordagens baseadas em evidências científicas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {approaches.map((approach, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{approach.title}</h3>
                                <p className="text-gray-600 mb-4">{approach.description}</p>
                                <ul className="space-y-2">
                                    {approach.techniques.map((tech, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-amber-500 mr-2" />
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Histórias de <span className="text-amber-600">Sucesso</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Depoimentos de famílias que vivenciaram transformações através da terapia ocupacional.
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
                                <Quote className="w-8 h-8 text-amber-200 mb-4" />
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
                            Perguntas <span className="text-amber-600">Frequentes</span>
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
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-700 to-yellow-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        {/* Urgência */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">Apenas 5 vagas disponíveis esta semana</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Pronto para Apoiar o Desenvolvimento do Seu Filho?
                        </h2>

                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Agende uma avaliação com nossa equipe especializada e descubra como a terapia ocupacional pode fazer a diferença no desenvolvimento do seu filho.
                        </p>

                        {/* Benefícios Rápidos */}
                        <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-semibold">Integração Sensorial</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-semibold">Autonomia no Dia a Dia</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-semibold">Coordenação Motora</p>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <ButtonWhatsApp
                                className="bg-white hover:bg-gray-100 text-amber-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Olá! Vi a página de Terapia Ocupacional e gostaria de agendar uma avaliação para meu filho(a)."
                            >
                                <MessageCircle className="w-6 h-6" />
                                Agendar Avaliação Agora
                            </ButtonWhatsApp>

                            <a href="tel:6237063924"
                                className="border-2 border-white text-white hover:bg-white hover:text-amber-700 px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3"
                            >
                                <Phone className="w-6 h-6" />
                                Ligar Agora
                            </a>
                        </div>

                        {/* Garantia/Trust */}
                        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                <span>Ambiente Adaptado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                <span>Terapeutas Certificados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-white" />
                                <span>4.9/5 Avaliação</span>
                            </div>
                        </div>
                    </div>
                    {/* Endereço completo */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-white/80">
                            📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Bairro Jundiaí • Anápolis/GO
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                            Atendimento de segunda a sábado • ESTACIONAMENTO GRATUITO
                        </p>
                    </div>
                </div>
            </section>
        </Layout >
    );
};

export default TerapiaOcupacionalPage;