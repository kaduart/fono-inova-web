import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Award,
    Book,
    BookOpen,
    Brain,
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
    GraduationCap,
    MapPin,
    MessageCircle,
    Pencil,
    Phone,
    Puzzle,
    Quote,
    Shield,
    Star,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { useServiceViewTime } from '../hooks/useAnalytics';
import { schemaFAQPsicopedagogia, schemaPsicopedagogia } from '../schemas/clinicaSchemas';

const PsicopedagogiaPage = () => {
    useServiceViewTime('Psicopedagogia');
    const [openAccordion, setOpenAccordion] = useState(null);

    // Serviços de psicopedagogia
    const services = [
        {
            icon: <Brain className="w-10 h-10" />,
            title: "Avaliação Psicopedagógica",
            description: "Investigação completa dos processos de aprendizagem, identificando dificuldades e potencialidades.",
            features: ["Análise do histórico escolar", "Testes pedagógicos específicos", "Avaliação das funções cognitivas", "Relatório com diagnóstico pedagógico"]
        },
        {
            icon: <BookOpen className="w-10 h-10" />,
            title: "Intervenção em Dificuldades de Aprendizagem",
            description: "Atendimento especializado para crianças com dislexia, discalculia, disgrafia e outros transtornos.",
            features: ["Métodos fônicos e multissensoriais", "Estratégias compensatórias", "Reeducação da escrita", "Reforço em matemática"]
        },
        {
            icon: <Puzzle className="w-10 h-10" />,
            title: "Estimulação Cognitiva",
            description: "Programa de estimulação das funções executivas, atenção, memória e raciocínio lógico.",
            features: ["Jogos pedagógicos especializados", "Atividades de desenvolvimento cognitivo", "Treino de estratégias de estudo", "Organização e planejamento"]
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Orientação Escolar e Familiar",
            description: "Apoio e orientação para pais, professores e escola para favorecer o processo de aprendizagem.",
            features: ["Reuniões com a escola", "Orientação de tarefas de casa", "Técnicas de estudo eficazes", "Adequações curriculares"]
        }
    ];

    // 8 Sinais de dificuldades de aprendizagem
    const warningSigns = [
        {
            title: "Dificuldade na Alfabetização",
            description: "Criança que não consegue associar letras e sons, demora muito mais que os colegas para ler ou escreve com muitos erros.",
            details: "Pode indicar dislexia ou outros transtornos específicos de aprendizagem que requerem intervenção especializada.",
            icon: <Book className="w-8 h-8" />
        },
        {
            title: "Problemas com Matemática",
            description: "Dificuldade persistente para entender números, realizar operações básicas ou resolver problemas matemáticos.",
            details: "Discalculia e dificuldades no raciocínio lógico-matemático podem estar presentes e necessitam de abordagem específica.",
            icon: <Target className="w-8 h-8" />
        },
        {
            title: "Escrita Desorganizada",
            description: "Letra ilegível, troca de letras frequente, dificuldade em organizar ideias no papel ou erros ortográficos persistentes.",
            details: "Disgrafia e dificuldades de expressão escrita podem comprometer significativamente o desempenho escolar.",
            icon: <Pencil className="w-8 h-8" />
        },
        {
            title: "Baixo Rendimento Escolar",
            description: "Notas abaixo da média em várias disciplinas, apesar de esforço e tempo dedicado aos estudos.",
            details: "O baixo desempenho pode estar relacionado a transtornos de aprendizagem ou metodologias inadequadas.",
            icon: <TrendingUp className="w-8 h-8" />
        },
        {
            title: "Falta de Atenção e Concentração",
            description: "Distrai-se facilmente durante as aulas e tarefas, não consegue manter o foco por períodos adequados.",
            details: "Déficits atencionais podem estar relacionados ao TDAH ou outras condições que afetam a aprendizagem.",
            icon: <Activity className="w-8 h-8" />
        },
        {
            title: "Desmotivação e Recusa Escolar",
            description: "Perde o interesse pela escola, reclama constantemente, chora ou tem reações físicas antes de ir à escola.",
            details: "A desmotivação pode ser consequência de repetidas experiências de fracasso que afetam a autoestima.",
            icon: <AlertTriangle className="w-8 h-8" />
        },
        {
            title: "Dificuldade em Seguir Instruções",
            description: "Não consegue seguir comandos em sequência, esquece rapidamente o que foi pedido ou precisa de repetições constantes.",
            details: "Problemas de memória de trabalho e processamento de informações podem estar comprometidos.",
            icon: <Brain className="w-8 h-8" />
        },
        {
            title: "Lentidão Excessiva",
            description: "Demora muito mais que os colegas para completar tarefas, precisa de tempo extra em provas e avaliações.",
            details: "A lentidão pode indicar dificuldades de processamento ou perfeccionismo que precisa ser trabalhado.",
            icon: <Clock className="w-8 h-8" />
        }
    ];

    // Sinais por ano escolar
    const warningSignsByAge = [
        { age: "Educação Infantil", signs: ["Dificuldade motora", "Pouco interesse por livros", "Não reconhece letras", "Dificuldade em rimas"] },
        { age: "1º-3º ano", signs: ["Não alfabetiza", "Leitura silabada", "Muitos erros ortográficos", "Dificuldade com números"] },
        { age: "4º-6º ano", signs: ["Leitura lenta", "Compreensão pobre", "Cálculos básicos difíceis", "Desorganização"] },
        { age: "7º-9º ano", signs: ["Baixas notas", "Falta de método de estudo", "Ansiedade em provas", "Evasão escolar"] }
    ];

    // Processo de atendimento
    const processSteps = [
        { step: 1, title: "Entrevista Anamnese", description: "Coleta de histórico escolar e familiar", icon: <MessageCircle className="w-8 h-8" /> },
        { step: 2, title: "Avaliação Diagnóstica", description: "Aplicação de testes e provas pedagógicas", icon: <FileText className="w-8 h-8" /> },
        { step: 3, title: "Devolutiva", description: "Apresentação dos resultados aos pais", icon: <Users className="w-8 h-8" /> },
        { step: 4, title: "Plano de Intervenção", description: "Elaboração de estratégias personalizadas", icon: <Target className="w-8 h-8" /> },
        { step: 5, title: "Acompanhamento", description: "Sessões semanais e reavaliações periódicas", icon: <CheckCircle className="w-8 h-8" /> }
    ];

    // Depoimentos
    const testimonials = [
        {
            name: "Fernanda Lima",
            role: "Mãe da Ana Clara, 8 anos",
            content: "A Ana tinha muita dificuldade na escola. Após o acompanhamento psicopedagógico, ela melhorou muito! Hoje já consegue ler sozinha e as notas subiram. A autoestima dela mudou completamente!",
            rating: 5
        },
        {
            name: "Roberto Souza",
            role: "Pai do Daniel, 10 anos",
            content: "O Daniel foi diagnosticado com dislexia. A psicopedagoga nos ensinou estratégias que fazem toda a diferença. Ele está mais confiante e a escola também está mais preparada para ajudá-lo.",
            rating: 5
        },
        {
            name: "Mariana Costa",
            role: "Mãe do Felipe, 12 anos",
            content: "Felipe tinha dificuldade em matemática e estava muito desmotivado. Com o trabalho psicopedagógico, ele desenvolveu técnicas de estudo e hoje está muito melhor. Gratidão!",
            rating: 5
        }
    ];

    // FAQs
    const faqs = [
        {
            question: "Qual a diferença entre psicopedagogia e neuropsicopedagogia?",
            answer: "A psicopedagogia foca nos processos de aprendizagem e seus aspectos pedagógicos. A neuropsicopedagogia vai além, incluindo o estudo das bases neurológicas da aprendizagem, integrando conhecimentos da neurociência."
        },
        {
            question: "Meu filho precisa de psicopedagogo ou psicólogo?",
            answer: "O psicopedagogo atua especificamente nas dificuldades de aprendizagem escolar. O psicólogo trabalha questões emocionais e comportamentais. Muitas vezes, o trabalho conjunto é ideal."
        },
        {
            question: "Quanto tempo dura o acompanhamento psicopedagógico?",
            answer: "Varia conforme cada caso. Geralmente, são necessários 6 meses a 2 anos de intervenção, com sessões semanais de 50 minutos. Reavaliações são feitas a cada 6 meses."
        },
        {
            question: "A psicopedagogia ajuda em dislexia e discalculia?",
            answer: "Sim! A psicopedagogia é fundamental no tratamento desses transtornos, utilizando métodos específicos e estratégias compensatórias que permitem à criança superar suas dificuldades."
        }
    ];

    // Estatísticas
    const statistics = [
        { value: "10-15%", label: "das crianças têm algum transtorno de aprendizagem" },
        { value: "3-7%", label: "têm dislexia" },
        { value: "80%", label: "melhoram com intervenção psicopedagógica" },
        { value: "6-24", label: "meses é o tempo médio de tratamento" }
    ];

    return (
        <Layout>
            <SEO
                title="Psicopedagogia em Anápolis | Dislexia e Dificuldades Escolares - Fono Inova"
                description="Avaliação psicopedagógica para dificuldades de aprendizagem, dislexia e TDAH no bairro Jundiaí, Anápolis. Atendimento especializado infantil."
                keywords="psicopedagogia anapolis, dislexia anapolis, dificuldade escolar jundiai, psicopedagoga anapolis"
                image="/images/servicos/psicopedagogia.jpg"
                url="https://www.clinicafonoinova.com.br/psicopedagogia"
                type="article"
                schema={[schemaPsicopedagogia, schemaFAQPsicopedagogia]} // Array aqui!
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-200/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-orange-200/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-medium mb-6 shadow-sm">
                                <Award className="w-4 h-4 mr-2" />
                                Especialistas em Aprendizagem
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Psicopedagogia: <span className="text-amber-600">8 Sinais</span> de Dificuldades de Aprendizagem
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Entenda quando seu filho precisa de apoio psicopedagógico em <strong>Anápolis</strong>.
                                No bairro <strong>Jundiaí</strong>, ajudamos crianças com dificuldades de alfabetização,
                                dislexia e TDAH a transformarem desafios escolares em conquistas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-2xl shadow-md">
                                    Agendar Avaliação
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button>
                                <button className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-sm">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Falar com Psicopedagoga
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                    <OptimizedImage
                                        src="/images/psicopedagoga/psicopedagoga.jpeg"
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
                                        <div className="text-2xl font-bold text-gray-900">600+</div>
                                        <div className="text-sm text-gray-600 font-medium">Crianças Ajudadas</div>
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
                            <div key={index} className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="text-3xl font-bold text-amber-600 mb-2 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-inner">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-700 mt-3 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Localização */}
            <section className="py-8 bg-amber-50 border-y border-amber-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-amber-800 font-medium flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Atendimento presencial no bairro Jundiaí, Anápolis/GO |
                        Fácil acesso para Centro e Vila Santa
                    </p>
                </div>
            </section>

            {/* 8 Sinais */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Os <span className="text-amber-600">8 Sinais</span> de Dificuldades de Aprendizagem
                        </h2>
                        <p className="text-xl text-gray-700">
                            Reconhecer precocemente os sinais de dificuldades escolares é fundamental para uma intervenção eficaz.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {warningSigns.map((sign, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-amber-100">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-2xl text-amber-600 mr-6 group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-300">
                                        {sign.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-amber-600 mb-2 bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{sign.title}</h3>
                                        <p className="text-gray-700 mb-3 leading-relaxed">{sign.description}</p>
                                        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-300">
                                            <p className="text-sm text-amber-800">{sign.details}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sinais por Ano Escolar */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Sinais de <span className="text-amber-600">Alerta</span> por Etapa Escolar
                        </h2>
                        <p className="text-xl text-gray-700">
                            Cada fase do desenvolvimento escolar apresenta desafios específicos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {warningSignsByAge.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-amber-100 transition-all duration-300">
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                                        <GraduationCap className="w-8 h-8 text-amber-700" />
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
                                    Nem toda dificuldade escolar é um transtorno de aprendizagem. A avaliação psicopedagógica diferencia dificuldades transitórias de transtornos específicos, orientando a melhor intervenção.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Serviços */}
            <section className="py-20 bg-gradient-to-br from-amber-50/70 to-orange-50/70">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nossos <span className="text-amber-600">Serviços</span> Psicopedagógicos
                        </h2>
                        <p className="text-xl text-gray-700">
                            Atendimento especializado com metodologias comprovadas para superar dificuldades de aprendizagem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-amber-100">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-4 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{service.title}</h3>
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
                            Nosso <span className="text-amber-600">Processo</span> de Atendimento
                        </h2>
                        <p className="text-xl text-gray-700">
                            Da avaliação à intervenção, um caminho estruturado para o sucesso escolar.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-6 relative">
                        <div className="absolute top-16 left-10 right-10 h-1 bg-gradient-to-r from-amber-200 to-orange-200 hidden md:block" />
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center relative group">
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-amber-100 transition-all duration-300">
                                    <div className="text-2xl font-bold text-amber-600 mb-2">{step.step}</div>
                                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Histórias de <span className="text-amber-600">Sucesso</span> Escolar
                        </h2>
                        <p className="text-xl text-gray-700">
                            Como a psicopedagogia transformou a vida escolar dessas crianças.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-amber-100 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-amber-200 mb-4" />
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
                            Perguntas <span className="text-amber-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-amber-200 transition-colors duration-300">
                                <button
                                    className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-amber-50 transition-colors duration-300"
                                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                >
                                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openAccordion === index ? 'transform rotate-180' : ''}`} />
                                </button>
                                {openAccordion === index && (
                                    <div className="p-6 bg-amber-50 border-t border-amber-100">
                                        <p className="text-gray-700">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="relative isolate z-10 py-20 bg-gradient-to-br from-amber-600 via-orange-700 to-yellow-800 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="font-semibold">Início imediato disponível</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Transforme as Dificuldades em Conquistas Escolares
                        </h2>

                        <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Não deixe as dificuldades de aprendizagem limitarem o potencial do seu filho.
                            Agende uma avaliação e descubra como podemos ajudar no desenvolvimento escolar.
                        </p>

                        {/* Benefícios Rápidos */}
                        <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Avaliação Completa</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Plano Personalizado</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                                <p className="font-semibold">Acompanhamento Contínuo</p>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="bg-white hover:bg-gray-100 text-amber-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3">
                                <MessageCircle className="w-6 h-6" />
                                Agendar Avaliação Agora
                            </button>

                            <a
                                href="tel:SEU-TELEFONE"
                                className="border-2 border-white text-white hover:bg-white hover:text-amber-700 px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3"
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
                </div>
            </section>
        </Layout>
    );
};

export default PsicopedagogiaPage;