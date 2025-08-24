// components/ServiceCards.jsx
import { Activity, ArrowRight, Brain, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const ServiceCards = () => {
    const services = [
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: "Fonoaudiologia",
            description: "Ajuda a criança a desenvolver a fala, a linguagem, a comunicação e a alimentação de forma segura e eficaz.",
            color: "bg-primary",
            link: "/fonoaudiologia"
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Psicologia",
            description: "Acompanha o desenvolvimento emocional, social e comportamental, ajudando a criança a lidar com sentimentos, medos e mudanças.",
            color: "bg-secondary",
            link: "/psicologia"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Terapia Ocupacional",
            description: "Ajuda a criança a conquistar sua independência nas atividades do dia a dia, garantindo autonomia e crescimento contínuo.",
            color: "bg-accent",
            link: "/terapia-ocupacional"
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Fisioterapia",
            description: "Atua no fortalecimento muscular, coordenação motora, postura e reabilitação física desde os primeiros meses de vida.",
            color: "bg-primary",
            link: "/fisioterapia"
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
                <div key={index} className="group">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100 transition-all duration-300 group-hover:shadow-xl h-full flex flex-col">
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
                            className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-200 mt-auto"
                        >
                            Saiba mais
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            ))}
            <SEO
                title="Fonoaudiologia Infantil - Clínica Fono Inova"
                description="Especialistas em fonoaudiologia infantil: tratamento para atraso de fala, distúrbios de linguagem e comunicação."
                keywords="fonoaudiologia infantil, atraso de fala, distúrbios linguagem, terapia fala"
                image="/images/servicos/fonoaudiologia.jpg"
                url="https://www.clinicafonoinova.com.br/fonoaudiologia"
            />
        </div>
    );
};

export default ServiceCards;