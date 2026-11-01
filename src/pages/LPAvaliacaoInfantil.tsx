import GoogleReviews from '../components/premium/GoogleReviews';
import {
  Accessibility,
  ArrowRight,
  Award,
  Baby,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Facebook,
  GraduationCap,
  Instagram,
  MapPin,
  MessageCircle,
  Mic,
  Music,
  PhoneCall,
  School,
  Sparkles,
  Youtube
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizardLazy.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import BookingModal from '../components/BookingModal.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import Layout from '../components/Layout/index.jsx';
import TypewriterText from '../components/TypewriterText';
import SEO from '../components/SEO.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import TestimonialCards from '../components/TestimonialCards.jsx';
import { articlesData } from '../data/articlesData.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { reportWhatsappConversion } from '../helper/analytics.js';
import {
  trackButtonClick,
  trackPhoneCall,
  trackSocialMediaClick,
  trackWhatsAppClick
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';
import ClinicGallery from '../components/ClinicGallery';
import PageFooterInfo from '../components/premium/PageFooterInfo';
import SituationsSection from '../components/premium/SituationsSection';
import DifferentialSection from '../components/premium/DifferentialSection';
import ProofBar from '../components/premium/ProofBar';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';

const WHATSAPP_URL =
  "https://wa.me/5562992013573?text=Olá! Vi o site da Clínica Fono Inova e gostaria de agendar uma avaliação.";

// Dados das dores/situações para identificação
const painPoints = [
  {
    icon: MessageCircle,
    title: "Meu filho fala pouco ou troca letras",
    description: "Dificuldade para se expressar ou não forma frases completas",
    color: "orange",
    link: "/fala-tardia-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho fala pouco/troca letras. Pode me orientar?",
  },
  {
    icon: Clock,
    title: "Tem 3+ anos e ainda não fala direito",
    description: "Atraso na fala que está preocupando a família e professores",
    color: "blue",
    link: "/fala-tardia-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem 3+ anos e ainda não fala bem. Pode me orientar?",
  },
  {
    icon: Brain,
    title: "Suspeita ou diagnóstico de autismo",
    description: "Precisa de avaliação multidisciplinar ou encaminhamento para TEA",
    color: "purple",
    link: "/autismo-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nTemos suspeita de autismo. Pode me orientar?",
  },
  {
    icon: School,
    title: "Está com dificuldade para aprender",
    description: "Não acompanha a escola, TDAH, dislexia ou problemas de aprendizagem",
    color: "emerald",
    link: "/avaliacao-neuropsicologica-dificuldade-escolar",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem dificuldade na escola. Pode me orientar?",
  },
  {
    icon: Baby,
    title: "Problemas no aleitamento ou deglutição",
    description: "Freio lingual, dificuldade para mamar ou engolir alimentos",
    color: "pink",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem problema no aleitamento/engolir. Pode me orientar?",
  },
  {
    icon: Mic,
    title: "Perda de voz ou rouquidão persistente",
    description: "Disfonia, fadiga vocal, ideal para professores e profissionais da voz",
    color: "teal",
    link: "/fonoaudiologia-adulto",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nTenho problema de voz/rouquidão. Pode me orientar?",
  },
];

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
    title: "Agendamos a avaliação",
    description: "Escolha o melhor horário e inicie o tratamento",
    icon: CheckCircle2,
  },
];


