import { Star } from 'lucide-react';
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
  PhoneCall,
  Scissors,
  Sparkles,
  Youtube,
  Heart,
  MessageCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizardLazy.jsx';
import BookingModal from '../components/BookingModal.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { reportWhatsappConversion } from '../helper/analytics.js';
import {
  trackButtonClick,
  trackPhoneCall,
  trackSocialMediaClick,
  trackWhatsAppClick
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness, schemaTesteLinguinhaAnapolis, schemaFAQTesteLinguinha } from '../schemas/clinicaSchemas.js';
import Breadcrumb from '../components/Breadcrumb';
import { testeLinguinhaSEO } from '../data/seoStructures.js';
import SEOStructuredContent from '../components/SEOStructuredContent.js';
import { getPageWhatsAppLink, getPageById } from '../data/landingPageRegistry.js';
import ClinicGallery from '../components/ClinicGallery';
import DifferentialSection from '../components/premium/DifferentialSection';
import ProofBar from '../components/premium/ProofBar';
import TypewriterText from '../components/TypewriterText';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import PageFooterInfo from '../components/premium/PageFooterInfo';

const PAGE_ID = 'teste_da_linguinha_anapolis';
const PAGE_DATA = getPageById(PAGE_ID);
const WHATSAPP_LINK = getPageWhatsAppLink(PAGE_ID);

// Dados das dores/situações para identificação
const painPoints = [
  {
    icon: Baby,
    title: "Dificuldade para sugar/mamar",
    description: "Bebê não consegue fazer a pega correta, cansa rápido na mamada ou perde peso",
    color: "orange",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu bebê tem dificuldade para mamar. Pode me orientar?",
  },
  {
    icon: MessageCircle,
    title: "Dificuldade para falar",
    description: "Criança troca letras, não pronuncia bem o 'L' e 'R', ou fala 'arrastado'",
    color: "blue",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem dificuldade para falar. Pode me orientar?",
  },
  {
    icon: Heart,
    title: "Suspeita de freio curto (ankyloglossia)",
    description: "A língua parece presa, não sobe no céu da boca ou tem formato de coração na ponta",
    color: "purple",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nSuspeito que meu filho tem freio lingual curto. Pode me orientar?",
  },
  {
    icon: Scissors,
    title: "Já foi indicada frenectomia",
    description: "Médico ou dentista sugeriu o procedimento e você quer uma segunda opinião especializada",
    color: "emerald",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nIndicaram frenectomia para meu filho. Pode me orientar?",
  },
  {
    icon: Brain,
    title: "Dificuldade de mobilidade lingual",
    description: "Não consegue lamber os lábios, movimentar a língua para os lados ou 'clicar'",
    color: "pink",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem dificuldade de mexer a língua. Pode me orientar?",
  },
  {
    icon: Clock,
    title: "Quero diagnóstico precoce",
    description: "Meu bebê é recém-nascido e quero fazer a avaliação preventiva do freio lingual",
    color: "teal",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nQuero fazer o teste da linguinha do meu bebê. Pode me orientar?",
  },
];

// Como funciona - 3 passos
const steps = [
  {
    number: "1",
    title: "Agende o Teste da Linguinha",
    description: "Marque uma avaliação especializada em freio lingual em Anápolis",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Avaliação completa",
    description: "Avaliamos a mobilidade, função e impacto do freio lingual na alimentação e fala",
    icon: Brain,
  },
  {
    number: "3",
    title: "Orientação e tratamento",
    description: "Receba o diagnóstico e indicação do melhor tratamento para seu filho",
    icon: CheckCircle2,
  },
];

// Depoimentos destacados
const featuredTestimonials = [
  {
    stars: 5,
    text: "Descobrimos o freio curto do bebê com apenas 5 dias de vida. A orientação foi fundamental para a amamentação!",
    author: "Mãe do Rafael, 3 meses",
  },
  {
    stars: 5,
    text: "Minha filha troca o R e o L. Depois do teste, entendemos que não era só fonoaudiologia, mas também o freio.",
    author: "Mãe da Laura, 6 anos",
  },
  {
    stars: 5,
    text: "Atendimento excelente! Fizemos a avaliação completa e tivemos toda orientação necessária.",
    author: "Pai do Gabriel, 2 anos",
  },
];

