import { Activity, ArrowRight, Brain, Footprints, GraduationCap, MessageCircle, Music, Scissors, Users } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackServiceClick, trackServiceView } from '../hooks/useAnalytics';
import SEO from './SEO';


const ServiceCards = () => {
    const services = [
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: "Fonoaudiologia",
            description: "Ajuda a criança a desenvolver a fala, a linguagem, a comunicação e a alimentação de forma segura e eficaz.",
            color: "bg-primary",
            link: "/fonoaudiologia",
            seo: {
                title: "Fonoaudiologia Infantil - Clínica Fono Inova",
                description: "Especialistas em fonoaudiologia infantil: tratamento para atraso de fala, distúrbios de linguagem e comunicação.",
                keywords: "fonoaudiologia infantil, atraso de fala, distúrbios linguagem, terapia fala",
                image: "/images/servicos/fonoaudiologia.jpg",
                url: "https://www.clinicafonoinova.com.br/fonoaudiologia"
            }
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Psicologia",
            description: "Acompanha o desenvolvimento emocional, social e comportamental, ajudando a criança a lidar com sentimentos, medos e mudanças.",
            color: "bg-secondary",
            link: "/psicologia",
            seo: {
                title: "Psicologia Infantil - Clínica Fono Inova",
                description: "Acompanhamento psicológico infantil para desenvolvimento emocional e comportamental.",
                keywords: "psicologia infantil, terapia criança, desenvolvimento emocional",
                image: "/images/servicos/psicologia.jpg",
                url: "https://www.clinicafonoinova.com.br/psicologia"
            }
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Terapia Ocupacional",
            description: "Ajuda a criança a conquistar sua independência nas atividades do dia a dia, garantindo autonomia e crescimento contínuo.",
            color: "bg-accent",
            link: "/terapia-ocupacional",
            seo: {
                title: "Terapia Ocupacional Infantil - Clínica Fono Inova",
                description: "Terapia ocupacional para desenvolvimento de habilidades motoras e independência infantil.",
                keywords: "terapia ocupacional infantil, habilidades motoras, autonomia criança",
                image: "/images/servicos/terapia-ocupacional.jpg",
                url: "https://www.clinicafonoinova.com.br/terapia-ocupacional"
            }
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Fisioterapia",
            description: "Atua no fortalecimento muscular, coordenação motora, postura e reabilitação física desde os primeiros meses de vida.",
            color: "bg-primary",
            link: "/fisioterapia",
            seo: {
                title: "Fisioterapia Infantil - Clínica Fono Inova",
                description: "Fisioterapia pediátrica para desenvolvimento motor e reabilitação infantil.",
                keywords: "fisioterapia infantil, desenvolvimento motor, reabilitação criança",
                image: "/images/servicos/fisioterapia.jpg",
                url: "https://www.clinicafonoinova.com.br/fisioterapia"
            }
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Psicopedagogia",
            description: "Identifica e trata dificuldades de aprendizagem, desenvolvendo estratégias para o sucesso escolar e emocional.",
            color: "bg-amber-500",
            link: "/psicopedagogia",
            seo: {
                title: "Psicopedagogia - Avaliação de Dificuldades de Aprendizagem",
                description: "Psicopedagogia especializada em dificuldades de aprendizagem, dislexia, TDAH e desenvolvimento escolar.",
                keywords: "psicopedagogia, dificuldades aprendizagem, dislexia, TDAH, avaliação psicopedagógica",
                image: "/images/servicos/psicopedagogia.jpg",
                url: "https://www.clinicafonoinova.com.br/psicopedagogia"
            }
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Avaliação Neuropsicológica",
            description: "Avaliação completa das funções cognitivas para identificar transtornos e potencialidades do desenvolvimento.",
            color: "bg-teal-500",
            link: "/avaliacao-neuropsicologica",
            seo: {
                title: "Avaliação Neuropsicológica - Clínica Fono Inova",
                description: "Avaliação neuropsicológica completa para diagnóstico de TDAH, TEA, dislexia e outros transtornos do neurodesenvolvimento.",
                keywords: "avaliação neuropsicológica, TDAH, TEA, dislexia, funções cognitivas",
                image: "/images/servicos/neuropsicologica.jpg",
                url: "https://www.clinicafonoinova.com.br/avaliacao-neuropsicologica"
            }
        },
        {
            icon: <Scissors className="w-8 h-8" />,
            title: "Freio Lingual",
            description: "Avaliação e tratamento do freio lingual para melhorar amamentação, fala e desenvolvimento orofacial.",
            color: "bg-purple-500",
            link: "/freio-lingual",
            seo: {
                title: "Freio Lingual - Avaliação e Tratamento da Língua Presa",
                description: "Especialistas em freio lingual: avaliação, frenotomia e tratamento para língua presa em bebês e crianças.",
                keywords: "freio lingual, língua presa, frenotomia, amamentação, fala",
                image: "/images/servicos/freio-lingual.jpg",
                url: "https://www.clinicafonoinova.com.br/freio-lingual"
            }
        },
        {
            icon: <Footprints className="w-8 h-8" />,
            title: "Psicomotricidade",
            description: "Integra corpo, mente e emoção para desenvolver coordenação, equilíbrio e consciência corporal em crianças com TEA, Síndrome de Down e outras condições.",
            color: "bg-pink-600",
            link: "/psicomotricidade",
            seo: {
                title: "Psicomotricidade Infantil - TEA e Síndromes | Clínica Fono Inova",
                description: "Psicomotricidade para crianças com TEA, Síndrome de Down e atrasos no desenvolvimento motor, cognitivo e emocional.",
                keywords: "psicomotricidade infantil, TEA, síndrome de down, desenvolvimento motor, coordenação",
                image: "/images/servicos/psicomotricidade.jpg",
                url: "https://www.clinicafonoinova.com.br/psicomotricidade"
            }
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Psicopedagogia Clínica",
            description: "Investiga e trata dificuldades de aprendizagem como dislexia, discalculia e TDAH, com estratégias personalizadas para cada criança.",
            color: "bg-amber-600",
            link: "/psicopedagogia-clinica",
            seo: {
                title: "Psicopedagogia Clínica - Dificuldades de Aprendizagem | Clínica Fono Inova",
                description: "Psicopedagogia clínica para dislexia, discalculia, TDAH e dificuldades escolares. Avaliação e intervenção personalizada.",
                keywords: "psicopedagogia clínica, dislexia, discalculia, TDAH, dificuldades aprendizagem",
                image: "/images/servicos/psicopedagogia-clinica.jpg",
                url: "https://www.clinicafonoinova.com.br/psicopedagogia-clinica"
            }
        },
        {
            icon: <Music className="w-8 h-8" />,
            title: "Musicoterapia",
            description: "Usa a música como ferramenta terapêutica para desenvolver comunicação, interação social e regulação emocional em crianças com TEA e outros transtornos.",
            color: "bg-indigo-600",
            link: "/musicoterapia",
            seo: {
                title: "Musicoterapia Infantil - TEA e Desenvolvimento | Clínica Fono Inova",
                description: "Musicoterapia para crianças com autismo e transtornos do neurodesenvolvimento. Comunicação, socialização e regulação emocional através da música.",
                keywords: "musicoterapia infantil, TEA, autismo, comunicação, desenvolvimento infantil",
                image: "/images/servicos/musicoterapia.jpg",
                url: "https://www.clinicafonoinova.com.br/musicoterapia"
            }
        }
    ];

    // Track quando os serviços são visualizados
    useEffect(() => {
        services.forEach((service, index) => {
            trackServiceView(service.title, 'grid_view', null);
        });
    }, []);

    const handleServiceClick = (service, index) => {
        // Tracking detalhado do clique
        trackServiceClick(service.title, service.link, index + 1);

        // Track adicional para GA4
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'select_content', {
                content_type: 'service',
                content_id: service.title.toLowerCase().replace(/\s+/g, '_'),
                items: [{
                    item_id: service.title.toLowerCase().replace(/\s+/g, '_'),
                    item_name: service.title,
                    index: index + 1,
                    item_category: 'services'
                }]
            });
        }
    };

    return (
        <>
            <SEO
                title="Serviços Especializados - Clínica Fono Inova"
                description="Conheça todos os nossos serviços especializados em desenvolvimento infantil: fonoaudiologia, psicologia, terapia ocupacional, fisioterapia e mais."
                keywords="fonoaudiologia, psicologia, terapia ocupacional, fisioterapia, psicopedagogia, avaliação neuropsicológica, freio lingual"
                image="/images/servicos/geral.jpg"
                url="https://www.clinicafonoinova.com.br"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="group">
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 group-hover:border-primary/20 h-full flex flex-col">
                            {/* Ícone e título */}
                            <div className="text-center mb-6">
                                <div className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                                    <div className="scale-125">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Descrição */}
                            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                {service.description}
                            </p>

                            {/* Botão/Link */}
                            <Link
                                to={service.link}
                                onClick={() => handleServiceClick(service, index)}
                                className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-200 mt-auto group/link"
                            >
                                Saiba mais
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ServiceCards;