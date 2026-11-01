import { AlertTriangle, Brain, CheckCircle2, MessageCircle } from 'lucide-react';
import GoogleReviews from '../components/premium/GoogleReviews';
import AlertSigns from '../components/premium/AlertSigns';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import TypewriterText from '../components/TypewriterText';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';
import FAQSection from '../components/FAQSection';
import { faqFalaTardia } from '../data/faqPaginas';
import ClinicGallery from '../components/ClinicGallery';
import PageFooterInfo from '../components/premium/PageFooterInfo';
import DifferentialSection from '../components/premium/DifferentialSection';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';

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
  { href: '/autismo-anapolis', label: 'Avaliação de Autismo' },
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
        schema={[schemaBaseLocalBusiness]}
      />

      <Breadcrumb items={[
        { label: 'Fonoaudiologia', href: '/fonoaudiologia-anapolis' },
        { label: 'Fala Tardia em Anápolis' },
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#f6f9f8]" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid items-start gap-10 pt-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6 text-center lg:text-left">

            <span className="inline-flex items-center bg-orange-50 text-orange-700 border border-orange-200 px-4 py-1.5 text-sm font-semibold rounded-full">
              Fala Tardia Infantil em Anápolis
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
              <TypewriterText text="Seu Filho Ainda Não Fala Como Esperado para a Idade?" />
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Cada mês sem intervenção é um mês de atraso no desenvolvimento.
              Nossa fonoaudióloga em <strong>Anápolis</strong> avalia e traça um plano
              personalizado — quanto antes, melhores os resultados.
            </p>

            <AlertSigns title="Procure ajuda se seu filho apresentar" items={sinaisAlerta} className="mb-6" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonWhatsApp
                onClick={() => trackButtonClick('WA_FalaTardia_Hero')}
                message={WHATSAPP_MSG}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg"
              >
                Quero Avaliar a Fala do Meu Filho
              </ButtonWhatsApp>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:mt-[4.5rem] lg:max-w-none">
            <img
              src="/images/hero/fala-tardia-hero.webp"
              alt="Criança pequena olhando um cartão ilustrado enquanto a fonoaudióloga conversa com ela em atendimento de fala tardia em Anápolis"
              width={1200}
              height={1500}
              fetchPriority="high"
              className="w-full rounded-3xl object-cover shadow-2xl shadow-slate-900/10"
            />
          </div>
          </div>
        </div>
      </section>

      <ProofBar className="py-6" />


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

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold font-poppins text-slate-900">O que as famílias dizem</h2>
          <GoogleReviews count={3} offset={1} title="" />
        </div>
      </section>

      <FAQSection faqs={faqFalaTardia} title="Perguntas frequentes sobre fala tardia" subtitle="Tire suas dúvidas sobre avaliação, laudo e estímulo em casa" />

      <PageFooterInfo related={['/fonoaudiologia-anapolis', '/autismo-anapolis', '/teste-da-linguinha-anapolis', '/terapia-ocupacional-anapolis']} whatsappMessage="Oi! Vi a página de fala tardia da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="fonoEspelho" reverse whatsappMessage="Oi! Vi a página de fala tardia da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

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
      <FixedWhatsAppBar message="Oi! Vi a página de atraso na fala da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
}
