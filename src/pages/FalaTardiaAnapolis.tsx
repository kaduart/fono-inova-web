import { AlertTriangle, Brain, CheckCircle2, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';
import { schemaBaseLocalBusiness, schemaFAQFalaTardia } from '../schemas/clinicaSchemas.js';

const WHATSAPP_MSG = "Oi! Meu filho tem atraso na fala e quero entender melhor. Pode me ajudar?";

const sinaisAlerta = [
  "Aos 12 meses: não balbucia nem aponta para objetos",
  "Aos 18 meses: não fala nenhuma palavra com sentido",
  "Aos 2 anos: fala menos de 50 palavras ou não forma frases de 2 palavras",
  "Aos 3 anos: não forma frases simples ou ninguém entende o que fala",
  "Qualquer idade: perdeu habilidades de fala que já tinha",
];

const steps = [
  { number: "1", title: "Você chama no WhatsApp", desc: "Conta sobre o desenvolvimento da fala do seu filho — em minutos nossa equipe já orienta", icon: MessageCircle },
  { number: "2", title: "Avaliamos o caso", desc: "Nossa fonoaudióloga identifica o que está acontecendo e o que fazer", icon: Brain },
  { number: "3", title: "Iniciamos o acompanhamento", desc: "Plano de intervenção personalizado para o seu filho em Anápolis", icon: CheckCircle2 },
];

const relacionados = [
  { href: '/fonoaudiologia-anapolis', label: 'Fonoaudiologia Infantil em Anápolis' },
  { href: '/avaliacao-autismo-infantil', label: 'Avaliação de Autismo' },
  { href: '/avaliacao-neuropsicologica-anapolis', label: 'Avaliação Neuropsicológica em Anápolis' },
];

export default function FalaTardiaAnapolis() {
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/png');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', '/images/icone-colorido.png');
    document.head.appendChild(link);
  }, []);

  return (
    <Layout>
      <SEO
        title="Fala Tardia Infantil em Anápolis | Clínica Fono Inova"
        description="Seu filho está com atraso na fala em Anápolis? Fonoaudióloga especialista em linguagem infantil. Avaliação completa no bairro Jundiaí. Agende pelo WhatsApp (62) 99201-3573."
        keywords="fala tardia anapolis, meu filho não fala, atraso de fala anapolis, fonoaudióloga fala tardia anapolis, 2 anos não fala anapolis, criança demora falar anapolis"
        url="https://www.clinicafonoinova.com.br/fala-tardia-anapolis"
        image="/images/og-image.jpg"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaFAQFalaTardia]}
      />

      <Breadcrumb items={[
        { label: 'Fonoaudiologia', href: '/fonoaudiologia-anapolis' },
        { label: 'Fala Tardia em Anápolis' },
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/40 to-amber-50/30" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-orange-200/30 to-amber-200/20 rounded-full blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="space-y-6 text-center pt-8">

            <h1 className="inline-flex items-center bg-orange-50 text-orange-700 border border-orange-200 px-4 py-1.5 text-sm font-semibold rounded-full">
              Fala Tardia Infantil em Anápolis
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
              Seu Filho Ainda Não Fala Como Esperado para a Idade?
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed">
              Cada mês sem intervenção é um mês de atraso no desenvolvimento.
              Nossa fonoaudióloga em <strong>Anápolis</strong> avalia e traça um plano
              personalizado — quanto antes, melhores os resultados.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl text-left">
              <p className="text-sm text-yellow-800 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Procure ajuda se seu filho apresentar:
              </p>
              <ul className="space-y-1.5">
                {sinaisAlerta.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-yellow-700">
                    <span className="text-yellow-500 mt-0.5 shrink-0">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonWhatsApp
                onClick={() => trackButtonClick('WA_FalaTardia_Hero')}
                message={WHATSAPP_MSG}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
              >
                Quero Avaliar a Fala do Meu Filho
              </ButtonWhatsApp>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-10 text-center">
            Como Funciona o Atendimento em Anápolis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">{step.number}</div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AUTORIDADE LOCAL ========== */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-poppins text-slate-900">
            Fono Inova — Especialistas em Linguagem Infantil em Anápolis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Localizada no bairro <strong>Jundiaí</strong>, Anápolis, a Clínica Fono Inova
            tem fonoaudióloga especializada em atraso de fala, autismo, gagueira e
            dificuldades de linguagem. Quando há sinais de envolvimento neurológico,
            indicamos avaliação com <Link to="/neuropediatra-anapolis" className="text-primary font-semibold hover:underline">neuropediatra em Anápolis</Link>.
            Atendemos famílias de toda a região de Anápolis
            e cidades próximas com equipe multidisciplinar e atendimento humanizado.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_FalaTardia_Sobre')}
            message={WHATSAPP_MSG}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Agendar Avaliação Fonoaudiológica
          </ButtonWhatsApp>
        </div>
      </section>

      {/* ========== LINKS RELACIONADOS ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold font-poppins text-slate-900 mb-8 text-center">
            Outros Atendimentos na Fono Inova
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relacionados.map(link => (
              <Link key={link.href} to={link.href}
                className="block p-4 border border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-center text-sm font-medium text-slate-700 hover:text-primary">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-poppins text-white">
            Não Espere Mais — Agende Agora em Anápolis
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Quanto mais cedo a intervenção, maiores as chances de desenvolvimento pleno da fala.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_FalaTardia_Final')}
            message={WHATSAPP_MSG}
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Chamar no WhatsApp Agora
          </ButtonWhatsApp>
        </div>
      </section>
    </Layout>
  );
}
