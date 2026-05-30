import { AlertCircle, ArrowRight, Baby, Calendar, CheckCircle2, Clock, Heart, MapPin, MessageCircle, Phone, Sparkles, Star, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFalaTardia, schemaFAQFalaTardia } from '../schemas/clinicaSchemas';

const FalaTardiaPage = () => {
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [showFixedButton, setShowFixedButton] = useState(false);

    // Mostrar botão fixo após scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowFixedButton(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dados por faixa etária - mensagens mais emocionais
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
            mensagem: "Oi! Meu filho não fala muito ainda e gostaria de entender melhor. Pode me orientar? Como funciona a avaliação?",
            cor: 'blue'
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
            mensagem: "Oi! Meu filho tem 3 anos e ainda não fala frases direito. Queria entender se precisa de avaliação.",
            cor: 'orange'
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
            mensagem: "Oi! Meu filho tem 4+ anos e tem dificuldade para falar claramente. Pode me orientar?",
            cor: 'red'
        }
    ];

    const depoimentos = [
        {
            estrelas: 5,
            texto: "Fomos muito bem orientados sobre o desenvolvimento do nosso filho. A avaliação trouxe clareza sobre os próximos passos.",
            autor: "Mãe do Lucas, 2 anos e 8 meses",
            resultado: "Direcionamento adequado"
        },
        {
            estrelas: 5,
            texto: "A consulta nos deu segurança. Explicaram tudo com calma e nos orientaram sobre como ajudar nossa filha em casa.",
            autor: "Pai da Mariana, 3 anos",
            resultado: "Tranquilidade para a família"
        },
        {
            estrelas: 5,
            texto: "Finalmente entendemos o que estava acontecendo. O acompanhamento fez toda diferença no desenvolvimento da fala.",
            autor: "Mãe da Sofia, 2 anos e 6 meses",
            resultado: "Evolução no desenvolvimento"
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

    // FAQ reduzido - apenas 3 perguntas essenciais
    const faq = [
        {
            pergunta: 'Com que idade devo procurar fonoaudiologia?',
            resposta: 'Se seu filho tem 2 anos e fala menos de 50 palavras, ou 3 anos e não forma frases, é hora de buscar ajuda. Quanto antes, melhor!'
        },
        {
            pergunta: 'Quanto tempo leva para ver resultados?',
            resposta: 'Muitas famílias relatam progresso já nas primeiras 6-8 semanas. Cada criança tem seu ritmo, mas a maioria começa a mostrar evolução no primeiro mês.'
        },
        {
            pergunta: 'Preciso de encaminhamento médico?',
            resposta: 'Não! Você pode agendar diretamente. Na Clínica Fono Inova, atendemos particular e diversos convênios. O agendamento é simples pelo WhatsApp.'
        }
    ];

    const mensagemHero = "Oi! Meu filho não fala muito ainda e gostaria de entender melhor. Pode me orientar? Como funciona a avaliação?";

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

            {/* ==================== BOTÃO WHATSAPP FLUTUANTE FIXO ==================== */}
            {showFixedButton && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-4 md:hidden">
                    <ButtonWhatsApp
                        message={selectedAge 
                            ? ageGroups.find(a => a.id === selectedAge)?.mensagem 
                            : mensagemHero}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-xl flex items-center justify-center gap-3"
                    >
                        Falar Agora no WhatsApp
                    </ButtonWhatsApp>
                </div>
            )}

            {/* Botão flutuante desktop */}
            {showFixedButton && (
                <div className="hidden md:block fixed bottom-6 right-6 z-50">
                    <ButtonWhatsApp
                        message={selectedAge 
                            ? ageGroups.find(a => a.id === selectedAge)?.mensagem 
                            : mensagemHero}
                        className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-8 py-5 rounded-full text-lg font-bold shadow-2xl flex items-center gap-3 transition-all animate-bounce-slow"
                    >
                        Falar no WhatsApp
                    </ButtonWhatsApp>
                </div>
            )}

            {/* ==================== HERO - TENSÃO MÁXIMA ==================== */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-slate-50 via-orange-50/40 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1">
                            {/* Badge de urgência REAL */}
                            <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 px-4 py-2 rounded-full mb-4 animate-pulse">
                                <Clock className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-bold text-red-700">
                                    Apenas 5 vagas para avaliação esta semana
                                </span>
                            </div>

                            <h1 className="mb-4 inline-flex items-center bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full">
                                Fonoaudiologia Infantil em Anápolis
                            </h1>

                            {/* HEADLINE MAIS FORTE */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 leading-tight mb-4">
                                Seu Filho Já Tem{" "}
                                <span className="text-orange-600">2 ou 3 Anos</span>{" "}
                                e Ainda Não Fala Frases?
                            </h1>

                            {/* SUBHEADLINE COM URGÊNCIA */}
                            <p className="text-lg text-slate-700 mb-4 leading-relaxed max-w-xl">
                                Isso pode <strong>não ser apenas uma fase</strong> — e quanto antes identificar, mais fácil é tratar.
                            </p>

                            {/* BLOCO DE SEGURANÇA EMOCIONAL */}
                            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
                                <p className="text-green-800 font-medium text-sm">
                                    ✓ Nem todo atraso é algo grave.  
                                    Mas <strong>só uma avaliação pode te dar essa segurança.</strong>
                                </p>
                            </div>

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
                            <div className="flex flex-col sm:flex-row gap-3">
                                <ButtonWhatsApp
                                    message={mensagemHero}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                                >
                                    Falar com Especialista Agora
                                </ButtonWhatsApp>

                                <a
                                    href="tel:6237063924"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    (62) 3706-3924
                                </a>
                            </div>

                            <p className="text-xs text-slate-500 mt-3">
                                Resposta em até 2h • Sem compromisso
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

                            {/* Card flutuante */}
                            <div className="absolute -bottom-3 -left-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">85%</div>
                                        <div className="text-xs text-slate-500">Melhora em 6 meses</div>
                                    </div>
                                </div>
                            </div>

                            {/* Card de avaliação */}
                            <div className="absolute -top-3 -right-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <div className="text-xs text-slate-600 mt-1">4.9 no Google</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SELEÇÃO POR IDADE - COM ALERTA ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-red-50 text-red-700 border-red-200">
                            Identifique a Situação
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Qual a <span className="text-orange-600">idade</span> do seu filho?
                        </h2>
                        
                        {/* ALERTA VERMELHO - MEDO + IDENTIFICAÇÃO */}
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg mb-4">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-red-700 font-semibold text-sm">
                                Se seu filho se encaixa em algum desses casos, é importante avaliar.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {ageGroups.map((age) => (
                            <button
                                key={age.id}
                                onClick={() => setSelectedAge(selectedAge === age.id ? null : age.id)}
                                className={`text-left p-5 rounded-2xl border-2 transition-all ${
                                    selectedAge === age.id
                                        ? 'bg-orange-50 border-orange-500 shadow-lg scale-105'
                                        : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Baby className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <span className="text-xl font-bold text-slate-900">{age.title}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{age.problem}</h3>
                                <ul className="space-y-1">
                                    {age.sinais.slice(0, 3).map((sinal, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                            <AlertCircle className="w-3 h-3 text-orange-500 flex-shrink-0 mt-0.5" />
                                            {sinal}
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>

                    {/* CTA contextualizado */}
                    <div className="text-center mt-8">
                        <ButtonWhatsApp
                            message={selectedAge 
                                ? ageGroups.find(a => a.id === selectedAge)?.mensagem 
                                : "Oi! Vi no site sobre fala tardia. Gostaria de agendar uma avaliação. Pode me explicar como funciona?"}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Falar com Especialista no WhatsApp
                        </ButtonWhatsApp>
                        <p className="text-sm text-slate-500 mt-2">
                            Resposta em até 2h • Sem compromisso
                        </p>
                    </div>
                </div>
            </section>

            {/* ==================== DEPOIMENTOS ==================== */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-green-50 text-green-700 border-green-200">
                            Resultados Reais
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Histórias de <span className="text-orange-600">Transformação</span>
                        </h2>
                        <p className="text-slate-600">
                            Veja o que os pais dizem sobre o acompanhamento na Fono Inova
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
                        {depoimentos.map((depo, index) => (
                            <div key={index} className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(depo.estrelas)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-base font-medium text-slate-800 mb-3">
                                    "{depo.texto}"
                                </p>
                                <div className="pt-3 border-t border-slate-100">
                                    <p className="font-semibold text-slate-900 text-sm">{depo.autor}</p>
                                    <p className="text-xs text-green-600 font-medium">✓ {depo.resultado}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA após depoimentos */}
                    <div className="text-center mt-8">
                        <ButtonWhatsApp
                            message="Oi! Vi no site sobre fala tardia e me identifiquei.\n\nMeu filho(a) tem atraso na fala. Pode me explicar como funciona a avaliação?"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Quero Esse Resultado Para Meu Filho
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>

            {/* ==================== COMO FUNCIONA (CURTO) ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                            Processo Simples
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Como Funciona o <span className="text-orange-600">Tratamento</span>?
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {metodologia.map((etapa, index) => (
                            <div key={index} className="relative text-center">
                                <div className="relative inline-flex items-center justify-center w-14 h-14 mb-3">
                                    <div className="absolute inset-0 bg-orange-100 rounded-full" />
                                    <span className="relative text-xl font-bold text-orange-600">{etapa.passo}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{etapa.titulo}</h3>
                                <p className="text-xs text-slate-600">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <ButtonWhatsApp
                            message="Oi! Vi no site sobre fala tardia e me identifiquei.\n\nQueria entender melhor como funciona o tratamento. Pode me explicar?"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Começar Agora pelo WhatsApp
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>

            {/* ==================== QUANDO PROCURAR AJUDA ==================== */}
            <section className="py-16 bg-amber-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
                        <div className="text-center mb-6">
                            <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-300">
                                Quando Procurar Ajuda
                            </Badge>
                            <h2 className="text-2xl md:text-3xl font-bold font-poppins">
                                Se você percebe que:
                            </h2>
                        </div>
                        
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>Seu filho não evolui como outras crianças da mesma idade</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>A dificuldade está persistindo há meses</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>A escola já sinalizou alguma preocupação</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>Você sente que "algo não está certo"</span>
                            </li>
                        </ul>
                        
                        <div className="bg-amber-50 p-4 rounded-xl mb-6">
                            <p className="text-amber-800 text-center font-medium">
                                O ideal é fazer uma avaliação. Quanto antes entender o que está acontecendo, 
                                mais fácil é ajudar no desenvolvimento.
                            </p>
                        </div>

                        {/* CTA de decisão */}
                        <div className="text-center">
                            <ButtonWhatsApp
                                message="Oi! Meu filho tem atraso na fala e gostaria de agendar uma avaliação."
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                            >
                                Quero agendar uma avaliação
                            </ButtonWhatsApp>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CONEXÃO COM NEUROPEDIATRIA ==================== */}
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <p className="text-slate-600 mb-4">
                        Em alguns casos, pode ser indicada avaliação com <strong>neuropediatra</strong> para investigação mais detalhada do desenvolvimento.
                    </p>
                    <a 
                        href="/neuropediatra-anapolis" 
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                        Conhecer neuropediatra em Anápolis
                    </a>
                </div>
            </section>

            {/* ==================== FAQ REDUZIDO (3 APENAS) ==================== */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-purple-50 text-purple-700 border-purple-200">
                            Tire suas Dúvidas
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Perguntas <span className="text-orange-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2 text-sm">
                                    <span className="text-orange-600">Q:</span>
                                    {item.pergunta}
                                </h3>
                                <p className="text-slate-600 text-sm ml-5">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL - URGÊNCIA MÁXIMA ==================== */}
            <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
                            <Clock className="w-5 h-5" />
                            <span className="font-bold">Apenas 5 vagas para avaliação esta semana</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-bold font-poppins mb-4 text-white">
                            Não Espere Mais para Ajudar Seu Filho
                        </h2>

                        <p className="text-lg text-white/80 mb-6">
                            Quanto mais cedo começar, mais rápido ele desenvolve a fala. 
                            A janela ideal é entre 2-4 anos.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <ButtonWhatsApp
                                message={mensagemHero}
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all inline-flex items-center gap-3 group"
                            >
                                Quero Agendar Agora
                            </ButtonWhatsApp>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-white/70 text-xs flex-wrap">
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Atendimento rápido
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Sem encaminhamento
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Aceitamos convênios
                            </span>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/20">
                            <p className="text-white/60 mb-2 text-sm">Prefere ligar?</p>
                            <a href="tel:6237063924" className="text-white hover:text-green-400 text-lg font-semibold transition-colors">
                                (62) 3706-3924
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== LOCALIZAÇÃO ==================== */}
            <section className="py-12 bg-orange-50">
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
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </Layout>
    );
};

export default FalaTardiaPage;
