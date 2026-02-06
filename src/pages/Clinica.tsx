import { MapPin, Clock, Shield, CheckCircle, Camera, Heart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import ImageCarousel from '../components/ImageCarousel';

const Clinica = () => {
    return (
        <Layout>
            <SEO
                title="Nossa Clínica | Clínica Fono Inova"
                description="Conheça a infraestrutura moderna e acolhedora da Clínica Fono Inova em Anápolis."
                keywords="infraestrutura clínica, ambiente acessível, clínica infantil anápolis, salas temáticas"
                image="/images/clinica/ambiente-fono-inova.jpg"
                url="/nossa-clinica"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "MedicalOrganization",
                    "name": "Clínica Fono Inova",
                    "url": "https://www.clinicafonoinova.com.br/nossa-clinica",
                    "logo": "https://www.clinicafonoinova.com.br/images/logo-unica.png",
                    "image": "https://www.clinicafonoinova.com.br/images/clinica/ambiente-fono-inova.jpg",
                    "description": "A Clínica Fono Inova possui infraestrutura moderna e acolhedora no bairro Jundiaí em Anápolis, com salas temáticas e cabine acústica."
                }}
            />

            <section className="pt-32 pb-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="secondary" className="mb-4 bg-primary/5 text-primary border-primary/10 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                                Ambiente Acolhedor
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 mb-6">
                                Infraestrutura feita para o <span className="text-primary">Desenvolvimento</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Nossa clínica foi projetada para oferecer um ambiente seguro, lúdico e altamente funcional. Cada sala é equipada com recursos específicos para potencializar os resultados das terapias.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Shield className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Acessibilidade Total</h4>
                                        <p className="text-sm text-slate-500">Espaço planejado para todos.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Heart className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Salas Temáticas</h4>
                                        <p className="text-sm text-slate-500">Estímulo lúdico para crianças.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Camera className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Cabine Acústica</h4>
                                        <p className="text-sm text-slate-500">Avaliações precisas de PAC.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Localização Central</h4>
                                        <p className="text-sm text-slate-500">Fácil acesso no Bairro Jundiaí.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-video shadow-2xl">
                                <ImageCarousel typeImages="clinica" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                                <p className="text-primary font-bold text-xl">Anápolis - GO</p>
                                <p className="text-slate-500 text-sm">Bairro Jundiaí</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Onde estamos</h2>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Endereço</h4>
                                            <p className="text-slate-600">
                                                Avenida Minas Gerais, 405<br />
                                                Bairro Jundiaí, Anápolis - GO
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Horário de Funcionamento</h4>
                                            <p className="text-slate-600">
                                                Segunda a Sexta: 08:00 às 19:00<br />
                                                Sábados: Consultar disponibilidade
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <ButtonWhatsApp
                                        onClick={() => { }}
                                        className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
                                        message="Olá! Gostaria de saber como chegar na clínica."
                                    >
                                        Ver no Google Maps
                                    </ButtonWhatsApp>
                                </div>
                            </div>
                            <div className="bg-slate-200 h-64 md:h-auto">
                                {/* Aqui entraria o Iframe do Google Maps */}
                                <div className="flex items-center justify-center h-full text-slate-400 font-medium italic">
                                    Mapa Interativo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Clinica;
