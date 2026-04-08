import { AlertCircle, ArrowRight, Angry, Frown, Heart, MapPin, MessageCircle, Phone, Star, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas';

const ComportamentoInfantilPage = () => {
    const [selectedComportamento, setSelectedComportamento] = useState<string | null>(null);
    const [showFixedButton, setShowFixedButton] = useState(false);

    // Mostrar botão fixo após scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowFixedButton(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dados por tipo de comportamento
    const comportamentos = [
        {
            id: 'birras',
            title: 'Birras Explosivas',
            idade: '2-6 anos',
            sinais: [
                'Choro intenso e histérico por qualquer coisa',
                'Joga no chão, bate com as mãos',
                'Não consegue se acalmar sozinho',
                'Acontece em público e em casa'
            ],
            mensagem: "Oi! Meu filho está com comportamento difícil. Ele tem birras explosivas todo dia. Queria entender se precisa de avaliação.",
            cor: 'red'
        },
        {
            id: 'agressividade',
            title: 'Agressividade',
            idade: '3-8 anos',
            sinais: [
                'Bate em outras crianças ou adultos',
                'Joga objetos quando irritado',
                'Morde, arranha ou chuta',
                'Está sendo expulso da escola'
            ],
            mensagem: "Oi! Meu filho está com comportamento difícil. Ele está agressivo e a escola já reclamou. Pode me orientar?",
            cor: 'orange'
        },
        {
            id: 'obediencia',
            title: 'Não Obedece',
            idade: '4-10 anos',
            sinais: [
                'Ignora quando é chamado',
                'Não segue regras ou limites',
                'Desafia autoridade dos pais',
                'Faz o contrário do que pedem'
            ],
            mensagem: "Oi! Meu filho está com comportamento difícil. Ele não obedece em nada. Gostaria de agendar uma avaliação.",
            cor: 'purple'
        }
    ];

    const depoimentos = [
        {
            estrelas: 5,
            texto: "Minha filha tinha birras horríveis em qualquer lugar. Depois de 1 mês de orientação, conseguimos reduzir 80% das crises!",
            autor: "Mãe da Luísa, 4 anos",
            resultado: "Birras reduzidas em 80%"
        },
        {
            estrelas: 5,
            texto: "O filho estava sendo expulso da escola por agressão. Hoje ele brinca normalmente com as outras crianças.",
            autor: "Pai do Matheus, 6 anos",
            resultado: "Agressividade controlada"
        },
        {
            estrelas: 5,
            texto: "Pensávamos que nosso filho era 'mau'. A psicóloga nos mostrou que ele só precisava de ajuda para lidar com frustração.",
            autor: "Mãe do Pedro, 5 anos",
            resultado: "Relação familiar melhorou"
        }
    ];

    const metodologia = [
        {
            passo: '1',
            titulo: 'Conversa com Pais',
            descricao: 'Entendemos a rotina e os desafios do seu filho'
        },
        {
            passo: '2',
            titulo: 'Avaliação do Comportamento',
            descricao: 'Identificamos gatilhos e padrões das crises'
        },
        {
            passo: '3',
            titulo: 'Plano de Ação',
            descricao: 'Estratégias práticas para aplicar no dia a dia'
        },
        {
            passo: '4',
            titulo: 'Acompanhamento',
            descricao: 'Ajustamos as técnicas conforme a evolução'
        }
    ];

    // FAQ reduzido - apenas 3 perguntas essenciais
    const faq = [
        {
            pergunta: 'O comportamento do meu filho é normal?',
            resposta: 'Todas as crianças têm crises, mas quando isso acontece com frequência, dura muito tempo ou interfere na escola e família, é importante avaliar. Uma orientação pode te dar essa segurança.'
        },
        {
            pergunta: 'Quanto tempo leva para melhorar?',
            resposta: 'Muitos pais relatam melhora já nas primeiras semanas após começarem a aplicar as estratégias corretas. Cada criança tem seu ritmo, mas a maioria responde bem às orientações.'
        },
        {
            pergunta: 'Preciso de encaminhamento?',
            resposta: 'Não! Você pode agendar diretamente. Atendemos particular e diversos convênios. O primeiro contato é pelo WhatsApp, sem compromisso.'
        }
    ];

    const sinaisAlerta = [
        'Birras frequentes e explosivas',
        'Agressão física (bater, morder)',
        'Não obedece nem aos limites básicos',
        'Choro intenso sem motivo aparente',
        'Problemas na escola por comportamento'
    ];

    const mensagemHero = "Oi! Meu filho está com comportamento difícil. Pode me orientar? Como funciona a avaliação?";

    return (
        <Layout>
            <SEO
                title="Filho Não Obedece? Birras? Psicóloga Infantil Anápolis"
                description="Seu filho tem birras explosivas, agressividade ou não obedece? Psicóloga infantil especializada em comportamento em Anápolis. Primeira orientação pelo WhatsApp."
                keywords="birra infantil anapolis, filho não obedece, agressividade infantil, psicologa infantil anapolis, comportamento infantil"
                image="/images/psicologia/psico2.jpg"
                url="https://www.clinicafonoinova.com.br/comportamento-infantil-anapolis"
                type="article"
                schema={[schemaBaseLocalBusiness]}
            />

            {/* ==================== BOTÃO WHATSAPP FLUTUANTE FIXO ==================== */}
            {showFixedButton && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-4 md:hidden">
                    <ButtonWhatsApp
                        message={selectedComportamento 
                            ? comportamentos.find(a => a.id === selectedComportamento)?.mensagem 
                            : mensagemHero}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-xl flex items-center justify-center gap-3"
                    >
                        Tirar Dúvida no WhatsApp
                    </ButtonWhatsApp>
                </div>
            )}

            {/* Botão flutuante desktop */}
            {showFixedButton && (
                <div className="hidden md:block fixed bottom-6 right-6 z-50">
                    <ButtonWhatsApp
                        message={selectedComportamento 
                            ? comportamentos.find(a => a.id === selectedComportamento)?.mensagem 
                            : mensagemHero}
                        className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-8 py-5 rounded-full text-lg font-bold shadow-2xl flex items-center gap-3 transition-all animate-bounce-slow"
                    >
                        Falar no WhatsApp
                    </ButtonWhatsApp>
                </div>
            )}

            {/* ==================== HERO - TENSÃO MÁXIMA ==================== */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-slate-50 via-red-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1">
                            {/* Badge de urgência */}
                            <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 px-4 py-2 rounded-full mb-4 animate-pulse">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-bold text-red-700">
                                    Últimas vagas para atendimento esta semana
                                </span>
                            </div>

                            {/* H1 - BATENDO NA DOR */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 leading-tight mb-4">
                                Seu Filho Tem{" "}
                                <span className="text-red-600">Birras Explosivas</span>,{" "}
                                Agressividade ou Não Obedece?
                            </h1>

                            {/* H2 - SEM COMPROMISSO */}
                            <h2 className="text-lg md:text-xl text-slate-600 mb-4 leading-relaxed max-w-xl">
                                Avaliação especializada em <strong>Anápolis</strong> para entender o que está acontecendo — <span className="text-green-600 font-semibold">sem compromisso</span>
                            </h2>

                            {/* BLOCO DE SINAIS DE ALERTA - IDENTIFICAÇÃO RÁPIDA */}
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6">
                                <p className="text-sm text-yellow-800 font-semibold mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    Sinais de alerta:
                                </p>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    {sinaisAlerta.map((sinal, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="text-yellow-600">•</span> {sinal}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CONSEQUÊNCIA */}
                            <p className="text-red-600 font-semibold text-sm mb-4">
                                ⚠️ Quanto mais você espera, mais difícil fica mudar esse padrão.
                            </p>

                            {/* BLOCO DE ALÍVIO */}
                            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
                                <p className="text-green-800 font-medium text-sm">
                                    ✓ Nem toda birra é problema grave.  
                                    Mas <strong>só uma orientação pode te dar essa segurança</strong> e mostrar como lidar.
                                </p>
                            </div>

                            {/* Prova social */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-red-400 to-red-600"
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-900">+200 famílias</span> já superaram as crises
                                </div>
                            </div>

                            {/* CTA SUAVE */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <ButtonWhatsApp
                                    message={mensagemHero}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                                >
                                    Quero Tirar uma Dúvida no WhatsApp
                                </ButtonWhatsApp>

                                <a
                                    href="tel:6237063924"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    (62) 3706-3924
                                </a>
                            </div>

                            <p className="text-xs text-slate-500 mt-3">
                                Resposta em até 2h • Primeira orientação sem compromisso
                            </p>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/psicologia/psico2.jpg"
                                    alt="Psicologia infantil especializada em comportamento na Clínica Fono Inova"
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
                                        <div className="text-2xl font-bold text-slate-900">80%</div>
                                        <div className="text-xs text-slate-500">Birras reduzidas</div>
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

            {/* ==================== SELEÇÃO POR COMPORTAMENTO ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-red-50 text-red-700 border-red-200">
                            Identifique o Comportamento
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Qual dessas situações <span className="text-red-600">parece com seu filho</span>?
                        </h2>
                        
                        {/* ALERTA */}
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg mb-4">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-red-700 font-semibold text-sm">
                                Clique no que mais se encaixa para falar com especialista
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {comportamentos.map((comp) => (
                            <button
                                key={comp.id}
                                onClick={() => setSelectedComportamento(selectedComportamento === comp.id ? null : comp.id)}
                                className={`text-left p-5 rounded-2xl border-2 transition-all ${
                                    selectedComportamento === comp.id
                                        ? 'bg-red-50 border-red-500 shadow-lg scale-105'
                                        : 'bg-white border-slate-200 hover:border-red-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                        {comp.id === 'birras' && <Angry className="w-6 h-6 text-red-600" />}
                                        {comp.id === 'agressividade' && <AlertTriangle className="w-6 h-6 text-red-600" />}
                                        {comp.id === 'obediencia' && <Frown className="w-6 h-6 text-red-600" />}
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                        {comp.idade}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{comp.title}</h3>
                                <ul className="space-y-1">
                                    {comp.sinais.slice(0, 3).map((sinal, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                            <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
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
                            message={selectedComportamento 
                                ? comportamentos.find(a => a.id === selectedComportamento)?.mensagem 
                                : "Oi! Meu filho está com comportamento difícil e queria entender melhor. Pode me orientar?"}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Falar com Psicóloga no WhatsApp
                        </ButtonWhatsApp>
                        <p className="text-sm text-slate-500 mt-2">
                            Resposta em até 2h • Sem compromisso
                        </p>
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
                                <span>As birras ou agressividade são mais intensas que outras crianças da mesma idade</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>O comportamento está persistindo há meses</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>A escola já sinalizou preocupação</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>Você sente que "algo não está certo"</span>
                            </li>
                        </ul>
                        
                        <div className="bg-amber-50 p-4 rounded-xl mb-6">
                            <p className="text-amber-800 text-center font-medium">
                                O ideal é fazer uma avaliação. Quanto antes entender o que está acontecendo, 
                                mais fácil é ajudar no desenvolvimento emocional.
                            </p>
                        </div>

                        <div className="text-center">
                            <ButtonWhatsApp
                                message="Oi! Meu filho está com comportamento difícil. Gostaria de agendar uma avaliação."
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
                        Para investigação completa do desenvolvimento, também contamos com <strong>neuropediatra</strong> em nossa equipe.
                    </p>
                    <a 
                        href="/neuropediatra-anapolis" 
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold hover:underline"
                    >
                        Conhecer neuropediatra em Anápolis
                    </a>
                </div>
            </section>

            {/* ==================== DEPOIMENTOS ==================== */}
            <section className="py-16 bg-gradient-to-br from-red-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-green-50 text-green-700 border-green-200">
                            Resultados Reais
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Pais que <span className="text-red-600">superaram as crises</span>
                        </h2>
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

                    {/* CTA */}
                    <div className="text-center mt-8">
                        <ButtonWhatsApp
                            message="Oi! Vi no site sobre comportamento infantil e me identifiquei. Queria saber como funciona a orientação."
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Quero Melhorar o Comportamento do Meu Filho
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
                            Como Funciona a <span className="text-red-600">Orientação</span>?
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {metodologia.map((etapa, index) => (
                            <div key={index} className="relative text-center">
                                <div className="relative inline-flex items-center justify-center w-14 h-14 mb-3">
                                    <div className="absolute inset-0 bg-red-100 rounded-full" />
                                    <span className="relative text-xl font-bold text-red-600">{etapa.passo}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{etapa.titulo}</h3>
                                <p className="text-xs text-slate-600">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <ButtonWhatsApp
                            message="Oi! Queria entender melhor como funciona a orientação para comportamento infantil. Pode me explicar?"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Quero Começar pelo WhatsApp
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>

            {/* ==================== FAQ REDUZIDO (3 APENAS) ==================== */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-red-50 text-red-700 border-red-200">
                            Tire suas Dúvidas
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Perguntas <span className="text-red-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2 text-sm">
                                    <span className="text-red-600">Q:</span>
                                    {item.pergunta}
                                </h3>
                                <p className="text-slate-600 text-sm ml-5">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL - URGÊNCIA ==================== */}
            <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
                            <Clock className="w-5 h-5" />
                            <span className="font-bold">Últimas vagas para atendimento esta semana</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-bold font-poppins mb-4 text-white">
                            Não Deixe as Birras Destruírem sua Família
                        </h2>

                        <p className="text-lg text-white/80 mb-6">
                            Cada dia de espera é mais um dia de sofrimento pra você e pro seu filho.
                            Tire essa dúvida agora — sem compromisso.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <ButtonWhatsApp
                                message={mensagemHero}
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all inline-flex items-center gap-3 group"
                            >
                                Tirar Dúvida Agora
                            </ButtonWhatsApp>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-white/70 text-xs flex-wrap">
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Resposta rápida
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Sem encaminhamento
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Sem compromisso
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
            <section className="py-12 bg-red-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 text-red-800">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">
                            Clínica Fono Inova | Av. Minas Gerais, 405 - Jundiaí, Anápolis/GO
                        </span>
                    </div>
                    <p className="text-red-700/70 mt-2 text-sm">
                        Fácil acesso • Estacionamento disponível • Atendemos particular e convênios
                    </p>
                </div>
            </section>

            <style>{`
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

export default ComportamentoInfantilPage;
