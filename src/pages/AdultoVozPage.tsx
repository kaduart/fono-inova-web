import { AlertCircle, Calendar, CheckCircle, MessageCircle, Mic, Phone, Quote, Shield, Star, Users } from 'lucide-react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaAdultoVoz, schemaFAQAdulto } from '../schemas/clinicaSchemas';

const AdultoVozPage = () => {
    const sinaisProblemaVoz = [
        'Rouquidão frequente ou persistente',
        'Cansaço ao falar (especialmente no final do dia)',
        'Perda de alcance vocal (não consegue falar alto)',
        'Dor ou desconforto ao falar',
        'Necessidade de pigarrear constantemente',
        'Voz falha ou some durante o dia',
        'Sensação de corpo estranho na garganta',
        'Dificuldade em ser ouvido em ambientes ruidosos'
    ];

    const sinaisDisfagia = [
        'Engasgos frequentes ao comer ou beber',
        'Tosse durante ou após refeições',
        'Sensação de comida parada na garganta',
        'Dor ao engolir',
        'Necessidade de múltiplas deglutições',
        'Perda de peso não intencional',
        'Evitar certos alimentos por dificuldade',
        'Pneumonias de repetição'
    ];

    const profissionaisVoz = [
        { nome: 'Professores', desc: 'Principal público com problemas vocais' },
        { nome: 'Palestrantes', desc: 'Necessitam de voz potente e resistente' },
        { nome: 'Cantores', desc: 'Precisam de técnica vocal apurada' },
        { nome: 'Teleoperadores', desc: 'Uso intensivo da voz no trabalho' },
        { nome: 'Advogados', desc: 'Voz como ferramenta profissional' },
        { nome: 'Vendedores', desc: 'Comunicação constante' }
    ];

    const tratamentosOferecidos = [
        {
            icon: <Mic className="w-12 h-12 text-emerald-600" />,
            title: 'Reabilitação Vocal',
            description: 'Tratamento de rouquidão, nódulos, pólipos e outras alterações vocais'
        },
        {
            icon: <Users className="w-12 h-12 text-emerald-600" />,
            title: 'Treinamento Vocal',
            description: 'Aprimoramento da voz para profissionais que dependem dela'
        },
        {
            icon: <AlertCircle className="w-12 h-12 text-emerald-600" />,
            title: 'Tratamento de Disfagia',
            description: 'Reabilitação da deglutição em adultos e idosos'
        }
    ];

    const processoTratamento = [
        {
            numero: '1',
            titulo: 'Avaliação',
            descricao: 'Análise completa da voz e/ou deglutição com testes específicos'
        },
        {
            numero: '2',
            titulo: 'Diagnóstico',
            descricao: 'Identificação precisa do problema e suas causas'
        },
        {
            numero: '3',
            titulo: 'Tratamento',
            descricao: 'Sessões semanais com exercícios personalizados'
        },
        {
            numero: '4',
            titulo: 'Alta',
            descricao: 'Quando a voz/deglutição estiver recuperada e funcional'
        }
    ];

    return (
        <Layout>
            <SEO
                title="Fonoaudiologia para Adultos em Anápolis | Voz e Disfagia Jundiaí"
                description="Tratamento para rouquidão, voz profissional e disfagia no bairro Jundiaí, Anápolis. Fonoaudiologia adulta especializada."
                keywords="fonoaudiologia adulta anapolis, rouquidao tratamento jundiai, disfagia anapolis, voz profissional"
                image="/images/servicos/fonoaudiologia-adulto.jpg"
                url="https://www.clinicafonoinova.com.br/fonoaudiologia-adulto"
                type="article"
                schema={[schemaAdultoVoz, schemaFAQAdulto]}
            />


            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="animate-fade-in-up order-2 lg:order-1">
                            <Badge variant="secondary" className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Fonoaudiologia Adulta
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Saúde Vocal e <span className="text-emerald-600">Reabilitação</span> Adulta
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Tratamento especializado para profissionais da voz e reabilitação de deglutição (disfagia) no bairro <strong>Jundiaí, Anápolis</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Olá! Gostaria de agendar uma avaliação fonoaudiológica para adultos (voz/deglutição)."
                                    icon={Calendar}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Agendar Avaliação
                                </ButtonWhatsApp>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-emerald-200 to-emerald-400 rounded-3xl overflow-hidden">
                                <img
                                    src="/images/adulto-voz-hero.jpg"
                                    alt="Profissional em fonoterapia"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800';
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                                <p className="text-4xl font-bold text-emerald-600">+200</p>
                                <p className="text-sm text-gray-600">Profissionais atendidos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problemas Vocais */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Problemas <span className="text-emerald-600">Vocais</span>: Você Reconhece Esses Sinais?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Esses sintomas indicam que sua voz precisa de atenção especializada
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {sinaisProblemaVoz.map((sinal, index) => (
                            <div key={index} className="bg-white border-l-4 border-emerald-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{sinal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-gray-600 italic">
                            <strong>Importante:</strong> Rouquidão por mais de 15 dias requer avaliação médica
                            (otorrinolaringologista) + fonoaudiológica.
                        </p>
                    </div>
                </div>
            </section>

            {/* Profissionais da Voz */}
            <section className="py-20 bg-emerald-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Sua Voz é Sua <span className="text-emerald-600">Ferramenta de Trabalho</span>?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Profissionais que mais precisam de cuidado vocal
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profissionaisVoz.map((profissional, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold mb-2 text-emerald-600">{profissional.nome}</h3>
                                <p className="text-sm text-gray-600">{profissional.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md inline-block max-w-2xl">
                            <p className="font-semibold text-emerald-600 mb-2">💡 Você Sabia?</p>
                            <p className="text-gray-600">
                                Professores têm 5x mais chance de desenvolver problemas vocais que outros
                                profissionais. Mas com técnica vocal adequada, é possível prevenir e tratar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Localização */}
            <section className="py-8 bg-emerald-50 border-y border-emerald-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-emerald-800 font-medium">
                        📍 Atendimento fonoaudiológico para adultos no bairro Jundiaí, Anápolis/GO |
                        Av. Minas Gerais, 405 | Fácil estacionamento
                    </p>
                </div>
            </section>

            {/* Disfagia */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            <span className="text-emerald-600">Dificuldade</span> para Engolir?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Disfagia é a dificuldade de engolir alimentos, líquidos ou saliva - comum em
                            idosos, pós-AVC e outras condições neurológicas
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {sinaisDisfagia.map((sinal, index) => (
                            <div key={index} className="bg-white border-l-4 border-rose-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{sinal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <div className="bg-rose-50 p-6 rounded-xl shadow-md inline-block max-w-2xl border-l-4 border-rose-500">
                            <p className="font-semibold text-rose-600 mb-2">⚠️ Atenção: Disfagia É Grave</p>
                            <p className="text-gray-600">
                                Engasgos frequentes podem levar à pneumonia aspirativa (quando alimentos vão
                                para o pulmão). A fonoaudiologia reabilita a deglutição de forma segura.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Como Ajudamos */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Como a <span className="text-emerald-600">Fonoaudiologia</span> Te Ajuda
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tratamentos especializados para adultos
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {tratamentosOferecidos.map((tratamento, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {tratamento.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{tratamento.title}</h3>
                                <p className="text-gray-600">{tratamento.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Processo */}
            <section className="py-20 bg-emerald-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                            Como Funciona o <span className="text-emerald-600">Tratamento</span>
                        </h3>
                        <p className="text-gray-600">Processo simples e eficaz</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processoTratamento.map((etapa, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                                    {etapa.numero}
                                </div>
                                <h4 className="font-bold mb-2">{etapa.titulo}</h4>
                                <p className="text-sm text-gray-600">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Cuide da Sua Voz. Ela É Importante!
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Não deixe problemas vocais ou de deglutição comprometerem sua qualidade de vida
                            e trabalho. Agende uma avaliação com nossa fonoaudióloga especializada.
                        </p>
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900">
                            <h3 className="text-2xl font-bold mb-3 text-emerald-600">
                                Avaliação Fonoaudiológica para Adultos
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Avaliação completa de voz e/ou deglutição
                            </p>
                            <p className="text-lg font-bold text-emerald-600 mb-6">
                                Avaliação: R$ 220 | Sessão: R$ 220
                            </p>
                            <ButtonWhatsApp
                                onClick={() => { }}
                                icon={Calendar}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Olá! Gostaria de agendar uma avaliação fonoaudiológica para voz/disfagia."
                            >
                                Agendar Agora
                            </ButtonWhatsApp>
                            {/* Endereço completo */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">
                                    📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Bairro Jundiaí • Anápolis/GO
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Atendimento de segunda a sábado • ESTACIONAMENTO GRATUITO
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AdultoVozPage;