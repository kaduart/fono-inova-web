import { Brain, Calendar, CheckCircle, Heart, MessageCircle, Users } from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFAQTea, schemaTea } from '../schemas/clinicaSchemas';

const TeaPage = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const sinaisTea = [
        'Pouco ou nenhum contato visual',
        'Não responde quando chamado pelo nome',
        'Dificuldade em brincar com outras crianças',
        'Movimentos repetitivos (balanço, girar objetos)',
        'Apego intenso a rotinas específicas',
        'Atraso ou ausência na fala',
        'Dificuldade em demonstrar emoções',
        'Sensibilidade excessiva a sons, luzes ou texturas'
    ];

    const beneficios = [
        {
            icon: <Brain className="w-12 h-12 text-purple-600" />,
            title: 'Avaliação Multidisciplinar',
            description: 'Equipe completa de psicólogos, fonoaudiólogos e terapeutas ocupacionais especializados em TEA'
        },
        {
            icon: <Heart className="w-12 h-12 text-purple-600" />,
            title: 'Intervenção Precoce',
            description: 'Quanto mais cedo iniciar o acompanhamento, maiores as chances de desenvolvimento pleno'
        },
        {
            icon: <Users className="w-12 h-12 text-purple-600" />,
            title: 'Suporte à Família',
            description: 'Orientação e treinamento para pais sobre como estimular o desenvolvimento em casa'
        }
    ];

    const etapasAvaliacao = [
        {
            numero: '01',
            titulo: 'Triagem Inicial',
            descricao: 'Conversa com os pais para entender histórico e principais preocupações'
        },
        {
            numero: '02',
            titulo: 'Avaliação Multidisciplinar',
            descricao: 'Sessões com psicólogo, fonoaudiólogo e terapeuta ocupacional (2-3 encontros)'
        },
        {
            numero: '03',
            titulo: 'Relatório Completo',
            descricao: 'Documento detalhado com diagnóstico e plano de tratamento individualizado'
        },
        {
            numero: '04',
            titulo: 'Início do Tratamento',
            descricao: 'Terapias coordenadas entre as especialidades para melhor resultado'
        }
    ];

    const depoimentos = [
        {
            texto: "A equipe da Fono Inova nos acolheu desde o primeiro dia. Hoje meu filho de 4 anos está muito mais comunicativo e feliz.",
            autor: "Mariana S., mãe do Pedro"
        },
        {
            texto: "Iniciamos o acompanhamento aos 2 anos e meio. Os progressos são visíveis. Recomendo demais a avaliação multidisciplinar!",
            autor: "Carlos M., pai da Laura"
        },
        {
            texto: "Estava perdida e com medo. A equipe me explicou tudo com paciência e criou um plano de tratamento perfeito para minha filha.",
            autor: "Juliana R., mãe da Sofia"
        }
    ];

    return (
        <Layout>
            <SEO
                title="Meu Filho Não Olha nos Olhos em Anápolis | Avaliação TEA Jundiaí"
                description="Seu filho não responde ao nome ou tem manias repetitivas em Anápolis? Avaliação de autismo (TEA) no bairro Jundiaí. Diagnóstico precoce. Agende."
                keywords="avaliação tea anapolis, autismo infantil anapolis, psicologo autismo jundiai, diagnostico autismo anapolis"
                image="/images/servicos/tea-avaliacao.jpg"
                url="https://www.clinicafonoinova.com.br/avaliacao-autismo-infantil"
                type="article"
                schema={[schemaTea, schemaFAQTea]} // Array aqui!
            />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texto */}
                        <div className="animate-fade-in-up order-2 lg:order-1">
                            <Badge variant="secondary" className="mb-4 bg-purple-50 text-purple-700 border-purple-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Avaliação Especializada
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Suspeita de <span className="text-purple-600">Autismo (TEA)</span>: Guia para Pais
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                                Se você percebe comportamentos diferentes no desenvolvimento do seu filho, estamos aqui para oferecer acolhimento e clareza diagnóstica no bairro <strong>Jundiaí, Anápolis</strong>.
                            </p>
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-5 mb-8 rounded-r-xl shadow-sm">
                                <p className="text-amber-900 text-sm leading-relaxed">
                                    <strong className="block text-base mb-1">A Janela de Ouro</strong>
                                    A intervenção precoce entre 2 e 5 anos é fundamental. Cada mês de estimulação adequada potencializa drasticamente o desenvolvimento cerebral.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Olá! Vim através do site e gostaria de agendar uma avaliação para suspeita de TEA."
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Agendar Avaliação
                                </ButtonWhatsApp>
                            </div>
                        </div>

                        {/* Imagem */}
                        <div className="relative order-1 lg:order-2">
                            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="/images/tea/tea-fantochy.jpeg"
                                    alt="Criança em terapia"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800';
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50">
                                <p className="text-4xl font-bold text-purple-600">500+</p>
                                <p className="text-sm font-semibold text-slate-500">Famílias auxiliadas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sinais de Alerta */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4 text-purple-600 border-purple-200">Observação Clínica</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-6">
                            Sinais que merecem <span className="text-purple-600">atenção</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Identificar precocemente comportamentos específicos é o primeiro passo para o suporte adequado. Verifique se seu filho apresenta algum desses sinais:
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sinaisTea.map((sinal, index) => (
                            <div key={index} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:bg-white hover:border-purple-200 group">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-purple-400 group-hover:text-purple-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-700 font-medium leading-tight">{sinal}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 italic">
                            <strong>Importante:</strong> Apenas um profissional pode confirmar o diagnóstico.
                            Não deixe a dúvida te paralisar.
                        </p>
                    </div>
                </div>
            </section>

            {/* Localização estratégica */}
            <section className="py-8 bg-purple-50 border-y border-purple-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-purple-800 font-medium">
                        📍 Atendimento presencial no bairro Jundiaí, Anápolis/GO |
                        Fácil acesso para famílias de toda a região
                    </p>
                </div>
            </section>

            {/* Por que o diagnóstico precoce é essencial */}
            <section className="py-20 bg-purple-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                                Por Que o <span className="text-purple-600">Diagnóstico Precoce</span> é Essencial?
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                O Transtorno do Espectro Autista (TEA) é uma condição neurológica que afeta
                                o desenvolvimento da comunicação, interação social e comportamento.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                <strong>A neuroplasticidade infantil é maior nos primeiros anos de vida.</strong> Isso
                                significa que intervenções iniciadas cedo têm impacto muito maior no desenvolvimento
                                da criança.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Estudos mostram que crianças que iniciam terapia antes dos 3 anos apresentam ganhos
                                significativamente maiores em habilidades sociais, comunicação e autonomia.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600">
                                <p className="font-semibold text-purple-600 mb-2">💡 Fato Importante</p>
                                <p className="text-sm text-gray-600">
                                    Não existe "esperar para ver". Cada mês sem estimulação adequada é uma
                                    janela de oportunidade que se fecha.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/tea/ava-neuropsico.jpeg"
                                alt="Terapia multidisciplinar"
                                className="rounded-2xl shadow-xl w-full"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Como Ajudamos */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Como a <span className="text-purple-600">Clínica Fono Inova</span> Ajuda
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Avaliação completa com equipe multidisciplinar especializada em TEA
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {beneficio.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{beneficio.title}</h3>
                                <p className="text-gray-600">{beneficio.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Etapas */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                            Como Funciona a <span className="text-purple-600">Avaliação</span>
                        </h3>
                        <p className="text-gray-600">Processo completo em 4 etapas simples</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {etapasAvaliacao.map((etapa, index) => (
                            <div key={index} className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow pt-12">
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                                    {etapa.numero}
                                </div>
                                <h4 className="font-bold text-center mb-2">{etapa.titulo}</h4>
                                <p className="text-sm text-gray-600 text-center">{etapa.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Depoimentos */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                            O Que Dizem os <span className="text-purple-600">Pais</span>
                        </h3>
                        <p className="text-gray-600">Histórias reais de famílias que encontraram apoio e resultados</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {depoimentos.map((depoimento, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                                <p className="text-gray-700 italic mb-4">"{depoimento.texto}"</p>
                                <p className="text-sm font-semibold text-purple-600">— {depoimento.autor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Não Deixe a Dúvida Te Paralisar
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Tire suas dúvidas com nossa equipe especializada. A avaliação pode trazer
                            tranquilidade ou o caminho certo para ajudar seu filho a se desenvolver plenamente.
                        </p>
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900">
                            <h3 className="text-2xl font-bold mb-3 text-purple-600">
                                Avaliação Multidisciplinar Completa
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Psicologia + Fonoaudiologia + Terapia Ocupacional
                            </p>
                            <p className="text-lg font-bold text-purple-600 mb-6">
                                A partir de R$ 220 (primeira consulta)
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Olá! Gostaria de agendar uma avaliação multidisciplinar para TEA."
                                    icon={Calendar}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
                                >
                                    Agendar Agora
                                </ButtonWhatsApp>
                                <ButtonWhatsApp
                                    onClick={() => { }}
                                    message="Olá! Tenho dúvidas sobre a avaliação de TEA. Pode me explicar melhor?"
                                    icon={MessageCircle}
                                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-10 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
                                >
                                    Tirar Dúvidas
                                </ButtonWhatsApp>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Bairro Jundiaí • Anápolis/GO
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TeaPage;