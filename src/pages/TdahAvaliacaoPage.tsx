import { AlertCircle, ArrowRight, Brain, Calendar, CheckCircle2, Clock, Heart, MapPin, MessageCircle, Phone, Star, Target, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas';

const TdahAvaliacaoPage = () => {
    const [selectedSintoma, setSelectedSintoma] = useState<string | null>(null);
    const [showFixedButton, setShowFixedButton] = useState(false);

    // Mostrar botão fixo após scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowFixedButton(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dados por tipo de sintoma - identificação rápida
    const sintomasGroups = [
        {
            id: 'atencao',
            title: 'Falta de Atenção',
            idade: '6-12 anos',
            problemas: [
                'Não consegue prestar atenção por muito tempo',
                'Esquece tarefas e perde objetos constantemente',
                'Evita atividades que exigem esforço mental',
                'Comete erros por distração na escola'
            ],
            mensagem: "Oi! Vi no site e estou desesperada.\n\nMeu filho não consegue prestar atenção em nada. A escola disse que ele pode ter TDAH.\n\nPreciso de ajuda urgente.",
            cor: 'blue'
        },
        {
            id: 'hiperatividade',
            title: 'Hiperatividade',
            idade: '5-10 anos',
            problemas: [
                'Não para quieto, fica "no automático"',
                'Fala excessivamente e interrompe os outros',
                'Não consegue esperar a vez',
                'Inquietação constante em qualquer lugar'
            ],
            mensagem: "Oi! Vi no site e gostaria de tirar dúvidas.\n\nMeu filho tem muita energia e não para quieto. Está afetando a escola e nossa vida em casa.\n\nAvaliação para TDAH funciona?",
            cor: 'orange'
        },
        {
            id: 'aprendizagem',
            title: 'Dificuldade de Aprendizagem',
            idade: '7+ anos',
            problemas: [
                'Não acompanha a turma na escola',
                'Dificuldade para ler, escrever ou fazer conta',
                'Frustração com tarefas escolares',
                'Professor sugere avaliação'
            ],
            mensagem: "Oi! Vi no site e estou angustiada.\n\nMeu filho está com muita dificuldade na escola. O professor disse que precisa de avaliação.\n\nQuero entender o que está acontecendo.",
            cor: 'red'
        }
    ];

    const depoimentos = [
        {
            estrelas: 5,
            texto: "Finalmente descobrimos o que estava acontecendo! Depois do diagnóstico, nosso filho melhorou MUITO na escola.",
            autor: "Mãe do Gabriel, 8 anos",
            resultado: "Diagnóstico em 2 semanas"
        },
        {
            estrelas: 5,
            texto: "A avaliação mudou nossas vidas. Agora entendemos o que ele precisa e como ajudar. A escola notou a diferença!",
            autor: "Pai do Matheus, 10 anos",
            resultado: "Notas melhoraram 40%"
        },
        {
            estrelas: 5,
            texto: "Pensei que meu filho era 'preguiçoso'. A avaliação mostrou que ele tinha TDAH. Hoje ele é outra criança!",
            autor: "Mãe da Luiza, 9 anos",
            resultado: "Autoestima recuperada"
        }
    ];

    const metodologia = [
        {
            passo: '1',
            titulo: 'Avaliação Completa',
            descricao: 'Testes neuropsicológicos específicos para identificar TDAH e dificuldades de aprendizagem'
        },
        {
            passo: '2',
            titulo: 'Diagnóstico Preciso',
            descricao: 'Laudo detalhado com orientações para escola e tratamento'
        },
        {
            passo: '3',
            titulo: 'Plano Terapêutico',
            descricao: 'Estratégias personalizadas para melhorar atenção e desempenho escolar'
        },
        {
            passo: '4',
            titulo: 'Acompanhamento',
            descricao: 'Monitoramento contínuo da evolução e ajustes no tratamento'
        }
    ];

    // FAQ reduzido - apenas 3 perguntas essenciais
    const faq = [
        {
            pergunta: 'Como funciona a avaliação de TDAH?',
            resposta: 'A avaliação envolve entrevistas com os pais, testes neuropsicológicos específicos e análise do comportamento. Dura cerca de 2-3 horas e é feita em um ambiente acolhedor para a criança.'
        },
        {
            pergunta: 'Quanto tempo leva para ter o diagnóstico?',
            resposta: 'O laudo fica pronto em até 15 dias úteis após a avaliação. Em casos urgentes, conseguimos priorizar para 7 dias.'
        },
        {
            pergunta: 'Preciso de encaminhamento médico?',
            resposta: 'Não! Você pode agendar diretamente. Atendemos particular e diversos convênios. O agendamento é simples pelo WhatsApp.'
        }
    ];

    const mensagemHero = "Oi! Meu filho tem dificuldade de atenção na escola. Pode me orientar? Como funciona a avaliação?";

    return (
        <Layout>
            <SEO
                title="Avaliação TDAH Anápolis | Teste de Atenção Infantil | Clínica Fono Inova"
                description="Seu filho tem dificuldade de atenção ou aprendizagem? Avaliação neuropsicológica especializada em TDAH em Anápolis. Diagnóstico completo. Agende pelo WhatsApp."
                keywords="avaliação tdah anapolis, teste atenção infantil, diagnóstico tdah, neuropsicologia infantil anapolis, dificuldade aprendizagem"
                image="/images/servicos/neuropsicologia.jpg"
                url="https://www.clinicafonoinova.com.br/avaliacao-tdah-anapolis"
                type="article"
                schema={[schemaBaseLocalBusiness]}
            />

            {/* ==================== BOTÃO WHATSAPP FLUTUANTE FIXO ==================== */}
            {showFixedButton && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-4 md:hidden">
                    <ButtonWhatsApp
                        message={selectedSintoma 
                            ? sintomasGroups.find(a => a.id === selectedSintoma)?.mensagem 
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
                        message={selectedSintoma 
                            ? sintomasGroups.find(a => a.id === selectedSintoma)?.mensagem 
                            : mensagemHero}
                        className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-8 py-5 rounded-full text-lg font-bold shadow-2xl flex items-center gap-3 transition-all animate-bounce-slow"
                    >
                        Falar no WhatsApp
                    </ButtonWhatsApp>
                </div>
            )}

            {/* ==================== HERO - TENSÃO MÁXIMA ==================== */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-slate-50 via-purple-50/40 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1">
                            {/* Badge de urgência REAL */}
                            <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 px-4 py-2 rounded-full mb-4 animate-pulse">
                                <Clock className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-bold text-red-700">
                                    Apenas 3 vagas para avaliação esta semana
                                </span>
                            </div>

                            <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Avaliação Neuropsicológica em Anápolis
                            </Badge>

                            {/* HEADLINE MAIS FORTE */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 leading-tight mb-4">
                                Seu Filho Tem{" "}
                                <span className="text-purple-600">Dificuldade de Atenção</span>{" "}
                                ou Não Acompanha a Escola?
                            </h1>

                            {/* SUBHEADLINE COM URGÊNCIA */}
                            <p className="text-lg text-slate-700 mb-4 leading-relaxed max-w-xl">
                                Isso pode ser <strong>TDAH ou outra dificuldade de aprendizagem</strong> — e quanto antes identificar, mais fácil é tratar.
                            </p>

                            {/* ALERTA DE CONSEQUÊNCIA */}
                            <p className="text-red-600 font-semibold text-sm mb-4">
                                ⚠️ Quanto mais você espera, mais seu filho se frustra e perde autoestima.
                            </p>

                            {/* BLOCO DE SEGURANÇA EMOCIONAL */}
                            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
                                <p className="text-green-800 font-medium text-sm">
                                    ✓ Nem toda dificuldade de atenção é TDAH.  
                                    Mas <strong>só uma avaliação pode te dar essa segurança</strong> e mostrar o caminho certo.
                                </p>
                            </div>

                            {/* Prova social rápida */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-600"
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-900">+300 famílias</span> já descobriram o diagnóstico do filho
                                </div>
                            </div>

                            {/* CTA Principal */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <ButtonWhatsApp
                                    message={mensagemHero}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                                >
                                    Fazer Avaliação Agora
                                </ButtonWhatsApp>

                                <a
                                    href="tel:6237063924"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    (62) 3706-3924
                                </a>
                            </div>

                            <p className="text-xs text-slate-500 mt-3">
                                Resposta em até 2h • Avaliação em até 7 dias • Sem compromisso
                            </p>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/neuropsicologia/neuro-2.jpeg"
                                    alt="Avaliação neuropsicológica infantil na Clínica Fono Inova"
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
                                        <div className="text-2xl font-bold text-slate-900">15 dias</div>
                                        <div className="text-xs text-slate-500">Laudo pronto</div>
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

            {/* ==================== SELEÇÃO POR SINTOMA - COM ALERTA ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-red-50 text-red-700 border-red-200">
                            Identifique o Problema
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Qual dessas situações <span className="text-purple-600">parece com seu filho</span>?
                        </h2>
                        
                        {/* ALERTA VERMELHO - MEDO + IDENTIFICAÇÃO */}
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg mb-4">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-red-700 font-semibold text-sm">
                                Se seu filho tem algum desses sinais, é importante avaliar.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {sintomasGroups.map((sintoma) => (
                            <button
                                key={sintoma.id}
                                onClick={() => setSelectedSintoma(selectedSintoma === sintoma.id ? null : sintoma.id)}
                                className={`text-left p-5 rounded-2xl border-2 transition-all ${
                                    selectedSintoma === sintoma.id
                                        ? 'bg-purple-50 border-purple-500 shadow-lg scale-105'
                                        : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Brain className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                        {sintoma.idade}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{sintoma.title}</h3>
                                <ul className="space-y-1">
                                    {sintoma.problemas.slice(0, 3).map((problema, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                            <AlertCircle className="w-3 h-3 text-purple-500 flex-shrink-0 mt-0.5" />
                                            {problema}
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>

                    {/* CTA contextualizado */}
                    <div className="text-center mt-8">
                        <ButtonWhatsApp
                            message={selectedSintoma 
                                ? sintomasGroups.find(a => a.id === selectedSintoma)?.mensagem 
                                : "Oi! Vi no site sobre avaliação TDAH. Gostaria de agendar uma avaliação. Pode me explicar como funciona?"}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Falar com Neuropsicóloga no WhatsApp
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
                                <span>Seu filho não consegue prestar atenção como outras crianças da mesma idade</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>A dificuldade está afetando o desempenho na escola há meses</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>Os professores já sinalizaram preocupação</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-700">
                                <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>Você sente que "algo não está certo"</span>
                            </li>
                        </ul>
                        
                        <div className="bg-amber-50 p-4 rounded-xl mb-6">
                            <p className="text-amber-800 text-center font-medium">
                                O ideal é fazer uma avaliação. Quanto antes entender o que está acontecendo, 
                                mais fácil é ajudar no desenvolvimento escolar.
                            </p>
                        </div>

                        <div className="text-center">
                            <ButtonWhatsApp
                                message="Oi! Meu filho tem dificuldade de atenção na escola. Gostaria de agendar uma avaliação."
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
                        Para avaliação médica completa de TDAH, também contamos com <strong>neuropediatra</strong> em nossa equipe.
                    </p>
                    <a 
                        href="/neuropediatra-anapolis" 
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                    >
                        Conhecer neuropediatra em Anápolis
                    </a>
                </div>
            </section>

            {/* ==================== DEPOIMENTOS ==================== */}
            <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-green-50 text-green-700 border-green-200">
                            Resultados Reais
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Famílias que <span className="text-purple-600">encontraram respostas</span>
                        </h2>
                        <p className="text-slate-600">
                            Veja o que os pais dizem sobre o diagnóstico na Fono Inova
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
                            message="Oi! Vi no site sobre TDAH e me identifiquei.\n\nMeu filho tem dificuldade na escola. Pode me explicar como funciona a avaliação?"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
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
                            Como Funciona a <span className="text-purple-600">Avaliação</span>?
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                        {metodologia.map((etapa, index) => (
                            <div key={index} className="relative text-center">
                                <div className="relative inline-flex items-center justify-center w-14 h-14 mb-3">
                                    <div className="absolute inset-0 bg-purple-100 rounded-full" />
                                    <span className="relative text-xl font-bold text-purple-600">{etapa.passo}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{etapa.titulo}</h3>
                                <p className="text-xs text-slate-600">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <ButtonWhatsApp
                            message="Oi! Vi no site sobre avaliação TDAH.\n\nQueria entender melhor como funciona o processo. Pode me explicar?"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            Agendar Avaliação pelo WhatsApp
                        </ButtonWhatsApp>
                    </div>
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
                            Perguntas <span className="text-purple-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2 text-sm">
                                    <span className="text-purple-600">Q:</span>
                                    {item.pergunta}
                                </h3>
                                <p className="text-slate-600 text-sm ml-5">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL - URGÊNCIA MÁXIMA ==================== */}
            <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
                            <Clock className="w-5 h-5" />
                            <span className="font-bold">Apenas 3 vagas para avaliação esta semana</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-bold font-poppins mb-4 text-white">
                            Não Deixe Seu Filho Sufrir na Escola
                        </h2>

                        <p className="text-lg text-white/80 mb-6">
                            Cada dia de espera é um dia de frustração para seu filho. 
                            A avaliação é o primeiro passo para mudar isso.
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
                                <CheckCircle2 className="w-4 h-4" /> Laudo em 15 dias
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
            <section className="py-12 bg-purple-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 text-purple-800">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">
                            Clínica Fono Inova | Av. Minas Gerais, 405 - Jundiaí, Anápolis/GO
                        </span>
                    </div>
                    <p className="text-purple-700/70 mt-2 text-sm">
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

export default TdahAvaliacaoPage;
