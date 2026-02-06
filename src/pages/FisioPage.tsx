import {
    Activity,
    AlertTriangle,
    Armchair,
    ArrowRight,
    Award,
    Baby,
    Bone,
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
    Footprints,
    MessageCircle,
    Phone,
    Quote,
    Shield,
    Star,
    Target,
    Users,
    Calendar
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonAgendamento from '../components/ui/ButtonAgendamento';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { useServiceViewTime } from '../hooks/useAnalytics';
import { schemaFAQFisio, schemaFisioterapia } from '../schemas/clinicaSchemas';

const FisioPage = () => {
    useServiceViewTime('Fisioterapia');
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    // Condições tratadas
    const conditions = [
        {
            icon: <Baby className="w-10 h-10" />,
            title: "Atraso do Desenvolvimento Motor",
            description: "Quando a criança não atinge os marcos motores esperados para sua idade.",
            details: "Intervenção precoce com estimulação específica para cada fase do desenvolvimento.",
            features: ["Avaliação com escalas padronizadas", "Estimulação neuropsicomotora", "Orientação familiar", "Plano individualizado"]
        },
        {
            icon: <Armchair className="w-10 h-10" />,
            title: "Torcicolo Congênito",
            description: "Encurtamento do músculo esternocleidomastóideo que limita os movimentos do pescoço.",
            details: "Terapia manual, alongamentos e posicionamentos específicos para ganho de amplitude articular.",
            features: ["Terapia manual especializada", "Exercícios de alongamento", "Orientação postural", "Estimulação visual"]
        },
        {
            icon: <Footprints className="w-10 h-10" />,
            title: "Paralisia Cerebral",
            description: "Condição que afeta o movimento, tônus muscular e coordenação.",
            details: "Abordagem neuroevolutiva para promover função, independência e qualidade de vida.",
            features: ["Método Bobath", "Facilitação neuromuscular", "Uso de órteses", "Adaptações funcionais"]
        },
        {
            icon: <Bone className="w-10 h-10" />,
            title: "Lesões Ortopédicas",
            description: "Fraturas, luxações e outras condições que necessitam de reabilitação.",
            details: "Recuperação funcional com foco no retorno às atividades apropriadas para cada idade.",
            features: ["Fisioterapia traumato-ortopédica", "Fortalecimento muscular", "Ganho de amplitude articular", "Treino funcional"]
        }
    ];

    // Marcos do desenvolvimento motor
    const milestones = [
        {
            age: "3 meses",
            skills: "Sustenta a cabeça, abre as mãos, leva as mãos à boca",
            details: "Controle cervical inicial e início da coordenação olho-mão"
        },
        {
            age: "6 meses",
            skills: "Rola, senta com apoio, transfere objetos entre as mãos",
            details: "Ganho de força no tronco e desenvolvimento da preensão"
        },
        {
            age: "9 meses",
            skills: "Senta sem apoio, engatinha, fica em pé com apoio",
            details: "Mobilidade inicial e preparação para a posição ereta"
        },
        {
            age: "12 meses",
            skills: "Fica em pé sozinho, dá os primeiros passos",
            details: "Aquisição da marcha independente e exploração do ambiente"
        },
        {
            age: "18 meses",
            skills: "Anda bem, sobe escadas com ajuda, empurra brinquedos",
            details: "Refinamento da marcha e início da coordenação motora grossa"
        }
    ];

    // Estatísticas baseadas em pesquisas
    const statistics = [
        { value: "10-15%", label: "das crianças apresentam algum atraso motor" },
        { value: "85%", label: "de sucesso com intervenção precoce (antes de 1 ano)" },
        { value: "3-6x", label: "mais eficaz a terapia especializada vs. espera vigilante" },
        { value: "92%", label: "de satisfação dos pais com os resultados" }
    ];

    // Depoimentos
    const testimonials = [
        {
            name: "Mariana Costa",
            role: "Mãe do João, 2 anos",
            content: "O João tinha torcicolo congênito e não conseguia virar a cabeça para o lado direito. Em 3 meses de fisioterapia, ele recuperou toda a amplitude! As terapeutas são incríveis e souberam conquistar sua confiança.",
            rating: 5
        },
        {
            name: "Roberto Silva",
            role: "Pai da Laura, 3 anos",
            content: "Laura tinha atraso motor significativo. Hoje, após 8 meses de terapia, corre, pula e brinca como qualquer criança da idade dela. A evolução foi impressionante!",
            rating: 5
        },
        {
            name: "Carla Mendes",
            role: "Mãe do Pedro, 5 anos (PC)",
            content: "A fisioterapia fez toda a diferença na qualidade de vida do Pedro. As técnicas especializadas ajudaram no controle de tronco e hoje ele tem muito mais independência.",
            rating: 5
        }
    ];

    // FAQs
    const faqs = [
        {
            question: "Com que idade devo me preocupar com atraso motor?",
            answer: "Recomenda-se avaliação se houver diferença de 2-3 meses nos marcos motores esperados. Quanto mais precoce a intervenção, melhores os resultados."
        },
        {
            question: "As sessões são dolorosas para a criança?",
            answer: "Não, utilizamos técnicas suaves e atividades lúdicas adaptadas para cada idade. O tratamento é realizado através de brincadeiras e jogos."
        },
        {
            question: "Quanto tempo dura o tratamento?",
            answer: "Varia conforme a condição e resposta da criança. Em média, de 3 meses a 1 ano, com sessões semanais e reavaliações trimestrais."
        },
        {
            question: "Preciso fazer exercícios com meu filho em casa?",
            answer: "Sim, a participação da família é fundamental. Orientamos exercícios simples e atividades para incorporar na rotina, potencializando os resultados."
        }
    ];

    // Processo de atendimento
    const processSteps = [
        { step: 1, title: "Avaliação Inicial", description: "Avaliação completa com testes padronizados e análise do desenvolvimento motor", icon: <FileText className="w-8 h-8" /> },
        { step: 2, title: "Diagnóstico", description: "Identificação das necessidades específicas e elaboração do plano de tratamento", icon: <Target className="w-8 h-8" /> },
        { step: 3, title: "Intervenção", description: "Sessões terapêuticas com atividades lúdicas e técnicas especializadas", icon: <Activity className="w-8 h-8" /> },
        { step: 4, title: "Orientação Familiar", description: "Treinamento para continuidade do tratamento no ambiente domiciliar", icon: <Users className="w-8 h-8" /> },
        { step: 5, title: "Alta e Acompanhamento", description: "Preparação para alta com plano de manutenção e acompanhamento", icon: <CheckCircle className="w-8 h-8" /> }
    ];

    return (
        <Layout>
            <SEO
                title="Fisioterapia Infantil em Anápolis | Desenvolvimento Motor - Clínica Fono Inova"
                description="Fisioterapia pediátrica para bebês e crianças: desenvolvimento motor, reabilitação e coordenação motora em Anápolis-GO."
                keywords="fisioterapia infantil, desenvolvimento motor, coordenação motora, reabilitação infantil, fisioterapia pediátrica, Anápolis"
                image="/images/servicos/fisioterapia.jpg"
                url="https://www.clinicafonoinova.com.br/fisioterapia"
                type="article"
                schema={[schemaFisioterapia, schemaFAQFisio]} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="animate-fade-in-up order-2 lg:order-1">
                            <Badge variant="secondary" className="mb-4 bg-purple-50 text-purple-700 border-purple-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Fisioterapia Pediátrica
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Fisioterapia <span className="text-purple-600">Pediátrica</span> em Anápolis
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Desenvolvimento motor, reabilitação e acompanhamento especializado para seu filho no bairro <strong>Jundiaí</strong>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Olá! Gostaria de agendar uma avaliação de fisioterapia pediátrica."
                                    icon={Calendar}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Agendar Avaliação
                                </ButtonWhatsApp>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl">
                                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl overflow-hidden">
                                    <OptimizedImage
                                        src="/images/fisioterapia/fisio2.jpg"
                                        alt="Criança em terapia fonoaudiológica"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center">
                                        <div className="bg-green-100 p-3 rounded-full mr-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">300+</div>
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
                            <div key={index} className="text-center p-6 bg-purple-50 rounded-2xl">
                                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-700">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-4 bg-purple-50 border-y">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-medium text-purple-800">
                        📍 Atendimento no bairro Jundiaí, Anápolis/GO | Av. Minas Gerais, 405
                    </p>
                </div>
            </section>

            {/* O que é Fisioterapia Pediátrica */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                O que é <span className="text-purple-600">Fisioterapia Pediátrica</span>?
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">
                                A Fisioterapia Pediátrica é uma especialidade que previne, avalia e trata condições que
                                afetam o desenvolvimento motor infantil desde o nascimento até a adolescência.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Através de técnicas especializadas e atividades lúdicas, ajudamos crianças a alcançarem
                                seu máximo potencial de desenvolvimento, sempre com foco na funcionalidade e qualidade de vida.
                            </p>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-2xl">
                                <div className="flex items-start">
                                    <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Diferencial da Abordagem Pediátrica</h3>
                                        <p className="text-yellow-700">
                                            Diferente da fisioterapia para adultos, a abordagem pediátrica utiliza brincadeiras,
                                            jogos e atividades lúdicas para alcançar os objetivos terapêuticos, tornando o
                                            tratamento prazeroso e motivador para a criança.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <img
                                    src="/api/placeholder/500/350"
                                    alt="Terapia lúdica em fisioterapia pediátrica"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principais Condições Tratadas */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Principais <span className="text-purple-600">Condições Tratadas</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Atendemos diversas condições que afetam o desenvolvimento motor infantil com abordagens especializadas e individualizadas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {conditions.map((condition, index) => (
                            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start mb-6">
                                    <div className="bg-purple-600 p-3 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300">
                                        {condition.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{condition.title}</h3>
                                        <p className="text-gray-700 mb-3">{condition.description}</p>
                                        <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">{condition.details}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {condition.features.map((feature, idx) => (
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

            {/* Marcos do Desenvolvimento Motor */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Marcos do <span className="text-purple-600">Desenvolvimento Motor</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            Guia de referência para acompanhar o desenvolvimento motor típico da criança.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-start p-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} rounded-lg mb-4 last:mb-0`}>
                                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-6">
                                    {milestone.age}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">{milestone.skills}</h3>
                                    <p className="text-sm text-gray-600">{milestone.details}</p>
                                </div>
                            </div>
                        ))}

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mt-6">
                            <p className="text-yellow-700">
                                <strong>Lembre-se:</strong> Cada criança tem seu próprio ritmo de desenvolvimento.
                                Os marcos são apenas referências. Consulte um profissional se houver preocupações ou diferenças
                                significativas em relação a esses parâmetros.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Processo de Atendimento */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nosso <span className="text-purple-600">Processo</span> de Atendimento
                        </h2>
                        <p className="text-xl text-gray-700">
                            Do primeiro contato à alta terapêutica, oferecemos um caminho estruturado e transparente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 relative">
                        <div className="absolute top-16 left-10 right-10 h-1 bg-purple-200 hidden md:block" />
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center relative">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10">
                                    {step.icon}
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600 mb-2">{step.step}</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Histórias de <span className="text-purple-600">Sucesso</span>
                        </h2>
                        <p className="text-xl text-gray-700">
                            A transformação no desenvolvimento motor que impacta vidas inteiras.
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
                                <Quote className="w-8 h-8 text-purple-200 mb-4" />
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
                            Perguntas <span className="text-purple-600">Frequentes</span>
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

            <section className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600 text-sm">Veja também:</p>
                    <div className="flex justify-center gap-4 mt-2 text-sm">
                        <a href="/avaliacao-neuropsicologica-dificuldade-escolar" className="text-purple-600 hover:underline">Dificuldade Escolar</a>
                        <a href="/fala-tardia" className="text-purple-600 hover:underline">Fala Tardia</a>
                        <a href="/freio-lingual" className="text-purple-600 hover:underline">Teste da Linguinha</a>
                    </div>
                </div>
            </section>


            {/* CTA Final Otimizado */}
            <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-700 to-fuchsia-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        {/* Urgência */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">Apenas 5 vagas disponíveis esta semana</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Pronto para Ajudar no Desenvolvimento Motor do Seu Filho?
                        </h2>

                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Agende uma avaliação com nossa equipe especializada e dê o primeiro passo rumo ao pleno desenvolvimento motor infantil.
                        </p>

                        {/* Benefícios Rápidos */}
                        <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-semibold">Avaliação Motora</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-semibold">Técnicas Lúdicas</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-semibold">Evolução Rápida</p>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <ButtonWhatsApp
                                onClick={() => { }}
                                icon={MessageCircle}
                                className="bg-white hover:bg-gray-100 text-purple-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Olá! Vi a página de Fisioterapia e gostaria de agendar uma avaliação para meu filho(a)."
                            >
                                Agendar Avaliação Agora
                            </ButtonWhatsApp>

                            <a
                                href="tel:6237063924"
                                className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3"
                            >
                                <Phone className="w-6 h-6" />
                                Ligar Agora
                            </a>
                        </div>

                        {/* Garantia/Trust */}
                        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                <span>Espaço Adequado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                <span>Fisioterapeutas Especializados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-white" />
                                <span>4.9/5 Avaliação</span>
                            </div>
                        </div>
                    </div>
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

export default FisioPage;