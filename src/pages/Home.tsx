import GoogleReviews from '../components/premium/GoogleReviews';
import AnimatedStat from '../components/premium/AnimatedStat';
import Reveal from '../components/premium/Reveal';
import {
  Mail,
  Phone,
  ArrowRight,
  Accessibility,
  Activity,
  Award,
  Baby,
  Brain,
  CheckCircle2,
  Clock,
  Facebook,
  Footprints,
  GraduationCap,
  Instagram,
  MapPin,
  MessageCircle,
  Mic,
  PhoneCall,
  School,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Youtube
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import ArticleCard from '../components/ArticleCard.jsx';
import BookingModal from '../components/BookingModal.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import TypewriterText from '../components/TypewriterText';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
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
import { schemaHome } from '../schemas/clinicaSchemas.js';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';

const WHATSAPP_URL =
  "https://wa.me/5562992013573?text=Olá! Vi o site da Clínica Fono Inova e gostaria de agendar uma avaliação.";

// Dados das dores/situações para identificação - MAIS EMOCIONAL
const painPoints = [
  {
    icon: MessageCircle,
    title: "Meu filho fala pouco ou quase não fala",
    description: "Troca letras, tem dificuldade para se expressar ou não forma frases completas",
    color: "orange",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?",
  },
  {
    icon: Clock,
    title: "Tem 3+ anos e ainda não fala direito",
    description: "Atraso na fala que está preocupando a família e professores",
    color: "blue",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?",
  },
  {
    icon: Brain,
    title: "Suspeita ou diagnóstico de autismo",
    description: "Precisa de avaliação multidisciplinar ou encaminhamento para TEA",
    color: "purple",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?",
  },
  {
    icon: School,
    title: "Está com dificuldade para aprender",
    description: "Não acompanha a escola, TDAH, dislexia ou problemas de aprendizagem",
    color: "emerald",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?",
  },
  {
    icon: Baby,
    title: "Problemas no aleitamento ou deglutição",
    description: "Freio lingual, dificuldade para mamar ou engolir alimentos",
    color: "pink",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?",
  },
  {
    icon: Mic,
    title: "Perda de voz ou rouquidão persistente",
    description: "Disfonia, fadiga vocal, ideal para professores e profissionais da voz",
    color: "teal",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?",
  },
];

// Como funciona - 3 passos simplificados
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


function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('Formulário_Contato_Home');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    trackButtonClick(`Scroll to ${sectionId}`);
  };

  const handlePainClick = (index: number) => {
    setSelectedPain(index);
    trackButtonClick(`Pain Point Click - ${painPoints[index].title}`);
  };

  const handleConhecerServicos = () => {
    trackButtonClick('Conhecer Serviços');
    scrollToSection('services');
  };

  const handleOpenAccessibility = () => {
    trackButtonClick('Open Accessibility Wizard');
    setAccessibilityWizardOpen(true);
  };

  const handleVerTodosArtigos = () => {
    trackButtonClick('Ver Todos os Artigos');
  };

  const handleSocialMediaClick = (platform: string) => {
    trackSocialMediaClick(platform);
  };

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/png');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', '/images/icone-colorido.png');
    document.head.appendChild(link);
    trackButtonClick('Home Page Loaded');
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      const timer = window.setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <Layout>
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

      {/* ==================== HERO SECTION - FOCADA EM DOR ==================== */}
      <section className="pilot-hero relative pt-24 pb-14 md:pt-28 md:pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] gap-10 md:gap-12 lg:gap-14 xl:gap-16 items-start">
            {/* Text Content */}
            <div className="order-1 min-w-0 space-y-5 lg:space-y-6 max-w-[42rem] lg:pt-3">
              {/* Badge institucional */}
              <div className="inline-flex items-center gap-2 border-l border-brand-primary pl-3 py-1">
                <Award className="w-4 h-4 text-brand-primary-dark" />
                <span className="text-sm font-semibold tracking-wide text-brand-primary-dark">
                  Clínica Multidisciplinar em Anápolis
                </span>
              </div>

              {/* 🔗 INTERNAL LINKING - SEO Boost (navegação semântica) */}
              <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500">
                <span>Tratamentos:</span>
                <Link to="/fala-tardia-anapolis" className="text-brand-primary-dark hover:underline">fala tardia</Link>
                <span>•</span>
                <Link to="/autismo-anapolis" className="text-brand-primary-dark hover:underline">autismo infantil</Link>
                <span>•</span>
                <Link to="/dislexia-anapolis" className="text-brand-primary-dark hover:underline">dificuldades de aprendizagem</Link>
                <span>•</span>
                <Link to="/terapia-ocupacional-anapolis" className="text-brand-primary-dark hover:underline">terapia ocupacional</Link>
              </nav>

              {/* H1 INSTITUCIONAL - Natural e forte */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-slate-950 leading-[1.05] tracking-[-0.03em] max-w-[13ch] xl:max-w-none">
                <span className="text-brand-primary-dark xl:whitespace-nowrap">Clínica Fono Inova</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-slate-700 font-medium tracking-[-0.02em] mt-2">
                  em Anápolis
                </span>
              </h1>

              {/* H2 - Especialidades (SEO) */}
              <h2 className="text-lg md:text-xl lg:text-2xl text-slate-700 font-semibold leading-snug max-w-[38ch]">
                <TypewriterText text="Especialistas em fonoaudiologia, psicologia infantil e desenvolvimento infantil" />
              </h2>

              {/* H2 de DOR - Conversão + SEO weight */}
              <h2 className="text-base md:text-lg text-slate-700 font-semibold leading-relaxed max-w-[52ch]">
                Seu filho tem <span className="text-brand-primary-dark">dificuldade para falar</span>,{" "}
                <span className="text-brand-primary-dark">atraso na fala</span> ou{" "}
                <span className="text-brand-primary-dark">suspeita de autismo</span>?
              </h2>

              {/* Descrição institucional - marca primeiro (entity reinforcement) */}
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-[58ch]">
                <strong className="text-slate-900">Clínica Fono Inova</strong> — ajudamos crianças em{" "}
                Anápolis com <strong>atraso na fala</strong>, <strong>autismo</strong> e{" "}
                <strong>dificuldades de aprendizagem</strong> através de acompanhamento especializado.
              </p>

              {/* Benefícios */}
              <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-slate-700 border-y border-slate-200 py-3.5" aria-label="Informações de confiança">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary-dark" />
                  <span>Atendimento rápido</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary-dark" />
                  <span>+500 famílias atendidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-brand-primary-dark" />
                  <span>Nota 5.0 no Google</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp CTA Principal");
                  }}
                  className="pilot-action bg-whatsapp hover:bg-whatsapp-hover text-white px-7 py-3.5 text-base shadow-sm hover:shadow-md justify-center"
                  message="Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?"
                >
                  Falar no WhatsApp
                </ButtonWhatsApp>
                
                <a
                  href="tel:62992013573"
                  onClick={() => trackPhoneCall('(62) 99201-3573')}
                  className="pilot-action inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-brand-primary-dark/35 text-brand-primary-dark hover:bg-surface-mist hover:border-brand-primary-dark"
                >
                  Ligar (62) 99201-3573
                </a>
              </div>

              {/* Prova social */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Star className="w-4 h-4 text-brand-primary-dark" />
                <span>5.0 no Google • +500 famílias atendidas</span>
              </div>

              {/* Endereço para SEO local */}
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <MapPin className="w-4 h-4 text-brand-primary-dark" />
                <span>Bairro Jundiaí, Anápolis - GO</span>

              </div>

              {/* Convênio Base Aérea */}
              <Link
                to="/convenio-base-aerea-anapolis"
                onClick={() => trackButtonClick('Badge Convênio Base Aérea - Hero')}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary-dark hover:underline"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Credenciados ao convênio da Base Aérea de Anápolis (BAAN)</span>
              </Link>
            </div>

            {/* Image Section */}
            <div className="order-2 min-w-0 relative w-full max-w-[38rem] mx-auto lg:max-w-none lg:pt-10">
              <div className="relative pr-3 pb-3 md:pr-4 md:pb-4">
                {/* Imagem principal */}
                <div className="relative z-10 w-full h-72 sm:h-96 md:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
                  <ImageCarousel
                    typeImages="nichos"
                    onImageClick={() => trackButtonClick('Hero Image Click')}
                  />
                </div>

                <div className="absolute right-0 bottom-0 w-[58%] h-[42%] bg-brand-primary rounded-3xl opacity-20" aria-hidden="true" />

                {/* Card flutuante - apenas um */}
                <div className="absolute z-20 bottom-8 -left-3 md:-left-6 bg-brand-primary-dark text-white rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="font-bold">5.0</span>
                    <span className="text-xs text-white/75">Google</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEÇÃO DE IDENTIFICAÇÃO - DORES ==================== */}
      <section id="identificacao" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">Encontre o Atendimento Ideal</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
              Você se identifica com{" "}
              <span className="text-primary">alguma dessas situações?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Selecione abaixo o que mais se encaixa com a necessidade do seu filho
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {painPoints.map((pain, index) => {
              const Icon = pain.icon;
              const isSelected = selectedPain === index;
              return (
                <Reveal key={index} delay={(index % 2) * 70}>
                  <button
                    onClick={() => handlePainClick(index)}
                    aria-pressed={isSelected}
                    className={`fi-lift group flex w-full items-center gap-4 text-left p-5 rounded-2xl ring-1 transition-colors ${
                      isSelected ? 'bg-primary/5 ring-2 ring-primary' : 'bg-white ring-slate-200 hover:ring-primary'
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-bold text-slate-900">{pain.title}</span>
                      <span className="block text-sm text-slate-600">{pain.description}</span>
                    </span>
                    <ArrowRight className="fi-arrow h-5 w-5 shrink-0 text-slate-400 group-hover:text-primary" aria-hidden="true" />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* CTA após seleção ou geral */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Não sabe qual é o melhor atendimento?{" "}
              <span className="font-semibold text-primary">Nós te ajudamos a descobrir</span>
            </p>
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Identificação")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2"
              message={selectedPain !== null ? painPoints[selectedPain].whatsappMsg : "Oi, vi no site e quero saber qual atendimento é ideal para meu filho. Pode me ajudar?"}
            >
              Falar com especialista no WhatsApp
            </ButtonWhatsApp>
            
            {/* Ancoragem de valor */}
            <p className="text-sm text-slate-500 mt-3">
              Primeiro passo para entender exatamente o que seu filho precisa
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PROVA SOCIAL - DEPOIMENTOS ==================== */}
      <section id="testimonials" className="py-24 bg-[#f6f9f8]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { value: 500, prefix: "", suffix: "+", decimals: 0, label: "Famílias Atendidas", icon: Award },
              { value: 5, prefix: "", suffix: "/5", decimals: 1, label: "Avaliação Google", icon: Star },
              { value: 12, prefix: "", suffix: "+", decimals: 0, label: "Especialistas", icon: GraduationCap },
              { value: 10, prefix: "", suffix: "+", decimals: 0, label: "Anos de Experiência", icon: Clock },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="fi-lift text-center p-6 bg-white rounded-2xl ring-1 ring-slate-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <AnimatedStat value={stat.value} suffix={stat.suffix} decimals={stat.decimals} className="block text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums" />
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Depoimentos em destaque */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="mb-3 inline-block text-sm font-semibold text-primary">Avaliações no Google</span>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">
                O que os <span className="text-primary">pais</span> dizem sobre nós
              </h2>
            </div>

            <GoogleReviews count={3} offset={13} title="" />

            {/* CTA após prova social */}
            <div className="bg-[#0f5c4b] rounded-3xl p-8 md:p-12 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Conheça a Fono Inova de perto
              </h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Agende uma avaliação e descubra como podemos ajudar no desenvolvimento do seu filho
              </p>
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - Prova Social")}
                className="bg-white hover:bg-slate-100 text-primary px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2 shadow-xl"
                message="Oi! Vi o site de vocês e gostei muito da clínica.\n\nQueria tirar uma dúvida sobre o atendimento. Pode me ajudar?"
              >
                Quero Agendar Uma Avaliação
              </ButtonWhatsApp>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA - 3 PASSOS ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">Processo Simples</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona o <span className="text-primary">atendimento</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em apenas 3 passos simples, seu filho começa o acompanhamento especializado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center group">
                  {/* Linha conectora (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                  )}

                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full" />
                    <div className="relative w-24 h-24 bg-[#0f5c4b] rounded-full flex items-center justify-center shadow-lg motion-safe:group-hover:scale-105 transition-transform duration-300">
                      <span className="text-3xl font-bold text-white">{step.number}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA do processo */}
          <div className="text-center mt-12">
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Como Funciona")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2"
              message="Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?"
            >
              Falar com especialista no WhatsApp
            </ButtonWhatsApp>
            
            <p className="text-sm text-slate-500 mt-3">
              Resposta rápida • Sem compromisso
            </p>
          </div>
        </div>
      </section>

      {/* ==================== ESPECIALIDADES EM ANÁPOLIS - SEO LOCAL ==================== */}
      <section id="services" className="py-12 md:py-16 bg-[#f6f9f8]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">Atendimento em Anápolis</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Nossas <span className="text-primary">Especialidades</span> em Anápolis
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Clique na especialidade desejada para saber mais sobre nosso atendimento
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {/* Fonoaudiologia */}
            <Link 
              to="/fonoaudiologia-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Fonoaudiologia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src="/images/fonoaudiologia/fono1.jpg" 
                    alt="Fonoaudiologia Infantil em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm">Fonoaudiologia</h3>
                  <p className="text-xs text-slate-500 mt-1">Avaliação e desenvolvimento da fala infantil</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Psicologia Infantil */}
            <Link 
              to="/psicologia-infantil-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Psicologia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/psicologia/psico2.jpg"
                    alt="Psicologia Infantil em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-secondary transition-colors text-sm">Psicologia Infantil</h3>
                  <p className="text-xs text-slate-500 mt-1">Apoio emocional e desenvolvimento cognitivo</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Terapia Ocupacional */}
            <Link 
              to="/terapia-ocupacional-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - TO')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-accent/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/terapia-ocupacional/to1.jpg"
                    alt="Terapia Ocupacional em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-accent transition-colors text-sm">Terapia Ocupacional</h3>
                  <p className="text-xs text-slate-500 mt-1">Autonomia e coordenação motora</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Psicomotricidade */}
            <Link 
              to="/psicomotricidade-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Psicomotricidade')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-pink-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/psicomotricidade-hero.png"
                    alt="Psicomotricidade Infantil em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-pink-500 transition-colors text-sm">Psicomotricidade</h3>
                  <p className="text-xs text-slate-500 mt-1">Equilíbrio e consciência corporal</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Teste da Linguinha */}
            <Link 
              to="/teste-da-linguinha-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Teste Linguinha')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-purple-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/freio-lingual/mae-bb.webp"
                    alt="Teste da Linguinha em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-purple-500 transition-colors text-sm">Teste da Linguinha</h3>
                  <p className="text-xs text-slate-500 mt-1">Diagnóstico precoce do freio lingual</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Fisioterapia Infantil */}
            <Link 
              to="/fisioterapia-infantil-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Fisioterapia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-cyan-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src="/images/fisioterapia/fisio2.jpg" 
                    alt="Fisioterapia Infantil em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-cyan-500 transition-colors text-sm">Fisioterapia Infantil</h3>
                  <p className="text-xs text-slate-500 mt-1">Reabilitação e estimulação motora</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Avaliação Neuropsicológica */}
            <Link 
              to="/avaliacao-neuropsicologica-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Neuropsicologia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-teal-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src="/images/neuropsicologia/aval-neuro-2.jpeg" 
                    alt="Avaliação Neuropsicológica em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-teal-500 transition-colors text-sm">Avaliação Neuropsicológica</h3>
                  <p className="text-xs text-slate-500 mt-1">Diagnóstico TDAH, TEA e aprendizagem</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Neuropediatria */}
            <Link 
              to="/neuropediatra-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Neuropediatria')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src="/images/neuropsicologia/neuro.webp" 
                    alt="Neuropediatra em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-500 transition-colors text-sm">Neuropediatria</h3>
                  <p className="text-xs text-slate-500 mt-1">Avaliação médica do desenvolvimento infantil</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar consulta 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Fala Tardia */}
            <Link
              to="/fala-tardia-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Fala Tardia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/fala-tardia/fala-tardia-1.jpeg"
                    alt="Fala Tardia Infantil em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm">Fala Tardia</h3>
                  <p className="text-xs text-slate-500 mt-1">Fonoterapia para atraso na fala de 2 a 5 anos</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Suspeita de Autismo (TEA) */}
            <Link
              to="/autismo-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Autismo')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-purple-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/tea/tea-fantochy.jpeg"
                    alt="Avaliação de Autismo (TEA) em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-purple-500 transition-colors text-sm">Suspeita de Autismo</h3>
                  <p className="text-xs text-slate-500 mt-1">Avaliação multidisciplinar completa para TEA</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Dificuldade na Escola */}
            <Link
              to="/avaliacao-neuropsicologica-dificuldade-escolar"
              onClick={() => trackButtonClick('Especialidade Card - Dificuldade Escolar')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/dificuldade-escolar/dificuldade-escolar-2.jpeg"
                    alt="Avaliação de Dificuldade Escolar em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-500 transition-colors text-sm">Dificuldade na Escola</h3>
                  <p className="text-xs text-slate-500 mt-1">Avaliação neuropsicológica para TDAH e aprendizagem</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Aprendizagem / Dislexia */}
            <Link
              to="/dislexia-anapolis"
              onClick={() => trackButtonClick('Especialidade Card - Dislexia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/dificuldade-escolar/dificuldade-escolar-1.jpeg"
                    alt="Dislexia e Dificuldades de Aprendizagem em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-amber-500 transition-colors text-sm">Aprendizagem</h3>
                  <p className="text-xs text-slate-500 mt-1">Dislexia, discalculia e intervenção personalizada</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Psicopedagogia */}
            <Link
              to="/psicopedagogia"
              onClick={() => trackButtonClick('Especialidade Card - Psicopedagogia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/psicopedagoga/psicopedagoga.webp"
                    alt="Psicopedagogia em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-amber-500 transition-colors text-sm">Psicopedagogia</h3>
                  <p className="text-xs text-slate-500 mt-1">Estratégias para o sucesso escolar e emocional</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Musicoterapia */}
            <Link
              to="/musicoterapia"
              onClick={() => trackButtonClick('Especialidade Card - Musicoterapia')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-indigo-400/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/musicoterapia-hero.png"
                    alt="Musicoterapia Infantil em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-indigo-500 transition-colors text-sm">Musicoterapia</h3>
                  <p className="text-xs text-slate-500 mt-1">Comunicação e regulação emocional através da música</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Voz Profissional (Fonoaudiologia Adulto) */}
            <Link
              to="/fonoaudiologia-adulto"
              onClick={() => trackButtonClick('Especialidade Card - Voz Adulto')}
              className="group"
            >
              <div className="bg-white rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src="/images/adulto-voz/adulto-voz-1.jpeg"
                    alt="Fonoaudiologia para Adultos em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm">Voz Profissional</h3>
                  <p className="text-xs text-slate-500 mt-1">Disfonia e fadiga vocal para professores e profissionais</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>

            {/* Avaliação Infantil - Principal */}
            <Link
              to="/avaliacao-infantil"
              onClick={() => trackButtonClick('Especialidade Card - Avaliacao Principal')}
              className="group relative"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Principal
                </span>
              </div>
              <div className="bg-primary/5 rounded-xl border-2 border-primary/30 hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                <div className="h-24 overflow-hidden relative">
                  <img loading="lazy" decoding="async" 
                    src="/images/fono-inova-4.webp" 
                    alt="Avaliação Multidisciplinar em Anápolis"
                    className="w-full h-full object-cover group-transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors text-sm">Avaliação Multidisciplinar</h3>
                  <p className="text-xs text-slate-500 mt-1">Todas as especialidades em um lugar</p>
                  <button className="mt-auto pt-2 px-3 py-1.5 bg-green-700 text-white rounded-full text-xs font-semibold hover:bg-green-800 transition-colors shadow-md">
                    Agendar avaliação 💚
                  </button>
                </div>
              </div>
            </Link>
          </div>

          {/* Texto de apoio SEO */}
          <p className="text-center text-sm text-slate-500 mt-6 max-w-2xl mx-auto">
            Atendemos crianças em <strong>Anápolis</strong> e região. 
            <Link to="/nossa-clinica" className="text-primary hover:underline ml-1">
              Conheça nossa clínica
            </Link>
          </p>
        </div>
      </section>

      {/* ==================== SOBRE A CLÍNICA ==================== */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Imagem */}
            <div className="relative">
              <div className="w-full h-[22rem] sm:h-[26rem] md:h-[460px] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                <ImageCarousel
                  typeImages="clinica"
                  onImageClick={() => trackButtonClick('Clinic Image Click')}
                />
              </div>
              {/* Badge de experiência */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm opacity-90">Anos de Experiência</div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6">
              <span className="mb-3 inline-block text-sm font-semibold text-primary">Sobre a Clínica</span>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">
                Promoção do Crescimento e{" "}
                <span className="text-primary">Bem-Estar Infantil</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Na Clínica Fono Inova, nossa missão é oferecer cuidado multidisciplinar de excelência 
                para crianças, guiados por valores como empatia, inovação e compromisso com o 
                desenvolvimento integral.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Oferecemos serviços especializados como fonoaudiologia, psicologia, terapia ocupacional, 
                fisioterapia, psicopedagogia e musicoterapia, sempre com foco no bem-estar e na 
                evolução de cada criança.
              </p>

              {/* Diferenciais */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  "Equipe multidisciplinar",
                  "Ambiente acolhedor",
                  "Tecnologia moderna",
                  "Acompanhamento familiar",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BLOG/ARTIGOS ==================== */}
      <section id="blog" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="mb-3 inline-block text-sm font-semibold text-primary">Conteúdo Exclusivo</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Artigos sobre <span className="text-primary">Desenvolvimento Infantil</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Confira nossos conteúdos exclusivos sobre terapias e desenvolvimento infantil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articlesData.slice(0, 3).map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={() => trackButtonClick(`Article Click - ${article.title}`)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/artigos"
              onClick={handleVerTodosArtigos}
              className="group inline-flex min-h-12 items-center gap-2 px-8 py-3 rounded-xl font-semibold text-slate-900 ring-1 ring-slate-300 hover:bg-white hover:ring-primary transition-all"
            >
              Ver Todos os Artigos <ArrowRight className="fi-arrow h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 mb-8">
            Tire suas dúvidas sobre atraso na fala, autismo, avaliações e terapias
          </p>
          <Link
            to="/faq"
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Acessar Perguntas Frequentes
          </Link>
        </div>
      </section>

      {/* ==================== CTA FINAL - URGÊNCIA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge de urgência - mais real */}
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full mb-8 animate-pulse">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Últimos horários disponíveis para avaliação</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-white">
              Quanto antes começar,{" "}
              <span className="text-green-400 relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-green-400/30 after:rounded-full">mais rápido seu filho evolui</span>
            </h2>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Não deixe para depois. O período de desenvolvimento infantil é crucial, 
              e quanto antes iniciar o acompanhamento, melhores serão os resultados.
            </p>

            {/* Benefícios */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
              {[
                "Resposta em até 40 min em dias úteis",
                "Avaliação personalizada",
                "Atendimento em horário marcado",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Principal */}
            <ButtonWhatsApp
              onClick={() => {
                trackFormSubmission(true);
                trackButtonClick('WhatsApp CTA Final - Urgência');
              }}
              className="bg-green-700 hover:bg-green-800 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-3 group"
              message="Oi! Vi o site da Clínica Fono Inova 💚\nÉ para meu filho, pode me orientar?"
            >
              Quero falar com um especialista agora
            </ButtonWhatsApp>

            {/* Telefone alternativo */}
            <div className="mt-8">
              <p className="text-white/60 mb-2">Prefere ligar?</p>
              <a
                href="tel:62992013573"
                onClick={() => trackPhoneCall('(62) 99201-3573')}
                className="text-white hover:text-green-400 text-lg font-semibold transition-colors"
              >
                (62) 99201-3573
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTATO ==================== */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Informações */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Fale Conosco</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Endereço</h4>
                      <p className="text-slate-600">
                        Avenida Minas Gerais, 405<br />
                        Bairro Jundiaí - Anápolis/GO
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Telefone</h4>
                      <a
                        href="tel:62992013573"
                        onClick={() => trackPhoneCall('(62) 99201-3573')}
                        className="text-slate-600 hover:text-primary transition-colors"
                      >
                        (62) 99201-3573
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">E-mail</h4>
                      <p className="text-slate-600">contato@clinicafonoinova.com.br</p>
                    </div>
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-4">Siga-nos</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, href: "https://www.instagram.com/clinicafonoinova", color: "from-pink-500 to-pink-600", label: "Instagram" },
                      { icon: Youtube, href: "https://www.youtube.com/clinicafonoinova", color: "from-red-600 to-red-700", label: "YouTube" },
                      { icon: Facebook, href: "https://www.facebook.com/people/Cl%C3%ADnica-Fono-Inova/61575031024483/", color: "from-blue-600 to-blue-700", label: "Facebook" },
                    ].map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleSocialMediaClick(social.label)}
                          className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md`}
                          aria-label={social.label}
                        >
                          <Icon className="w-6 h-6" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Localização e rotas */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <iframe
                  title="Mapa da Clínica Fono Inova em Anápolis"
                  src="https://www.google.com/maps?q=Cl%C3%ADnica+Fono+Inova+Av.+Minas+Gerais+405+Jundia%C3%AD+An%C3%A1polis&output=embed"
                  className="h-72 w-full border-0 sm:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="p-6 sm:p-8">
                  <h3 className="mb-3 text-2xl font-bold text-slate-900">Como chegar à Fono Inova</h3>
                  <p className="mb-5 text-slate-600">
                    Avenida Minas Gerais, 405, bairro Jundiaí, Anápolis/GO.
                    Abra o Google Maps para escolher seu ponto de partida e consultar o trajeto e o tempo de viagem.
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Cl%C3%ADnica+Fono+Inova+Av.+Minas+Gerais+405+Jundia%C3%AD+An%C3%A1polis+GO"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick('Como chegar - Home')}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-teal-700 px-6 py-3 font-semibold text-teal-800 transition-colors hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:w-auto"
                  >
                    <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                    Como chegar
                    <span className="sr-only"> (abre o Google Maps em uma nova aba)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MODAL DE AGENDAMENTO ==================== */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          trackButtonClick('Close Booking Modal');
          setIsModalOpen(false);
        }}
        onBookingSuccess={() => {
          trackFormSubmission(true);
          trackButtonClick('Booking Success');
        }}
      />

      {/* ==================== SEO ==================== */}
      <SEO
        title="Clínica Fono Inova em Anápolis | Fonoaudiologia e Psicologia Infantil"
        description="Clínica Fono Inova (Clínica Inova) em Anápolis: fonoaudiologia, psicologia infantil, terapia ocupacional e fisioterapia no mesmo lugar. Fala, autismo, TDAH e aprendizagem."
        keywords="clínica inova anápolis, fono inova, clínica innova, clínica fonoaudiologia anápolis, fonoaudiólogo infantil, psicologia infantil, terapia ocupacional, fala tardia, autismo"
        image="/images/og-image.jpg"
        url="/"
        type="website"
        schema={schemaHome}
      />

      {/* Estilos adicionais */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <FixedWhatsAppBar message="Oi! Vi a página de a clínica da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
}

export default Home;
