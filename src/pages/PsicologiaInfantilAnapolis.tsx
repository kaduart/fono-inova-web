import { Badge } from '@mui/material';
import GoogleReviews from '../components/premium/GoogleReviews';
import AlertSigns from '../components/premium/AlertSigns';
import {
  Accessibility,
  ArrowRight,
  Award,
  Baby,
  Brain,
  CheckCircle2,
  Clock,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Mic,
  PhoneCall,
  School,
  Smile,
  Star,
  AlertTriangle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import Layout from '../components/Layout/index.jsx';
import TypewriterText from '../components/TypewriterText';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { reportWhatsappConversion } from '../helper/analytics.js';
import {
  trackButtonClick,
  trackPhoneCall,
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness, schemaPsicologiaAnapolis, schemaFAQPsicologia } from '../schemas/clinicaSchemas.js';
import Breadcrumb from '../components/Breadcrumb';
import { psicologiaSEO } from '../data/seoStructures.js';
import SEOStructuredContent from '../components/SEOStructuredContent.js';
import ClinicGallery from '../components/ClinicGallery';
import DifferentialSection from '../components/premium/DifferentialSection';
import ProofBar from '../components/premium/ProofBar';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import PageFooterInfo from '../components/premium/PageFooterInfo';

const WHATSAPP_URL =
  "https://wa.me/5562992013573?text=Oi! Meu filho está com dificuldades de comportamento. Queria entender se precisa de avaliação.";

// Como funciona - 3 passos
const steps = [
  {
    number: "1",
    title: "Você chama no WhatsApp",
    description: "Tire suas dúvidas com nossa equipe em poucos minutos",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Entendemos seu caso",
    description: "Avaliamos as necessidades do seu filho de forma personalizada",
    icon: Brain,
  },
  {
    number: "3",
    title: "Agendamos a conversa",
    description: "Escolha o melhor horário para iniciar a orientação",
    icon: CheckCircle2,
  },
];

// Depoimentos destacados
const featuredTestimonials = [
  {
    stars: 5,
    text: "Finalmente entendemos o que estava por trás das birras do nosso filho. A orientação nos deu ferramentas práticas.",
    author: "Mãe da Julia, 6 anos",
  },
  {
    stars: 5,
    text: "A psicóloga nos explicou de forma clara o que estava acontecendo. Hoje temos uma relação muito melhor.",
    author: "Pai do Gabriel, 8 anos",
  },
  {
    stars: 5,
    text: "Nos sentimos acolhidos desde o primeiro contato. A explicação clara fez toda diferença para nossa família.",
    author: "Mãe do Enzo, 5 anos",
  },
];

// Sinais de alerta
const sinaisAlerta = [
  "Birras frequentes e explosivas",
  "Não obedece ou desafia limites",
  "Agressividade com outras crianças",
  "Dificuldade de atenção e concentração",
  "Problemas na escola por comportamento"
];

const PsicologiaInfantilAnapolis = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('LP_Psicologia_Infantil_Anapolis');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    trackButtonClick(`Scroll to ${sectionId}`);
  };

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

  return (
    <Layout>
      {/* SEO otimizado para LP de conversão */}
      <SEO
        title="Psicologia Infantil em Anápolis | Psicólogo e Psicóloga | Fono Inova"
        description="Psicologia infantil em Anápolis para dificuldades de comportamento, atenção e emoções. Atendimento com psicólogos da equipe multidisciplinar. Agende pelo WhatsApp."
        keywords="filho não obedece, psicologia infantil anápolis, birra infantil, dificuldade comportamento, psicólogo infantil"
        image="/images/clinica/real/sala-infantil-psicologia-anapolis.webp"
        url="https://www.clinicafonoinova.com.br/psicologia-infantil-anapolis"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaPsicologiaAnapolis]}
      />

      {/* Botão de Acessibilidade */}
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

      {/* ==================== BREADCRUMB ==================== */}
      <Breadcrumb 
        items={[
          { label: 'Psicologia', href: '/artigos/psicologia-infantil-guia-completo' },
          { label: 'Psicologia Infantil em Anápolis' }
        ]} 
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-clip">
        <div className="absolute inset-0 bg-[#f6f9f8]" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Eyebrow */}
              <span className="mb-4 inline-flex items-center bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-semibold rounded-full">
                Psicologia Infantil em Anápolis
              </span>

              {/* H1 - PAIN DRIVEN */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText text="Seu Filho Tem Dificuldades de Comportamento ou Não Presta Atenção?" />
              </h1>

              {/* H2 - REASSURANCE */}
              <h2 className="text-xl md:text-2xl font-medium text-slate-600">
                Psicologia infantil em Anápolis: entenda o que pode estar acontecendo com uma orientação inicial, sem compromisso
              </h2>

              {/* BLOCO DE SINAIS DE ALERTA */}
              <AlertSigns title="Sinais de alerta" items={sinaisAlerta} className="mb-6" />

              {/* Parágrafo */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Na <strong className="text-slate-900">Clínica Fono Inova</strong>, em <strong>Anápolis</strong>, ajudamos pais a entenderem o comportamento do filho. Oferecemos <strong>atendimento acolhedor</strong>, <strong>explicação clara</strong> do que está acontecendo e <strong>orientação prática</strong> para a família.
              </p>

              {/* Benefícios rápidos - ATUALIZADOS */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 [&_span]:whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Atendimento acolhedor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Explicação clara do que está acontecendo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Orientação prática para os pais</span>
                </div>
              </div>

              {/* CTAs - ATUALIZADOS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Psicologia");
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Meu filho está com dificuldades de comportamento. Queria entender se precisa de avaliação."
                >
                  Quero tirar uma dúvida no WhatsApp
                </ButtonWhatsApp>
                
                <a
                  href="tel:62992013573"
                  onClick={() => trackPhoneCall('(62) 99201-3573')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
                >
                  <PhoneCall className="w-5 h-5" />
                  Ligar (62) 99201-3573
                </a>
              </div>

              {/* Prova social */}
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative w-full lg:mt-14 lg:sticky lg:top-28">
              <div className="relative">
                <div className="w-full h-72 sm:h-96 md:h-[450px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
                  <img loading="lazy" decoding="async" 
                    src="/images/clinica/real/sala-infantil-psicologia-anapolis.webp" 
                    alt="Sala de atendimento infantil da Clínica Fono Inova em Anápolis, com painel de animais e tapete colorido"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona na Clínica Fono Inova
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, você entende melhor o comportamento do seu filho
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary/20 mb-2">{step.number}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROVA SOCIAL ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Famílias Atendidas", icon: Award },
              { value: "5.0/5", label: "Avaliação Google", icon: Star },
              { value: "12+", label: "Especialistas", icon: GraduationCap },
              { value: "10+", label: "Anos de Experiência", icon: Clock },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Depoimentos */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              O que as famílias dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm text-slate-500 font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== QUANDO PROCURAR AJUDA ==================== */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-200">
            <div className="text-center mb-6">
              <Badge className="mb-3 bg-purple-100 text-purple-700 border-purple-300">
                Quando Procurar Ajuda
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold font-poppins">
                Se você percebe que:
              </h2>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Seu filho tem comportamento diferente de outras crianças da mesma idade</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>A dificuldade está persistindo há meses</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>A escola já sinalizou alguma preocupação</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Você sente que "algo não está certo"</span>
              </li>
            </ul>
            
            <div className="bg-purple-50 p-4 rounded-xl mb-6">
              <p className="text-purple-800 text-center font-medium">
                O ideal é fazer uma avaliação. Quanto antes entender o que está acontecendo, 
                mais fácil é ajudar no desenvolvimento.
              </p>
            </div>

            <div className="text-center">
              <ButtonWhatsApp
                message="Oi! Meu filho está com dificuldades de comportamento. Gostaria de agendar uma avaliação."
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all inline-flex items-center gap-2"
              >
                Quero agendar uma avaliação
              </ButtonWhatsApp>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONEXÃO COM NEUROPEDIATRIA ==================== */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-slate-600 mb-4">
            Em alguns casos, pode ser indicada avaliação com <strong>neuropediatra</strong> para investigação mais detalhada do desenvolvimento.
          </p>
          <Link 
            to="/neuropediatra-anapolis" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold hover:underline"
          >
            Conhecer neuropediatra em Anápolis
          </Link>
        </div>
      </section>

      {/* ==================== CONTEÚDO SEO ESTRUTURADO ==================== */}
      {/* ==================== PSICÓLOGO INFANTIL EM ANÁPOLIS (SEO local) ==================== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-4">
            Psicólogo infantil em Anápolis, no bairro Jundiaí
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            Procurando psicólogo ou psicóloga para o seu filho em Anápolis? Na Clínica Fono Inova, a psicologia infantil trabalha junto com fonoaudiologia, terapia ocupacional, fisioterapia e neuropediatria. Assim, a equipe conversa sobre a criança e a família não precisa percorrer vários lugares.
          </p>
          <ul className="space-y-2 text-slate-700 mb-6">
            <li>Dificuldades de comportamento, atenção e regulação emocional</li>
            <li>Acompanhamento de crianças com autismo (TEA) e TDAH, junto da equipe</li>
            <li>Orientação aos pais sobre rotina, limites e desenvolvimento</li>
          </ul>
          <p className="text-slate-600">
            Atendimento de segunda a sexta, das 8h às 18h, na Av. Minas Gerais, 405, Jundiaí, Anápolis. Valores e horários pelo WhatsApp.
          </p>
        </div>
      </section>

      <SEOStructuredContent 
        seoData={psicologiaSEO} 
        showFAQ={true}
        customFAQTitle="Perguntas Frequentes sobre Psicologia Infantil"
      />

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold font-poppins text-slate-900">O que as famílias dizem</h2>
          <GoogleReviews count={3} offset={8} title="" />
        </div>
      </section>

      <PageFooterInfo related={['/comportamento-infantil-anapolis', '/tdah-anapolis', '/autismo-anapolis', '/avaliacao-neuropsicologica-anapolis']} whatsappMessage="Oi! Vi a página de psicologia infantil da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="ludico" whatsappMessage="Oi! Vi a página de psicologia infantil da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Tire sua dúvida agora
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Entenda o que está acontecendo com o comportamento do seu filho.
              Uma conversa pode te dar a direção que você precisa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Meu filho está com dificuldades de comportamento. Queria entender se precisa de avaliação."
              >
                Quero tirar uma dúvida no WhatsApp
              </ButtonWhatsApp>
              
              <a
                href="tel:62992013573"
                onClick={() => trackPhoneCall('(62) 99201-3573')}
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
                Anápolis - GO • Atendimento: Segunda a Sexta, 8h às 18h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INTERNAL LINKING ==================== */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Outras especialidades em Anápolis
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/fonoaudiologia-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Mic className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Fonoaudiologia</h4>
                    <p className="text-sm text-slate-500">Atraso de fala e linguagem</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/terapia-ocupacional-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Baby className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Terapia Ocupacional</h4>
                    <p className="text-sm text-slate-500">Desenvolvimento motor</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/tdah-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">TDAH</h4>
                    <p className="text-sm text-slate-500">Diagnóstico e acompanhamento</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/autismo-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <Smile className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Autismo (TEA)</h4>
                    <p className="text-sm text-slate-500">Avaliação e suporte especializado</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Link para Home institucional */}
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
      <FixedWhatsAppBar message="Oi! Vi a página de psicologia infantil da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
};

export default PsicologiaInfantilAnapolis;
