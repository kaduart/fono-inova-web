import { ArrowRight, BookOpen, Brain, Calendar, CheckCircle2, Clock, Eye, GraduationCap, Lightbulb, MapPin, MessageCircle, Phone, School, Star, Target, Users } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';

const DislexiaPage = () => {
    const [selectedIdade, setSelectedIdade] = useState<string | null>(null);

    const sinaisPorSerie = [
        {
            serie: '1º Ano',
            idade: '6-7 anos',
            sinais: ['Confunde letras parecidas (b/d, p/q)', 'Dificuldade para soletrar', 'Lê muito devagar', 'Não reconhece palavras já vistas'],
            mensagem: "Oi, vi no site sobre dislexia. Meu filho está no 1º ano e tem dificuldade para ler/confunde letras. Pode me explicar como funciona a avaliação?"
        },
        {
            serie: '2º Ano',
            idade: '7-8 anos',
            sinais: ['Inverte sílabas ao ler', 'Dificuldade de compreensão', 'Escreve espelhado', 'Evita atividades de leitura'],
            mensagem: "Oi, vi no site sobre dislexia. Meu filho está no 2º ano e inverte sílabas/tem dificuldade de compreensão. Pode me explicar como funciona a avaliação?"
        },
        {
            serie: '3º+ Ano',
            idade: '8+ anos',
            sinais: ['Leitura truncada', 'Compreensão baixa', 'Escrita com muitos erros', 'Frustração com textos longos'],
            mensagem: "Oi, vi no site sobre dislexia. Meu filho está no 3º ano ou mais e tem dificuldade persistente para ler. Pode me explicar como funciona a avaliação?"
        }
    ];

    const sinaisAlerta = [
        { icon: Eye, titulo: 'Confunde letras', descricao: 'b/d, p/q, m/n' },
        { icon: BookOpen, titulo: 'Lê espelhado', descricao: 'was/saw, on/no' },
        { icon: Target, titulo: 'Perde a linha', descricao: 'Pula palavras ou linhas' },
        { icon: Lightbulb, titulo: 'Compreensão baixa', descricao: 'Não entende o que leu' },
    ];

    const depoimentos = [
        {
            estrelas: 5,
            texto: "Minha filha confundia todas as letras. Depois de 4 meses de acompanhamento, já lê com fluência! A escola não acreditava no progresso.",
            autor: "Mãe da Isabella, 7 anos",
            resultado: "Leitura fluente em 4 meses"
        },
        {
            estrelas: 5,
            texto: "Meu filho evitava ler, chorava nas lições. Hoje ele pega livro por vontade própria. A diferença é absurda!",
            autor: "Pai do Gabriel, 8 anos",
            resultado: "De leitura forçada a prazer em ler"
        },
        {
            estrelas: 5,
            texto: "Avaliação completa identificou exatamente o que ele precisava. Orientação clara e tratamento efetivo. Super recomendo!",
            autor: "Mãe do Pedro, 9 anos",
            resultado: "Melhora significativa na escola"
        }
    ];

    const etapas = [
        { passo: '1', titulo: 'Avaliação Psicopedagógica', descricao: 'Identificamos o perfil de aprendizagem e dificuldades específicas' },
        { passo: '2', titulo: 'Avaliação Fonoaudiológica', descricao: 'Analisamos processamento auditivo e relação som-letra' },
        { passo: '3', titulo: 'Plano Personalizado', descricao: 'Criamos estratégias específicas para as dificuldades identificadas' },
        { passo: '4', titulo: 'Intervenção Multidisciplinar', descricao: 'Psicopedagogia + fonoaudiologia trabalhando juntas' },
    ];

    const faq = [
        {
            pergunta: 'Dislexia tem cura?',
            resposta: 'A dislexia não é uma doença, mas uma forma diferente de processar a linguagem escrita. Com intervenção adequada, a pessoa aprende a ler e escrever bem, desenvolvendo estratégias compensatórias.'
        },
        {
            pergunta: 'Com quantos anos é possível identificar dislexia?',
            resposta: 'Geralmente entre 6-8 anos, quando a criança já teve contato formal com a leitura e escrita. Antes disso é difícil distinguir dislexia de dificuldades normais de aprendizagem.'
        },
        {
            pergunta: 'Quanto tempo leva para ver resultados?',
            resposta: 'Muitas famílias relatam progresso já nas primeiras 8-12 semanas. A evolução depende da frequência das sessões e do envolvimento da família nas atividades em casa.'
        },
        {
            pergunta: 'Preciso de encaminhamento da escola?',
            resposta: 'Não! Você pode agendar diretamente. Na verdade, muitos pais buscam ajuda antes da escola identificar o problema.'
        },
        {
            pergunta: 'A dislexia afeta apenas a leitura?',
            resposta: 'Não. Também pode afetar escrita, ortografia, memorização de sequências (dias da semana, meses) e organização. A avaliação identifica o perfil completo.'
        }
    ];

    return (
        <Layout>
            <SEO
                title="Dislexia Infantil em Anápolis | Avaliação e Tratamento"
                description="Seu filho confunde letras, lê espelhado ou tem dificuldade para aprender? Avaliação psicopedagógica e fonoaudiológica em Anápolis. Agende pelo WhatsApp."
                keywords="dislexia infantil anapolis, crianca troca letras, dificuldade para ler, psicopedagogia anapolis, dislexia tratamento"
                image="/images/servicos/dislexia.jpg"
                url="https://www.clinicafonoinova.com.br/dislexia-infantil"
                type="article"
            />

            {/* HERO */}
            <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full mb-6">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">Quanto antes identificar, melhor</span>
                            </div>

                            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Avaliação Multidisciplinar
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Seu Filho Confunde Letras ou Tem{" "}
                                <span className="text-blue-600">Dificuldade para Ler</span>?
                            </h1>

                            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-xl">
                                Pode ser dislexia. Na <strong>Clínica Fono Inova</strong> em Anápolis, 
                                avaliamos e tratamos crianças com dificuldades de aprendizagem de forma 
                                especializada e acolhedora.
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600" />
                                    ))}
                                </div>
                                <div className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-900">+150 crianças</span> superaram a dislexia conosco
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    message="Oi, vi no site sobre dislexia. Meu filho tem dificuldade para ler/confunde letras. Pode me explicar como funciona a avaliação?"
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Falar com Especialista
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </ButtonWhatsApp>
                                <a href="tel:6237063924" className="inline-flex items-center justify-center gap-2 px-6 py-5 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                    <Phone className="w-5 h-5" />
                                    (62) 3706-3924
                                </a>
                            </div>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img src="/images/dislexia-hero.jpg" alt="Avaliação de dislexia" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'; }} />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-slate-900">90%</div>
                                        <div className="text-sm text-slate-500">Melhora na leitura</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SELEÇÃO POR SÉRIE */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">Identificação Precoce</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Qual a <span className="text-blue-600">série</span> do seu filho?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {sinaisPorSerie.map((grupo, index) => (
                            <button key={index} onClick={() => setSelectedIdade(selectedIdade === grupo.serie ? null : grupo.serie)} className={`text-left p-6 rounded-2xl border-2 transition-all ${selectedIdade === grupo.serie ? 'bg-blue-50 border-blue-500 shadow-lg' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <School className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900">{grupo.serie}</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-3">{grupo.idade}</p>
                                <ul className="space-y-2">
                                    {grupo.sinais.map((sinal, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                            {sinal}
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <ButtonWhatsApp message={selectedIdade ? sinaisPorSerie.find(s => s.serie === selectedIdade)?.mensagem : "Oi, vi no site sobre dislexia. Gostaria de agendar uma avaliação."} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Falar com Especialista
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>

            {/* SINAIS ESPECÍFICOS */}
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Sinais de <span className="text-blue-600">Alerta</span></h2>
                        <p className="text-slate-600">Se você notou algum desses sinais, uma avaliação pode ajudar</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {sinaisAlerta.map((sinal, index) => {
                            const Icon = sinal.icon;
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">{sinal.titulo}</h3>
                                    <p className="text-sm text-slate-600">{sinal.descricao}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Processo Completo</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Como Funciona o <span className="text-blue-600">Tratamento</span>?</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {etapas.map((etapa, index) => (
                            <div key={index} className="relative bg-slate-50 rounded-xl p-6 text-center pt-12">
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                                    {etapa.passo}
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">{etapa.titulo}</h4>
                                <p className="text-sm text-slate-600">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEPOIMENTOS */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">Resultados Reais</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Histórias de <span className="text-blue-600">Sucesso</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {depoimentos.map((depo, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(depo.estrelas)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-lg font-medium text-slate-800 mb-4">"{depo.texto}"</p>
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="font-semibold text-slate-900">{depo.autor}</p>
                                    <p className="text-sm text-green-600">✓ {depo.resultado}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-purple-50 text-purple-700 border-purple-200">Tire suas Dúvidas</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Perguntas <span className="text-blue-600">Frequentes</span></h2>
                    </div>

                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                                    <span className="text-blue-600">Q:</span>{item.pergunta}
                                </h3>
                                <p className="text-slate-600 ml-6">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full mb-8 animate-pulse">
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">Quanto antes começar, melhor o resultado</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-white">
                            Não Deixe seu Filho Sufrir na Escola
                        </h2>

                        <p className="text-xl text-white/80 mb-8">
                            A dislexia tem tratamento. Com acompanhamento especializado, 
                            seu filho pode ler e escrever com confiança.
                        </p>

                        <ButtonWhatsApp message="Oi, vi no site sobre dislexia. Quero agendar uma avaliação para meu filho." className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all inline-flex items-center gap-3">
                            <MessageCircle className="w-7 h-7" />
                            Agendar Avaliação Agora
                        </ButtonWhatsApp>

                        <p className="text-white/60 mt-6 text-sm">
                            📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Jundiaí • Anápolis/GO
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DislexiaPage;
