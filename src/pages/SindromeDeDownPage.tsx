import { Badge } from '@mui/material';
import { Accessibility, ArrowRight, Award, Baby, Brain, CheckCircle2, Clock, GraduationCap, Heart, MapPin, MessageCircle, PhoneCall, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick, trackPhoneCall } from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';

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
        image="/images/og-image.jpg"
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
      <section className="relative min-h-screen pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/40 to-pink-50/30" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl opacity-70" />
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            <div className="order-2 lg:order-1 space-y-6">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold">
                Atendimento Especializado em Anápolis
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                Síndrome de Down em{" "}
                <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">Anápolis</span>
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

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
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
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Vi o site sobre Síndrome de Down em Anápolis 💚 Quero agendar uma avaliação para meu filho."
                >
                  Quero agendar uma avaliação
                </ButtonWhatsApp>
                
                <a
                  href="tel:6237063924"
                  onClick={() => trackPhoneCall('(62) 3706-3924')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
                >
                  <PhoneCall className="w-5 h-5" />
                  Ligar (62) 3706-3924
                </a>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-600">4.9 no Google • +500 famílias atendidas</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative w-full">
              <div className="relative">
                <div className="w-full h-72 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/fono-inova-2.png" 
                    alt="Atendimento especializado Síndrome de Down em Anápolis"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Vi o site sobre Síndrome de Down em Anápolis 💚 Quero agendar uma avaliação."
              >
                <MessageCircle className="w-5 h-5" />
                Agendar avaliação pelo WhatsApp
              </ButtonWhatsApp>
              
              <a
                href="tel:6237063924"
                onClick={() => trackPhoneCall('(62) 3706-3924')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <PhoneCall className="w-5 h-5" />
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
    </Layout>
  );
};

export default SindromeDeDownPage;
