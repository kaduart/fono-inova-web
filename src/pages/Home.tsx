import { Mail, Phone, Star } from '@mui/icons-material';
import { Badge, Button } from '@mui/material';
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
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import ArticleCard from '../components/ArticleCard.jsx';
import BookingModal from '../components/BookingModal.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import Layout from '../components/Layout/index.jsx';
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
import { schemaHome } from '../schemas/clinicaSchemas.js';

const WHATSAPP_URL =
  "https://wa.me/5562993377726?text=Olá! Vi o site da Clínica Fono Inova e gostaria de agendar uma avaliação.";

// Dados das dores/situações para identificação - MAIS EMOCIONAL
const painPoints = [
  {
    icon: MessageCircle,
    title: "Meu filho fala pouco ou quase não fala",
    description: "Troca letras, tem dificuldade para se expressar ou não forma frases completas",
    color: "orange",
    whatsappMsg: "Oi, vi no site e meu filho fala pouco/troca letras. Pode me explicar como funciona a avaliação?",
  },
  {
    icon: Clock,
    title: "Tem 3+ anos e ainda não fala direito",
    description: "Atraso na fala que está preocupando a família e professores",
    color: "blue",
    whatsappMsg: "Oi, vi no site e meu filho tem 3+ anos e ainda não fala bem. Pode me explicar como funciona a avaliação?",
  },
  {
    icon: Brain,
    title: "Suspeita ou diagnóstico de autismo",
    description: "Precisa de avaliação multidisciplinar ou encaminhamento para TEA",
    color: "purple",
    whatsappMsg: "Oi, vi no site e temos suspeita de autismo. Pode me explicar como funciona a avaliação?",
  },
  {
    icon: School,
    title: "Está com dificuldade para aprender",
    description: "Não acompanha a escola, TDAH, dislexia ou problemas de aprendizagem",
    color: "emerald",
    whatsappMsg: "Oi, vi no site e meu filho tem dificuldade na escola. Pode me explicar como funciona a avaliação?",
  },
  {
    icon: Baby,
    title: "Problemas no aleitamento ou deglutição",
    description: "Freio lingual, dificuldade para mamar ou engolir alimentos",
    color: "pink",
    whatsappMsg: "Oi, vi no site e meu filho tem problema no aleitamento/engolir. Pode me explicar como funciona a avaliação?",
  },
  {
    icon: Mic,
    title: "Perda de voz ou rouquidão persistente",
    description: "Disfonia, fadiga vocal, ideal para professores e profissionais da voz",
    color: "teal",
    whatsappMsg: "Oi, vi no site e tenho problema de voz/rouquidão. Pode me explicar como funciona a avaliação?",
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

// Depoimentos destacados
const featuredTestimonials = [
  {
    stars: 5,
    text: "Meu filho não falava quase nada... hoje já conversa!",
    author: "Mãe do Pedro, 4 anos",
  },
  {
    stars: 5,
    text: "Depois de 3 meses já vimos muita evolução no desenvolvimento",
    author: "Pai da Sofia, 5 anos",
  },
  {
    stars: 5,
    text: "Atendimento humano e acolhedor desde o primeiro contato",
    author: "Mãe do Lucas, 3 anos",
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
      <section className="relative min-h-screen pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        {/* Background com gradiente suave e elegante */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30" />
        
        {/* Elementos decorativos - bolhas gradientes coloridas */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-teal-200/30 to-cyan-200/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/30 to-orange-200/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-primary/20 to-secondary/10 rounded-full blur-3xl opacity-50" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Badge de Urgência - Mais Real */}
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  Agenda quase cheia esta semana
                </span>
              </div>

              {/* Headline focada em DOR */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                Seu filho está com{" "}
                <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">dificuldade para falar</span>{" "}
                ou se comunicar?
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Ajudamos crianças a desenvolverem fala, atenção e comunicação com 
                <strong className="font-semibold text-slate-900"> acompanhamento especializado e humanizado</strong> em Anápolis.
              </p>

              {/* Benefícios */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Atendimento rápido</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>+500 famílias atendidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Nota 4.9 no Google</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp CTA Principal");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi, vi no site e gostaria de agendar uma avaliação. Pode me explicar como funciona?"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp
                </ButtonWhatsApp>
                
                <a
                  href="tel:6237063924"
                  onClick={() => trackPhoneCall('(62) 3706-3924')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  <PhoneCall className="w-5 h-5" />
                  Ligar (62) 3706-3924
                </a>
              </div>

              {/* Prova social */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-600">4.9 no Google • +500 famílias atendidas</span>
              </div>
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative w-full">
              <div className="relative">
                {/* Imagem principal */}
                <div className="w-full h-72 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                  <ImageCarousel
                    typeImages="nichos"
                    onImageClick={() => trackButtonClick('Hero Image Click')}
                  />
                </div>

                {/* Card flutuante - apenas um */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl z-10">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-slate-900">4.9</span>
                    <span className="text-xs text-slate-500">Google</span>
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
            <Badge className="mb-4 bg-purple-50 text-purple-600 border-purple-200 px-4 py-1.5 text-sm font-semibold">
              Encontre o Atendimento Ideal
            </Badge>
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

          {/* CTA após seleção ou geral */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Não sabe qual é o melhor atendimento?{" "}
              <span className="font-semibold text-primary">Nós te ajudamos a descobrir</span>
            </p>
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Identificação")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
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
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Famílias Atendidas", icon: Award },
              { value: "4.9/5", label: "Avaliação Google", icon: Star },
              { value: "12+", label: "Especialistas", icon: GraduationCap },
              { value: "10+", label: "Anos de Experiência", icon: Clock },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Depoimentos em destaque */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Depoimentos Reais
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">
                O que os <span className="text-accent relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-accent/20 after:rounded-full">pais</span> dizem sobre nós
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg font-medium text-slate-800 mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.author}</p>
                </div>
              ))}
            </div>

            {/* CTA após prova social */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Sua família também pode ter esse resultado
              </h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Agende uma avaliação e descubra como podemos ajudar no desenvolvimento do seu filho
              </p>
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - Prova Social")}
                className="bg-white hover:bg-slate-100 text-primary px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-xl"
                message="Olá! Gostaria de agendar uma avaliação na Clínica Fono Inova."
              >
                Quero Agendar Minha Avaliação
              </ButtonWhatsApp>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA - 3 PASSOS ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-600 border-blue-200">
              Processo Simples
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona o <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">atendimento</span>?
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
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                  )}

                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
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
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              message="Oi, vi no site e quero iniciar o atendimento. Pode me explicar como funciona?"
            >
              Falar com especialista no WhatsApp
            </ButtonWhatsApp>
            
            <p className="text-sm text-slate-500 mt-3">
              Resposta rápida • Sem compromisso
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SERVIÇOS - LINGUAGEM DO PACIENTE ==================== */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Nossas Especialidades
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
              Atendimento <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">especializado</span> para cada necessidade
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Oferecemos terapias personalizadas focadas nos resultados do seu filho
            </p>
          </div>

          {/* Cards de atendimentos populares */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {/* TEA */}
            <Link to="/avaliacao-autismo-infantil" className="group">
              <div className="bg-white border-2 border-purple-100 hover:border-purple-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Suspeita de Autismo</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  Avaliação multidisciplinar completa para crianças com sinais de TEA
                </p>
                <div className="flex items-center text-purple-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Fala Tardia */}
            <Link to="/fala-tardia" className="group">
              <div className="bg-white border-2 border-orange-100 hover:border-orange-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Fala Tardia</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  Fonoterapia especializada para crianças de 2-5 anos com atraso na fala
                </p>
                <div className="flex items-center text-orange-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Dificuldade Escolar */}
            <Link to="/avaliacao-neuropsicologica-dificuldade-escolar" className="group">
              <div className="bg-white border-2 border-blue-100 hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <School className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Dificuldade na Escola</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  Avaliação neuropsicológica para TDAH, dislexia e problemas de aprendizagem
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Fonoaudiologia Adulto */}
            <Link to="/fonoaudiologia-adulto" className="group">
              <div className="bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Voz Profissional</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  Tratamento de disfonia e fadiga vocal para professores e profissionais
                </p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Psicomotricidade */}
            <Link to="/psicomotricidade" className="group">
              <div className="bg-white border-2 border-pink-100 hover:border-pink-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Baby className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Psicomotricidade</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  Desenvolvimento motor e sensorial para TEA, Síndrome de Down e outras condições
                </p>
                <div className="flex items-center text-pink-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Psicopedagogia */}
            <Link to="/psicopedagogia-clinica" className="group">
              <div className="bg-white border-2 border-amber-100 hover:border-amber-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Aprendizagem</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  Dislexia, discalculia e dificuldades de aprendizagem com intervenção personalizada
                </p>
                <div className="flex items-center text-amber-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Musicoterapia */}
            <Link to="/musicoterapia" className="group">
              <div className="bg-white border-2 border-indigo-100 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
                <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Music className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Musicoterapia</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">
                  A música como terapia para comunicação, socialização e desenvolvimento infantil
                </p>
                <div className="flex items-center text-indigo-600 font-semibold text-sm">
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Ver todos */}
            <button
              onClick={() => scrollToSection('all-services')}
              className="group bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-dashed border-primary/30 hover:border-primary rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ver todos os serviços</h3>
              <p className="text-slate-600 text-sm">
                Conheça nossa equipe multidisciplinar completa
              </p>
            </button>
          </div>

          {/* Serviços completos - Componente existente */}
          <div id="all-services">
            <ServiceCards
              onServiceClick={(serviceName: string) => trackButtonClick(`Service Click - ${serviceName}`)}
            />
          </div>
        </div>
      </section>

      {/* ==================== SOBRE A CLÍNICA ==================== */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Imagem */}
            <div className="relative">
              <div className="w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
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
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Sobre a Clínica
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">
                Promoção do Crescimento e{" "}
                <span className="text-secondary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-secondary/20 after:rounded-full">Bem-Estar Infantil</span>
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
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Conteúdo Exclusivo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Artigos sobre <span className="text-accent relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-accent/20 after:rounded-full">Desenvolvimento Infantil</span>
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
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/artigos"
              onClick={handleVerTodosArtigos}
              className="px-8 py-3 rounded-xl border-2 hover:bg-slate-100 transition-all"
            >
              Ver Todos os Artigos
            </Button>
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
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
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
                "Resposta em até 2h",
                "Avaliação personalizada",
                "Sem filas de espera",
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
              className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 group"
              message="Oi, vi no site e gostaria de agendar uma avaliação. Pode me explicar como funciona?"
            >
              <MessageCircle className="w-7 h-7" />
              Quero falar com um especialista agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </ButtonWhatsApp>

            {/* Telefone alternativo */}
            <div className="mt-8">
              <p className="text-white/60 mb-2">Prefere ligar?</p>
              <a
                href="tel:6237063924"
                onClick={() => trackPhoneCall('(62) 3706-3924')}
                className="text-white hover:text-green-400 text-lg font-semibold transition-colors"
              >
                (62) 3706-3924
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
                        href="tel:6237063924"
                        onClick={() => trackPhoneCall('(62) 3706-3924')}
                        className="text-slate-600 hover:text-primary transition-colors"
                      >
                        (62) 3706-3924
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
                      { icon: Facebook, href: "https://www.facebook.com/clinicafonoinova", color: "from-blue-600 to-blue-700", label: "Facebook" },
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

              {/* Mapa ou imagem */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center shadow-xl">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Venha nos Conhecer</h3>
                <p className="text-white/90 mb-6">
                  Estamos localizados no bairro Jundiaí, em Anápolis/GO, com fácil acesso e estacionamento.
                </p>
                <a
                  href="https://maps.google.com/?q=Avenida+Minas+Gerais+405+Anápolis+GO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors inline-flex items-center gap-2 shadow-lg"
                >
                  <MapPin className="w-5 h-5" />
                  Ver no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DEPOIMENTOS COMPLETOS ==================== */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">
              Mais histórias de <span className="text-accent relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-accent/20 after:rounded-full">transformação</span>
            </h2>
          </div>

          <TestimonialCards
            onTestimonialClick={(testimonialId: string) => trackButtonClick(`Testimonial Click - ${testimonialId}`)}
          />
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

      {/* ==================== SEO ==================== -->
      <SEO
        title="Clínica Fono Inova em Anápolis | Fonoaudiologia, Psicologia, Terapia"
        description="Clínica multidisciplinar especializada em fonoaudiologia, psicologia, terapia ocupacional e fisioterapia infantil. Agende sua avaliação pelo WhatsApp."
        keywords="clínica fonoaudiologia anápolis, fonoaudiólogo infantil, psicologia infantil anápolis, terapia ocupacional, autismo, fala tardia"
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
    </Layout>
  );
}

export default Home;