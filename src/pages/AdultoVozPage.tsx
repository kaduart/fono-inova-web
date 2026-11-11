import { AlertCircle, CheckCircle, Mic, Phone, Quote, Shield, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TypewriterText from '../components/TypewriterText';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaAdultoVoz, schemaFAQAdulto } from '../schemas/clinicaSchemas';
import ClinicGallery from '../components/ClinicGallery';
import PageFooterInfo from '../components/premium/PageFooterInfo';
import DifferentialSection from '../components/premium/DifferentialSection';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';

const AdultoVozPage = () => {
    const sinaisApraxia = [
        'Sabe o que quer dizer, mas a palavra não sai',
        'Troca ou omite sons de forma diferente a cada tentativa',
        'Tateia a boca procurando a posição certa para falar',
        'Fala mais lenta e com esforço',
        'Dificuldade maior em palavras longas',
        'Começou após AVC, traumatismo ou outra lesão neurológica',
        'Frustração por não conseguir se comunicar',
        'Consegue cantar ou repetir frases automáticas, mas não falar livremente'
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

    const tratamentosOferecidos = [
        {
            icon: <Mic className="w-12 h-12 text-emerald-600" />,
            title: 'Apraxia de Fala',
            description: 'Reabilitação do planejamento dos movimentos da fala, inclusive após AVC'
        },
        {
            icon: <Users className="w-12 h-12 text-emerald-600" />,
            title: 'Orientação à Família',
            description: 'Cuidadores aprendem como apoiar a fala e a alimentação em casa'
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
            descricao: 'Análise da deglutição e/ou da fala com testes específicos'
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
            descricao: 'Quando a deglutição ou a fala estiverem funcionais'
        }
    ];

    return (
        <Layout>
            <SEO
                title="Fonoaudiologia para Adultos em Anápolis | Disfagia e Apraxia"
                description="Dificuldade para engolir ou para falar após AVC? Fonoaudiologia para adultos em Anápolis, bairro Jundiaí: disfagia e apraxia de fala. Agende pelo WhatsApp."
                keywords="fonoaudiologia adulto anapolis, disfagia anapolis, apraxia de fala adulto, fono pos avc anapolis"
                image="/images/og-image.jpg"
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
                            <span className="mb-4 inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full">
                                Fonoaudiologia em Anápolis
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                <TypewriterText segments={[
                                    { text: 'Disfagia e Apraxia: ' },
                                    { text: 'Reabilitação', className: 'text-emerald-600' },
                                    { text: ' para Adultos' },
                                ]} />
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Reabilitação da deglutição (disfagia) e da fala (apraxia), inclusive após AVC, no bairro <strong>Jundiaí, Anápolis</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Oi! Vi no site sobre atendimento para adultos.\n\nTenho interesse em avaliação de deglutição/fala. Pode me explicar como funciona?"
                                    
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
                        </div>
                    </div>
                </div>
            </section>

      <ProofBar className="py-6" />


            {/* Apraxia */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            <span className="text-emerald-600">Apraxia de Fala</span>: Você Reconhece Esses Sinais?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Na apraxia, a pessoa sabe o que quer dizer, mas o cérebro não consegue planejar os movimentos da fala
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {sinaisApraxia.map((sinal, index) => (
                            <div key={index} className="bg-white border-l-4 border-emerald-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{sinal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Localização */}
            <section className="py-8 bg-emerald-50 border-y border-emerald-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-emerald-800 font-medium">
                        📍 Atendimento fonoaudiológico para adultos no bairro Jundiaí, Anápolis/GO |
                        Av. Minas Gerais, 405 | Jundiaí
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
      <PageFooterInfo related={['/fonoaudiologia-anapolis', '/abordagem-multidisciplinar', '/reembolso-plano-de-saude-anapolis']} whatsappMessage="Oi! Vi a página de fonoaudiologia para adultos da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="terapia" reverse whatsappMessage="Oi! Vi a página de fonoaudiologia para adultos da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

            <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Comer e Falar com Segurança
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Não deixe a dificuldade para engolir ou para falar comprometer a qualidade de vida.
                            Agende uma avaliação fonoaudiológica.
                        </p>
                        <p className="text-sm mb-8 opacity-80">
                            Atendemos também crianças — conheça a <Link to="/fonoaudiologia-anapolis" className="underline font-semibold">fonoaudiologia infantil em Anápolis</Link>.
                        </p>
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900">
                            <h3 className="text-2xl font-bold mb-3 text-emerald-600">
                                Avaliação Fonoaudiológica para Adultos
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Avaliação completa de deglutição e/ou fala
                            </p>
                            <p className="text-lg font-bold text-emerald-600 mb-6">
                                Avaliação: R$ 220 | Sessão: R$ 220
                            </p>
                            <ButtonWhatsApp
                                onClick={() => { }}
                                
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                                message="Oi! Vi no site sobre atendimento para adultos.\n\nPode me explicar como funciona a avaliação?"
                            >
                                Agendar Agora
                            </ButtonWhatsApp>
                            {/* Endereço completo */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">
                                    📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Bairro Jundiaí • Anápolis/GO
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Atendimento de segunda a sexta
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
              <FixedWhatsAppBar message="Oi! Vi a página de fonoaudiologia para adultos da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
    );
};

export default AdultoVozPage;
