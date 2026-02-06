import { Award, Mail, Phone, Star, Shield, CheckCircle } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';

const teamMembers = [
    {
        name: "Dra. Lorrany Siqueira",
        role: "Fonoaudióloga e Diretora Clínica",
        specialty: "Linguagem e PAC",
        bio: "Especialista em desenvolvimento infantil com mais de 10 anos de experiência em fonoaudiologia clínica e processamento auditivo central.",
        image: "https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        name: "Dra. Patrícia Helena",
        role: "Psicóloga Infantil",
        specialty: "Terapia Cognitivo-Comportamental",
        bio: "Focada no suporte emocional e comportamental de crianças e adolescentes, com especialização em TEA e TDAH.",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        name: "Dra. Juliana Castro",
        role: "Terapeuta Ocupacional",
        specialty: "Integração Sensorial",
        bio: "Especialista em auxiliar crianças a desenvolverem autonomia e habilidades para as atividades da vida diária.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500"
    }
];

const Equipe = () => {
    return (
        <Layout>
            <SEO
                title="Nossa Equipe | Clínica Fono Inova"
                description="Conheça os especialistas altamente qualificados da Clínica Fono Inova em Anápolis."
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
                            Nossos <span className="text-primary">Especialistas</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Contamos com uma equipe multidisciplinar dedicada e em constante atualização para oferecer o que há de melhor em terapias infantis.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group hover:shadow-xl transition-all">
                                <div className="h-80 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                                        <p className="text-primary font-semibold text-sm">{member.role}</p>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                        {member.bio}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                        <CheckCircle className="w-4 h-4 text-primary/50" />
                                        <span>Registro Profissional Verificado</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Quer falar com um de nossos especialistas?</h2>
                        <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                            Estamos prontos para tirar suas dúvidas e apoiar o desenvolvimento do seu filho.
                        </p>
                        <ButtonWhatsApp
                            onClick={() => { }}
                            className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl"
                            message="Olá! Gostaria de tirar uma dúvida sobre atendimento na Clínica Fono Inova."
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
