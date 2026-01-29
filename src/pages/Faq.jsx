import { Calendar, HelpCircle, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFAQ } from '../schemas/clinicaSchemas';

const faq = [
    {
        pergunta: 'Com que idade devo levar meu filho ao fonoaudiólogo?',
        resposta: 'Quando há atraso na fala, troca de letras, dificuldade de compreensão ou comunicação.'
    },
    {
        pergunta: 'Meu filho não fala aos 2 anos. É normal?',
        resposta: 'Algumas crianças apresentam atraso temporário, mas é importante realizar avaliação fonoaudiológica.'
    },
    {
        pergunta: 'Precisa de encaminhamento médico?',
        resposta: 'Não. Os pais podem procurar diretamente a clínica.'
    },
    {
        pergunta: 'Autismo tem cura?',
        resposta: 'O TEA não é uma doença, mas uma condição do neurodesenvolvimento. A intervenção precoce ajuda muito.'
    },
    {
        pergunta: 'Quanto tempo dura o tratamento?',
        resposta: 'Depende das necessidades de cada criança. O plano é individualizado.'
    },
    {
        pergunta: 'A fisioterapia infantil dói?',
        resposta: 'Não. É feita por meio de brincadeiras terapêuticas.'
    },
    {
        pergunta: 'Onde fica a Clínica Fono Inova?',
        resposta: 'Estamos localizados em Anápolis – GO.'
    },
    {
        pergunta: 'Como agendar uma avaliação?',
        resposta: 'Basta clicar no botão de WhatsApp e falar com nossa equipe.'
    }
];

const FaqPage = () => {
    return (
        <Layout>
            <SEO
                title="Perguntas Frequentes sobre Desenvolvimento Infantil | Clínica Fono Inova"
                description="Tire suas dúvidas sobre atraso na fala, autismo, avaliações e terapias infantis em Anápolis."
                keywords="faq fonoaudiologia, dúvidas pais, atraso na fala, autismo infantil, Anápolis"
                url="https://www.clinicafonoinova.com.br/faq"
                schema={schemaFAQ}
            />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Perguntas <span className="text-primary">Frequentes</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tire suas principais dúvidas sobre desenvolvimento infantil e terapias.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl space-y-4">
                    {faq.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5" />
                                {item.pergunta}
                            </h3>
                            <p className="text-gray-600">{item.resposta}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold mb-4">
                        Ainda ficou com dúvidas?
                    </h2>
                    <p className="mb-6">
                        Nossa equipe está pronta para te orientar.
                    </p>
                    <div className="flex justify-center gap-4">
                        <ButtonWhatsApp
                            message="Olá! Tenho algumas dúvidas sobre atendimento infantil."
                            className="bg-white text-primary px-8 py-4 rounded-full font-bold"
                        >
                            <MessageCircle className="w-5 h-5" /> Tirar Dúvidas
                        </ButtonWhatsApp>
                        <ButtonWhatsApp
                            message="Olá! Gostaria de agendar uma avaliação para meu filho."
                            className="border-2 border-white px-8 py-4 rounded-full font-bold"
                        >
                            <Calendar className="w-5 h-5" /> Agendar Avaliação
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default FaqPage;
