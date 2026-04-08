import { Badge } from '@mui/material';
import { Accessibility, ArrowRight, Award, Baby, Brain, CheckCircle2, Clock, GraduationCap, Heart, MapPin, MessageCircle, PhoneCall, Star, Activity } from 'lucide-react';
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

const PrematuridadePage = () => {
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFormSubmission } = useFormTracking('LP_Prematuridade');

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

  // Schema específico para Prematuridade
  const schemaPrematuridade = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Acompanhamento Neuropsicomotor para Prematuros em Anápolis",
    "description": "Estimulação precoce e acompanhamento especializado para bebês prematuros em Anápolis. Fisioterapia, fonoaudiologia e terapia ocupacional.",
    "url": "https://www.clinicafonoinova.com.br/prematuridade-desenvolvimento",
    "mainEntity": {
      "@type": "MedicalCondition",
      "name": "Prematuridade",
      "description": "Acompanhamento terapêutico para desenvolvimento neuropsicomotor de bebês prematuros",
      "possibleTreatment": [
        "Estimulação Precoce",
        "Fisioterapia",
        "Fonoaudiologia",
        "Terapia Ocupacional"
      ]
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quando começar a estimulação para bebês prematuros?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A estimulação precoce pode começar a partir da alta hospitalar, com exercícios adequados à idade corrigida do bebê. Quanto mais precoce, melhores os resultados."
        }
      },
      {
        "@type": "Question",
        "name": "O que é idade corrigida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É a idade do bebê calculada a partir da data prevista do parto, não da data do nascimento. Usamos essa idade para avaliar o desenvolvimento até os 2 anos."
        }
      },
      {
        "@type": "Question",
        "name": "Atendem bebês prematuros em Anápolis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Atendemos bebês prematuros no bairro Jundiaí em Anápolis, com profissionais especializados em desenvolvimento infantil."
        }
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Prematuridade em Anápolis | Estimulação Precoce | Fono Inova"
        description="Acompanhamento especializado para bebês prematuros em Anápolis. Estimulação precoce, fisioterapia, fonoaudiologia e terapia ocupacional. Agende sua avaliação."
        keywords="prematuridade anápolis, estimulação precoce prematuro, fisioterapia prematuro, desenvolvimento neuropsicomotor, bebê prematuro anápolis"
        image="/images/og-image.jpg"
        url="https://www.clinicafonoinova.com.br/prematuridade-desenvolvimento"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaPrematuridade, schemaFAQ]}
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
          { label: 'Acompanhamento de Prematuros em Anápolis' }
        ]} 
      />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-teal-200/30 to-cyan-200/20 rounded-full blur-3xl opacity-70" />
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            <div className="order-2 lg:order-1 space-y-6">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold">
                Estimulação Precoce em Anápolis
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                Acompanhamento para Bebês{" "}
                <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">Prematuros</span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">
                Estimulação precoce e desenvolvimento neuropsicomotor
              </h2>

              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-xl font-medium">
                Seu bebê nasceu prematuro e você quer o melhor acompanhamento para o desenvolvimento dele?
              </p>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                <strong className="text-slate-900">Clínica Fono Inova</strong> — oferecemos acompanhamento especializado para bebês prematuros em Anápolis, com estimulação precoce, fisioterapia, fonoaudiologia e terapia ocupacional integradas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Estimulação precoce</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Acompanhamento da idade corrigida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Equipe especializada</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Prematuridade");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Vi o site sobre acompanhamento para prematuros em Anápolis 💚 Quero agendar uma avaliação para meu bebê."
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
                    src="/images/fono-inova-1.png" 
                    alt="Acompanhamento especializado para bebês prematuros em Anápolis"
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
              Acompanhamento Integral do Desenvolvimento
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trabalhamos com a idade corrigida do bebê para estimular cada etapa do desenvolvimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Activity, title: "Fisioterapia", desc: "Estimulação motora, tônus muscular e postura" },
              { icon: MessageCircle, title: "Fonoaudiologia", desc: "Sucção, deglutição e desenvolvimento da fala" },
              { icon: Baby, title: "Terapia Ocupacional", desc: "Integração sensorial e coordenação motora" },
              { icon: Heart, title: "Estimulação Precoce", desc: "Desenvolvimento global nas primeiras semanas" }
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

      {/* Seção Idade Corrigida */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100">
              <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-6 text-center">
                O que é Idade Corrigida?
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                A idade corrigida é calculada a partir da data prevista do parto, não da data do nascimento. 
                Usamos essa idade para avaliar o desenvolvimento do bebê prematuro até os 2 anos de vida.
              </p>
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-slate-700">
                  <strong>Exemplo:</strong> Se seu bebê nasceu com 32 semanas (8 semanas antes do previsto), 
                  quando ele completa 4 meses de vida, sua idade corrigida é de 2 meses. 
                  Avaliamos o desenvolvimento considerando essa idade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Agende o acompanhamento do seu bebê
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Cada semana de estimulação faz diferença no desenvolvimento. Entre em contato para agendar uma avaliação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Vi o site sobre acompanhamento para prematuros em Anápolis 💚 Quero agendar uma avaliação."
              >
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

export default PrematuridadePage;