const LPAvaliacaoInfantil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('LP_Avaliacao_Infantil');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    trackButtonClick(`Scroll to ${sectionId}`);
  };

  const handlePainClick = (index: number) => {
    setSelectedPain(index);
    trackButtonClick(`Pain Point Click - ${painPoints[index].title}`);
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
        title="Avaliação Infantil em Anápolis | Fala Tardia, Autismo, TDAH | Clínica Fono Inova"
        description="Avaliação especializada em Anápolis para fala tardia, autismo, TDAH e dificuldades de aprendizagem. Agende pela primeira consulta. Atendimento humanizado e multidisciplinar."
        keywords="avaliação infantil anápolis, avaliação fala tardia anápolis, avaliação autismo anápolis, fonoaudiólogo infantil anápolis"
        image="/images/og-image.jpg"
        url="https://www.clinicafonoinova.com.br/avaliacao-infantil"
        type="website"
        schema={schemaBaseLocalBusiness}
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

      {/* ==================== HERO SECTION - FOCO EM DOR (LP) ==================== */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-clip">
        <div className="absolute inset-0 bg-[#f6f9f8]" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* H1 - GEO-SEMÂNTICO */}
              <span className="mb-4 inline-flex items-center bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-semibold rounded-full">
                Avaliação Infantil em Anápolis
              </span>

              {/* Badge de urgência social */}
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  Avaliação individualizada com equipe multidisciplinar
                </span>
              </div>

              {/* H1 FOCADO EM DOR (LP de conversão) */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText segments={[
                    { text: 'Seu filho está com ' },
                    { text: 'dificuldade para falar', className: "text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full" },
                    { text: ' ou se comunicar?' },
                ]} />
              </h1>

              {/* Subheadline com contexto */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Na <strong className="text-slate-900">Clínica Fono Inova</strong>, em{" "}
                <strong className="text-slate-900">Anápolis</strong>, realizamos avaliações especializadas 
                para identificar e tratar atraso na fala, autismo, TDAH e dificuldades de aprendizagem.
              </p>

              {/* Benefícios rápidos */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 [&_span]:whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Avaliação individualizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>+500 famílias atendidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Equipe multidisciplinar</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Principal");
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Vi o site sobre avaliação infantil 💚\nÉ para meu filho, pode me orientar?"
                >
                  Quero agendar uma avaliação
                </ButtonWhatsApp>
                
                <a
                  href="tel:62992013573"
                  onClick={() => trackPhoneCall('(62) 99201-3573')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  Ligar (62) 99201-3573
                </a>
              </div>

              {/* Prova social */}
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative w-full lg:mt-14 lg:sticky lg:top-28">
              <div className="relative">
                <div className="w-full h-72 sm:h-96 md:h-[450px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
                  <ImageCarousel
                    typeImages="nichos"
                    onImageClick={() => trackButtonClick('Hero Image Click')}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      <SituationsSection items={['Atraso na fala ou na compreensão', 'Dificuldade de atenção, aprendizagem ou comportamento', 'Dúvidas sobre o desenvolvimento motor', 'Dificuldade para brincar e interagir com outras crianças', 'Preocupação da escola com o desenvolvimento', 'Dúvida sobre qual especialidade procurar primeiro']} whatsappMessage="Oi! Vi a página de avaliação infantil da Fono Inova e gostaria de entender como funciona o atendimento." />

      {/* ==================== SEÇÃO DE IDENTIFICAÇÃO - DORES ==================== */}
      <section id="identificacao" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border mb-4 bg-purple-50 text-purple-600 border-purple-200 px-4 py-1.5 text-sm font-semibold">
              Encontre o Atendimento Ideal
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
              Você se identifica com{" "}
              <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">alguma dessas situações?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Selecione abaixo o que mais se encaixa com a necessidade do seu filho
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((pain, index) => {
              const Icon = pain.icon;
              const isSelected = selectedPain === index;
              const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
                orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", hover: "hover:border-orange-400" },
                blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", hover: "hover:border-blue-400" },
                purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", hover: "hover:border-purple-400" },
                emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", hover: "hover:border-emerald-400" },
                pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", hover: "hover:border-pink-400" },
                teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", hover: "hover:border-teal-400" },
              };
              const colors = colorClasses[pain.color];

              return (
                <button
                  key={index}
                  onClick={() => handlePainClick(index)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? `${colors.bg} ${colors.border} shadow-xl scale-[1.02]`
                      : `bg-white border-slate-100 ${colors.hover} hover:shadow-lg hover:-translate-y-1`
                  }`}
                >
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{pain.title}</h3>
                  <p className="text-sm text-slate-600">{pain.description}</p>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Não sabe qual é o melhor atendimento?{" "}
              <span className="font-semibold text-primary">Nós te ajudamos a descobrir</span>
            </p>
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Identificação")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              message={selectedPain !== null ? painPoints[selectedPain].whatsappMsg : "Oi! Vi o site sobre avaliação infantil 💚\nQuero saber qual atendimento é ideal para meu filho."}
            >
              Falar com especialista no WhatsApp
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona a avaliação na Clínica Fono Inova
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, seu filho começa o tratamento especializado
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

          <GoogleReviews count={3} offset={16} title="" />
        </div>
      </section>

      <PageFooterInfo related={['/avaliacao-neuropsicologica-anapolis', '/fonoaudiologia-anapolis', '/autismo-anapolis', '/terapia-ocupacional-anapolis']} whatsappMessage="Oi! Vi a página de avaliação infantil da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="kids" reverse whatsappMessage="Oi! Vi a página de avaliação infantil da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Não espere mais para ajudar seu filho
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Cada dia de espera é um dia de atraso no desenvolvimento. 
              Agende uma avaliação na Clínica Fono Inova e descubra como podemos ajudar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Vi o site sobre avaliação infantil 💚\nQuero agendar para meu filho."
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
                Anápolis - GO • Atendimento: Segunda a Sexta, 8h às 18h
              </p>
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
      <FixedWhatsAppBar message="Oi! Vi a página de avaliação infantil da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
};

export default LPAvaliacaoInfantil;
