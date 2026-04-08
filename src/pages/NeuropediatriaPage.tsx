import { AlertCircle, ArrowRight, Award, Baby, Brain, Calendar, CheckCircle2, Clock, Heart, MapPin, MessageCircle, Phone, Shield, Star, Stethoscope, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas';

const NeuropediatriaPage = () => {
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

    // Problemas que atendemos
    const problemas = [
        {
            id: 'atraso',
            titulo: 'Atraso para falar ou andar',
            descricao: 'Criança que não atinge marcos do desenvolvimento na idade esperada',
            mensagem: "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho. Ele apresenta atraso no desenvolvimento."
        },
        {
            id: 'tdah',
            titulo: 'Falta de atenção / hiperatividade',
            descricao: 'Dificuldade de concentração, agitação excessiva ou impulsividade',
            mensagem: "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho. Ele tem dificuldade de atenção e hiperatividade."
        },
        {
            id: 'autismo',
            titulo: 'Suspeita de autismo',
            descricao: 'Contato visual reduzido, dificuldade de interação ou comportamentos repetitivos',
            mensagem: "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho. Temos suspeita de autismo."
        },
        {
            id: 'convulsao',
            titulo: 'Convulsões',
            descricao: 'Episódios de alteração da consciência ou movimentos involuntários',
            mensagem: "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho. Ele apresenta convulsões."
        },
        {
            id: 'escolar',
            titulo: 'Dificuldades escolares',
            descricao: 'Problemas de aprendizagem, memória ou processamento de informações',
            mensagem: "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho. Ele tem dificuldades na escola."
        },
        {
            id: 'comportamento',
            titulo: 'Alterações no comportamento',
            descricao: 'Mudanças no humor, agressividade, regressão ou isolamento',
            mensagem: "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho. Ele apresenta alterações de comportamento."
        }
    ];

    // Depoimentos éticos e realistas
    const depoimentos = [
        {
            estrelas: 5,
            texto: "Fomos muito bem orientados sobre o desenvolvimento da nossa filha. A consulta trouxe clareza sobre os próximos passos.",
            autor: "Mãe da Isabela, 4 anos",
            resultado: "Diagnóstico e direcionamento adequados"
        },
        {
            estrelas: 5,
            texto: "A consulta com o neuropediatra nos deu segurança. Explicaram tudo com calma e nos orientaram sobre o tratamento.",
            autor: "Pai do Rafael, 6 anos",
            resultado: "Tranquilidade para a família"
        },
        {
            estrelas: 5,
            texto: "Finalmente entendemos o que estava acontecendo com nosso filho. O acompanhamento médico fez toda diferença.",
            autor: "Mãe do Lucas, 5 anos",
            resultado: "Clareza sobre o quadro clínico"
        }
    ];

    // Diferenciais médicos
    const diferenciais = [
        {
            icone: Stethoscope,
            titulo: 'Atendimento com médico especialista',
            descricao: 'Avaliação realizada por neuropediatra com formação específica em desenvolvimento infantil'
        },
        {
            icone: ClipboardCheck,
            titulo: 'Avaliação clínica completa',
            descricao: 'Exame neurológico detalhado, anamnese completa e análise do histórico de desenvolvimento'
        },
        {
            icone: Users,
            titulo: 'Integração com equipe multidisciplinar',
            descricao: 'Trabalho conjunto com fonoaudiologia, psicologia e terapia ocupacional quando necessário'
        },
        {
            icone: FileText,
            titulo: 'Plano individualizado',
            descricao: 'Orientação específica para cada criança, com acompanhamento e reavaliações periódicas'
        }
    ];

    // FAQ médico
    const faq = [
        {
            pergunta: 'O que faz um neuropediatra?',
            resposta: 'O neuropediatra é um médico especialista no desenvolvimento neurológico da criança. Avalia atrasos no desenvolvimento, autismo, TDAH, convulsões, dificuldades de aprendizagem e outros problemas neurológicos infantis.'
        },
        {
            pergunta: 'Com que idade posso levar meu filho ao neuropediatra?',
            resposta: 'Dependendo da suspeita, a avaliação pode ser feita desde os primeiros meses de vida. Sinais de alerta como atraso para sentar, andar ou falar, ou comportamentos atípicos devem ser avaliados o quanto antes.'
        },
        {
            pergunta: 'Preciso de encaminhamento para consultar o neuropediatra?',
            resposta: 'Não é necessário encaminhamento. Você pode agendar diretamente a consulta. Atendemos particular e diversos convênios.'
        },
        {
            pergunta: 'Como funciona o acompanhamento após a primeira consulta?',
            resposta: 'Após a avaliação inicial, o neuropediatra indica a necessidade de exames complementares e define a frequência de retornos. O acompanhamento é individualizado conforme as necessidades de cada criança.'
        }
    ];

    const mensagemHero = "Oi! Gostaria de agendar uma consulta com neuropediatra para meu filho.";

    return (
        <Layout>
            <SEO
                title="Neuropediatra em Anápolis | Avaliação Desenvolvimento Infantil"
                description="Neuropediatra em Anápolis. Avaliação especializada de atraso no desenvolvimento, autismo, TDAH e dificuldades neurológicas. Agende consulta."
                keywords="neuropediatra anapolis, neurologista infantil anapolis, atraso desenvolvimento infantil, autismo infantil anapolis, tdah infantil anapolis"
                image="/images/servicos/neuropediatria.jpg"
                url="https://www.clinicafonoinova.com.br/neuropediatra-anapolis"
                type="article"
                schema={[schemaBaseLocalBusiness]}
            />

            {/* ==================== BOTÃO WHATSAPP FLUTUANTE FIXO ==================== */}
            {showFixedButton && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-4 md:hidden">
                    <ButtonWhatsApp
                        message={selectedSintoma 
                            ? problemas.find(p => p.id === selectedSintoma)?.mensagem 
                            : mensagemHero}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-xl"
                    >
                        Agendar consulta com neuropediatra
                    </ButtonWhatsApp>
                </div>
            )}

            {/* Botão flutuante desktop */}
            {showFixedButton && (
                <div className="hidden md:block fixed bottom-6 right-6 z-50">
                    <ButtonWhatsApp
                        message={selectedSintoma 
                            ? problemas.find(p => p.id === selectedSintoma)?.mensagem 
                            : mensagemHero}
                        className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-8 py-5 rounded-full text-lg font-bold shadow-2xl transition-all"
                    >
                        Agendar consulta
                    </ButtonWhatsApp>
                </div>
            )}

            {/* ==================== HERO - AUTORIDADE MÉDICA ==================== */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1">
                            {/* Badge médico */}
                            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Médico Especialista em Anápolis
                            </Badge>

                            {/* H1 - Autoridade */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-4">
                                Neuropediatra em Anápolis
                            </h1>

                            {/* H2 - Especialidade */}
                            <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                                Avaliação especializada do desenvolvimento infantil
                            </h2>

                            {/* Dor */}
                            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                                Seu filho apresenta <strong>atraso no desenvolvimento</strong>, <strong>dificuldade de atenção</strong> ou <strong>suspeita de autismo/TDAH</strong>?
                            </p>

                            {/* Explicação médica */}
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                A avaliação com neuropediatra identifica as causas das dificuldades e orienta o tratamento adequado. 
                                Diagnóstico correto é o primeiro passo para ajudar seu filho a desenvolver seu potencial.
                            </p>

                            {/* Benefícios médicos */}
                            <div className="flex flex-col gap-3 text-sm text-slate-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    <span>Avaliação médica completa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    <span>Diagnóstico diferencial preciso</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    <span>Orientação especializada para pais</span>
                                </div>
                            </div>

                            {/* CTA Principal */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <ButtonWhatsApp
                                    message={mensagemHero}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl transition-all"
                                >
                                    Agendar consulta com neuropediatra
                                </ButtonWhatsApp>

                                <a
                                    href="tel:6237063924"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                                >
                                    (62) 3706-3924
                                </a>
                            </div>

                            <p className="text-xs text-slate-500 mt-3">
                                Atendimento particular e convênios • Jundiaí, Anápolis/GO
                            </p>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/neuropsicologia/neuro.jpeg"
                                    alt="Consulta com neuropediatra na Clínica Fono Inova"
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800';
                                    }}
                                />
                            </div>

                            {/* Card flutuante - credibilidade */}
                            <div className="absolute -bottom-3 -left-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">CRM-GO</div>
                                        <div className="text-xs text-slate-500">Médico especialista</div>
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

            {/* ==================== PROBLEMAS QUE ATENDEMOS ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                            Sinais de Alerta
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Problemas que avaliamos
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Clique no que mais se aproxima da situação do seu filho
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                        {problemas.map((problema) => (
                            <button
                                key={problema.id}
                                onClick={() => setSelectedSintoma(selectedSintoma === problema.id ? null : problema.id)}
                                className={`text-left p-5 rounded-2xl border-2 transition-all ${
                                    selectedSintoma === problema.id
                                        ? 'bg-blue-50 border-blue-500 shadow-lg'
                                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Brain className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 text-sm">{problema.titulo}</h3>
                                </div>
                                <p className="text-xs text-slate-600 ml-[52px]">{problema.descricao}</p>
                            </button>
                        ))}
                    </div>

                    {/* CTA contextualizado */}
                    <div className="text-center mt-8">
                        <ButtonWhatsApp
                            message={selectedSintoma 
                                ? problemas.find(p => p.id === selectedSintoma)?.mensagem 
                                : mensagemHero}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all"
                        >
                            Agendar consulta com neuropediatra
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>

            {/* ==================== DIFERENCIAL MÉDICO ==================== */}
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-300">
                            Por que nos escolher
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Atendimento especializado
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {diferenciais.map((dif, index) => {
                            const Icon = dif.icone;
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2 text-sm">{dif.titulo}</h3>
                                    <p className="text-xs text-slate-600">{dif.descricao}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==================== COMO FUNCIONA ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-green-50 text-green-700 border-green-200">
                            Processo simples
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Como funciona
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                                <div className="absolute inset-0 bg-blue-100 rounded-full" />
                                <span className="relative text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Você chama no WhatsApp</h3>
                            <p className="text-sm text-slate-600">Tire suas dúvidas e agende a consulta</p>
                        </div>
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                                <div className="absolute inset-0 bg-blue-100 rounded-full" />
                                <span className="relative text-2xl font-bold text-blue-600">2</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Agendamos a consulta</h3>
                            <p className="text-sm text-slate-600">Horário conveniente com o neuropediatra</p>
                        </div>
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                                <div className="absolute inset-0 bg-blue-100 rounded-full" />
                                <span className="relative text-2xl font-bold text-blue-600">3</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">Avaliação e orientação</h3>
                            <p className="text-sm text-slate-600">Diagnóstico e direcionamento adequado</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== DEPOIMENTOS ÉTICOS ==================== */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                            Depoimentos
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            O que os pais dizem
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {depoimentos.map((depo, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(depo.estrelas)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                                    "{depo.texto}"
                                </p>
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="font-semibold text-slate-900 text-sm">{depo.autor}</p>
                                    <p className="text-xs text-blue-600">✓ {depo.resultado}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FAQ MÉDICO ==================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                            Tire suas dúvidas
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
                            Perguntas frequentes
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 text-sm flex items-start gap-2">
                                    <span className="text-blue-600">Q:</span>
                                    {item.pergunta}
                                </h3>
                                <p className="text-slate-600 text-sm ml-5">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL - AUTORIDADE ==================== */}
            <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full mb-6">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold text-sm">Agende sua consulta</span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-bold font-poppins mb-4 text-white">
                            Cuide do desenvolvimento do seu filho
                        </h2>

                        <p className="text-lg text-white/80 mb-6">
                            Uma avaliação médica especializada pode trazer clareza e direcionamento 
                            para ajudar seu filho a alcançar seu potencial.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <ButtonWhatsApp
                                message={mensagemHero}
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all"
                            >
                                Agendar consulta com neuropediatra
                            </ButtonWhatsApp>
                        </div>

                        <div className="flex items-center justify-center gap-6 text-white/60 text-xs flex-wrap">
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Atendimento médico
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Diagnóstico preciso
                            </span>
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Acompanhamento
                            </span>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/20">
                            <p className="text-white/50 text-xs">Prefere ligar?</p>
                            <a href="tel:6237063924" className="text-white hover:text-green-400 text-lg font-semibold transition-colors">
                                (62) 3706-3924
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== LOCALIZAÇÃO ==================== */}
            <section className="py-12 bg-blue-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 text-blue-800">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">
                            Clínica Fono Inova | Av. Minas Gerais, 405 - Jundiaí, Anápolis/GO
                        </span>
                    </div>
                    <p className="text-blue-700/70 mt-2 text-sm">
                        Atendimento particular e convênios • Estacionamento disponível
                    </p>
                </div>
            </section>
        </Layout>
    );
};

// Componentes auxiliares
function ClipboardCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
    );
}

function FileText({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

export default NeuropediatriaPage;
