import { AlertCircle, ArrowRight, Baby, Brain, Calendar, CheckCircle2, Clock, Heart, Lightbulb, MapPin, MessageCircle, Phone, Sparkles, Star, Users } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFAQTea, schemaTea } from '../schemas/clinicaSchemas';

const TeaPage = () => {
    const [selectedSinal, setSelectedSinal] = useState<string | null>(null);

    // Sinais organizados por idade para melhor identificação
    const sinaisPorIdade = [
        {
            idade: '6-12 meses',
            sinais: ['Pouco contato visual', 'Não responde ao nome', 'Ausência de balbucio', 'Não aponta para objetos'],
            mensagem: "Oi, vi no site sobre avaliação de autismo. Meu bebê tem 6-12 meses e notei pouco contato visual/não responde ao nome. Pode me explicar como funciona?"
        },
        {
            idade: '1-2 anos',
            sinais: ['Não fala palavras', 'Não brinca de faz de conta', 'Movimentos repetitivos', 'Não segue comandos'],
            mensagem: "Oi, vi no site sobre avaliação de autismo. Meu filho tem 1-2 anos e ainda não fala/faz movimentos repetitivos. Pode me explicar como funciona?"
        },
        {
            idade: '2-3 anos',
            sinais: ['Fala pouco ou não fala', 'Não interage com outras crianças', 'Rotinas rígidas', 'Sensibilidade a sons/luzes'],
            mensagem: "Oi, vi no site sobre avaliação de autismo. Meu filho tem 2-3 anos e fala pouco/não brinca com outras crianças. Pode me explicar como funciona?"
        },
        {
            idade: '3+ anos',
            sinais: ['Dificuldade na escola', 'Comportamentos desafiadores', 'Comunicação limitada', 'Interesses restritos'],
            mensagem: "Oi, vi no site sobre avaliação de autismo. Meu filho tem 3+ anos e tem dificuldade na escola/comunicação. Pode me explicar como funciona?"
        }
    ];

    // Sinais específicos para identificação rápida
    const sinaisEspecificos = [
        { icon: Lightbulb, titulo: 'Não olha nos olhos', descricao: 'Evita contato visual durante interações' },
        { icon: MessageCircle, titulo: 'Não responde ao nome', descricao: 'Parece não ouvir quando chamado' },
        { icon: Users, titulo: 'Não brinca com outros', descricao: 'Prefere ficar sozinho, isolamento social' },
        { icon: Clock, titulo: 'Manias repetitivas', descricao: 'Balanço, girar objetos, linhas' },
    ];

    const beneficios = [
        {
            icon: Brain,
            title: 'Avaliação Multidisciplinar',
            description: 'Psicólogo + Fonoaudiólogo + Terapeuta Ocupacional especializados em TEA'
        },
        {
            icon: Sparkles,
            title: 'Intervenção Precoce',
            description: 'Quanto mais cedo começar, maiores os ganhos no desenvolvimento da criança'
        },
        {
            icon: Heart,
            title: 'Acolhimento Familiar',
            description: 'Orientação completa para pais: você não está sozinho nessa jornada'
        }
    ];

    const depoimentos = [
        {
            estrelas: 5,
            texto: "A avaliação multidisciplinar foi o divisor de águas. Hoje meu filho de 4 anos está muito mais comunicativo e feliz.",
            autor: "Mãe do Pedro, 4 anos",
            resultado: "Diagnóstico claro e tratamento efetivo"
        },
        {
            estrelas: 5,
            texto: "Iniciamos o acompanhamento aos 2 anos e meio. Os progressos são visíveis a cada mês. Valeu cada sessão!",
            autor: "Pai da Laura, 3 anos",
            resultado: "Comunicação melhorou significativamente"
        },
        {
            estrelas: 5,
            texto: "Estava perdida e com medo. A equipe me explicou tudo com paciência e carinho. Hoje tenho direção.",
            autor: "Mãe da Sofia, 2 anos",
            resultado: "Tranquilidade e orientação clara"
        }
    ];

    const etapasAvaliacao = [
        {
            passo: '1',
            titulo: 'Entrevista com Pais',
            descricao: 'Conversamos sobre histórico, comportamentos e preocupações da família'
        },
        {
            passo: '2',
            titulo: 'Avaliação Especializada',
            descricao: 'Sessões com psicólogo, fonoaudiólogo e terapeuta ocupacional'
        },
        {
            passo: '3',
            titulo: 'Relatório Completo',
            descricao: 'Diagnóstico detalhado com plano de tratamento individualizado'
        },
        {
            passo: '4',
            titulo: 'Início do Acompanhamento',
            descricao: 'Terapias coordenadas para melhor desenvolvimento da criança'
        }
    ];

    const faq = [
        {
            pergunta: 'Com quantos anos é possível identificar autismo?',
            resposta: 'Alguns sinais podem ser observados a partir dos 12-18 meses. O diagnóstico mais confiável geralmente ocorre entre 2-3 anos, mas quanto antes buscar ajuda, melhor para a criança.'
        },
        {
            pergunta: 'Autismo tem cura?',
            resposta: 'O TEA não é uma doença, mas uma condição do neurodesenvolvimento. Com intervenção precoce e adequada, a criança pode desenvolver habilidades importantes e ter uma vida plena e feliz.'
        },
        {
            pergunta: 'Quanto tempo dura a avaliação?',
            resposta: 'A avaliação multidisciplinar completa geralmente leva 2-3 sessões de aproximadamente 1 hora cada. O relatório final fica pronto em até 7 dias úteis após a última sessão.'
        },
        {
            pergunta: 'Preciso de encaminhamento médico?',
            resposta: 'Não! Você pode agendar diretamente. Na Clínica Fono Inova, atendemos particular e diversos convênios. O agendamento é simples pelo WhatsApp.'
        },
        {
            pergunta: 'E se não for autismo?',
            resposta: 'A avaliação identifica o perfil completo da criança. Mesmo que não seja TEA, teremos um diagnóstico preciso e direcionamento adequado para qualquer necessidade de desenvolvimento.'
        }
    ];

    const estatisticas = [
        { valor: '500+', label: 'Avaliações Realizadas', icone: Users },
        { valor: '4.9/5', label: 'Avaliação Google', icone: Star },
        { valor: '3', label: 'Especialidades', icone: Brain },
        { valor: '10+', label: 'Anos de Experiência', icone: Clock }
    ];

    return (
        <Layout>
            <SEO
                title="Suspeita de Autismo em Anápolis | Avaliação TEA Multidisciplinar"
                description="Seu filho não olha nos olhos ou tem comportamentos diferentes? Avaliação de autismo (TEA) multidisciplinar no bairro Jundiaí, Anápolis. Diagnóstico precoce."
                keywords="avaliacao autismo anapolis, diagnostico tea anapolis, fonoaudiologia autismo, psicologo autismo jundiai, crianca nao responde nome"
                image="/images/fonoaudiologia/atendimento-premium.png"
                url="https://www.clinicafonoinova.com.br/avaliacao-autismo-infantil"
                type="article"
                schema={[schemaTea, schemaFAQTea]}
            />

            {/* ==================== HERO - FOCADA EM DOR ==================== */}
            <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 via-purple-50/40 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="order-2 lg:order-1">
                            {/* Badge de urgência */}
                            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full mb-6">
                                <Clock className="w-4 h-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-700">
                                    Diagnóstico precoce é fundamental
                                </span>
                            </div>

                            <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Avaliação Multidisciplinar
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Seu Filho Não Olha nos Olhos ou{" "}
                                <span className="text-purple-600">Tem Comportamentos Diferentes</span>?
                            </h1>

                            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-xl">
                                Você não está sozinho. A avaliação multidisciplinar traz clareza e direção. 
                                Na <strong>Clínica Fono Inova</strong> em Anápolis, acolhemos sua família com 
                                respeito e especialização.
                            </p>

                            {/* Alerta importante */}
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
                                <p className="text-amber-900 text-sm">
                                    <strong>A Janela de Ouro:</strong> A intervenção entre 2-5 anos é crucial. 
                                    Cada mês de estimulação adequada potencializa drasticamente o desenvolvimento.
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
                                    <span className="font-semibold text-slate-900">500+ famílias</span> já encontraram direção
                                </div>
                            </div>

                            {/* CTA Principal */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    message="Oi, vi no site sobre avaliação de autismo. Tenho suspeita sobre meu filho e gostaria de agendar. Pode me explicar como funciona?"
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
                                Avaliação multidisciplinar completa • Sem encaminhamento
                            </p>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/tea/tea-fantochy.jpeg"
                                    alt="Avaliação de TEA na Clínica Fono Inova"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800';
                                    }}
                                />
                            </div>

                            {/* Card flutuante */}
                            <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-slate-900">500+</div>
                                        <div className="text-sm text-slate-500">Avaliações realizadas</div>
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

            {/* ==================== ESTATÍSTICAS ==================== */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {estatisticas.map((stat, index) => {
                            const Icon = stat.icone;
                            return (
                                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Icon className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{stat.valor}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==================== SINAIS POR IDADE ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
                            Identificação Precoce
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Qual a <span className="text-purple-600">idade</span> do seu filho?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Clique abaixo para ver os sinais típicos de cada faixa etária
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {sinaisPorIdade.map((grupo, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSinal(selectedSinal === grupo.idade ? null : grupo.idade)}
                                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                                    selectedSinal === grupo.idade
                                        ? 'bg-purple-50 border-purple-500 shadow-lg'
                                        : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                                }`}
                            >
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Baby className="w-7 h-7 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{grupo.idade}</h3>
                                <ul className="space-y-2">
                                    {grupo.sinais.map((sinal, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                            <AlertCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
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
                            message={selectedSinal 
                                ? sinaisPorIdade.find(s => s.idade === selectedSinal)?.mensagem 
                                : "Oi, vi no site sobre avaliação de autismo. Tenho suspeita sobre meu filho e gostaria de agendar. Pode me explicar como funciona?"}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Falar com Especialista no WhatsApp
                        </ButtonWhatsApp>
                        <p className="text-sm text-slate-500 mt-3">
                            Resposta em até 2h • Conversa sem compromisso
                        </p>
                    </div>
                </div>
            </section>

            {/* ==================== SINAIS ESPECÍFICOS ==================== */}
            <section className="py-20 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Sinais que Merecem <span className="text-purple-600">Atenção</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Se você notou algum desses comportamentos, uma avaliação pode trazer clareza
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {sinaisEspecificos.map((sinal, index) => {
                            const Icon = sinal.icon;
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition-shadow">
                                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">{sinal.titulo}</h3>
                                    <p className="text-sm text-slate-600">{sinal.descricao}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-slate-600 italic max-w-2xl mx-auto">
                            <strong>Importante:</strong> Apenas um profissional especializado pode confirmar o diagnóstico. 
                            Não deixe a dúvida te paralisar.
                        </p>
                    </div>
                </div>
            </section>

            {/* ==================== POR QUE DIAGNÓSTICO PRECOCE ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">
                                Ciência e Resultados
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                                Por Que o <span className="text-purple-600">Diagnóstico Precoce</span> é Essencial?
                            </h2>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento. 
                                A <strong>neuroplasticidade infantil</strong> é maior nos primeiros anos de vida, 
                                o que significa que intervenções iniciadas cedo têm impacto muito maior.
                            </p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Estudos mostram que crianças que iniciam terapia antes dos 3 anos apresentam 
                                ganhos significativamente maiores em comunicação, socialização e autonomia.
                            </p>
                            
                            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
                                <p className="font-semibold text-purple-700 mb-2">💡 Saiba Disso</p>
                                <p className="text-slate-700">
                                    Não existe "esperar para ver". Cada mês sem estimulação adequada é uma 
                                    janela de oportunidade que se fecha.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/fonoaudiologia/atendimento-premium.png"
                                alt="Terapia multidisciplinar"
                                className="rounded-3xl shadow-2xl w-full"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== COMO AJUDAMOS ==================== */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Como a <span className="text-purple-600">Fono Inova</span> Ajuda
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Avaliação completa com equipe multidisciplinar especializada em TEA
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                        {beneficios.map((beneficio, index) => {
                            const Icon = beneficio.icon;
                            return (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{beneficio.title}</h3>
                                    <p className="text-slate-600">{beneficio.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Etapas */}
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                                Como Funciona a <span className="text-purple-600">Avaliação</span>
                            </h3>
                            <p className="text-slate-600">Processo completo em 4 etapas claras</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {etapasAvaliacao.map((etapa, index) => (
                                <div key={index} className="relative bg-white rounded-xl p-6 shadow-md text-center pt-12">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                                        {etapa.passo}
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-2">{etapa.titulo}</h4>
                                    <p className="text-sm text-slate-600">{etapa.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== DEPOIMENTOS ==================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
                            Histórias Reais
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            O Que os <span className="text-purple-600">Pais</span> Dizem
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {depoimentos.map((depo, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(depo.estrelas)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-lg font-medium text-slate-800 mb-4">
                                    "{depo.texto}"
                                </p>
                                <div className="pt-4 border-t border-slate-200">
                                    <p className="font-semibold text-slate-900">{depo.autor}</p>
                                    <p className="text-sm text-green-600">✓ {depo.resultado}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FAQ ==================== */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
                            Tire suas Dúvidas
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Perguntas <span className="text-purple-600">Frequentes</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                                    <span className="text-purple-600">Q:</span>
                                    {item.pergunta}
                                </h3>
                                <p className="text-slate-600 ml-6">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA FINAL ==================== */}
            <section className="py-20 bg-gradient-to-br from-purple-700 via-purple-800 to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full mb-8 animate-pulse">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">A janela de oportunidade é agora</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-white">
                            Não Deixe a Dúvida Te Paralisar
                        </h2>

                        <p className="text-xl text-white/80 mb-8">
                            Tire suas dúvidas com nossa equipe especializada. A avaliação traz 
                            clareza e o caminho certo para ajudar seu filho.
                        </p>

                        <div className="bg-white p-8 rounded-3xl shadow-2xl text-slate-900 mb-8">
                            <h3 className="text-2xl font-bold mb-3 text-purple-600">
                                Avaliação Multidisciplinar Completa
                            </h3>
                            <p className="text-slate-600 mb-2">
                                Psicologia + Fonoaudiologia + Terapia Ocupacional
                            </p>
                            <p className="text-lg font-bold text-purple-600 mb-6">
                                Relatório completo em até 7 dias
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <ButtonWhatsApp
                                    message="Oi, vi no site sobre avaliação de autismo. Quero agendar uma avaliação multidisciplinar."
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Agendar Avaliação Agora
                                </ButtonWhatsApp>
                                <ButtonWhatsApp
                                    message="Oi, vi no site sobre avaliação de autismo. Tenho dúvidas antes de agendar. Pode me ajudar?"
                                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Tirar Dúvidas
                                </ButtonWhatsApp>
                            </div>
                        </div>

                        <p className="text-white/60 text-sm">
                            📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Jundiaí • Anápolis/GO
                        </p>
                    </div>
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

export default TeaPage;
