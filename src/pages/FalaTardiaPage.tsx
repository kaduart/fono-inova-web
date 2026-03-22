import { AlertCircle, ArrowRight, Baby, Calendar, CheckCircle2, Clock, Heart, MapPin, MessageCircle, MessageSquare, Phone, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFalaTardia, schemaFAQFalaTardia } from '../schemas/clinicaSchemas';

const FalaTardiaPage = () => {
    const [selectedAge, setSelectedAge] = useState<string | null>(null);

    // Dados por faixa etária
    const ageGroups = [
        {
            id: '2anos',
            title: '2 anos',
            problem: 'Fala menos de 50 palavras',
            sinais: [
                'Não junta 2 palavras (ex: "mamãe água")',
                'Vocabulário muito limitado',
                'Usa mais gestos do que palavras',
                'Família não entende o que quer'
            ],
            mensagem: "Oi, vi no site sobre fala tardia. Meu filho tem 2 anos e fala pouco/palavras soltas. Pode me explicar como funciona a avaliação?"
        },
        {
            id: '3anos',
            title: '3 anos',
            problem: 'Não forma frases',
            sinais: [
                'Não fala frases completas',
                'Troca letras constantemente',
                'Dificuldade para ser entendido',
                'Frustração ao se comunicar'
            ],
            mensagem: "Oi, vi no site sobre fala tardia. Meu filho tem 3 anos e ainda não fala frases direito. Pode me explicar como funciona a avaliação?"
        },
        {
            id: '4anos',
            title: '4+ anos',
            problem: 'Fala pouco clara',
            sinais: [
                'Fala enrolada ou confusa',
                'Troca muitos sons (R, L, S)',
                'Evita falar com outras crianças',
                'Preocupação na escola'
            ],
            mensagem: "Oi, vi no site sobre fala tardia. Meu filho tem 4+ anos e tem dificuldade para falar claramente. Pode me explicar como funciona a avaliação?"
        }
    ];

    const beneficios = [
        {
            icon: MessageSquare,
            title: 'Desenvolvimento da Fala',
            description: 'Técnicas lúdicas para expandir vocabulário, formar frases e melhorar a pronúncia de forma natural'
        },
        {
            icon: Clock,
            title: 'Janela Oportuna',
            description: 'Entre 2-4 anos é o período ideal. Quanto antes começar, mais rápido e efetivo o resultado'
        },
        {
            icon: Heart,
            title: 'Orientação aos Pais',
            description: 'Você aprende estratégias práticas para estimular a fala em casa, todos os dias'
        }
    ];

    const depoimentos = [
        {
            estrelas: 5,
            texto: "Meu filho tinha 2 anos e não falava nada... em 3 meses já começou a formar frases!",
            autor: "Mãe do Lucas, 2 anos e 8 meses",
            resultado: "Começou a falar em 3 meses"
        },
        {
            estrelas: 5,
            texto: "A diferença foi absurda. Da frustração de não entender o que ele queria, para ele pedindo água sozinho!",
            autor: "Pai da Mariana, 3 anos",
            resultado: "Comunicação melhorou 100%"
        },
        {
            estrelas: 5,
            texto: "Profissionais maravilhosas! A paciência e o carinho fizeram toda diferença no desenvolvimento da minha filha.",
            autor: "Mãe da Sofia, 2 anos e 6 meses",
            resultado: "Vocabulário triplicou"
        }
    ];

    const metodologia = [
        {
            passo: '1',
            titulo: 'Avaliação Completa',
            descricao: 'Identificamos o perfil comunicativo da criança e as causas do atraso na fala'
        },
        {
            passo: '2',
            titulo: 'Plano Personalizado',
            descricao: 'Criamos estratégias específicas para a idade e necessidade do seu filho'
        },
        {
            passo: '3',
            titulo: 'Terapia Lúdica',
            descricao: 'Usamos brincadeiras e atividades divertidas para estimular a fala naturalmente'
        },
        {
            passo: '4',
            titulo: 'Acompanhamento',
            descricao: 'Monitoramos a evolução e ajustamos o plano para resultados mais rápidos'
        }
    ];

    const faq = [
        {
            pergunta: 'Com que idade devo procurar fonoaudiologia?',
            resposta: 'Se seu filho tem 2 anos e fala menos de 50 palavras, ou 3 anos e não forma frases, é hora de buscar ajuda. Mas pode procurar antes se tiver preocupações!'
        },
        {
            pergunta: 'Quanto tempo leva para ver resultados?',
            resposta: 'Muitas famílias relatam progresso já nas primeiras 6-8 semanas. Cada criança tem seu ritmo, mas a maioria começa a mostrar evolução no primeiro mês de acompanhamento.'
        },
        {
            pergunta: 'Posso esperar até os 4 anos?',
            resposta: 'Não é recomendado. Quanto antes iniciar, mais fácil e rápido o progresso. Entre 2-4 anos é a janela ideal de estimulação cerebral para a linguagem.'
        },
        {
            pergunta: 'O tratamento funciona mesmo?',
            resposta: 'Sim! A fonoterapia tem eficácia comprovada cientificamente. Com acompanhamento regular e envolvimento da família, a maioria das crianças alcança o desenvolvimento esperado.'
        },
        {
            pergunta: 'Preciso de encaminhamento médico?',
            resposta: 'Não! Você pode agendar diretamente. Na Clínica Fono Inova, atendemos particular e diversos convênios. O agendamento é simples pelo WhatsApp.'
        }
    ];

    const estatisticas = [
        { valor: '500+', label: 'Crianças Atendidas', icone: Baby },
        { valor: '85%', label: 'Melhora em 6 meses', icone: CheckCircle2 },
        { valor: '4.9/5', label: 'Avaliação Google', icone: Star },
        { valor: '10+', label: 'Anos de Experiência', icone: Clock }
    ];

    return (
        <Layout>
            <SEO
                title="Meu Filho Não Fala Aos 2 Anos em Anápolis | Fonoaudiologia"
                description="Seu filho tem 2-3 anos e ainda não fala? Fonoaudiologia infantil especializada no bairro Jundiaí, Anápolis. Avaliação do atraso de fala. Agende pelo WhatsApp."
                keywords="atraso na fala anapolis, fonoaudiologia infantil jundiai, fonoaudiólogo anápolis, crianca nao fala aos 2 anos, crianca 3 anos nao fala"
                image="/images/servicos/fala-tardia.jpg"
                url="https://www.clinicafonoinova.com.br/fala-tardia"
                type="article"
                schema={[schemaFalaTardia, schemaFAQFalaTardia]}
            />

            {/* ==================== HERO - FOCADA EM DOR ==================== */}
            <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 via-orange-50/40 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1">
                            {/* Badge de urgência */}
                            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 px-4 py-2 rounded-full mb-6">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-700">
                                    Agenda com poucas vagas esta semana
                                </span>
                            </div>

                            <Badge className="mb-4 bg-orange-50 text-orange-700 border-orange-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Fonoaudiologia Infantil em Anápolis
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Seu Filho Tem{" "}
                                <span className="text-orange-600">2-3 Anos</span>{" "}
                                e Ainda Não Fala Direito?
                            </h1>

                            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-xl">
                                Você não está sozinho. Muitas crianças precisam de um "empurrãozinho" 
                                para desenvolver a fala. Na <strong>Clínica Fono Inova</strong> em Anápolis, 
                                ajudamos seu filho a se comunicar com confiança.
                            </p>

                            {/* Prova social rápida */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-orange-600"
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-900">+200 famílias</span> já transformaram a comunicação do filho
                                </div>
                            </div>

                            {/* CTA Principal */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    message="Oi! Vi no site sobre fala tardia e me identifiquei.\n\nMeu filho(a) ainda não fala muito bem e isso tem me preocupado. Pode me explicar como funciona a avaliação?"
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Falar com Especialista Agora
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </ButtonWhatsApp>

                                <a
                                    href="tel:6237063924"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-5 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    <Phone className="w-5 h-5" />
                                    (62) 3706-3924
                                </a>
                            </div>

                            <p className="text-sm text-slate-500 mt-3">
                                Avaliação completa com direcionamento personalizado
                            </p>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/fala-tardia-hero.jpg"
                                    alt="Criança em sessão de fonoterapia na Clínica Fono Inova"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800';
                                    }}
                                />
                            </div>

                            {/* Card flutuante de estatística */}
                            <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-slate-900">85%</div>
                                        <div className="text-sm text-slate-500">Melhora em 6 meses</div>
                                    </div>
                                </div>
                            </div>

                            {/* Card de avaliação */}
                            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <div className="text-sm text-slate-600 mt-1">4.9 no Google</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SELEÇÃO POR IDADE ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-orange-50 text-orange-700 border-orange-200">
                            Identifique a Situação
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Qual a <span className="text-orange-600">idade</span> do seu filho?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Clique abaixo na faixa etária para ver os sinais específicos e como podemos ajudar
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {ageGroups.map((age) => (
                            <button
                                key={age.id}
                                onClick={() => setSelectedAge(selectedAge === age.id ? null : age.id)}
                                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                                    selectedAge === age.id
                                        ? 'bg-orange-50 border-orange-500 shadow-lg'
                                        : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Baby className="w-7 h-7 text-orange-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900">{age.title}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">{age.problem}</h3>
                                <ul className="space-y-2">
                                    {age.sinais.slice(0, 3).map((sinal, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                            <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                            {sinal}
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>

                    {/* CTA contextualizado */}
                    <div className="text-center mt-10">
                        <ButtonWhatsApp
                            message={selectedAge 
                                ? ageGroups.find(a => a.id === selectedAge)?.mensagem 
                                : "Oi, vi no site sobre fala tardia. Gostaria de agendar uma avaliação. Pode me explicar como funciona?"}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Falar com Especialista no WhatsApp
                        </ButtonWhatsApp>
                        <p className="text-sm text-slate-500 mt-3">
                            Resposta em até 2h • Sem compromisso
                        </p>
                    </div>
                </div>
            </section>

            {/* ==================== ESTATÍSTICAS ==================== */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {estatisticas.map((stat, index) => {
                            const Icon = stat.icone;
                            return (
                                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Icon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{stat.valor}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==================== DEPOIMENTOS ==================== */}
            <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
                            Resultados Reais
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Histórias de <span className="text-orange-600">Transformação</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Veja o que os pais dizem sobre o acompanhamento na Fono Inova
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {depoimentos.map((depo, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(depo.estrelas)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-lg font-medium text-slate-800 mb-4">
                                    "{depo.texto}"
                                </p>
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="font-semibold text-slate-900">{depo.autor}</p>
                                    <p className="text-sm text-green-600 font-medium">✓ {depo.resultado}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA após depoimentos */}
                    <div className="text-center mt-10">
                        <p className="text-slate-600 mb-4">
                            📍 Atendendo famílias em Anápolis e região
                        </p>
                        <ButtonWhatsApp
                            message="Oi! Vi no site sobre fala tardia e me identifiquei.\n\nMeu filho(a) tem atraso na fala. Pode me explicar como funciona a avaliação?"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            Quero Esse Resultado Para Meu Filho
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>

            {/* ==================== COMO FUNCIONA ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                            Processo Simples
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Como Funciona o <span className="text-orange-600">Tratamento</span>?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Um processo claro e humanizado para o desenvolvimento da fala do seu filho
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {metodologia.map((etapa, index) => (
                            <div key={index} className="relative text-center">
                                {index < metodologia.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-orange-200 to-transparent" />
                                )}
                                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                                    <div className="absolute inset-0 bg-orange-100 rounded-full" />
                                    <span className="relative text-2xl font-bold text-orange-600">{etapa.passo}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">{etapa.titulo}</h3>
                                <p className="text-sm text-slate-600">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <ButtonWhatsApp
                            message="Oi! Vi no site sobre fala tardia e me identifiquei.\n\nQueria entender melhor como funciona o tratamento. Pode me explicar?"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Começar Agora pelo WhatsApp
                        </ButtonWhatsApp>
                        <p className="text-sm text-slate-500 mt-3">
                            Primeira avaliação • Direcionamento personalizado
                        </p>
                    </div>
                </div>
            </section>

            {/* ==================== BENEFÍCIOS ==================== */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Por Que Escolher a <span className="text-orange-600">Fono Inova</span>?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {beneficios.map((beneficio, index) => {
                            const Icon = beneficio.icon;
                            return (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{beneficio.title}</h3>
                                    <p className="text-slate-600">{beneficio.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==================== FAQ ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
                            Tire suas Dúvidas
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Perguntas <span className="text-orange-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                                    <span className="text-orange-600">Q:</span>
                                    {item.pergunta}
                                </h3>
                                <p className="text-slate-600 ml-6">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL - URGÊNCIA ==================== */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full mb-8 animate-pulse">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">Últimos horários para avaliação esta semana</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-white">
                            Não Espere Mais para Ajudar Seu Filho
                        </h2>

                        <p className="text-xl text-white/80 mb-8">
                            Quanto mais cedo começar, mais rápido ele desenvolve a fala. 
                            A janela ideal é entre 2-4 anos.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <ButtonWhatsApp
                                message="Oi! Vi no site sobre fala tardia e me identifiquei.\n\nMeu filho(a) tem atraso na fala. Pode me explicar como funciona a avaliação?"
                                className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all inline-flex items-center gap-3 group"
                            >
                                <MessageCircle className="w-7 h-7" />
                                Quero Agendar Agora
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </ButtonWhatsApp>
                        </div>

                        <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Atendimento rápido
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Sem encaminhamento
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Aceitamos convênios
                            </span>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/20">
                            <p className="text-white/60 mb-2">Prefere ligar?</p>
                            <a href="tel:6237063924" className="text-white hover:text-green-400 text-lg font-semibold transition-colors">
                                (62) 3706-3924
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== LOCALIZAÇÃO ==================== */}
            <section className="py-16 bg-orange-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 text-orange-800">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">
                            Clínica Fono Inova | Av. Minas Gerais, 405 - Jundiaí, Anápolis/GO
                        </span>
                    </div>
                    <p className="text-orange-700/70 mt-2 text-sm">
                        Fácil acesso • Estacionamento disponível • Atendemos particular e convênios
                    </p>
                </div>
            </section>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </Layout>
    );
};

export default FalaTardiaPage;
