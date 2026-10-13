import { Calendar, HelpCircle, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFAQ } from '../schemas/clinicaSchemas';
import { faqItems } from '../data/faqData';

const faq = faqItems;

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
                            message="Oi! Vi o site de vocês e fiquei com algumas dúvidas.\n\nPode me explicar melhor como funciona o atendimento?"
                            className="bg-white text-primary px-8 py-4 rounded-full font-bold"
                        >
                            Tirar Dúvidas
                        </ButtonWhatsApp>
                        <ButtonWhatsApp
                            message="Oi! Vi o site de vocês e gostei muito da clínica.\n\nQueria tirar uma dúvida sobre o atendimento. Pode me ajudar?"
                            className="border-2 border-white px-8 py-4 rounded-full font-bold"
                        >
                            Agendar Avaliação
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default FaqPage;
