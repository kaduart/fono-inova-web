import { Badge } from '../components/ui/badge';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';

const areas = [
    { title: "Fonoaudiologia", text: "Fala, linguagem, voz, deglutição e processamento auditivo, com foco no desenvolvimento da comunicação." },
    { title: "Psicologia infantil", text: "Suporte emocional e comportamental para crianças e adolescentes, com orientação à família." },
    { title: "Terapia ocupacional", text: "Autonomia, coordenação motora e integração sensorial nas atividades do dia a dia." },
    { title: "Fisioterapia infantil", text: "Desenvolvimento motor e reabilitação, com atividades adequadas a cada fase." },
    { title: "Psicopedagogia e neuropsicologia", text: "Avaliação e apoio às dificuldades de aprendizagem, atenção e funções executivas." },
    { title: "Neuropediatria e musicoterapia", text: "Acompanhamento médico especializado e musicoterapia, integrados ao plano terapêutico." }
];

const Equipe = () => {
    return (
        <Layout>
            <SEO
                title="Nossa Equipe | Clínica Fono Inova"
                description="Equipe multidisciplinar da Clínica Fono Inova em Anápolis: fonoaudiologia, psicologia, terapia ocupacional, fisioterapia, psicopedagogia e neuropediatria."
                keywords="equipe clínica, fonoaudiólogos anápolis, psicólogos infantis, especialistas em desenvolvimento infantil"
                image="/images/clinica/equipe-fono-inova.jpg"
                url="/equipe"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "MedicalOrganization",
                    "name": "Clínica Fono Inova",
                    "url": "https://www.clinicafonoinova.com.br/equipe",
                    "logo": "https://www.clinicafonoinova.com.br/images/logo-unica.png",
                    "image": "https://www.clinicafonoinova.com.br/images/clinica/equipe-fono-inova.jpg",
                    "description": "Equipe multidisciplinar especializada em fonoaudiologia, psicologia e fisioterapia infantil em Anápolis."
                }}
            />

            <section className="pt-32 pb-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="secondary" className="mb-4 bg-primary/5 text-primary border-primary/10 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                            Excelência Profissional
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 mb-6">
                            Nossa <span className="text-primary">Equipe Multidisciplinar</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Na Clínica Fono Inova, profissionais de diferentes áreas trabalham juntos, no mesmo espaço em Anápolis, para cuidar do desenvolvimento do seu filho com um plano único e acompanhado de perto.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areas.map((area) => (
                            <div key={area.title} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900 mb-2">{area.title}</h2>
                                <p className="text-slate-600 text-sm leading-relaxed">{area.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Quer conhecer nossa equipe de perto?</h2>
                        <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                            Estamos prontos para tirar suas dúvidas e apoiar o desenvolvimento do seu filho.
                        </p>
                        <ButtonWhatsApp
                            onClick={() => { }}
                            className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl"
                            message="Oi! Vi o site de vocês e gostei muito da clínica.\n\nQueria tirar uma dúvida sobre o atendimento. Pode me ajudar?"
                        >
                            Falar pelo WhatsApp
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Equipe;