const TesteLinguinhaAnapolis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('LP_Teste_Linguinha_Anapolis');

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
        title="Teste da Linguinha em Anápolis | Fono Inova"
        description="Teste da linguinha em Anápolis para bebês e crianças: avaliação do freio lingual (língua presa) e da dificuldade para mamar, na Clínica Fono Inova. Agende pelo WhatsApp."
        keywords="teste da linguinha anápolis, freio lingual anápolis, bebê não mama, língua presa bebê, frenectomia anápolis, ankyloglossia anápolis, dificuldade para mamar anápolis, avaliação freio lingual anápolis, fono para bebê anápolis, teste da linguinha preço"
        image="/images/clinica/ia/teste-linguinha.webp"
        url="https://www.clinicafonoinova.com.br/teste-da-linguinha-anapolis"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaTesteLinguinhaAnapolis, schemaFAQTesteLinguinha]}
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
          { label: 'Fonoaudiologia', href: '/fonoaudiologia-anapolis' },
          { label: 'Teste da Linguinha em Anápolis' }
        ]} 
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-clip">
        <div className="absolute inset-0 bg-[#f6f9f8]" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Clínica Multidisciplinar em Anápolis
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText text="Teste da Linguinha em Anápolis GO" />
              </h1>

              {/* H2 Especialidade */}
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">
                Bebê não mama direito? Pode ser freio lingual curto
              </h2>

              {/* H2 Dor */}
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-xl font-medium">
                Seu bebê tem dificuldade para sugar, faz estalo na mamada ou você sente dor ao amamentar?
              </p>

              {/* Parágrafo */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                O <strong className="text-slate-900">Teste da Linguinha</strong> na{" "}
                <strong className="text-slate-900">Clínica Fono Inova</strong> em Anápolis identifica precocemente
                o freio lingual curto (ankyloglossia / língua presa) que pode prejudicar a amamentação, alimentação e fala.
                Avaliação rápida, indolor e especializada para bebês e crianças em Anápolis GO.
              </p>

              {/* Benefícios rápidos */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 [&_span]:whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Diagnóstico precoce</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Avaliação especializada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Para bebês e crianças</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Teste Linguinha");
                  }}
                  lpSlug={PAGE_DATA?.slug}
                  lpCategory={PAGE_DATA?.categoria}
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message={PAGE_DATA?.whatsappMessage}
                >
                  Agendar Teste da Linguinha
                </ButtonWhatsApp>
                
                <a
                  href="tel:62992013573"
                  onClick={() => trackPhoneCall('(62) 99201-3573')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
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
                  <img loading="lazy" decoding="async" 
                    src="/images/clinica/ia/teste-linguinha.webp" 
                    alt="Imagem ilustrativa: mãe com o bebê no colo conversando com a profissional de saúde"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      {/* ==================== INVESTIMENTO ==================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 mb-3">Avaliação do freio lingual, sem enrolação</h2>
            <p className="text-slate-600 mb-6">Uma fonoaudióloga avalia a mobilidade da língua e o impacto na mamada e na fala, e você sai com a orientação sobre o que fazer.</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Teste da Linguinha</p>
            
            <p className="text-sm text-slate-500 mb-6">Valores e condições pelo WhatsApp. Agende e escolha o melhor período.</p>
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Investimento Linguinha")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              message="Oi! Vi o site da Clínica Fono Inova 💚 Quero agendar o Teste da Linguinha do meu bebê."
            >
              Agendar o Teste da Linguinha
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ==================== SEÇÃO DE IDENTIFICAÇÃO - DORES ==================== */}
      <section id="identificacao" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border mb-4 bg-purple-50 text-purple-600 border-purple-200 px-4 py-1.5 text-sm font-semibold">
              Quando fazer o Teste?
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
              Não sabe se precisa do teste?{" "}
              <span className="font-semibold text-primary">Nós te ajudamos a descobrir</span>
            </p>
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Identificação")}
              lpSlug={PAGE_DATA?.slug}
              lpCategory={PAGE_DATA?.categoria}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              message={selectedPain !== null ? painPoints[selectedPain].whatsappMsg : PAGE_DATA?.whatsappMessage}
            >
              Falar com especialista no WhatsApp
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ==================== SINTOMAS DO FREIO LINGUAL (SEO SNIPPET) ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center rounded-full border mb-4 bg-red-50 text-red-600 border-red-200 px-4 py-1.5 text-sm font-semibold">
                Sinais de Alerta
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
                Será que seu bebê tem{" "}
                <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">língua presa?</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                O freio lingual curto (ankyloglossia) pode passar despercebido. Veja os principais sinais que indicam a necessidade do Teste da Linguinha.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Bebê não consegue mamar direito",
                  description: "Pega fraca, solta o peito com frequência ou faz mamadas muito longas e cansa."
                },
                {
                  title: "Estalo ou clique durante a mamada",
                  description: "Barulho de estalo ao sugar pode indicar que a língua não cria vácuo adequado."
                },
                {
                  title: "Dor ao amamentar",
                  description: "Mamilos doloridos, feridos ou sensação de sucção incorreta são sinais comuns."
                },
                {
                  title: "Ganho de peso abaixo do esperado",
                  description: "Bebê que não ingere leite suficiente pode ter crescimento lento."
                },
                {
                  title: "Língua em formato de coração",
                  description: "Quando a língua sai para fora, a ponta pode ficar com formato de coração."
                },
                {
                  title: "Dificuldade para falar depois dos 2 anos",
                  description: "Troca de R por L, fala enrolada ou língua que não sobe no céu da boca."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - Sintomas")}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                message="Oi! Vi o site sobre Teste da Linguinha 💚\nMeu bebê tem alguns desses sinais. Pode me orientar?"
              >
                Falar com especialista sobre os sinais
              </ButtonWhatsApp>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona o Teste da Linguinha
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, descubra se seu filho precisa de intervenção no freio lingual
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

      {/* ==================== AUTORIDADE CLÍNICA (E-E-A-T) ==================== */}
      <section className="py-24 bg-gradient-to-br from-teal-50/50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center rounded-full border mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold">
                Avaliação Especializada
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
                Por que fazer o Teste da Linguinha na Clínica Fono Inova?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Profissionais especializados</h3>
                <p className="text-slate-600">
                  O Teste da Linguinha é realizado por fonoaudiólogos com experiência em motricidade oral, amamentação e desenvolvimento infantil.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Protocolo clínico reconhecido</h3>
                <p className="text-slate-600">
                  Avaliação completa da mobilidade lingual, função na sucção e impacto na fala, com critérios técnicos para indicar o melhor tratamento.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Baby className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Atendimento para recém-nascidos</h3>
                <p className="text-slate-600">
                  Avaliamos bebês desde os primeiros dias de vida, com ambiente acolhedor e técnicas que não causam desconforto.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Estrutura em Anápolis GO</h3>
                <p className="text-slate-600">
                  Clínica localizada no bairro Jundiaí, em Anápolis/GO, com fácil acesso para famílias de Anápolis e região.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEO LOCAL ==================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 mb-4">
              Teste da Linguinha em Anápolis e região
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Atendemos famílias de <strong>Anápolis</strong>, <strong>Jundiaí</strong>, <strong>Goiânia</strong>, <strong>Inhumas</strong>, <strong>Silvânia</strong> e cidades próximas. 
              Agende o Teste da Linguinha para seu bebê e receba orientação especializada sobre freio lingual curto.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {["teste da linguinha Anápolis GO", "freio lingual Anápolis", "língua presa bebê Anápolis", "fono para bebê Anápolis", "avaliação bebê Jundiaí"].map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTEÚDO SEO ESTRUTURADO ==================== */}
      <SEOStructuredContent 
        seoData={testeLinguinhaSEO} 
        showFAQ={true}
        customFAQTitle="Perguntas Frequentes sobre o Teste da Linguinha"
      />

      {/* ==================== INTERNAL LINKING ==================== */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 mb-6">
              Outras especialidades que podem ajudar seu filho
            </h2>
            <p className="text-slate-600 mb-8">
              Na Clínica Fono Inova oferecemos atendimento multidisciplinar completo para o desenvolvimento infantil
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/fonoaudiologia-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Fonoaudiologia Infantil em Anápolis
              </Link>
              <Link
                to="/fala-tardia-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Atraso de Fala em Anápolis
              </Link>
              <Link
                to="/psicomotricidade-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Psicomotricidade em Anápolis
              </Link>
              <Link
                to="/terapia-ocupacional-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Terapia Ocupacional em Anápolis
              </Link>
              <Link
                to="/avaliacao-neuropsicologica-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Avaliação Neuropsicológica em Anápolis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold font-poppins text-slate-900">O que as famílias dizem</h2>
          <GoogleReviews count={3} offset={2} title="" />
        </div>
      </section>

      <PageFooterInfo related={['/fonoaudiologia-anapolis', '/fala-tardia-anapolis', '/prematuridade-desenvolvimento', '/neuropediatra-anapolis']} whatsappMessage="Oi! Vi a página de teste da linguinha da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="terapia" reverse whatsappMessage="Oi! Vi a página de teste da linguinha da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Não espere mais para fazer o Teste da Linguinha
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              O diagnóstico precoce do freio lingual pode fazer toda diferença na alimentação e fala do seu filho.
              Agende uma avaliação na Clínica Fono Inova.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                lpSlug={PAGE_DATA?.slug}
                lpCategory={PAGE_DATA?.categoria}
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message={PAGE_DATA?.whatsappMessage}
              >
                Agendar Teste pelo WhatsApp
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
      <FixedWhatsAppBar message="Oi! Vi a página de teste da linguinha da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
};

export default TesteLinguinhaAnapolis;
