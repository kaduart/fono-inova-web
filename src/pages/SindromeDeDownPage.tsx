import GoogleReviews from '../components/premium/GoogleReviews';
import { Accessibility, ArrowRight, Award, Baby, Brain, CheckCircle2, Clock, GraduationCap, Heart, MapPin, MessageCircle, PhoneCall, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizardLazy.jsx';
import TypewriterText from '../components/TypewriterText';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick, trackPhoneCall } from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';
import ClinicGallery from '../components/ClinicGallery';
import DifferentialSection from '../components/premium/DifferentialSection';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';
import PageFooterInfo from '../components/premium/PageFooterInfo';
import SituationsSection from '../components/premium/SituationsSection';

const SindromeDeDownPage = () => {
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFormSubmission } = useFormTracking('LP_Sindrome_Down');

  const handleOpenAccessibility = () => {
    trackButtonClick('Open Accessibility Wizard');
    setAccessibilityWizardOpen(true);
  };

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/png');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', '/images/icone-colorido.png');
    document.head.appendChild(link);
  }, []);

  // Schema específico para Síndrome de Down
  const schemaSindromeDown = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Atendimento Especializado Síndrome de Down em Anápolis",
    "description": "Tratamento especializado para crianças com Síndrome de Down em Anápolis. Fonoaudiologia, psicologia, terapia ocupacional e fisioterapia integradas.",
    "url": "https://www.clinicafonoinova.com.br/sindrome-de-down",
    "mainEntity": {
      "@type": "MedicalCondition",
      "name": "Síndrome de Down",
      "description": "Acompanhamento terapêutico multidisciplinar para desenvolvimento integral",
      "possibleTreatment": [
        "Fonoaudiologia",
        "Psicologia",
        "Terapia Ocupacional",
        "Fisioterapia"
      ]
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quando começar o acompanhamento terapêutico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O ideal é começar o acompanhamento nos primeiros meses de vida. Quanto mais precoce a intervenção, melhores os resultados no desenvolvimento da criança."
        }
      },
      {
        "@type": "Question",
        "name": "Quais terapias são indicadas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fonoaudiologia (fala e linguagem), psicologia (comportamento), terapia ocupacional (autonomia) e fisioterapia (coordenação motora)."
        }
      },
      {
        "@type": "Question",
        "name": "O tratamento é realizado em Anápolis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Atendemos crianças com Síndrome de Down no bairro Jundiaí em Anápolis, com equipe especializada e ambiente acolhedor."
        }
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Síndrome de Down em Anápolis | Atendimento Especializado | Fono Inova"
        description="Tratamento especializado para crianças com Síndrome de Down em Anápolis. Fonoaudiologia, psicologia, terapia ocupacional e fisioterapia integradas. Agende sua avaliação."
        keywords="síndrome de down anápolis, tratamento síndrome de down, fonoaudiologia síndrome de down, terapia ocupacional síndrome de down, desenvolvimento infantil anápolis"
        image="/images/clinica/ia/sindrome-de-down.webp"
        url="https://www.clinicafonoinova.com.br/sindrome-de-down"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaSindromeDown, schemaFAQ]}
      />

      <div className="fixed bottom-32 right-4 z-50">
        <button
          onClick={handleOpenAccessibility}
          className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Configurações de acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </button>
      </div>

      <AccessibilityWizard
        open={accessibilityWizardOpen}
        onClose={() => {
          trackButtonClick('Close Accessibility Wizard');
          setAccessibilityWizardOpen(false);
        }}
      />

      <Breadcrumb 
        items={[
          { label: 'Especialidades', href: '/abordagem-multidisciplinar' },
          { label: 'Síndrome de Down em Anápolis' }
        ]} 
      />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-clip">
        <div className="absolute inset-0 bg-[#f6f9f8]" />
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="inline-flex items-center rounded-full border mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold">
                Atendimento Especializado em Anápolis
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText text="Síndrome de Down em Anápolis" />
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">
                Acompanhamento terapêutico multidisciplinar
              </h2>

              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-xl font-medium">
                Seu filho tem Síndrome de Down e você busca o melhor acompanhamento terapêutico?
              </p>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                <strong className="text-slate-900">Clínica Fono Inova</strong> — oferecemos atendimento especializado em Anápolis com fonoaudiologia, psicologia, terapia ocupacional e fisioterapia integradas para o desenvolvimento completo da sua criança.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 [&_span]:whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Equipe especializada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Abordagem multidisciplinar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Ambiente acolhedor</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Sindrome Down");
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Vi o site sobre Síndrome de Down em Anápolis 💚 Quero agendar uma avaliação para meu filho."
                >
                  Quero agendar uma avaliação
                </ButtonWhatsApp>
                
                <a
                  href="tel:62992013573"
                  onClick={() => trackPhoneCall('(62) 99201-3573')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
                >
                  Ligar (62) 99201-3573
                </a>
              </div>

            </div>

            <div className="order-1 lg:order-2 relative w-full lg:mt-14 lg:sticky lg:top-28">
              <div className="relative">
                <div className="w-full h-72 sm:h-96 md:h-[450px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
                  <img loading="lazy" decoding="async" 
                    src="/images/clinica/ia/sindrome-de-down.webp" 
                    alt="Imagem ilustrativa: criança com síndrome de Down empilhando blocos com a terapeuta, com a mãe sorrindo ao fundo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="py-6" />

      <SituationsSection items={["Dúvidas sobre o desenvolvimento da fala e da comunicação", "Atraso em marcos motores, como sentar e andar", "Dificuldade de alimentação ou de mastigação", "Preocupação com a autonomia e a vida escolar", "Necessidade de acompanhamento de mais de uma área"]} whatsappMessage="Oi! Vi a página de Síndrome de Down da Fono Inova e gostaria de entender como funciona o atendimento." />


      {/* Seção de Terapias */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Terapias para Desenvolvimento Integral
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Oferecemos acompanhamento completo para potencializar o desenvolvimento da sua criança
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: MessageCircle, title: "Fonoaudiologia", desc: "Desenvolvimento da fala, linguagem e comunicação" },
              { icon: Brain, title: "Psicologia", desc: "Comportamento, emoções e desenvolvimento cognitivo" },
              { icon: Baby, title: "Terapia Ocupacional", desc: "Autonomia, coordenação motora e atividades diárias" },
              { icon: Heart, title: "Fisioterapia", desc: "Fortalecimento muscular, postura e movimento" }
            ].map((terapia, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <terapia.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{terapia.title}</h3>
                <p className="text-slate-600">{terapia.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold font-poppins text-slate-900">O que as famílias dizem</h2>
          <GoogleReviews count={3} offset={6} title="" />
        </div>
      </section>

      <PageFooterInfo related={['/fonoaudiologia-anapolis', '/fisioterapia-infantil-anapolis', '/terapia-ocupacional-anapolis', '/psicomotricidade-anapolis']} whatsappMessage="Oi! Vi a página de Síndrome de Down da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="terapia" whatsappMessage="Oi! Vi a página de Síndrome de Down da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Comece o acompanhamento do seu filho
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Cada dia de estimulação faz diferença no desenvolvimento. Agende uma avaliação na Clínica Fono Inova.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Vi o site sobre Síndrome de Down em Anápolis 💚 Quero agendar uma avaliação."
              >
                Agendar avaliação pelo WhatsApp
              </ButtonWhatsApp>
              
              <a
                href="tel:62992013573"
                onClick={() => trackPhoneCall('(62) 99201-3573')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Ligar Agora
              </a>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Clínica Fono Inova</span>
              </div>
              <p className="text-sm text-slate-500">
                Anápolis - GO • Bairro Jundiaí • Atendimento: Segunda a Sexta, 8h às 18h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Link para Home */}
      <div className="bg-slate-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-600">
            Conheça mais sobre a{" "}
            <Link to="/" className="text-primary font-semibold hover:underline">
              Clínica Fono Inova
            </Link>
          </p>
        </div>
      </div>
      <FixedWhatsAppBar message="Oi! Vi a página de terapias para síndrome de Down da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
};

export default SindromeDeDownPage;
