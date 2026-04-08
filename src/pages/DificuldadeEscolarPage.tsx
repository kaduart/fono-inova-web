import { AlertTriangle, BookOpen, Brain, CheckCircle, ChevronDown, Clock, Phone, Quote, Shield, Star, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaDificuldadeEscolar, schemaFAQDificuldadeEscolar } from '../schemas/clinicaSchemas';
import { trackLandingPageView } from '../services/landingPageAnalytics';

const DificuldadeEscolarPage = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    
    // Tracking da página
    useEffect(() => {
        trackLandingPageView('avaliacao-neuropsicologica-dificuldade-escolar', 'aprendizagem');
    }, []);
    const sinaisDificuldade = [
        'Notas baixas mesmo estudando muito',
        'Dificuldade para ler ou escrever',
        'Esquece o que acabou de aprender',
        'Não consegue se concentrar nas tarefas',
        'Demora muito para fazer lição de casa',
        'Frustração e desânimo com a escola',
        'Troca letras ao escrever (b/d, p/q)',
        'Dificuldade com matemática'
    ];

    const condicoesComuns = [
        {
            icon: <BookOpen className="w-12 h-12 text-blue-600" />,
            title: 'Dislexia',
            description: 'Dificuldade específica de leitura e escrita, afeta 10-15% das crianças'
        },
        {
            icon: <Brain className="w-12 h-12 text-blue-600" />,
            title: 'TDAH',
            description: 'Déficit de atenção e hiperatividade, dificulta concentração e organização'
        },
        {
            icon: <Target className="w-12 h-12 text-blue-600" />,
            title: 'Discalculia',
            description: 'Dificuldade com números e raciocínio matemático'
        }
    ];

    const equipe = [
        {
            profissao: '👩‍⚕️ Neuropsicóloga',
            atuacao: 'Realiza a avaliação completa com testes padronizados e entrevistas. Elabora o relatório e plano de intervenção.',
            especializacao: 'Especialização em avaliação neuropsicológica infantil e adolescente'
        },
        {
            profissao: '🎓 Psicopedagoga',
            atuacao: 'Trabalha as estratégias de aprendizagem, métodos de estudo e reabilitação das dificuldades específicas.',
            especializacao: 'Especialização em dificuldades de aprendizagem e TDAH'
        },
        {
            profissao: '🗣️ Fonoaudióloga',
            atuacao: 'Atua em casos de dislexia, dificuldades de leitura e escrita, trabalhando processamento fonológico e consciência fonêmica.',
            especializacao: 'Certificação em reabilitação de leitura e escrita'
        },
        {
            profissao: '🧠 Psicóloga',
            atuacao: 'Trabalha autoestima, ansiedade, frustração e outros aspectos emocionais que acompanham as dificuldades escolares.',
            especializacao: 'Especialização em psicologia escolar e TCC infantil'
        }
    ];

    return (
        <Layout>
            <SEO
                title="Meu Filho Não Aprende na Escola em Anápolis | Jundiaí - Fono Inova"
                description="Seu filho estuda muito mas tira notas baixas em Anápolis? Avaliação neuropsicológica no bairro Jundiaí para identificar dislexia, TDAH. Agende pelo WhatsApp."
                keywords="dificuldade de aprendizagem anapolis, dislexia anapolis, tdah infantil anapolis, avaliacao neuropsicologica jundiai"
                image="/images/servicos/dificuldade-escolar.jpg"
                url="https://www.clinicafonoinova.com.br/avaliacao-neuropsicologica-dificuldade-escolar"
                type="article"
                schema={[schemaDificuldadeEscolar, schemaFAQDificuldadeEscolar]}
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="animate-fade-in-up order-2 lg:order-1">
                            <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Dificuldade de Aprendizagem
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Seu Filho se Esforça, mas as Notas <span className="text-blue-600">Não Melhoram</span>?
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Avaliação neuropsicológica completa no bairro <strong>Jundiaí</strong> para identificar dislexia, TDAH e outras condições em Anápolis.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Oi! Vi no site sobre dificuldade escolar e me identifiquei.\n\nMeu filho(a) está com dificuldade na escola e queria entender melhor como vocês podem ajudar. Pode me explicar?"
                                    
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    lpSlug="avaliacao-neuropsicologica-dificuldade-escolar"
                                    lpCategory="aprendizagem"
                                >
                                    Agendar Avaliação
                                </ButtonWhatsApp>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl overflow-hidden">
                                <img
                                    src="/images/dificuldade-escolar-hero.jpg"
                                    alt="Criança estudando"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800';
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                                <p className="text-4xl font-bold text-blue-600">90%</p>
                                <p className="text-sm text-gray-600">Melhora com suporte</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sinais */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Seu Filho Apresenta <span className="text-blue-600">Esses Sinais</span>?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Reconhecer os sinais de dificuldade de aprendizagem é o primeiro passo para ajudar.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {sinaisDificuldade.map((sinal, index) => (
                            <div key={index} className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{sinal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Condições Comuns */}
            <section className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Pode Ser Mais que <span className="text-blue-600">"Falta de Atenção"</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Conheça as principais condições que afetam o aprendizado escolar
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {condicoesComuns.map((condicao, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {condicao.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{condicao.title}</h3>
                                <p className="text-gray-600">{condicao.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md inline-block max-w-2xl">
                            <p className="font-semibold text-blue-600 mb-2">💡 Importante Saber</p>
                            <p className="text-gray-600">
                                Essas condições NÃO significam falta de inteligência. São apenas formas
                                diferentes do cérebro processar informações - e todas são tratáveis com
                                as estratégias corretas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Interrupção - Desespero */}
            <section className="py-12 bg-orange-50 border-y border-orange-200">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Seu Filho Chora ao Fazer Lição de Casa?
                    </h3>
                    <p className="text-gray-700 mb-6">
                        A frustração escolar é real. Se seu filho demora 3 horas para fazer o que deveria levar 30 minutos,
                        <strong> não é preguiça</strong>. É hora de investigar. No bairro Jundiaí, fazemos avaliação expressa.
                    </p>
                    <ButtonWhatsApp
                        message="Meu filho tem muita dificuldade com lição de casa. Quero agendar avaliação neuropsicológica no Jundiaí."
                        onClick={() => { }}
                        
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >
                        Quero Avaliação Expressa
                    </ButtonWhatsApp>
                </div>
            </section>
            {/* Por que é essencial */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                                Por Que a <span className="text-blue-600">Avaliação Neuropsicológica</span> é Essencial?
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                A avaliação neuropsicológica identifica exatamente onde estão as dificuldades:
                                memória, atenção, processamento de leitura, raciocínio matemático, funções executivas...
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                <strong>Não é um teste de inteligência.</strong> É uma investigação profunda sobre
                                como o cérebro do seu filho processa informações e aprende - e quais estratégias
                                funcionam melhor para ele.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Com o relatório em mãos, você e a escola saberão exatamente como ajudar: quais
                                adaptações são necessárias, quais métodos de ensino funcionam, e como criar um
                                plano de estudo eficaz.
                            </p>
                            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                                <p className="font-semibold text-blue-600 mb-2">📊 Relatório Completo Inclui</p>
                                <p className="text-sm text-gray-600">
                                    ✓ Diagnóstico detalhado das dificuldades<br />
                                    ✓ Pontos fortes e áreas de melhoria<br />
                                    ✓ Recomendações para escola e família<br />
                                    ✓ Plano de intervenção personalizado
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/neuropsicologia/aval-psicolo.jpeg"
                                alt="Avaliação neuropsicológica"
                                className="rounded-2xl shadow-xl w-full"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossa Equipe */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                            Nossa <span className="text-blue-600">Equipe</span> Especializada
                        </h3>
                        <p className="text-gray-600">Profissionais com experiência em avaliação e reabilitação neuropsicológica</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {equipe.map((membro, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <h4 className="text-xl font-bold mb-3 text-blue-600">{membro.profissao}</h4>
                                <p className="text-gray-700 mb-3">{membro.atuacao}</p>
                                <p className="text-sm italic text-gray-500">{membro.especializacao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600 mb-4">Outros pais de Anápolis buscaram por:</p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        <a href="/fala-tardia" className="text-blue-600 hover:underline">Atraso na Fala</a>
                        <span className="text-gray-300">|</span>
                        <a href="/avaliacao-autismo-infantil" className="text-blue-600 hover:underline">Suspeita de Autismo</a>
                        <span className="text-gray-300">|</span>
                        <a href="/psicopedagogia" className="text-blue-600 hover:underline">Dislexia</a>
                        <span className="text-gray-300">|</span>
                        <a href="/fonoaudiologia" className="text-blue-600 hover:underline">Fonoaudiologia</a>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Recupere a Confiança do Seu Filho
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Com o diagnóstico correto e suporte especializado, seu filho pode ter sucesso
                            na escola e recuperar a autoestima. Não deixe as dificuldades se acumularem.
                        </p>
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900">
                            <h3 className="text-2xl font-bold mb-3 text-blue-600">
                                Avaliação Neuropsicológica Completa
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Identificação precisa + Relatório detalhado + Plano de intervenção
                            </p>
                            <p className="text-lg font-bold text-blue-600 mb-6">
                                A partir de R$ 220 (primeira consulta)
                            </p>
                            <ButtonWhatsApp
                                onClick={() => { }}
                                
                                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Oi! Vi no site sobre dificuldade escolar e me identifiquei.\n\nMeu filho(a) está com dificuldade na escola e queria entender melhor como vocês podem ajudar. Pode me explicar?"
                            >
                                Agendar Agora
                            </ButtonWhatsApp>
                            <p className="text-sm text-gray-500 mt-4">
                                📍 Clínica Fono Inova - Anápolis, GO
                            </p>
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
        </Layout>
    );
};

export default DificuldadeEscolarPage;