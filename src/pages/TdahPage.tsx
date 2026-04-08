import { ArrowRight, Brain, Calendar, CheckCircle2, Clock, Focus, MapPin, MessageCircle, Phone, Sparkles, Star, Target, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';

const TdahPage = () => {
    const sinais = [
        { titulo: 'Desatenção', descricao: 'Dificuldade para prestar atenção, distrai-se facilmente, esquece tarefas', icon: Focus },
        { titulo: 'Hiperatividade', descricao: 'Inquieto, fala muito, não para quieto, interrompe os outros', icon: Zap },
        { titulo: 'Impulsividade', descricao: 'Age sem pensar, dificuldade para esperar a vez', icon: Sparkles },
    ];

    const impactos = [
        'Notas baixas apesar de ser inteligente',
        'Dificuldade para fazer amigos',
        'Conflitos em casa com regras',
        'Baixa autoestima',
        'Frustração com fracassos escolares'
    ];

    const depoimentos = [
        { texto: "Meu filho não conseguia sentar para fazer lição. Hoje ele estuda sozinho! A diferença é absurda.", autor: "Mãe do João, 9 anos", resultado: "Concentração melhorou 100%" },
        { texto: "A escola dizia que ele era 'problemático'. A avaliação mostrou que ele só precisava de estratégias diferentes.", autor: "Pai do Pedro, 8 anos", resultado: "Comportamento transformado" },
        { texto: "Finalmente entendemos o que acontecia. Orientação clara e tratamento efetivo mudaram nossa vida.", autor: "Mãe da Maria, 7 anos", resultado: "Harmonia familiar restaurada" }
    ];

    return (
        <Layout>
            <SEO
                title="TDAH Infantil em Anápolis | Avaliação Neuropsicológica"
                description="Seu filho é inquieto, não presta atenção ou tem dificuldade na escola? Avaliação para TDAH em Anápolis. Diagnóstico e tratamento especializado."
                keywords="tdah infantil anapolis, crianca hiperativa, deficit atencao, avaliacao neuropsicologica anapolis"
                url="https://www.clinicafonoinova.com.br/tdah-infantil"
                type="article"
            />

            {/* HERO */}
            <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 via-amber-50/40 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full mb-6">
                                <Clock className="w-4 h-4 text-amber-600" />
                                <span className="text-sm font-medium text-amber-700">Diagnóstico precoce muda tudo</span>
                            </div>

                            <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Avaliação Neuropsicológica</Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                                Seu Filho é Inquieto, Não Para e Tem{" "}
                                <span className="text-amber-600">Dificuldade na Escola</span>?
                            </h1>

                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Pode ser TDAH. Na <strong>Clínica Fono Inova</strong>, avaliamos e tratamos crianças 
                                com TDAH em Anápolis. Com estratégias certas, seu filho pode florescer.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp message="Oi! Vi no site sobre dificuldade de atenção e me chamou atenção.\n\nMeu filho(a) é muito inquieto(a) e tem dificuldade de focar. Pode me explicar como funciona a avaliação?" className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-xl text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-3">
                                    Falar com Especialista
                                </ButtonWhatsApp>
                                <a href="tel:6237063924" className="inline-flex items-center justify-center gap-2 px-6 py-5 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                    (62) 3706-3924
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/images/tdah-hero.jpg" alt="Avaliação TDAH" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800'; }} />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl">
                                <div className="text-3xl font-bold text-slate-900">+200</div>
                                <div className="text-sm text-slate-500">Crianças com TDAH atendidas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SINAIS */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Três Pilares do <span className="text-amber-600">TDAH</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {sinais.map((sinal, index) => {
                            const Icon = sinal.icon;
                            return (
                                <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{sinal.titulo}</h3>
                                    <p className="text-slate-600">{sinal.descricao}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* IMPACTOS */}
            <section className="py-16 bg-amber-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                                Quando Não Tratado, o TDAH Pode Causar:
                            </h2>
                            <ul className="space-y-4">
                                {impactos.map((impacto, index) => (
                                    <li key={index} className="flex items-center gap-3 text-lg text-slate-700">
                                        <CheckCircle2 className="w-6 h-6 text-amber-500" />
                                        {impacto}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-xl">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Mas Existe Solução!</h3>
                            <p className="text-slate-600 mb-6">
                                Com avaliação completa e tratamento multidisciplinar, seu filho pode:
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Melhorar concentração', 'Ter sucesso na escola', 'Fazer amigos', 'Ter mais autoconfiança'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-slate-700">
                                        <Target className="w-5 h-5 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <ButtonWhatsApp message="Oi! Vi no site sobre dificuldade de atenção e me chamou atenção.\n\nMeu filho(a) é muito inquieto(a). Pode me explicar como funciona a avaliação?" className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all">
                                Agendar Avaliação
                            </ButtonWhatsApp>
                        </div>
                    </div>
                </div>
            </section>

            {/* DEPOIMENTOS */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <Badge className="mb-4">Resultados Reais</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins">O Que os Pais Dizem</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {depoimentos.map((depo, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                                </div>
                                <p className="text-lg font-medium text-slate-800 mb-4">"{depo.texto}"</p>
                                <p className="font-semibold text-slate-900">{depo.autor}</p>
                                <p className="text-sm text-green-600">✓ {depo.resultado}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-800">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-white">
                            Dê ao Seu Filho a Chance de Brilhar
                        </h2>
                        <p className="text-xl text-white/80 mb-8">
                            O TDAH não precisa limitar o potencial do seu filho. 
                            Com o tratamento certo, ele pode alcançar grandes conquistas.
                        </p>
                        <ButtonWhatsApp message="Oi! Vi no site sobre dificuldade de atenção e me chamou atenção.\n\nPode me explicar como funciona a avaliação?" className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all inline-flex items-center gap-3">
                            Agendar Avaliação Agora
                        </ButtonWhatsApp>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TdahPage;
